import "dotenv/config";
import logger from "./utils/logger";
import { connectDB } from "./infrastructure/config/db";
import { app } from "./infrastructure/config/app";
import { GenerateToken } from "./infrastructure/services/jwt";


const port = process.env.PORT || 4000;



app.listen(port, () => {
    logger.info(`Server running at http://localhost:${port}`);
    
    connectDB()
        .then(() => logger.info("Database connected successfully"))
        .catch((error) => logger.error("Database connection error:", error));
});
