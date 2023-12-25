const express = require('express')
const app = express()
const port = 3000
const data =
    [
        {
          "id": 2,
          "description": "Sweet and savory sauces relishes spreads and seasonings",
          "name": "Condiments"
        },
        {
          "id": 1,
          "description": "Soft drinks coffees teas beers and ales",
          "name": "Beverages"
        },
        {
          "id": 3,
          "description": "Desserts candies and sweet breads",
          "name": "Confections"
        },
        {
          "id": 4,
          "description": "Cheeses",
          "name": "Dairy Products"
        },
        {
          "id": 5,
          "description": "Breads crackers pasta and cereal",
          "name": "Grains/Cereals"
        },
        {
          "id": 6,
          "description": "Prepared meats",
          "name": "Meat/Poultry"
        },
        {
          "id": 7,
          "description": "Dried fruit and bean curd",
          "name": "Produce"
        },
        {
          "id": 8,
          "description": "Seaweed and fish",
          "name": "Seafood"
        }
      ]
app.use(express.json())

let counter = 1000

app.get('/', (req, res) => {

  
    res.send(data)
  })

app.get('/:id', (req, res) => {
    const {id} = req.params
    const result = data.find(x=> x.id === +id)
  res.send(result)
})



app.post('/', (req, res) => {
    const {name,age}  = req.body
    counter++
    data.push({name , age , id: +counter})
    res.send(data)
  })
  app.delete('/:id', (req, res) => {
    const {id} = req.params
    data.filter(x=> x.id !== +id)
    res.send(data)
  })
  app.put('/:id', (req, res) => {
    const {id} = req.params
    const {name,age}  = req.body
    const index = data.findIndex(x=> x.id === +id)
    data[index] = {id ,name , age}
    res.send("tut geldi")

    res.send(data)
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})