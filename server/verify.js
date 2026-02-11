import 'dotenv/config';
import db from './src/config/database.js';

console.log('🔍 Verifying Gemini Decision Ball setup...\n');

// Check environment variables
const requiredEnvVars = [
  'JWT_SECRET',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'GEMINI_API_KEY',
];

let missingVars = [];
requiredEnvVars.forEach((varName) => {
  if (!process.env[varName] || process.env[varName].includes('your_')) {
    missingVars.push(varName);
  }
});

if (missingVars.length > 0) {
  console.log('⚠️  Missing or placeholder environment variables:');
  missingVars.forEach((v) => console.log(`   - ${v}`));
  console.log('\nPlease update server/.env with actual credentials.\n');
} else {
  console.log('✅ Environment variables configured');
}

// Check database
try {
  const tables = db
    .prepare(
      `SELECT name FROM sqlite_master WHERE type='table' ORDER BY name;`
    )
    .all();
  console.log('✅ Database initialized with tables:');
  tables.forEach((t) => console.log(`   - ${t.name}`));
} catch (err) {
  console.error('❌ Database error:', err.message);
}

console.log('\n✅ Server setup verification complete!');
console.log('\nNext steps:');
console.log('1. Fill in server/.env with actual credentials');
console.log('2. Run: npm run dev');
console.log('3. Frontend will connect to http://localhost:3001\n');

process.exit(0);
