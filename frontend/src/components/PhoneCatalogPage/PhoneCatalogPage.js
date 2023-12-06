import React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const PhoneCatalogPage = () => {
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

  const PhoneCatalogItem = ({productId, brand, price, title, text, image}) => (
    <div className='bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden'>
      <div className="my-3 py-3">
              <h2 id="iphone11" className="display-5">{brand} {title}</h2>
              <p id="phoneDesc1">{text}</p>
              <h3 id="phonePrice1">{price}</h3>
              <img src={image} width="200" /> <br /> <br />
              <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                      <button type="button" className="btn btn-sm btn-outline-secondary">Add to Cart</button>
                      <button type="button" className="btn btn-sm btn-outline-secondary">Reviews</button>
                  </div>
              </div>
          </div>
    </div>
  );

  return (
    <div id="phone-view">
      <h1 style={{marginTop: "10px", textAlign: "center"}}>Phones</h1>
      <div id="showPhones" className='d-md-flex flex-md-equal w-100 my-md-3 pl-md-3'>
        {phones.map(phone => (<PhoneCatalogItem 
          key={phone.productId}
          productId={phone.productId}
          brand = {phone.brand}
          price = {phone.price}
          title={phone.title}
          text={phone.text} 
          image={phone.image}
        />))}
      </div>
    </div>
  );
}

PhoneCatalogPage.propTypes = {};

PhoneCatalogPage.defaultProps = {};

export default PhoneCatalogPage;
