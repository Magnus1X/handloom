import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/user.model.js';

dotenv.config();

const ADMIN_EMAIL = 'admin@gmail.com';
const ADMIN_PASSWORD = 'admin@1234';
const ADMIN_NAME = 'Admin';

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    let admin = await User.findOne({ email: ADMIN_EMAIL });

    if (admin) {
      // Update existing user to be admin
      admin.isAdmin = true;
      // Force password update
      admin.password = await bcrypt.hash(ADMIN_PASSWORD, 12);
      // Use direct save with modified flag workaround
      await User.updateOne(
        { email: ADMIN_EMAIL },
        { $set: { isAdmin: true, password: admin.password } }
      );
      console.log('✅ Existing user updated to admin:', ADMIN_EMAIL);
    } else {
      // Create brand new admin user
      const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);
      admin = new User({
        name: ADMIN_NAME,
        email: ADMIN_EMAIL,
        password: hashedPassword,
        isAdmin: true
      });
      // Skip the pre-save hook since we already hashed
      await User.collection.insertOne({
        name: ADMIN_NAME,
        email: ADMIN_EMAIL,
        password: hashedPassword,
        isAdmin: true,
        addresses: [],
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log('✅ Admin user created:', ADMIN_EMAIL);
    }

    console.log('🎉 Admin seeding complete!');
    console.log('   Email   :', ADMIN_EMAIL);
    console.log('   Password:', ADMIN_PASSWORD);
    process.exit(0);
  } catch (err) {
    console.error('Error seeding admin:', err);
    process.exit(1);
  }
}

seedAdmin();
