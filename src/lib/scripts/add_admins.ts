"use server"
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

const addAdmin = async () => {
  const [ email, password, name ] = ['ADD YOUR EMAIL', 'ADD YOUR PASSWORD', 'ADD YOUR NAME'];
  try {
    await connectDB();
    const userFound = await User.findOne({ email });
    if(userFound){
      console.log('Email already exists!')
      return
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    // const savedUser = await user.save();
    await user.save();
    console.log('Admin added successfully!')

  }catch(e){
    console.log(e);
  }
}

addAdmin();