import React, { useEffect, useState } from "react";
import axios from "axios";


const AdminDashboard = () => {
  const [purchases, setPurchases] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // show 5 purchases per page
  const [loading, setLoading] = useState(true);
  const [newCategory, setNewCategory] = useState({
    name: "",
    desc: "",
    offer: "",
    img: ""
  });

  useEffect(() => {
    axios.get("http://localhost:8000/api/purchases/")
      .then((res) => {
        setPurchases(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching purchases:", err);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/categories/", newCategory)
      .then(() => {
        alert("✅ Category added!");
        setNewCategory({ name: "", desc: "", offer: "", img: "" });
      })
      .catch(() => alert("❌ Failed to add category"));
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = purchases.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(purchases.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">🚀 Admin Dashboard</h1>

      {/* Category Form */}
      <div className="card form-card">
        <h2>Add New Category</h2>
        <form onSubmit={handleCategorySubmit}>
          <input type="text" name="name" value={newCategory.name} placeholder="Category Name" onChange={handleInputChange} required />
          <input type="text" name="desc" value={newCategory.desc} placeholder="Description" onChange={handleInputChange} required />
          <input type="text" name="offer" value={newCategory.offer} placeholder="Offer (e.g., 50% Off)" onChange={handleInputChange} required />
          <input type="url" name="img" value={newCategory.img} placeholder="Image URL" onChange={handleInputChange} required />
          <button type="submit">Add Category</button>
        </form>
      </div>

      {/* Purchase Table */}
      <div className="card table-card">
        <h2>📊 Purchase History</h2>
        {loading ? <p>Loading...</p> : (
          <>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Item</th>
                    <th>Price</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((p, i) => (
                    <tr key={i}>
                      <td data-label="User">{p.user}</td>
                      <td data-label="Item">{p.item}</td>
                      <td data-label="Price">₹{p.price}</td>
                      <td data-label="Date">{new Date(p.date).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="pagination">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={currentPage === index + 1 ? "active" : ""}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
