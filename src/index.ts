import express from "express";
const app = express();
app.use(express.json());
const PORT = 4000; //change port if you want

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
