import bcrypt from "bcrypt"
import { pool } from "../db/db.js";
import {generateToken} from "../utils/generateToken.js"

export const signup = async(req, res) => {

   const {email, password} = req.body

   console.log(email);
   console.log(password);
   
   if (!email || !password) {
    return res.status(400).json({
      message: "All fields required"
    })
   }

   if (!email.includes("@")) {
    return res.status(400).json({
      message: "Invalid email"
    })
   }

   if (password.length < 8) {
    return res.status(400).json({
      message: "Password must be at least 8 characters"
    })
   }

   try{

    const hashedPassword = await
    bcrypt.hash(password, 10)

    const existingUser = await pool.query(
      "SELECT*FROM users WHERE email = $1",
      [email]
    )

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        message: "User Already Exists"
      })
    }

    await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2)",
      [email, hashedPassword]
    )

    res.status(201).json({
      message: "User created successfully"
    })
   } catch(error) {
    console.log(error);

    res.status(500).json({
      message: "Server error"
    })
   }
}

export const login = async (req, res) => {
  const {email, password} = req.body || {}

  if (!email || !password) {
    return res.status(400).json({
      message: "All fields required"
    })
  }

  try {
    const user = await pool.query(
      "SELECT*FROM users WHERE email = $1",
      [email]
    )

    if (user.rows.length === 0) {
      return res.status(400).json({
        message: "User not found"
      })
    }

    const validPassword = await bcrypt.compare(password, 
      user.rows[0].password
    )

    if (!validPassword) {
      return res.status(400).json({
        message: "Invalid Credentials"
      })
    }

    const token = generateToken(user.rows[0])

      res.status(200).json({
        message: "Login successful",
        token
      })
    } catch(error){
      console.log(error)

      res.status(500).json({
        message: "Server error"
      })
    }
  }


export const getMe = async (req, res) => {
  
  try {

    const user = await pool.query(
      "SELECT id, email, created_at FROM users WHERE id = $1",
      [req.user.id]
    )

    res.status(200).json({
      user: user.rows[0]
    })

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error"
    })
  }
}