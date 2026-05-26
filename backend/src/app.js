import express from "express"
import authRoutes from "./routes/auth.routes.js"
import {pool} from "./db/db.js"
import {authMiddleware} from "./middleware/auth.middleware.js"
import cors from 'cors';

const app = express()

app.use(cors())
app.use(express.json())

pool.connect()
 .then(() => console.log("DB connected"))
 .catch(err => console.log(err))

app.use("/api/auth", authRoutes)

app.get("/", (req, res) => {
   res.send("Server running")
})

app.listen(3000, () => {
   console.log("Server started")
})

app.get("/profile", authMiddleware, (req, res) => {
   res.json({
      message: "Protected profile route",
      user: req.user
   })
})