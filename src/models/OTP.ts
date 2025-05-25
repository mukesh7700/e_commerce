import mongoose, { Schema, Document } from 'mongoose';

export interface OTP extends Document {
  email: string;
  code: string;
  expiresAt: Date;
}

const otpSchema = new Schema<OTP>({
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/.+\@.+\..+/, 'Please enter a valid email'],
  },
  code: {
    type: String,
    required: [true, 'OTP code is required'],
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

const OTPModel = (mongoose.models.OTP as mongoose.Model<OTP>) || mongoose.model<OTP>('OTP', otpSchema);

export default OTPModel;
