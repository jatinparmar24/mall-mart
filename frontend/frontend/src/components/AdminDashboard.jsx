import React, { useEffect, useState } from "react";
import axios from "axios";


const AdminDashboard = () => {
  const [purchases, setPurchases] = useState([]);
  const [filteredPurchases, setFilteredPurchases] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); 
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

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
        setFilteredPurchases(res.data);
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

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = purchases.filter((p) =>
      p.user.toLowerCase().includes(value)
    );

    setFilteredPurchases(filtered);
    setCurrentPage(1);
  };

  const toggleSort = () => {
    const sorted = [...filteredPurchases].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.user.localeCompare(b.user);
      } else {
        return b.user.localeCompare(a.user);
      }
    });

    setFilteredPurchases(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPurchases.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPurchases.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="admin-dashboard-wrapper">
      <h1 className="admin-dashboard-title">🚀 Admin Dashboard</h1>

      <div className="admin-dashboard-card">
        <h2>Add New Category</h2>
        <form onSubmit={handleCategorySubmit} className="admin-dashboard-form">
          <input type="text" name="name" value={newCategory.name} placeholder="Category Name" onChange={handleInputChange} required />
          <input type="text" name="desc" value={newCategory.desc} placeholder="Description" onChange={handleInputChange} required />
          <input type="text" name="offer" value={newCategory.offer} placeholder="Offer (e.g., 50% Off)" onChange={handleInputChange} required />
          <input type="url" name="img" value={newCategory.img} placeholder="Image URL" onChange={handleInputChange} required />
          <button type="submit">Add Category</button>
        </form>
      </div>

      <div className="admin-dashboard-card">
        <h2>📊 Purchase History</h2>

        <div className="admin-dashboard-search-sort">
          <input
            type="text"
            placeholder="Search by User Name"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button onClick={toggleSort}>
            Sort by Name ({sortOrder === "asc" ? "Asc" : "Desc"})
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="admin-dashboard-table-wrapper">
              <table className="admin-dashboard-table">
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
                      <td>{p.user}</td>
                      <td>{p.item}</td>
                      <td>₹{p.price}</td>
                      <td>{new Date(p.date).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="admin-dashboard-pagination">
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