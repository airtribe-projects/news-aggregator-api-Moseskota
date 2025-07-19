const {body} = require('express-validator');


const ValidateUserRegister = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email address required'),
    body('password').isLength({min: 6}).withMessage('Password must be atleast 6 characters long'),
    body('preferences').optional().isArray().withMessage('User preferences must be an array')
];

const ValidateUserlogin = [
    body('email').isEmail().withMessage('Valid email address required'),
    //since we have already checked the password compatibility in the registration , we do not need to check the length again
    body('password').notEmpty().withMessage('Password is required')
]


module.exports = {ValidateUserRegister, ValidateUserlogin};


