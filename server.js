const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose')

const mongoDBURL = 'mongodb://localhost/FoodSharer'

const PORT = 3001

app.use(bodyParser.json())
app.use(cors())

mongoose.connect(mongoDBURL,  { useNewUrlParser: true, useUnifiedTopology: true  })

const itemSchema = {
    itemName: String,
    itemSize: String,
    itemQuantity: Number
}

const Item = mongoose.model('Item', itemSchema)

app.get('/', (request, response) => {
    response.send('Express is in the house Woot Woot')
})

app.get('/items', (request, response) => {
    Item.find().then(items => response.json(items))
})

app.post('/newitem', (request, response) => {

    const itemName = request.body.itemName;
    const itemSize = request.body.itemSize;
    const itemQuantity = request.body.itemQuantity

    const newItem = new Item({
        itemName,
        itemSize,
        itemQuantity
    })

    newItem.save()
})

app.delete('/delete/:id', (request, response) => {
    const id = request.params.id
    Item.findByIdAndDelete({_id: id}, function(err){
        if(!err) {
            console.log('item deleted')
        } else {
            console.log(err)
        }
    })
})

app.listen (PORT, function() {
    console.log(`Express is running and listening on port: ${PORT}`)
})

