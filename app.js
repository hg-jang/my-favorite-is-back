const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const morgan = require("morgan");

const app = express();

dotenv.config();

const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const postsRouter = require("./routes/posts");

const db = require("./models");
db.sequelize.sync()
  .then(() => {
    console.log("DB 연결 성공...");
  })
  .catch(console.error);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 이미지 경로
app.use('/', express.static(path.join(__dirname, 'images')));

app.use(morgan("dev"));
app.use(cors({
  origin: "*",
  // credentials: true,
}));

// connections test
app.get("/", (req, res) => {
  res.send("hello from my-favorite-is");
});

// routers
app.use("/api/user", userRouter);
app.use('/api/post', postRouter);
app.use('/api/posts', postsRouter);

app.listen(80, () => {
  console.log("나의최애는 server is running on port=80");
});