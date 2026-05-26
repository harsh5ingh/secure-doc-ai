import express from "express"
import authRoutes from "./routes/auth.routes.js"
import {pool} from "./db/db.js"


const app = express()

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