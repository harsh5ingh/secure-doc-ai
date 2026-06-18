import express from "express"
import path from "path";
import authRoutes from "./routes/auth.routes.js"
import {pool} from "./db/db.js"
import {authMiddleware} from "./middleware/auth.middleware.js"
import cors from 'cors';
import aiRoutes from "./routes/ai.routes.js";

const app = express()

app.use(cors())
app.use(express.json())

pool.connect()
 .then(() => console.log("DB connected"))
 .catch(err => console.log(err))

app.use("/api/auth", authRoutes)
app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
   res.send("Server running")
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
   console.log(`Server started on ${PORT}`);
});

app.use("/uploads", express.static("uploads"));

app.get("/profile", authMiddleware, (req, res) => {
   res.json({
      message: "Protected profile route",
      user: req.user
   })
})