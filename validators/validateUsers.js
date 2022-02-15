
const {body} = require('express-validator');

const validateUsers = ()=>([
    body("username")
    .not()
    .isEmpty()
    .withMessage("Username should not be empty!")
    .isLength({min: 3})
    .withMessage("Usename should at least have 3 characters!")
    .isString()
    .withMessage("Username should be a string!")
    ,
 body("email")
   .not().isEmpty().withMessage("Email should not be empty!")
   .isLength({min: 10})
   .withMessage("Email should at least have 10 characters!")
   .isString().withMessage("Email should be a string")
  ]
)

module.exports = validateUsers;

// body("id")
// .not().isEmpty().withMessage("ID should not be empty!")
// .isNumeric().withMessage("ID should be a number!")