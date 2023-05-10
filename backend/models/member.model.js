import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  membershipStartDate: {
    type: Date,
    required: true,
  },
  membershipEndDate: {
    type: Date,
    required: true,
  },
});

const Member = mongoose.model('Member', memberSchema);

export default Member;
