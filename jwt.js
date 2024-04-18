const mongoose=require('mongoose')
const userModel=require('../Model/userModel');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRegPost=async(req,res)=>{
     try{
        console.log("test");
        const { username, email, password } = req.body
        const userExist = await userModel.findOne({email});
        console.log(userExist);
        if(userExist){
            return res.send({message:"user already exist",success:false})
        }
        const hashPassword = await  bcrypt.hash(password,10)
        const newuser = new  userModel({
            username,
            email,
            password:hashPassword
        });
        await newuser.save();
         // Send success response
         return res.status(201).json({
            data: newuser,
            message: "User created successfully.",
            success: true
        });
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error in user registration:", error);

        // Send error response
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
            error: error.message // Send error message in the response for debugging
        });
    }
};
const login = async (req, res) => {
    try {
      const user = await userModel.findOne({ email: req.body.email });
      if (!user) {
        return res
          .status(200)
          .send({ message: `user doesn't exist`, success: false });
      }
      const isPasswordMatch = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordMatch) {
        return res
          .status(200)
          .send({ message: `Password doesn't match`, success: false });
      } else {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
  
        return res
          .status(200)
          .send({ message: "login successfull", success: true, data: token });
      }
    }
    catch (error) {
        console.log(error);
        res
          .status(500)
          .send({ message: "Failed to login ", success: false, error });
      }
}
const getUserInfo = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.password = "";
    if (!user) {
      return res
        .status(200)
        .send({ message: `user doesn't exist `, success: false });
    } else {
      return res
        .status(200)
        .send({ success: true, data: {
          username:user.username,
          email:user.email,
        } });
    }
  } catch (error) {
    res
      .status(401)
      .send({ message: "failed to get user info", success: false, error });
  }
};

module.exports={userRegPost,login,getUserInfo}