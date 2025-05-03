const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth'); // we'll create this next
const path = require('path');


// Serve static HTML files from "public" folder
app.use(express.static(path.join(__dirname, 'public')));


app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes); // POST /api/login

app.get('/', (req, res) => {
    res.send('✅ API is working!');
  });
  
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
