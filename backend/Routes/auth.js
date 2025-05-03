// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'umms',
  password: 'papillon',
  port: 5433,
});

const SECRET = 'mysecretkey'; // Use env variable in production

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

  if (result.rows.length === 0) {
    return res.status(401).json({ message: 'User not found' });
  }

  const user = result.rows[0];
  const valid = await bcrypt.compare(password, user.password_hash);

  if (!valid) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  const token = jwt.sign({ userId: user.user_id, role: user.role }, SECRET, { expiresIn: '1h' });

  res.json({ token, role: user.role });
});

module.exports = router;
