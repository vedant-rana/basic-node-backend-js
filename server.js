import { app } from "./app.js";
import dotenv from "dotenv";
import { connectToMongoDB } from "./src/config/connectToMongoDB.js";

dotenv.config();

connectToMongoDB(process.env.MONGODB_URI);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
