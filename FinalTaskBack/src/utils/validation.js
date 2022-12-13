import { body, check } from 'express-validator'

export const registerValidator = [
  check("email")
    .isEmail()
    .withMessage("Invalid email"),
  check("name")
    .isLength({ min: 3 })
    .withMessage("Name must have minimum length of 3")
    .trim(),

  check("password")
    .isLength({ min: 8, max: 15 })
    .withMessage("Password should have min and max length between 8-15")
    .matches(/\d/)
    .withMessage("Password should have at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password should have at least one sepcial character"),

  check("repeatPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      console.log(req.body.password, req.body.confirmPassword);
      throw new Error("confirm password does not match");
    }
    return true;
  }),
]