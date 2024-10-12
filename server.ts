import app from "./src/app";


const PORT = process.env.PORT || 3000;

const startServer = async () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port https://localhost:${PORT}`);
    });
};

startServer();
