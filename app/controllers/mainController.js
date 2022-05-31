import { _500 } from "./errorController.js";
import { fetchAllUsers } from '../data/datamapper.js'

async function displayHomepage(req, res) {
   try {
      const users = await fetchAllUsers();
      res.json(users)
   } catch (err) {
      res.status(500).json(err);
   }
}

export { displayHomepage };
