import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { 
      type: String, 
      enum: ['data', 'airtime', 'tv', 'electricity', 'exam_pin', 'wallet_funding'], 
      required: true 
    },
    reference: { type: String, required: true, unique: true },
    serviceName: { type: String, required: true }, // e.g. "MTN SME 1GB", "DSTV Compact", "IKEDC Prepaid"
    networkOrProvider: { type: String }, // e.g. "MTN", "AIRTEL", "DSTV", "IKEDC"
    recipient: { type: String }, // Phone number, Smartcard number, or Meter number
    amount: { type: Number, required: true },
    previousBalance: { type: Number, required: true },
    newBalance: { type: Number, required: true },
    status: { type: String, enum: ['success', 'pending', 'failed'], default: 'pending' },
    details: { type: Object, default: {} }, // API response data, PIN codes, meter token
  },
  { timestamps: true }
);

export default mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);
