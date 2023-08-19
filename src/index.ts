import express from "express";
import userRoutes from "./routes/userRoutes";
import rolRoutes from "./routes/rolRoutes";
import issueRoutes from "./routes/issueRoutes";
import hourxhourRoutes from "./routes/hourxhourRoutes";
import dotenv from "dotenv";
import { Response } from "express";
const app = express();
app.use(express.json());
const PORT = 4000; //change port if you want

dotenv.config();
//Routing
app.use("/api/usuarios", userRoutes);
app.use("/api/roles", rolRoutes);
app.use("/api/hourxhour", hourxhourRoutes);
app.use("/api/issues", issueRoutes);

app.get("/ping", (_req, res: Response) => {
  //req.body = "pong";
  res.send("pong");
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
