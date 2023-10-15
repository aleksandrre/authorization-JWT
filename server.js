import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
dotenv.config();
const app = express();
app.use(express.json());
const posts = [
  {
    username: "aleksandre",
    title: "developer",
  },
  {
    username: "tamar",
    title: "dealer",
  },
];
app.get("/post", authenticateToken, (req, res) => {
  res.json(posts.filter((post) => post.username === req.user.name));
});

function authenticateToken(req, res, next) {
  const autherHeader = req.headers["authorization"];
  const token = autherHeader && autherHeader.split(" ")[1];
  if (token == null) return res.sendStatus(330);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(331);
    req.user = user;

    next();
  });
}
app.listen(3000, () => console.log("app is listening on 3000 port"));
