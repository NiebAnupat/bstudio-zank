import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";


const port = 4000;

const app = express();
dotenv.config();



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
