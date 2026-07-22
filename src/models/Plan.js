import mongoose from 'mongoose';

const PlanSchema = new mongoose.Schema(
  {
    category: { 
      type: String, 
      enum: ['data', 'airtime', 'tv', 'electricity', 'exam_pin'], 
      required: true 
    },
    network: { type: String }, // MTN, AIRTEL, GLO, 9MOBILE, WAEC, NECO, etc.
    planType: { type: String }, // SME, CG, CG_LITE, Direct, Awoof, Datacard
    name: { type: String, required: true }, // e.g. "1GB (SME)"
    price: { type: Number, required: true },
    validity: { type: String, default: '30days' },
    apiPlanId: { type: String },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.models.Plan || mongoose.model('Plan', PlanSchema);
