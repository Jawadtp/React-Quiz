const express= require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(express.json({limit: '10mb', extended: true}))
app.use(express.urlencoded({limit: '10mb', extended: true}))

app.use(cors())

app.get('/', (req, res) => 
{
    res.send({'hello': "there"})
})

app.listen(process.env.PORT || 5000, function(){console.log('Server running on PORT 5000')})




