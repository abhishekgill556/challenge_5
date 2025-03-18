import express, { Express, Request, Response } from "express";
import moderationRoutes from "./api/v1/routes/moderationRoutes";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { setupSwagger } from "./config/swagger"; 

dotenv.config();

const app: Express = express();

// Middleware
app.use(express.json());

// CORS Configuration (Ticket #4)
const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(",") : ["http://localhost:3001"];
const corsOptions = {
    origin: (origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("CORS policy: This origin is not allowed"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
};


app.use(cors(corsOptions));

app.use(helmet());

// Setup Swagger API Documentation (Ticket #1)
setupSwagger(app);

// Routes
app.use("/api/v1/moderation", moderationRoutes);

// Default error handler for unmatched routes
app.use((req: Request, res: Response): void => {
    res.status(404).json({ message: "Endpoint not found" });
});

export default app;
