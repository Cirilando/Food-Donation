const express = require("express");
const {userCreateData,loginChecking, contactData} = require("../Controllers/userControllers");
const router = express.Router();
router.post("/post", userCreateData);
router.post("/login",loginChecking);
router.post("/contact",contactData)

module.exports = router;
