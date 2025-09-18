const mongoose = require('mongoose');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const contactSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'firstName is required'],
      trim: true,
      minlength: [2, 'firstName must be at least 2 characters'],
      maxlength: [100, 'firstName must be at most 100 characters']
    },
    lastName: {
      type: String,
      required: [true, 'lastName is required'],
      trim: true,
      minlength: [2, 'lastName must be at least 2 characters'],
      maxlength: [100, 'lastName must be at most 100 characters']
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      trim: true,
      lowercase: true,
      match: [emailRegex, 'email must be a valid email address'],
      unique: true,
      index: true
    },
    favoriteColor: {
      type: String,
      required: [true, 'favoriteColor is required'],
      trim: true,
      minlength: [1, 'favoriteColor cannot be empty'],
      maxlength: [50, 'favoriteColor must be at most 50 characters']
    },
    birthday: {
      type: Date,
      required: [true, 'birthday is required'],
      validate: {
        validator: function (v) {
          if (!v) return false;
          const d = new Date(v);
          if (isNaN(d.getTime())) return false;
          const now = new Date();
          return d <= now; // birthday cannot be in the future
        },
        message: 'birthday must be a valid date not in the future'
      }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contact', contactSchema);
