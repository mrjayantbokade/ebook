import app from "./src/app";
import { configuration } from "./src/config/config";
import dbConnect from "./src/db/dbConnect";




const startServer = async () => {

    const PORT = configuration.PORT;
    await dbConnect().then(() => {
        console.log("Database connected successfully");
        app.listen(PORT, () => {
            console.log(`Server is running on port https://localhost:${PORT}`);
        });

    });
};

startServer();
