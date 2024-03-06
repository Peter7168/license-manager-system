const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path'); // Add this line

const app = express();
const PORT = 3000;

// Middleware to parse JSON in the request body
app.use(bodyParser.json());

// Serve HTML files
app.use(express.static('public'));

// Path to the JSON file
const usersFilePath = path.join(__dirname, 'users.json');

// Endpoint for user signup
app.post('/signup', (req, res) => {
  const { firstname, lastname, email } = req.body;

  // Read existing users from JSON file
  let users = [];
  try {
    const data = fs.readFileSync(usersFilePath, 'utf-8');
    users = JSON.parse(data);
  } catch (error) {
    console.error('Error reading users file:', error);
  }

  // Check if the email is already registered
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'Email already registered' });
  }

  // Add the new user to the array
  const newUser = { firstname, lastname, email };
  users.push(newUser);

  // Save the updated user array to the JSON file
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

  res.json({ message: 'User registered successfully' });
});

// Endpoint for user signin
app.post('/signin', (req, res) => {
  const { email } = req.body;

  // Read existing users from JSON file
  let users = [];
  try {
    const data = fs.readFileSync(usersFilePath, 'utf-8');
    users = JSON.parse(data);
  } catch (error) {
    console.error('Error reading users file:', error);
  }
// Endpoint for user signup
app.post('/signup', (req, res) => {
    const { firstname, lastname, email } = req.body;
    // ... rest of the signup logic ...
  });
  
  // Endpoint for user signin
  app.post('/signin', (req, res) => {
    const { email } = req.body;
    // ... rest of the signin logic ...
  });
  
  // Check if the email exists
  const existingUser = users.find((user) => user.email === email);
  if (!existingUser) {
    return res.status(401).json({ message: 'Email not found' });
  }

  res.json({ message: 'Signin successful' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
