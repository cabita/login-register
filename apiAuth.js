'use strict'
/*·············
	middlewares
·············*/
const AuthService = require('../middlewares/auth');
const dateFormat = require('../middlewares/dateFormat');
const encrypt = require('../middlewares/encrypt');
/*·············
	MODELS
·············*/
const authors = require('../models/insertAdmin');
const controller = {};

/**
 * @function register
 * @desc Receive all params necessary to register a new user.
 * @desc All parameters should be came in object {Object}
 * @param  {String} req.body.username Username to sign in
 * @param  {String} req.body.fullname To show in dashboard
 * @param  {String} req.body.password Password to sign in
 * @param  {String} req.body.email To send news, recoveries and verifications
 * @param  {Object} res OBject response
 */

controller.register = async (req, res) => {
	var data = req.body;
	if (data.username == undefined || data.username == "" ||
		data.fullname == undefined || data.fullname == "" ||
		data.password == undefined || data.password == "" ||
		data.email == undefined || data.email == "") {
        res.status(200).send({
            success: false,
            message: 'Missing parameters, try again'
        });
	}
	else{
		let newAuthor = new authors();
			newAuthor.email = data.email;
			newAuthor.username = data.username;
			newAuthor.password = await encrypt.encryptPassword(data.password);
			newAuthor.fullname = data.fullname;
			newAuthor.sign_up_date = dateFormat(new Date());
			newAuthor.save((err, author)=>{
				if (err) {
					res.status(200).send({
					    success: false,
					    message: 'Error to save author data',
					    err: err
					});
				}
				else{
					res.status(200).send({
					    success: true,
					    message: 'Author data saved',
					    data: author
					});
				}
			});
	}
}

/**
 * @function login
 * @desc Receive a username and password, decrypt it and return token with user data
 * @param  {Object} req Object to request
 * @param  {Object} res OBject response 
 */

controller.login = async (req, res) => {
	var data = req.body;
	if (data.username == undefined || data.username == "" || data.password == undefined || data.password == "") {
        res.status(200).send({
            success: false,
            message: 'Missing parameters, try again'
        });
    }
	else{
		let user = {
	        username: data.username
	    };
	    const user_in = await authors.findOne(user);
	    if (!user_in) {
	        res.status(200).send({
	            success: false,
	            message: 'The author does not exist'
	        });
	    }
	    else{
			user_in.comparePassword(data.password, (err, isMatch) => {
				if (isMatch) {
				    user = user_in;

				    let authToken = AuthService.createToken(user);
				    if (authToken) {
					    res.status(200).send({
					        success: true,
					        message: 'Logged in successfully',
					        token: authToken,
					        user: {
					            username: user.username,
								password: user.password,
					            email: user.email,
					            fullname: user.fullname,
								date_of_birth: user.date_of_birth
					        }
					    });
				    }
				    else{
					    res.status(400).send({
					        success: false,
					        message: 'Session error'
					    });
				    }
				}
				else{
					res.status(400).send({
					    success: false,
					    message: 'error password'
					});
				}
			});
	    }
	}
}


module.exports = controller;