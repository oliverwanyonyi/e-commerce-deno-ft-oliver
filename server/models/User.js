const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: [true, "please enter a password"],
      minLength: [6, "Password should be 6 characters or longer"],
      maxLength: [14, "Password should be atmost 14 characters"],
    },
  },
  { timeStamps: true }
);

// password hash
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const genSalt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, genSalt);
});

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
