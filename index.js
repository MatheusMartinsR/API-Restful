const express = require('express')
const mongoose = require('mongoose')
const app = express()



app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(express.json())

const personRoutes = require('./routes/personRoutes')
app.use('/person', personRoutes)



app.get('/', (req, res) => {
    res.json({message: 'ola express!'})
})


mongoose.connect('mongodb+srv://<username>:<password>@cluster0.zq8g3mn.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log("Conectado ao banco de dados")
    app.listen(3000)
})
.catch((err) => console.log(err))


app.listen(3001)
