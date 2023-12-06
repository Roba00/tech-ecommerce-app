import React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const WatchCatalogPage = () => {
  const [watches, setWatches] = useState([]);

  useEffect(() => {
    getWatchData();
  }, []);

  function getWatchData() {
    fetch('http://localhost:8081/listWatches')
      .then(response => response.json())
      .then(data => {
        console.log("Fetched watch catalog:", data);
        setWatches(data);
      });
  }

  const WatchCatalogItem = ({productId, brand, price, title, text, image}) => (
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
    <div id="watch-view">
      <h1 style={{ marginTop: "10px", textAlign: "center" }}>Watches</h1>
      <div id="showWatches" className='d-md-flex flex-md-equal w-100 my-md-3 pl-md-3'>
        {watches.map(watch => (<WatchCatalogItem
          key={watch.productId}
          productId={watch.productId}
          brand = {watch.brand}
          price = {watch.price}
          title={watch.title}
          text={watch.text} 
          image={watch.image}
        />))}
      </div>
    </div>
  );
}

WatchCatalogPage.propTypes = {};

WatchCatalogPage.defaultProps = {};

export default WatchCatalogPage;
