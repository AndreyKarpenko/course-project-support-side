const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

let emailLengthChecker = (email) => {
    if(!email){
        return false;
    }else{
        if(email.length < 5){
            return false;
        }else {
            return true;
        }
    }
}

// Validate Function to check if valid e-mail format
let validEmailChecker = (email) => {
  // Check if e-mail exists
  if (!email) {
    return false; // Return error
  } else {
    // Regular expression to test for a valid e-mail
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regExp.test(email); // Return regular expression test results (true or false)
  }
};
const emailValidators = [
  {
    validator: emailLengthChecker
  },
  {
    validator: validEmailChecker
  }
];

// Validate Function to check username length
let nameLengthChecker = (name) => {
  // Check if name exists
  if (!name) {
    return false; // Return error
  } else {
    // Check length of name string
    if (name.length < 3 || name.length > 30) {
      return false; // Return error if does not meet length requirement
    } else {
      return true; // Return as valid name
    }
  }
};

// Validate Function to check if valid username format
let validname = (name) => {
  // Check if name exists
  if (!name) {
    return false; // Return error
  } else {
    // Regular expression to test if name format is valid
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    return regExp.test(name); // Return regular expression test result (true or false)
  }
};

// Array of name validators
const nameValidators = [
  // First name validator
  {
    validator: nameLengthChecker
  },
  // Second name validator
  {
    validator: validname
  }
];

// Validate Function to check password length
let passwordLengthChecker = (password) => {
  // Check if password exists
  if (!password) {
    return false; // Return error
  } else {
    // Check password length
    if (password.length < 8 || password.length > 30) {
      return false; // Return error if password length requirement is not met
    } else {
      return true; // Return password as valid
    }
  }
};

// Array of Password validators
const passwordValidators = [
  // First password validator
  {
    validator: passwordLengthChecker
  }
];

const Customer = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: emailValidators
  },
  password: {
    type: String,
    required: true,
    validate: passwordValidators
  },
  token: {
    type: String,
    unique: true,
    sparse: true
  },
  name: {
    type: String,
    required: true,
    validate: nameValidators
  },
  isActive: {
    type: Boolean,
    required: true,
    default: false
  },
  payments: {
    endDate: Number
  }
});

module.exports = mongoose.model('customer', Customer);
