import { client } from "../database.js";

const tableName = "user";

async function fetchAllUsers() {
   const result = await client.query(`SELECT * FROM "${tableName}"`);
   return result.rows;
}

async function fetchOneUser(id) {
   const result = await client.query(`SELECT * FROM "${tableName}" WHERE id = $1`, [id]);
   return result.rows[0];
}

async function fetchUserByName(username) {
   const result = await client.query(`SELECT * FROM "${tableName}" WHERE username = $1`, [username]);
   return result.rows[0];
}

async function fetchUserByEmail(email) {
   const result = await client.query(`SELECT * FROM "${tableName}" WHERE email = $1`, [email]);
   return result.rows[0];
}

async function createUser(userData) {
   const { username, email, password, role_id } = userData;

   const result = await client.query(
      `INSERT INTO "${tableName}" ("username", "email", "password", "role_id")
      VALUES ($1, $2, $3, $4)`,
      [username, email, password, role_id],
   );

   return result.rowCount;
   // const { username, email, password, role_id } = userData;

   // const query = {
   //    text: `
   //       INSERT INTO "${tableName}"
   //       ("username", "email", "password", "role_id")
   //       VALUES
   //       ($1, $2, $3, $4);`,
   //    values: [username, email, password, role_id],
   // };

   // const result = await client.query(query);

   // return result.rowCount;
}

export { fetchAllUsers, fetchOneUser, fetchUserByName, fetchUserByEmail, createUser };
