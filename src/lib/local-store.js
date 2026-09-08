import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const DATA_DIR = process.env.VERCEL 
  ? path.join('/tmp', 'softtap-data') 
  : path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');


function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    const initialData = {
      users: [],
      transactions: [],
      plans: [],
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
  }
}

function readData() {
  ensureDataFile();
  try {
    const content = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(content || '{"users":[],"transactions":[],"plans":[]}');
  } catch (err) {
    console.error('Error reading local db:', err);
    return { users: [], transactions: [], plans: [] };
  }
}

function writeData(data) {
  ensureDataFile();
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing local db:', err);
  }
}

function generateId() {
  return crypto.randomBytes(12).toString('hex');
}

function wrapUser(u) {
  if (!u) return null;
  const user = { ...u };
  user._id = user.id || user._id;
  user.toString = function () {
    return this._id ? this._id.toString() : '';
  };
  user.save = async function () {
    const data = readData();
    const idx = data.users.findIndex((x) => (x._id || x.id) === (user._id || user.id));
    user.updatedAt = new Date().toISOString();
    if (idx !== -1) {
      data.users[idx] = { ...data.users[idx], ...user };
    } else {
      data.users.push(user);
    }
    writeData(data);
    return wrapUser(user);
  };
  return user;
}

function wrapTransaction(t) {
  if (!t) return null;
  const tx = { ...t };
  tx._id = tx.id || tx._id;
  tx.toString = function () {
    return this._id ? this._id.toString() : '';
  };
  return tx;
}

function matchesFilter(item, filter = {}) {
  if (!filter || Object.keys(filter).length === 0) return true;

  if (filter.$or && Array.isArray(filter.$or)) {
    const orMatches = filter.$or.some((subFilter) => matchesFilter(item, subFilter));
    if (!orMatches) return false;
  }

  for (const [key, value] of Object.entries(filter)) {
    if (key === '$or') continue;
    
    if (key === '_id' || key === 'id') {
      const itemId = (item._id || item.id || '').toString();
      if (typeof value === 'object' && value !== null && value.$ne) {
        if (itemId === value.$ne.toString()) return false;
      } else if (itemId !== value?.toString()) {
        return false;
      }
      continue;
    }

    if (typeof value === 'object' && value !== null && value.$ne !== undefined) {
      if (item[key] === value.$ne) return false;
      continue;
    }

    if (item[key] !== value) {
      return false;
    }
  }

  return true;
}

export const LocalUser = {
  async findOne(filter) {
    const data = readData();
    const found = data.users.find((u) => matchesFilter(u, filter));
    return found ? wrapUser(found) : null;
  },

  async findById(id) {
    const data = readData();
    const idStr = id?.toString();
    const found = data.users.find((u) => (u._id || u.id)?.toString() === idStr);
    const wrapped = found ? wrapUser(found) : null;
    
    if (wrapped) {
      wrapped.select = function () {
        return wrapped;
      };
    }
    return wrapped;
  },

  async create(userDoc) {
    const data = readData();
    const now = new Date().toISOString();
    const newUser = {
      _id: generateId(),
      ...userDoc,
      walletBalance: userDoc.walletBalance || 0,
      role: userDoc.role || 'user',
      createdAt: now,
      updatedAt: now,
    };
    data.users.push(newUser);
    writeData(data);
    return wrapUser(newUser);
  },

  find(filter = {}) {
    const data = readData();
    let results = data.users.filter((u) => matchesFilter(u, filter)).map(wrapUser);

    const queryObj = {
      sort(sortOpt) {
        if (sortOpt && sortOpt.createdAt === -1) {
          results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
        return queryObj;
      },
      select(fields) {
        if (fields === '-password') {
          results = results.map((u) => {
            const copy = { ...u };
            delete copy.password;
            return wrapUser(copy);
          });
        }
        return queryObj;
      },
      limit(n) {
        results = results.slice(0, n);
        return queryObj;
      },
      then(resolve, reject) {
        return Promise.resolve(results).then(resolve, reject);
      },
      catch(reject) {
        return Promise.resolve(results).catch(reject);
      },
    };

    return queryObj;
  },
};

export const LocalTransaction = {
  async create(txDoc) {
    const data = readData();
    const now = new Date().toISOString();
    const newTx = {
      _id: generateId(),
      ...txDoc,
      status: txDoc.status || 'pending',
      createdAt: now,
      updatedAt: now,
    };
    data.transactions.push(newTx);
    writeData(data);
    return wrapTransaction(newTx);
  },

  find(filter = {}) {
    const data = readData();
    let results = data.transactions.filter((t) => matchesFilter(t, filter)).map(wrapTransaction);

    const queryObj = {
      sort(sortOpt) {
        if (sortOpt && sortOpt.createdAt === -1) {
          results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
        return queryObj;
      },
      limit(n) {
        results = results.slice(0, n);
        return queryObj;
      },
      then(resolve, reject) {
        return Promise.resolve(results).then(resolve, reject);
      },
      catch(reject) {
        return Promise.resolve(results).catch(reject);
      },
    };

    return queryObj;
  },

  async countDocuments(filter = {}) {
    const data = readData();
    return data.transactions.filter((t) => matchesFilter(t, filter)).length;
  },
};
