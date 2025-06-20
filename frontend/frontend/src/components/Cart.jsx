import React, { useEffect, useState } from "react";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const user = JSON.parse(localStorage.getItem("mallmartUser"))?.username;

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = () => {
    axios
      .get(`http://localhost:8000/api/cart/?user=${user}`)
      .then((res) => setCartItems(res.data))
      .catch((err) => console.error("Cart fetch error:", err));
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/cart/${id}/`);
      fetchCart(); // Refresh cart after deletion
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price),
    0
  );

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayNow = async () => {
    if (user === "admin") {
      alert("Admin is not allowed to make purchases.");
      return;
    }

    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const razorpayKey = "rzp_test_pr99iascS1WRtU";

    const options = {
      key: razorpayKey,
      amount: totalPrice * 100,
      currency: "INR",
      name: "Mall Mart",
      description: "Cart Payment",
      handler: async function (response) {
        try {
          for (let item of cartItems) {
            await axios.post("http://localhost:8000/api/purchases/", {
              user: item.user,
              item: item.item,
              price: item.price,
            });
          }
          await axios.delete(
            `http://localhost:8000/api/cart-clear/?user=${user}`
          );
          alert("Payment successful!");
          setCartItems([]);
        } catch (err) {
          console.error("Post-payment error:", err);
          alert("Error saving purchase after payment.");
        }
      },
      prefill: {
        name: user,
        email: "",
        contact: "",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="cart-page">
      <h1>🛒 Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <img src={item.image} alt={item.item} width="100" />
                <span>{item.item}</span> - ₹{item.price}
                <button onClick={() => handleDelete(item.id)}>❌</button>
              </li>
            ))}
          </ul>
          <h3>Total: ₹{totalPrice.toFixed(2)}</h3>
          {user !== "admin" && (
            <button onClick={handlePayNow}>💳 Pay with Razorpay</button>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
