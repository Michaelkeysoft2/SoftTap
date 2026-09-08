import mongoose from 'mongoose';
import { LocalUser } from '@/lib/local-store';

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female', 'other'], default: 'male' },
    referralCode: { type: String, unique: true },
    referredBy: { type: String, default: null },
    walletBalance: { type: Number, default: 0.0 },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    isVerified: { type: Boolean, default: true },
    virtualAccount: {
      accountNumber: { type: String, default: null },
      bankName: { type: String, default: null },
      accountName: { type: String, default: null },
    },
  },
  { timestamps: true }
);

const MongooseUser = mongoose.models.User || mongoose.model('User', UserSchema);

const User = new Proxy(MongooseUser, {
  get(target, prop, receiver) {
    if (global.isLocalDb || mongoose.connection.readyState !== 1) {
      if (prop in LocalUser) {
        return LocalUser[prop];
      }
    }
    const val = Reflect.get(target, prop, receiver);
    return typeof val === 'function' ? val.bind(target) : val;
  },
});

export default User;
