import React, { useEffect, useState } from "react";
import axios from "axios";


const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const user = JSON.parse(localStorage.getItem("mallmartUser"))?.username;

  useEffect(() => {
    axios.get("http://localhost:8000/api/cart/")
      .then(res => {
        const userCart = res.data.filter(item => item.user === user);
        setCartItems(userCart);
      })
      .catch(err => console.error("Error fetching cart:", err));
  }, [user]);

  const totalPrice = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);

  const handlePayNow = async () => {
    try {
      for (let item of cartItems) {
        await axios.post("http://localhost:8000/api/purchases/", {
          user: item.user,
          item: item.item,
          price: item.price,
        });
      }
      await axios.delete(`http://localhost:8000/api/cart/?user=${user}`); // optional: delete user's cart
      alert("Payment successful!");
      setCartItems([]);
    } catch (error) {
      alert("Payment failed");
      console.error(error);
    }
  };

  return (
    <div className="cart-page">
      <h1>🛒 Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                <img src={item.image} alt={item.item} width="100" />
                <span>{item.item}</span> - ₹{item.price}
              </li>
            ))}
          </ul>
          <h3>Total: ₹{totalPrice.toFixed(2)}</h3>
          <button onClick={handlePayNow}>Pay Now</button>
        </>
      )}
    </div>
  );
};

export default Cart;
