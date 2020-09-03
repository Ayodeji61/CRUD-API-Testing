const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// Load Input Validation
const validateRegisterInput = require('../validation/register');

// Load User model
const User = require('../models/User');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

// Task 1 - Create User
// @route   POST users
// @desc    Create user
// @access  Public
router.post('/', (req, res) => {
	const { errors, isValid } = validateRegisterInput(req.body);

	// Check Validation
	if (!isValid) {
		return res.status(400).json(errors);
	}

	User.findOne({ id: req.body.id }).then((user) => {
		if (user) {
			errors.id = 'User already exists';
			return res.status(400).json(errors);
		} else {
			const newUser = new User({
				id: req.body.id,
				firstname: req.body.firstname,
				lastname: req.body.lastname,
				gender: req.body.gender,
				date_of_birth: req.body.date_of_birth
			});

			newUser.save().then((user) => res.status(200).json(user)).catch((err) => console.log(err));
		}
	});
});

// Task 2 - Select All Users
// @route   Get All users
// @desc    Show All Users
// @access  Public
router.get('/', (req, res) => {
	User.find()
		.then((users) => res.json(users))
		.catch((err) => res.status(404).json({ nousersfound: 'No users found' }));
});

// Task 3
// @route   GET user/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', (req, res) => {
	User.find({ id: req.params.id })
		.then((user) => res.json(user))
		.catch((err) => res.status(404).json({ nouserfound: 'No user found with that username' }));
});

// Task 4
// @route   PUT user/:id
// @desc    Update user
// @access  Public
router.put('/:id', (req, res) => {
	let id = req.params.id;
	var data = {
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		gender: req.body.gender,
		date_of_birth: req.body.date_of_birth
	};

	// save the user
	User.findByIdAndUpdate(id, data, (err, user) => {
		if (err) throw err;

		res.send('Successfully! User Updated');
	});
});

// Task 5
// @route   DELETE user/:id
// @access  Public
router.delete('/:id', (req, res) => {
	console.log(req.params.id);
	let id = req.params.id;
	User.remove(
		{
			_id: id
		},
		(err) => {
			if (err) res.send(err);
			else res.send('Successfully! User has been Deleted.');
		}
	);
});

module.exports = router;
