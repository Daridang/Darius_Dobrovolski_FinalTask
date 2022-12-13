import mongoose from 'mongoose'
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  token: {
    type: String
  }
}, {
  timestamps: true
});

export default mongoose.model('Users', UserSchema);
