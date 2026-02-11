import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import db from './database.js';
import { randomBytes } from 'crypto';

const GoogleOAuth2Strategy = GoogleStrategy.Strategy;

passport.use(
  new GoogleOAuth2Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      try {
        const googleId = profile.id;
        const email = profile.emails?.[0]?.value;
        const name = profile.displayName;
        const avatar = profile.photos?.[0]?.value;

        // Try to find existing user
        const existingUser = db
          .prepare('SELECT * FROM users WHERE google_id = ?')
          .get(googleId);

        if (existingUser) {
          // Update last_login
          db.prepare('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?').run(
            existingUser.id
          );
          return done(null, existingUser);
        }

        // Create new user
        const userId = randomBytes(16).toString('hex');
        db.prepare(
          `INSERT INTO users (id, google_id, email, name, avatar)
           VALUES (?, ?, ?, ?, ?)`
        ).run(userId, googleId, email, name, avatar);

        const newUser = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
        return done(null, newUser);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  try {
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
