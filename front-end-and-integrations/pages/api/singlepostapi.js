import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  try {
    const {id} = req.body
    const query = 'SELECT * FROM ultimumbnbblog WHERE id=$1';
    const values = [id];

    // Use sql.query() to execute the SQL query and fetch the data
    const data = await sql.query(query, values);

    res.status(200).json(data.rows); // Extract rows from the data object
    console.log(data.rows); // Log the rows to the console
  } catch (error) {
    console.error('Error retrieving data from PostgreSQL:', error);
    res.status(500).json({ error: 'Error retrieving data from PostgreSQL' });
  }
}


