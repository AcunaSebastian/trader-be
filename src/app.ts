import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { AppRoutes } from "./core/presentation/routes";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(AppRoutes.routes);
// app.use("/v1/api/purchase-orders", poRouter);
// app.use("/v1/api/auth", authRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
