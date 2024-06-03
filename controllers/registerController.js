const User = require('../model/User')
const bcrypt = require("bcrypt");


const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }
  // check for duplicate usernames in the db
  const duplicate = await User.findOne({username: user}).exec()


  if (duplicate) return res.status(409).json({"message": "Username Exists"}); // conflict
  try {
    //encrypt password
    const hashpwd = await bcrypt.hash(pwd, 10)
    //create store the new user
    const result =  await User.create({
        "username": user, 
      "password": hashpwd})

      console.log(result)
   
    // console.log(userDB.users)
    res.status(201).json({"success" : `New user ${user} created`})

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {handleNewUser}
