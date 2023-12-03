const database = require("../../database");

const getUsers = (req, res) => {
  let query = "SELECT * FROM users";
  let queryParams = [];
  let conditions = [];

  if (req.query.language) {
    conditions.push("language = ?");
    queryParams.push(req.query.language);
  }

  if (req.query.city) {
    conditions.push("city = ?");
    queryParams.push(req.query.city);
  }

  if (conditions.length) {
    query += " WHERE " + conditions.join(" AND ");
  }
  database
    .query(query, queryParams)
    .then(([users]) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from users where id = ?", [id])
    .then(([users]) => {
    if (users[0] != null) {
    res.json(users[0]);
  } else {
    res.status(404).send("Not Found");
  }
})
    .catch((err) => {
    console.error(err);
    res.sendStatus(500);
    });
};

const postUser = (req, res) => {
  const { firstname, lastname, email, city, language } = req.body;

  database
    .query(
      "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
      [firstname, lastname, email, city, language]
    )
    .then(([result]) => {
    res.status(201).send({ id:result.insertId});   
   })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getUsers,
  getUserById,
  postUser,
};