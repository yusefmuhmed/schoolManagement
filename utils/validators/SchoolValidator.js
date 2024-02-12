// eslint-disable-next-line no-unused-vars
const slugify = require('slugify');
const { check } = require('express-validator');
const validatorMiddleware = require('../../middleware/validatorMiddleware');

// SchoolValidator
exports.createSchoolValidator = [
  check('schoolName')
    .notEmpty()
    .withMessage('school name required')
    .isLength({ min: 3 })
    .withMessage('Too short User name'),


  validatorMiddleware,
];


exports.deleteSchoolValidator = [
  check('id').isMongoId().withMessage('Invalid Admin id format'),

  validatorMiddleware,
];
exports.getSearchValidator = [
  check('id').isMongoId().withMessage('Invalid Search id format'),
  validatorMiddleware,
];
