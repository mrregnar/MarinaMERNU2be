import {useState, useEffect} from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [items, setItems] = useState([
  {
    itemName: '',
    itemSize: '',
    itemQuantity: ''
  }
])

 const [item, setItem] = useState(
  {
    itemName: '',
    itemSize: '',
    itemQuantity: ''
  }
 )

 
 useEffect(() => {
   fetch('/items').then(response => {
     if(response.ok) {
       return response.json()
      }
    }).then(jsonRes => setItems(jsonRes))
  })
  
  function handleChange(e) {
    const {name, value} = e.target
    setItem(prevInput => {
      return (
        {
          ...prevInput,
          [name]: value
        }
      )
    })
  }

  function addItem(e) {
    e.preventDefault()
    alert('item added')
    const newItem = {
      itemName: item.itemName,
      itemSize: item.itemSize,
      itemQuantity: item.itemQuantity
    }
  axios.post('/newitem', newItem)
}

function deleteItem(id) {
  axios.delete('/delete/' + id)
  alert('item deleted')
}


  return (
    <div className="App">
      <h1>FoodGrid Application</h1>
      <h2>Add Item</h2>
        <form>
          <label htmlFor="itemName">Name</label>
          <input onChange={handleChange} name="itemName" placeholder="item name" value={item.itemName} type="text"></input>
          <label htmlFor="itemSize">Size</label>
          <input onChange={handleChange} name="itemSize" placeholder="item size"value={item.itemSize} type="text"></input>
          <label htmlFor="itemQuantity">Quantity</label>
          <input onChange={handleChange} name="itemQuantity" placeholder="item quantity" value={item.itemQuantity} type="number"></input>
          <br /> <button onClick={addItem}>ADD ITEM</button>
          <br /> <br /> <br />
          <h2>Delete Posted Items</h2>
        </form>

      {items.map(item => {
        return (
          <div>
            <h1>{item.itemName}</h1>
            <p>{item.itemSize}</p>
            <p>{item.itemQuantity}</p>
            <button onClick={() => deleteItem(item._id)}>DELETE ITEM</button>
          </div>
        )
      })}
    </div>
  )
}

export default App;
