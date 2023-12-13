import React from 'react';
import { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

const PhoneCatalogPage = ({setView, setProduct, setCart}) => {
  const [phones, setPhones] = useState([]);

  useEffect(() => {
    getPhoneData();
  }, []);

  function getPhoneData() {
    fetch('http://localhost:8081/listPhones')
      .then(response => response.json())
      .then(data => {
        console.log("Fetched phone catalog:", data);
        setPhones(data);
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

  const PhoneCatalogItem = ({productId, brand, price, title, text, image, product_sent}) => {
    return (
      <div className="col-md-6 mb-4">
        <div className="card h-100">
            <img src={image} className="card-img-top img-fluid mx-auto" alt={title} style={{ height: '400px', width: '260px'}} />
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
  );};

  return (
    <div id="phone-view">
      <h1 style={{marginTop: "10px", textAlign: "center"}}>Phones</h1>
      <div className="container">
      <div className="row">
        {phones.map(phone => (<PhoneCatalogItem 
          key={phone.productId}
          productId={phone.productId}
          brand = {phone.brand}
          price = {phone.price}
          title={phone.title}
          text={phone.text} 
          image={phone.image}
          product_sent={phone}
        />))}
      </div>
      </div>
    </div>
  );
}

PhoneCatalogPage.propTypes = {};

PhoneCatalogPage.defaultProps = {};

export default PhoneCatalogPage;
