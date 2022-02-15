

const {body} = require('express-validator');

const validateTweets = ()=>([
    body("title")
    .not()
    .isEmpty()
    .withMessage("Title should not be empty!")
    .isLength({min: 3})
    .withMessage("Title should at least have 3 characters!")
    .isString()
    .withMessage("Title should be a string!")
    ,
 body("body")
   .not().isEmpty().withMessage("Body should not be empty!")
   .isLength({min: 1})
   .withMessage("Body should at least have 1 characters!")
   .isString().withMessage("Body should be a string"),
body("tags")
   .not().isEmpty().withMessage("Tags should not be empty!")
   .isArray().withMessage("Tags should be array"),
body("user_id")
   .not().isEmpty().withMessage("User_ID should not be empty!")
   .isLength({min: 1})
   .withMessage("User_ID should be atleast have 1 characters!")
   .isString().withMessage("User_ID should be in String!")
  ]
)

module.exports = validateTweets;
