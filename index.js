import mongoose, { Schema } from "mongoose";
import express, { json } from "express";
import "dotenv/config";

const app = express();
const port = process.env.PORT;

app.use(express.json());

const productSchema = new Schema({
  name: String,
  price: Number,
  thumbNail: String,
  category: String,
});
const productModel = mongoose.model("myProducts", productSchema);

app.get("/", async (req, res) => {
  try {
    const product = await productModel.find({});
    res.status(200).json(product);
  } catch (error) {
    res, send("");
  }
});

app.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await productModel.findById(id);
  res.send(product);
});

app.post("/", async (req, res) => {
  const { name, price, thumbNail, category } = req.body;
  const newProduct = new productModel({ name, price, thumbNail, category });
  await newProduct.save();
  res.send("Got a Post request");
});

app.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, thumbNail, category } = req.body;
  const product = await productModel.findByIdAndUpdate(id,{ name, price, thumbNail, category });
  res.send(product);
});

app.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await productModel.findByIdAndDelete(id);
  res.send(product);
});

mongoose
  .connect(process.env.DB_SECRET_KEY)
  .then(() => console.log("Connected!"))
  .catch((err) => console.log(err.message));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
