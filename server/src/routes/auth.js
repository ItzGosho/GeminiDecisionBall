import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../middleware/auth.js';
import db from '../config/database.js';

const router = express.Router();

// Initiate Google OAuth
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

// Google OAuth callback
router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
  try {
    const user = req.user;

    // Create JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Redirect to client with token
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    res.redirect(`${clientUrl}/auth/callback?token=${token}`);
  } catch (err) {
    console.error('Auth callback error:', err);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

// Get current user
router.get('/me', verifyToken, (req, res) => {
  try {
    const user = db.prepare('SELECT id, email, name, avatar FROM users WHERE id = ?').get(req.user.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error('Get user error:', err);
    res.status(500).json({ error: 'Failed to get user' });
  }
});

// Logout (client-side, but included for completeness)
router.post('/logout', (req, res) => {
  res.json({ message: 'Logged out' });
});

export default router;
