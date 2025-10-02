import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import gentoken from "../utils/token.js";


export const signUp = async (req, res) => {
    try{
        const { fullname, email, password, mobile, role } = req.body;
        let user= await User.findOne({ email });
        if(user){
            return res.status(400).json({ message: "User already exists" });
        }
        if(password.length < 6){
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }
        if(mobile.length < 10){
            return res.status(400).json({ message: "Mobile number must be at least 10 characters" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = await User.create({ fullname, email, password: hashedPassword, mobile, role });
        
        const token= await gentoken(user._id);
        res.cookie("token", token, {
            secure: false,
            samesite:"strict",
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            httpOnly: true
        });

        return res.status(201).json( user);

    }catch(error){
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const signIn = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = await gentoken(user._id);
        res.cookie("token", token, {
            secure: false,
            samesite:"strict",
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            httpOnly: true
        });

        return res.status(200).json( user);

    }catch(error){
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


export const signOut = async (req, res) => {
    try{
        res.clearCookie("token");
        return res.status(200).json({ message: "Signed out successfully" });
    }catch(error){
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}