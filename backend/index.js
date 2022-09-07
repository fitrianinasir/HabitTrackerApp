import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import Routes from './routes/Routes.js'

const app = express()

app.listen(5000, () => console.log("Server up and running..."))
mongoose.connect('mongodb://localhost:27017/mernstack_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', (open) => console.log('Database connected...'))

app.use(cors())
app.use(express.json())
app.use(Routes)


