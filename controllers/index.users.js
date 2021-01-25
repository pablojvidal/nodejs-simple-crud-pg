const { Pool } = require("pg");
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "Momonga666",
  database: "simplecrud",
  port: "5432",
});

const insertUser = async (req, res) => {
  try {
    const insert =
      "INSERT INTO users(firstname, lastname, email, username, pass) VALUES($1, $2, $3, $4, $5)";
    const { firstname, lastname, email, username, password } = req.body;
    console.log(firstname, lastname, email, username, password);
    const response = await pool.query(insert, [
      firstname,
      lastname,
      email,
      username,
      password,
    ]);
    console.log(response);
    res.status(200).render("pages/insert", { inserted: "OK", error: null });
  } catch (error) {
    res.status(500).render("pages/insert", { inserted: null, error: "500" });
  }
};

const getUsers = async (req, res) => {
  const response = await pool.query("SELECT * FROM users");
  console.log("listando");
  res.render("pages/list", {
    table: response.rows,
  });
};

const getUsersByID = async (req, res) => {
  const id = req.body.id;
  console.log("User ID ", id);
  const response = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  console.log(response.rows);
  if (response.rowCount == 0) {
    res.render("pages/listbyid", {
      table: response.rows,
      found: "notfound",
    });
  } else {
    res.render("pages/listbyid", {
      table: response.rows,
      found: "found",
    });
  }
};

const deleteUserByID = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const response = await pool.query("DELETE FROM users WHERE id = $1", [id]);
    console.log(response);
    res.status(200).send(`USer ${id} deleted correctly`);
  } catch (error) {
    console.log(error);
  }
};

const updateUserByID = async (req, res) => {
  try {
    const id = req.body.iduser;

    const updateUser = "UPDATE users SET username = $1, pass= $2 WHERE id = $3";
    const values = [req.body.username, req.body.password, id];
    console.log(values);
    const response = await pool.query(updateUser, values);
    console.log(response);
    res.status(200).render("pages/update", { inserted: "OK", error: null });
  } catch (error) {
    res.status(500).render("pages/update", { inserted: null, error: "500" });
  }
};

module.exports = {
  getUsers,
  insertUser,
  getUsersByID,
  deleteUserByID,
  updateUserByID,
};
