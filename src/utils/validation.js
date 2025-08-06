const validator = require("validator");

const validateSignUpdata = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("email is not valid");
    //   } else if (!validator.isStrongPassword(password)) {
    //     throw new Error("please enter strong password");
  }
};

const ValidateProfileEdit = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "gender",
    "skills",
    "photoUrl",
  ];
  //we will loop through this req  body
  const isEditAllowed = Object.keys(req.body).every(field=>allowedEditFields.includes(field));

  return isEditAllowed;
};

module.exports = { validateSignUpdata, ValidateProfileEdit };
