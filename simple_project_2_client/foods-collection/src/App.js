import { useEffect, useState } from 'react'
import Foods from './components/Foods';
import './App.css';

const App = () => {
  const [foods, setFoods] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(()=>{

    fetch('http://localhost:5000/foods/information')
    .then(res => res.json())
    .then(data => setFoods(data));

  },[])

  const foodInformation = (e) => {
    e.preventDefault()

    const form = e.target

    const name = form.name.value
    const email = form.email.value
    const quantity = form.quantity.value

    const data = { name, email, quantity }

    fetch('http://localhost:5000/foods/information', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((mess) => {
        console.log(mess)
        setMessage(mess.message)
        setFoods(mess.result1)
      })

    form.reset()
  }
  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Foods Information Center</h2>
      <form onSubmit={foodInformation}>
        <input type="text" name="name" placeholder="Food Name" required />
        <br />
        <br />
        <input type="email" name="email" placeholder="your email" required />
        <br />
        <br />
        <input
          type="number"
          name="quantity"
          placeholder="Enter quantity"
          required
        />
        <br />
        <br />
        <button type="submit">Add Food Details</button>
      </form>
      <h5>{message}</h5>
      <h2>Total foods: {foods.length}</h2>
      <section className='foods-container'>
        
         
         {
          foods.map(food => <Foods food={food} key={food._id}></Foods>)
         }
      </section>
    </div>
  )
}

export default App
