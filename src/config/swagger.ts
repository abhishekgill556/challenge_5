import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Content Moderation API",
            version: "1.0.0",
            description: "API for content moderation, post flagging, and user management",
        },
        servers: [
            {
                url: "http://localhost:3000/api/v1",
                description: "Local development server",
            },
        ],
    },
    apis: ["./src/api/v1/routes/*.ts"], // Scans for JSDoc comments
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export function setupSwagger(app: Express): void {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}
