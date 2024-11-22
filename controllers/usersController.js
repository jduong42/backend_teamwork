const bcrypt = require('bcrypt');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToDatabase() {
    if (!client.topology || !client.topology.isConnected()) {
        await client.connect();
    }
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

    res.render('login', { title: 'Login', error: 'Invalid email or password' });
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
};

exports.showCreateUserPage = (req, res) => {
    res.render('createUser', { title: 'Create User', success_msg: req.flash('success_msg'), error_msg: req.flash('error_msg') });
};

exports.createUser = async (req, res) => {
    const { email, password } = req.body;
    const db = await connectToDatabase();
    const existingUser = await db.collection('users').findOne({ email });
  
    if (existingUser) {
      req.flash('error_msg', 'User already exists');
      return res.render('createUser', { title: 'Create User', success_msg: req.flash('success_msg'), error_msg: req.flash('error_msg') });
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.collection('users').insertOne({ email, password: hashedPassword });
    req.flash('success_msg', 'User created successfully');
    return res.render('createUser', { title: 'Create User', success_msg: req.flash('success_msg'), error_msg: req.flash('error_msg') });
  };

exports.registerUser = async (req, res) => {
    const { email, password } = req.body;
    const db = await connectToDatabase();
    const existingUser = await db.collection('users').findOne({ email });

    if (existingUser) {
        req.flash('error_msg', 'User already exists');
    return res.status(400).send('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.collection('users').insertOne({ email, password: hashedPassword });
    req.flash('success_msg', 'User registered successfully');
    res.status(201).send('User registered successfully');
};