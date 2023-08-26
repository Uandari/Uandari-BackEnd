import express from "express";
import userRoutes from "./routes/userRoutes";
import roleRoutes from "./routes/roleRoutes";
import issueRoutes from "./routes/issueRoutes";
import hourxhourRoutes from "./routes/hourxhourRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import typeCategoryRoutes from "./routes/typeCategoryRoutes";
import escalatedIssueRoutes from "./routes/escalatedIssueRoutes";
import dotenv from "dotenv";
import { Response } from "express";
const app = express();
app.use(express.json());
const PORT = 4000; //change port if you want

dotenv.config();
//Routing
app.use("/api/usuarios", userRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/hourxhour", hourxhourRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/typecategory", typeCategoryRoutes);
app.use("/api/escalatedissues", escalatedIssueRoutes);

app.get("/ping", (_req, res: Response) => {
  //req.body = "pong";
  res.send("pong");
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
