import jwt from "jsonwebtoken";

const gentoken = async (userId) => {
    try{
        const token = await jwt.sign({userId}, process.env.JWT_SECRET, { expiresIn: '1d' });
        return token;

    }catch(error){
        console.error(error);
    }
}

export default gentoken;