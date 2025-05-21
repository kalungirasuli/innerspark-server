const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const User = require('./models/user');
const bcrypt = require('bcryptjs');

// Initialize Express app
const app = express();

// Middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(async () => {
    console.log('MongoDB Connected');
    await createDefaultAdmin();
  })
  .catch(err => {
    console.error('MongoDB Connection Error:', err.message);
    process.exit(1);
  });

// Define Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/therapists', require('./routes/api/therapists'));
app.use('/api/appointments', require('./routes/api/appointments'));
app.use('/api/messages', require('./routes/api/messages'));
app.use('/api/groups', require('./routes/api/groups'));
app.use('/api/support-tickets', require('./routes/api/supportTickets'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Define PORT
const PORT = process.env.PORT || 5000;

// Function to create default admin user
const createDefaultAdmin = async () => {
  try {
    const adminEmail = 'superadmin@mail.com';
    let adminUser = await User.findOne({ email: adminEmail });

    if (!adminUser) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('superadminpassword', salt);

      adminUser = new User({
        name: 'Super Admin',
        email: adminEmail,
        password: hashedPassword,
        isAdmin: true,
        status: 'active' // Set admin as active by default
      });
      await adminUser.save();
      console.log('Default admin user created successfully.');
    } else {
      // console.log('Default admin user already exists.');
    }
  } catch (error) {
    console.error('Error creating default admin user:', error.message);
  }
};

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));