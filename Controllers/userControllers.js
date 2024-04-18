const userDB = require("../Models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodeMailer = require("nodemailer");

const userCreateData = async (req, res) => {
  try {
    const { firstname, lastname, userid, email, password } = req.body;

    const userExist = await userDB.findOne({ email });
    if (userExist) {
      return res.send({ message: "User already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = new userDB({
      firstname,
      lastname,
      userid,
      email,
      password: hashedPassword,
    });

    await userData.save();

    res.json({
      success: true,
      message: "User created successfully",
      data: userData,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Failed to create user",
      success: false,
    });
  }
};
const loginChecking = async (req, res) => {
  try {
    const user = await userDB.findOne({ userid: req.body.userid });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User doesn't exist", success: false });
    }
    const passwordMatching = bcrypt.compare(req.body.password, user.password);
    if (!passwordMatching) {
      return res
        .status(200)
        .send({ message: "Password doesn't match", success: false });
    } else {
      const token = jwt.sign({ id: user._id }, "log", { expiresIn: "1d" });
      return res
        .status(200)
        .send({ message: "Login successful", success: true, data: token });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to login", success: false, error });
  }
};
const contactData = async (req, res) => {
  try {
    const { username, emailid, message } = req.body;
    const createData = new userDB({ username, emailid, message });
    await createData.save();
    await sendMailToUser(username, emailid, message);
    res.json({
      success:true,
      message: "message sent successfully",
      data: createData,
    });
  } catch (error) {
    console.log("Error",error)
    res
      .status(500)
      .send({ message: "Data not sended properly", success: false, error });
  }
};
const sendMailToUser = async (username, emailid, message) => {
  try {
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: "yugandhardeveloper@gmail.com",
        pass: "xcms leoa dyol rxsy",
      },
    });
    const mailOption = {
      from: emailid,
      to: "yugandhardeveloper@gmail.com",
      subject: "New Enquiry",
      html: `
    <h1>New Enquiry</h1>
    <p>Name:${username}</p>
    <p>Email:${emailid}</p>
    <p>Message:${message}</p>
    `,
    };
    await transporter.sendMail(mailOption);
    res.json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "failed to send message", error });
  }
};
module.exports = { userCreateData, loginChecking, contactData };
