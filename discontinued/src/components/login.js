var crypto = require("crypto");

// render the login page
var getLogin = function (req, res) {
    if (req.session.username) {
        res.redirect('/home');
    } else {
        res.render('login.html', {error: null});
    }
}

// checks if users' login credentials are correct
var checkLogin = function (req, res, io) {
	var username = req.body.username;
	var password = crypto.createHash("Sha256").update(req.body.password).digest('hex'); // encrypts the password
	
	validateUser(username, password, function (err, data) {
		if (data) {
			req.session.username = username;	
			res.redirect('/home');
		} else {
			res.render('login.ejs', { error: err });
		}
	});
}

import {
    validateUser
} from './database.js'

export {
    getLogin,
    checkLogin
}