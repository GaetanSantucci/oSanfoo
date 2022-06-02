import { _500, _401 } from "./errorController.js";
import { fetchAllUsers, fetchOneUser, fetchUserByName, fetchUserByEmail,createUser } from "../data/datamapper.js";

import bcrypt from "bcrypt";
import emailValidator from "email-validator";
import passwordValidator from "password-validator";
const schema = new passwordValidator();
//Add properties
schema.is().min(6);
// Minimum length 6
// Blacklist these values
/* .is().max(100) // Maximum length 100
.has().uppercase(1) // Must have uppercase letters
.has().lowercase(1) // Must have lowercase letters
.has().digits(2) // Must have at least 2 digits
.has().symbols(1) // Must have at least 1 symbol
.has().not().spaces() // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']) */

//controller
async function getAllUsers(req, res) {
   try {
      const users = await fetchAllUsers();
      res.json(users);
   } catch (err) {
      res.status(500).json(err);
   }
}

async function getOneUser(req, res) {
   try {
      const user = await fetchOneUser(+req.params.id);
      res.json(user);
   } catch (err) {
      res.status(500).json(err);
   }
}

async function createNewUser(req, res) {
   try {
      const { username, email, password, passwordConfirm, role_id } = req.body;
      console.log("req.body: ", req.body);

      //~if user already exist
      const userExist = await fetchUserByName(username);
      const emailExist = await fetchUserByEmail(email);

      //~ conditions to test if all it's ok
      if (userExist) return _401(req, res).json("User already exist !");
      if (emailExist) return _401(req, res).json("Email already exist !");
      if (!emailValidator.validate(email)) return res.json(`${email} is not a valid email !`);
      if (password !== passwordConfirm) return res.json("Not the same password !");
      if (!schema.validate(password)) return res.json(`Password must have 6 characters minimum`);

      //~ hash password with bcrypt
      const encryptedPwd = await bcrypt.hash(password, 10);
      console.log("encryptedPwd: ", encryptedPwd);

      //~ create user
      await createUser({
         ...req.body,
         password: encryptedPwd,
      });

      res.json(`L'utilisateur ${username} a bien ete ajoute`)
   } catch (err) {
      res.status(500).json(err);
   }
}

export { getAllUsers, getOneUser, createNewUser };
