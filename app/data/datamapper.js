import { client } from "../database.js";

async function fetchAllUsers() {
   const query = 'SELECT * FROM "user"';
   const result = await client.query(query);
   console.log("result: ", result.rows);
}

export { fetchAllUsers };
