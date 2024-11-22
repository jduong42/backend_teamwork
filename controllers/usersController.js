const bcrypt = require('bcrypt');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
  if (!client.isConnected()) await client.connect();
  return client.db('test');
}

exports.showLoginPage = (req, res) => {
  if (req.session.user) {
    return res.redirect('/');
  }
  res.render('login', { title: 'Login', error: null });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const db = await connectToDatabase();
  const user = await db.collection('users').findOne({ email });

  if (user && await bcrypt.compare(password, user.password)) {
    req.session.user = user;
    return res.redirect('/');
  }

  res.render('login', { error: 'Invalid email or password' });
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

exports.showCreateUserPage = (req, res) => {
  res.render('createUser', { title: 'Create User', error: null });
};

exports.createUser = async (req, res) => {
  const { email, password } = req.body;
  const db = await connectToDatabase();
  const existingUser = await db.collection('users').findOne({ email });

  if (existingUser) {
    return res.render('createUser', { error: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.collection('users').insertOne({ email, password: hashedPassword });
  res.redirect('/login');
};