const {constants, msg} = require('../../config/constants');
const {isEmail} = require('validator');


module.exports = {
    user: {
        register(req, res, next) {
            let {username, email, password, repeatPassword} = req.body;

            let user = {
                errors: [],
            };

            if (username.trim().length === 0 || username.trim().length < constants.USERNAME_MIN_LENGTH) {
                user.errors.push(msg.USERNAME_MIN_LENGTH);
            } else {
                user.username = username.trim();
            }

            if (!constants.USERNAME_REGEX.test(username)) {
                user.errors.push(msg.USERNAME_ONLY_ALPHABETICAL);
                user.username = undefined;
            }

            if (!isEmail(email)) {
                user.errors.push(msg.EMAIL_IS_INVALID);
            } else {
                user.email = email;
            }

            if (password.trim().length === 0 || password.trim().length < constants.PASSWORD_MIN_LENGTH) {
                user.errors.push(msg.PASSWORD_MIN_LENGTH);
            }

            if (password !== repeatPassword) {
                user.errors.push(msg.CONFIRMATION_PASSWORD_ERROR);
            }

            if (!constants.PASSWORD_REGEX.test(password)) {
                user.errors.push(msg.PASSWORD_ONLY_ALPHABETICAL);
            }

            if (!user.errors.length) {
                next();
                return;
            }
            res.render('users/register', {...user, message: user.errors.shift()});

        },
        login(req, res, next) {
            let {username, password} = req.body;

            let user = {
                errors: [],
            };

            if (username.trim().length === 0 || username.trim().length < constants.USERNAME_MIN_LENGTH) {
                user.errors.push(msg.USERNAME_MIN_LENGTH);
            } else {
                user.username = username.trim();
            }

            if (!constants.USERNAME_REGEX.test(username)) {
                user.errors.push(msg.USERNAME_ONLY_ALPHABETICAL);
                user.username = undefined;
            }

            if (password.trim().length === 0 || password.trim().length < constants.PASSWORD_MIN_LENGTH) {
                user.errors.push(msg.PASSWORD_MIN_LENGTH);
            }

            if (!constants.PASSWORD_REGEX.test(password)) {
                user.errors.push(msg.PASSWORD_ONLY_ALPHABETICAL);
            }

            if (!user.errors.length) {
                next();
                return;
            }
            res.render('users/login', {...user, message: user.errors.shift()})
        },
    }
}