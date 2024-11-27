import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import poRouter from "./shared/routes/purchase-orders.route";
import authRouter from "./shared/routes/auth.route";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/v1/api/purchase-orders", poRouter);
app.use("/v1/api/auth", authRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
