import mongoose from 'mongoose';

const Users = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    required: [true, 'Please provide a userId']
  },
  userType: {
    type: String,
    required: [true, 'Please provide a userType']
  },
  fname: {
    type: String,
    required: [true, 'Please provide a first name.'],
  },
  lname: {
    type: String,
    required: [true, 'Please provide a last name'],
  },
  email: {
      type: String,
      required: [true, 'Please provide an email']
  },
  password: {
      type: String,
      required: [true, 'Please provide a password']
  }
})

export default mongoose.models.Users || mongoose.model('Users', Users)
