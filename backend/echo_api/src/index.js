import express, { json, urlencoded } from "express";
import cors from "cors";
import router from "./echo.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1/", router);

app.listen(PORT, () => {
  console.log(`[API] Server is running 🚀`);
});
