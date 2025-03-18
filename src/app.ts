import express, { Express, Request, Response } from "express";
import moderationRoutes from "./api/v1/routes/moderationRoutes";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();

// Middleware
app.use(express.json());
app.use(cors());  // This will be configured in Ticket #4
app.use(helmet());

// Routes
app.use("/api/v1/moderation", moderationRoutes);

// Default error handler for unmatched routes
app.use((req: Request, res: Response): void => {
	res.status(404).json({ message: "Endpoint not found" });
});

export default app;
