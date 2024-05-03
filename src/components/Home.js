import React, { useState, useEffect } from 'react';
import '..//css/Home.css';

export default function Home() {
  const [dishes, setDishes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState('');
  const [vegetarianOnly, setVegetarianOnly] = useState(false);

  const fetchDishes = async (pageNumber) => {
    setLoading(true);
    setError(null);
    try {
     
      const params = new URLSearchParams();
      
      if (vegetarianOnly) {
        params.append('vegetarian', vegetarianOnly);
      }
      if (sortOption) {
        params.append('sorting', sortOption);
      }
      params.append('page', pageNumber);


      const url = `https://food-delivery.int.kreosoft.space/api/dish?${params.toString()}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setDishes(data.dishes);
      setTotalPages(data.pagination.count); 
      setCurrentPage(data.pagination.current);
    } catch (error) {
      setError('Error fetching dishes: ' + error.message);
      console.error('Error fetching dishes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDishes(currentPage);
  }, [currentPage, sortOption, vegetarianOnly]);

  const addToCart = (dishId) => {
  
    console.log('Adding dish to cart:', dishId);
  };

  return (
    <div>
      <h1><center>Menu</center></h1>
      <div className="filter-options">
        <select
          className="selectpicker"
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="price_low_to_high">Price Low to High</option>
          <option value="price_high_to_low">Price High to Low</option>
          <option value="rating_high_to_low">Rating High to Low</option>
          <option value="rating_low_to_high">Rating Low to High</option>
        </select>
        <label>
          Vegetarian Only
          <input
            type="checkbox"
            id="flexSwitchCheckDefault"
            onChange={(e) => setVegetarianOnly(e.target.checked)}
          />
        </label>
        <button
          className="btn-primary"
          onClick={() => fetchDishes(1)}
        >
          Apply Filters
        </button>
      </div>
      {loading && <p>Loading dishes...</p>}
      {error && <p className="error">{error}</p>}
      <div id="card-container" className="row">
        {dishes.map(dish => (
          <div key={dish.id} className="col-md-3 col-sm-4 mb-4">
            <div className="card">
              <img className="card-img-top" src={dish.image} alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">{dish.name}</h5>
                <p className="card-text">Dish Category: {dish.category}</p>
                <p className="card-text">{dish.description}</p>
              </div>
              <div className="card-footer d-flex justify-content-between align-items-center">
                <p className="card-text m-0">Price: {dish.price} ₽</p>
                <button
                  className="btn btn-primary"
                  onClick={() => addToCart(dish.id)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
       <div>
  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
    <button key={page} className="pagination-button" disabled={page === currentPage} onClick={() => setCurrentPage(page)}>
      {page}
    </button>
  ))}
</div>
      )}
    </div>
  );
}
