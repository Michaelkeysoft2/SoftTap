const path = require('path');
const fs = require('fs');
const readline = require('readline');
const dns = require('dns');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// Configure public DNS resolvers to ensure Node can resolve MongoDB Atlas SRV
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {
  // ignore
}

// Load .env.local if present
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const val = match[2].trim().replace(/^['"](.*)['"]$/, '$1');
      if (!process.env[key]) process.env[key] = val;
    }
  });
}

const emailArg = process.argv[2];
let passwordArg = process.argv[3];
const nameArg = process.argv[4] || 'Admin';

function promptPassword(promptText) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question(promptText, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function run() {
  const email = emailArg || process.env.ADMIN_INIT_EMAIL || await promptPassword('Enter admin email: ');
  const password = passwordArg || process.env.ADMIN_INIT_PASSWORD || await promptPassword('Enter admin password: ');
  const name = nameArg;

  if (!email || !password) {
    console.log('Error: Both email and password are required.');
    process.exit(1);
  }
  const MONGODB_URI = process.env.MONGODB_URI;

  if (MONGODB_URI) {
    try {
      await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 8000 });
      console.log('Connected to MongoDB Atlas.');

      const UserSchema = new mongoose.Schema({
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        phone: { type: String, required: true },
        password: { type: String, required: true },
        role: { type: String, enum: ['user', 'admin'], default: 'user' },
      }, { timestamps: true });

      const User = mongoose.models.User || mongoose.model('User', UserSchema);
      const normalizedEmail = email.toLowerCase().trim();

      let user = await User.findOne({ email: normalizedEmail });
      const hashedPassword = await bcrypt.hash(password, 10);

      if (user) {
        user.role = 'admin';
        user.password = hashedPassword;
        await user.save();
        console.log(`ADMIN_ALREADY_EXISTED_PROMOTED: true`);
        console.log(`EMAIL: ${normalizedEmail}`);
        console.log(`ROLE: admin`);
      } else {
        user = await User.create({
          firstName: name,
          lastName: 'Owner',
          email: normalizedEmail,
          phone: `080${Math.floor(10000000 + Math.random() * 90000000)}`,
          password: hashedPassword,
          role: 'admin',
        });
        console.log(`ADMIN_CREATED: true`);
        console.log(`EMAIL: ${normalizedEmail}`);
        console.log(`ROLE: admin`);
      }
      process.exit(0);
    } catch (err) {
      console.error('Remote MongoDB error:', err.message);
      process.exit(1);
    }
  }

  // Local file database fallback
  const dataDir = path.join(process.cwd(), 'data');
  const dbFile = path.join(dataDir, 'db.json');

  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  let db = { users: [], transactions: [], plans: [] };
  if (fs.existsSync(dbFile)) {
    try {
      db = JSON.parse(fs.readFileSync(dbFile, 'utf8') || '{}');
      if (!Array.isArray(db.users)) db.users = [];
    } catch (e) {
      db.users = [];
    }
  }

  const normalizedEmail = email.toLowerCase().trim();
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingIdx = db.users.findIndex(u => (u.email || '').toLowerCase() === normalizedEmail);

  if (existingIdx !== -1) {
    db.users[existingIdx].role = 'admin';
    db.users[existingIdx].password = hashedPassword;
    console.log(`[Local DB] Successfully promoted existing user "${normalizedEmail}" to role: "admin"!`);
  } else {
    db.users.push({
      _id: 'local_adm_' + Date.now(),
      firstName: name,
      lastName: 'Owner',
      email: normalizedEmail,
      phone: `080${Math.floor(10000000 + Math.random() * 90000000)}`,
      password: hashedPassword,
      role: 'admin',
      walletBalance: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    console.log(`[Local DB] Successfully created new admin user "${normalizedEmail}" with role: "admin"!`);
  }

  fs.writeFileSync(dbFile, JSON.stringify(db, null, 2), 'utf8');
  process.exit(0);
}

run().catch(e => {
  console.error('Error creating admin:', e);
  process.exit(1);
});
