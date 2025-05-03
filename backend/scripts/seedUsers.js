const bcrypt = require('bcrypt');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'umms', // or 'umms' if you created that
  password: 'papillon',
  port: 5433,
});

async function seed() {
  const adminHash = await bcrypt.hash('admin123', 10);
  const studentHash = await bcrypt.hash('student123', 10);
  const facultyHash = await bcrypt.hash('faculty123', 10);
  const hodHash = await bcrypt.hash('hod123', 10);
  const examcontrollerHash = await bcrypt.hash('examcontroller123', 10);
  const parentHash = await bcrypt.hash('parent123', 10);


  await pool.query(`
    INSERT INTO users (username, password_hash, email, role)
    VALUES 
    ('admin', $1, 'admin@gmail.com', 'Admin'),
    ('student', $2, 'student@gmail.com', 'Student'),
    ('faculty', $3, 'faculty@gmail.com', 'faculty'),
    ('hod', $4, 'hod@gmail.com', 'hod'),
    ('examcontroller', $5, 'examcontroller@gmail.com', 'examcontroller'),
    ('parent', $6, 'parent@gmail.com', 'parent');

  `, [adminHash, studentHash]);

  console.log('✅ Users seeded');
  pool.end();
}

seed().catch(console.error);
