import dotenv from "dotenv"
import express from "express"
import cookieParser from "cookie-parser"
import { login, logout, refresh, registration,getRate,updateRate } from "./services/signin.js"
import cors from "cors"
import bodyParser from "body-parser"

dotenv.config()
const app = express()

app.use(cookieParser())
app.use(cors())
app.use(bodyParser.json())

app.post("/rate", (req, res) => {
    const {accessToken} = req.body
    const {refreshToken} = req.body
    try {
        const data = getRate(accessToken, refreshToken)
        res.send(JSON.stringify(data))
    } catch(e) {
        res.status(401)
        res.send("<h1>Error</h1>")
    }  
})

app.post("/save", (req,res) => {
    const {accessToken} = req.body
    const {id} = req.body
    const {rate} = req.body
    try {
        updateRate(rate, id, accessToken)
        res.send("Good")
    } catch(e) {
        res.status(401)
        res.send("Error")
    }
    
})
app.post("/signin", (req, res) => {
    const name = req.body.name
    const password  = req.body.password
    try {
        const data = login(name, password) 
        
        res.send(JSON.stringify(data))
    } catch(e) {
        res.status(401)
        res.send("<h1>Error</h1>")
    }
    
})

app.post("/signup", (req, res) => {
    const name = req.body.name
    const password  = req.body.password
    try {
        const data = registration(name, password)
        res.send(JSON.stringify(data))
    } catch(e) {
        res.status(401)
        res.send(`<h1>${e}</h1>`)
    }
})

app.post("/refresh" , (req, res) => {
    const {refreshToken} = req.body
    try {
        const data = refresh(refreshToken)
        res.cookie("refreshToken", data.refreshToken)
        res.send(JSON.stringify(data))
    } catch(e) {
        res.status(401)
        res.send(`<h1>${e}</h1>`)
    }
})
app.post("/logout", (req , res) => {
    const {refreshToken} = req.body
    console.log(refreshToken)
    try {
        const data = logout(refreshToken)
        res.clearCookie("refreshToken")
        res.send("Good")
    } catch(e) {
        res.status(500)
        res.send(`<h1>${e}</h1>`)
    }
})
app.listen(process.env.PORT, ()=> console.log("ddd"))
