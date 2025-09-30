import User from "../model/user.model.js";

const signUp = async (req, res) => {
    try{
        const { fullname, email, password, mobile, role } = req.body;
        const user= await User.findOne({ email });
        if(user){
            return res.status(400).json({ message: "User already exists" });
        }
    }catch(err){

    }
}