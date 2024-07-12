import React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const LaptopCatalogPage = ({setView, setProduct, setCart}) => {
  const [laptops, setLaptops] = useState([]);

  useEffect(() => {
    getLaptopData();
  }, []);

  function getLaptopData() {
    fetch(`${process.env.REACT_APP_SERVER_URL}/products/listLaptops`)
      .then(response => response.json())
      .then(data => {
        console.log("Fetched laptop catalog:", data);
        setLaptops(data);
      });
  }

  function addToCart(product) {
    product.quantity = 1;
    setCart(existingProducts => {
      if (existingProducts.find(p => p.productId == product.productId)) {
        existingProducts.find(p => p.productId == product.productId).quantity += 1;
        return [...existingProducts];
      }
      else {
        return [...existingProducts, product];
      }
    });
    alert("Added product to cart!");
  }

  function returners(product) {
    setView("review-view");
    setProduct(product);
  }

  const LaptopCatalogItem = ({ productId, brand, price, title, text, image, product_sent }) => {
    return (
      <div className="col-md-6 mb-4">
        <div className="card h-100">
          <img src={image} className="card-img-top img-fluid mx-auto" alt={title} style={{ height: '333px', width: '360px' }} />
          <div className="card-body">
            <h5 className="card-title">{brand} {title}</h5>
            <p className="card-text">{text}</p>
            <p className="card-text"><small className="text-muted">Price: {price}</small></p>
            <div className="d-flex justify-content-between align-items-center">
              <div className="btn-group">
                <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => addToCart(product_sent)}>Add to Cart</button>
                <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => returners(product_sent)}>Reviews</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div id="laptop-view">
      <h1 style={{ marginTop: "10px", textAlign: "center" }}>Laptops</h1>
      <div className="container">
      <div className="row">
        {laptops.map(laptop => (<LaptopCatalogItem
          key={laptop.productId}
          productId={laptop.productId}
          brand = {laptop.brand}
          price = {laptop.price}
          title={laptop.title}
          text={laptop.text} 
          image={laptop.image}
          product_sent={laptop}
        />))}
      </div>
      </div>
    </div>
  );
}

LaptopCatalogPage.propTypes = {};

LaptopCatalogPage.defaultProps = {};

export default LaptopCatalogPage;
