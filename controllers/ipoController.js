import pool from "../server.js";


export const getAllIPOs = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM ipos ORDER BY id ASC");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const addIPO = async (req, res) => {
  const { name, date, price, status } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO ipos (name, date, price, status) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, date, price, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateIPO = async (req, res) => {
  console.log("PUT Request Body:", req.body); 

  const { id } = req.params;
  const { name, date, price, status } = req.body;

  try {
    const result = await pool.query(
      "UPDATE ipos SET name=$1, date=$2, price=$3, status=$4 WHERE id=$5 RETURNING *",
      [name, date, price, status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "IPO not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteIPO = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM ipos WHERE id=$1", [id]);
    res.json({ message: "IPO deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
