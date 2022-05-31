import { client } from "../database.js";

const tableName = 'user'

async function fetchAllUsers() {
   const result = await client.query(`SELECT * FROM "${tableName}"`);
   return result.rows;
}

async function fetchOneUser(id){
   const result = await client.query(`SELECT * FROM "${tableName}" WHERE id = $1`, [id])
   return result.rows[0]
}

async function createUser(username, email, password){
   await client.query(`INSERT INTO "${tableName}" ("username", "email", "password") 
   VALUES ($1, $2, $3)`, [username,email,password]);
}

export { fetchAllUsers, fetchOneUser, createUser };
