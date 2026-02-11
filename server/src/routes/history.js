import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import db from '../config/database.js';

const router = express.Router();

// Get user's decision history
router.get('/', verifyToken, (req, res) => {
  try {
    const { page = 1, limit = 20, mode } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    let query = 'SELECT * FROM decisions WHERE user_id = ?';
    const params = [req.user.userId];

    if (mode && ['normal', 'crazy', 'bombastic'].includes(mode)) {
      query += ' AND mode = ?';
      params.push(mode);
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);

    const decisions = db.prepare(query).all(...params);

    // Get total count
    let countQuery = 'SELECT COUNT(*) as count FROM decisions WHERE user_id = ?';
    const countParams = [req.user.userId];
    if (mode && ['normal', 'crazy', 'bombastic'].includes(mode)) {
      countQuery += ' AND mode = ?';
      countParams.push(mode);
    }
    const { count } = db.prepare(countQuery).get(...countParams);

    res.json({
      decisions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        pages: Math.ceil(count / parseInt(limit)),
      },
    });
  } catch (err) {
    console.error('History error:', err);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

// Delete single decision
router.delete('/:id', verifyToken, (req, res) => {
  try {
    const { id } = req.params;

    // Verify ownership
    const decision = db.prepare('SELECT user_id FROM decisions WHERE id = ?').get(id);
    if (!decision) {
      return res.status(404).json({ error: 'Decision not found' });
    }
    if (decision.user_id !== req.user.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    db.prepare('DELETE FROM decisions WHERE id = ?').run(id);
    res.json({ message: 'Decision deleted' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Failed to delete decision' });
  }
});

// Clear all user history
router.delete('/', verifyToken, (req, res) => {
  try {
    db.prepare('DELETE FROM decisions WHERE user_id = ?').run(req.user.userId);
    res.json({ message: 'History cleared' });
  } catch (err) {
    console.error('Clear history error:', err);
    res.status(500).json({ error: 'Failed to clear history' });
  }
});

export default router;
