import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/User.js";

// CREATE
export const registerUser = async (req, res) => {
    try {
        const {email, password, name} = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({message: "All fields are required"});
        }
        const hashPass = await bcrypt.hash(password, 12);

        const user = new User({
            email,
            name,
            password: hashPass,
        });

        await user.save();
       res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
    } catch(err) {
        console.log("Error creating user:", err);
        res.status(500).json({success: false, message: "Failed to create user"});
    }
}

// LOGIN

export const loginUser = async(req, res) => {
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});

        if(!user) {
            return res.status(404).json({success: false, message: "User not found"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({success: false, messgae: "Invalid Password"});
        }

        const token = jwt.sign(
            {
                id: user._id,  
                email: user.email,
            },
            process.env.JWT_SECRET || "secret123keynon",
            {expiresIn: "9h"}
        );
        res.status(200).json({success: true, message: "Login SuccessFully", token});
    } catch(err) {
        console.error("Error during login:", err);
        res.status(500).json({success: false, message: "Falied"})
    }
}

// Get logged in User profile 

export const getUsersProfile = async (req, res) => {
    try {
        const user = await User.findById(user.id).select("-password");

        if(!user) {
            return res.status(404).json({message: "User not found"});
    } 
    res.json({success: true, user});
  } catch (err) {
    res.status(500).json({message: "Server error"});
  }
};

// Update user profile

export const updateUsersProfile = async (req, res) => {
  try {
    const updates = req.body;

    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 12);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true }
    ).select("-password");

    res.json({
      success: true,
      message: "Profile updated",
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

// DELETE USER
export const deleteUsersProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, message: "User deleted", user });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
