import { _500 } from "./errorController.js";
import { fetchAllUsers, fetchOneUser, createUser } from '../data/datamapper.js'

async function getAllUsers(req, res) {
   try {
      const users = await fetchAllUsers();
      res.json(users)
   } catch (err) {
      res.status(500).json(err);
   }
}

async function getOneUser(req,res){
   try {
      const user = await fetchOneUser(req.params.id)
      res.json(user)
   } catch (err) {
      res.status(500).json(err);
   }
}

async function createNewUser(req, res){
   try {
      const { username, email, password } = req.body
      console.log(req.body);
      
      await createUser.add(username, email, password)
      // res.json(`L'utilisateur ${req.body.username} a bien ete ajoute`)
   } catch (err) {
      res.status(500).json(err);
   }
}

export { getAllUsers, getOneUser, createNewUser };
