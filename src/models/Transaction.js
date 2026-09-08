import mongoose from 'mongoose';
import { LocalTransaction } from '@/lib/local-store';

const TransactionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    type: { 
      type: String, 
      enum: ['data', 'airtime', 'tv', 'electricity', 'exam_pin', 'wallet_funding'], 
      required: true 
    },
    reference: { type: String, required: true, unique: true },
    serviceName: { type: String, required: true },
    networkOrProvider: { type: String },
    recipient: { type: String },
    amount: { type: Number, required: true },
    costPrice: { type: Number, default: 0 },
    profit: { type: Number, default: 0 },
    paymentMethod: { type: String, enum: ['wallet', 'paystack_direct', 'admin'], default: 'wallet' },
    customerEmail: { type: String },
    customerPhone: { type: String },
    previousBalance: { type: Number, default: 0 },
    newBalance: { type: Number, default: 0 },
    status: { type: String, enum: ['success', 'pending', 'failed'], default: 'pending' },
    details: { type: Object, default: {} },
  },
  { timestamps: true }
);

const MongooseTransaction = mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);

const Transaction = new Proxy(MongooseTransaction, {
  get(target, prop, receiver) {
    if (global.isLocalDb || mongoose.connection.readyState !== 1) {
      if (prop in LocalTransaction) {
        return LocalTransaction[prop];
      }
    }
    const val = Reflect.get(target, prop, receiver);
    return typeof val === 'function' ? val.bind(target) : val;
  },
});

export default Transaction;
