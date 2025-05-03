// generate-hash.js
const bcrypt = require('bcrypt');

const passwords = {
  admin1: 'admin123',
  student1: 'student123',
  faculty1: 'faculty123',
  hod1: 'hod123',
  exam1: 'exam123',
  parent1: 'parent123'
};

for (const [username, plainTextPassword] of Object.entries(passwords)) {
  bcrypt.hash(plainTextPassword, 10).then(hash => {
    console.log(`${username}: ${hash}`);
  });
}
