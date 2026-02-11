import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { getDecision } from '../services/geminiService.js';
import db from '../config/database.js';
import { randomBytes } from 'crypto';

const router = express.Router();

// Create a decision
router.post('/', verifyToken, async (req, res) => {
  try {
    const { question, mode = 'normal' } = req.body;

    if (!question || !question.trim()) {
      return res.status(400).json({ error: 'Question is required' });
    }

    if (!['normal', 'crazy', 'bombastic'].includes(mode)) {
      return res.status(400).json({ error: 'Invalid mode' });
    }

    // Get decision from Gemini
    const answer = await getDecision(question, mode);

    // Save to database
    const decisionId = randomBytes(16).toString('hex');
    db.prepare(
      `INSERT INTO decisions (id, user_id, question, answer, mode)
       VALUES (?, ?, ?, ?, ?)`
    ).run(decisionId, req.user.userId, question, answer, mode);

    res.json({
      id: decisionId,
      question,
      answer,
      mode,
      created_at: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Decision error:', err);
    res.status(500).json({ error: 'Failed to generate decision' });
  }
});

export default router;
