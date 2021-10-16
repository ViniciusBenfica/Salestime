import "reflect-metadata"
import express from "express"
import { createConnection } from "typeorm";
import cors from "cors"

import routes from "./routes"

const app = express()

app.use(express.json())
app.use(cors())
app.use(routes)

createConnection()

app.listen(3000)