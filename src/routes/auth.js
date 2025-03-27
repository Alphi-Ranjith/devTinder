const express = require("express");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    // VALIDATION OF DATA
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;
    // ENCRYPT THE PASSWORD
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    // CREATING A NEW INSTANCE OF THE USER MODEL
    await user.save();
    res.send("User Added successfully!");
  } catch (error) {
    res.status(400).send("SIGNUP ERROR: " + error.message);
  }
});

module.exports = authRouter;
