import express from 'express'
import * as dotenv from 'dotenv'

dotenv.config()
const port = process.env.PORT || 3000

export const server = express()

export const startServer = ()=> {
    server.listen(port, () => {
        console.log(`SERVER IS STARTING IN PORT: ${port}`)
    })
}