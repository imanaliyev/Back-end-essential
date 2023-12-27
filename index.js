import mongoose, { Schema } from "mongoose";
import express, { json } from "express";
import "dotenv/config";

const app = express();
const port = process.env.PORT;

app.use(express.json());

const usersSchema = new Schema({
  name: String,
  age: Number,
  Email: String,
  Password: String,
  isMarried: Boolean
});
const usersModel = mongoose.model("myUsers", usersSchema);

app.get("/", async (req, res) => {
  try {
    const user = await usersModel.find({});
    res.status(200).json(user);
  } catch (error) {
    res, send("");
  }
});

app.get('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await usersModel.findById(id);
  res.send(user);
});

app.post("/", async (req, res) => {
  const { name, age, Email, Password,isMarried } = req.body;
  const newUser = new usersModel({ name, age, Email, Password,isMarried });
  await newUser.save();
  res.send("Got a Post request");
});

app.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, age, Email, Password,isMarried } = req.body;
  const user = await usersModel.findByIdAndUpdate(id,{ name, age, Email, Password,isMarried });
  res.send(user);
});

app.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await usersModel.findByIdAndDelete(id);
  res.send(user);
});

mongoose
  .connect(process.env.DB_SECRET_KEY)
  .then(() => console.log("Connected!"))
  .catch((err) => console.log(err.message));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
