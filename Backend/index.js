import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import vendorRoutes from './routes/vendorRoutes.js'

dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/kartmatch", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log(" MongoDB connected"))
    .catch((err) => console.error(" MongoDB connection error:", err));

// Routes
app.use("/api", vendorRoutes);

app.get("/", (req, res) => {
    res.send(" Kart Match API is running...");
});

app.listen(PORT, () => {
    console.log(` Server running at http://localhost:${PORT}`);
});
