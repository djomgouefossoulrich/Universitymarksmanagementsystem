const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authorizeRoles } = require('../middleware/authMiddleware');

// Register/Login
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected example
router.get('/admin-dashboard', authorizeRoles('admin'), (req, res) => {
  res.json({ message: 'Welcome admin!' });
});

router.get('/student-dashboard', authorizeRoles('student'), (req, res) => {
  res.json({ message: 'Welcome student!' });
});

router.get('/faculty-dashboard', authorizeRoles('faculty'), (req, res) => {
  res.json({ message: 'Welcome faculty!' });
});

router.get('/HOD-dashboard', authorizeRoles('HOD'), (req, res) => {
  res.json({ message: 'Welcome HOD!' });
});

router.get('/examcontroller-dashboard', authorizeRoles('examcontroller'), (req, res) => {
  res.json({ message: 'Welcome examcontroller!' });
});

router.get('/parent-dashboard', authorizeRoles('parent'), (req, res) => {
  res.json({ message: 'Welcome parent!' });
});

module.exports = router;
