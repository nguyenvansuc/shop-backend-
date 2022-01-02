import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    rules: {
        type: String,
        required: true,
        default:'user'
    }
  },

  { collection: 'users' }
);

// encrypt the password using 'bcryptjs'
// Mongoose -> Document Middleware
userSchema.pre('save', async function (next) {
  // check the password if it is modified
  if (!this.isModified('password')) {
    return next();
  }
  // Hashing the password
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  next();
});
userSchema.methods.correctPassword = async function (
  passwordCanSee,
  passwordInDatabase
) {
   const result = await bcrypt.compare(passwordCanSee, passwordInDatabase);
//    console.log(result,'check');
  return await bcrypt.compare(passwordCanSee, passwordInDatabase);
};

const UserModel = mongoose.model('User', userSchema);
export default UserModel;
