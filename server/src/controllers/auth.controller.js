import User from '../models/user.model.js';
import { generateToken } from '../utils/jwt.js';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ name, email, password });
    await user.save();

    const token = generateToken(user._id);

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const googleLogin = async (req, res) => {
  try {
    const { tokenId } = req.body;

    if (!tokenId) {
      return res.status(400).json({ message: 'Token is required' });
    }

    let name, email, picture, googleId;

    try {
      // Try verifying as ID Token first
      const ticket = await client.verifyIdToken({
        idToken: tokenId,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      name = payload.name;
      email = payload.email;
      picture = payload.picture;
      googleId = payload.sub;
    } catch (idTokenError) {
      // If ID token verification fails, try as Access Token by fetching user info
      try {
        const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenId}`);
        const data = await response.json();

        if (data.email) {
          name = data.name;
          email = data.email;
          picture = data.picture;
          googleId = data.sub;
        } else {
          throw new Error('Invalid token');
        }
      } catch (accessTokenError) {
        console.error('Token verification failed:', idTokenError, accessTokenError);
        return res.status(400).json({ message: 'Invalid Google token' });
      }
    }

    let user = await User.findOne({ email });

    if (!user) {
      // Create new user if they don't exist
      // Since it's Google login, we can generate a random password or leave it blank if the model allows
      // For this project, let's generate a random password just in case it's required
      const randomPassword = Math.random().toString(36).slice(-10) + Math.random().toString(36).slice(-10);
      user = new User({
        name,
        email,
        password: randomPassword,
        avatar: picture,
        googleId
      });
      await user.save();
    }

    const token = generateToken(user._id);

    res.json({
      message: 'Google login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json({ message: 'Google authentication failed' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};