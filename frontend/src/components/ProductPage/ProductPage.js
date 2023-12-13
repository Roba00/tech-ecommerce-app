import React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const ProductPage = ({product}) => {
  const {
    _id,
    productId,
    productType,
    brand,
    price,
    title,
    text,
    image,
    reviews,
  } = product;
  // Reviews JSON Array: reviews[0].userId, reviews[0].title, reviews[0].text, reviews[0].rating
  // User name will be fetched later from the user id.

  async function getUser(user_id) {
    console.log("Called getUser: " + user_id);
    const response = await fetch(`http://localhost:8081/getUserById/${user_id}`);
    const data = await response.json();
    console.log("Fetched user:", data.name);
    return data;
  }
  
  const ReviewItem = ({ userId, title, text, rating }) => {
    const [userName, setUserName] = useState(null);
  
    useEffect(() => {
      async function fetchUserData() {
        const user = await getUser(userId);
        setUserName(user.name);
      }
  
      fetchUserData();
    }, [userId]);
  
    return (
      <div className="card mb-3">
        <div className="card-body">
          <h4 className="card-title">User: {userName}</h4>
          <h5 className="card-subtitle mb-2 text-muted">Rating: {rating} / 5</h5>
          <h6 className="card-subtitle mb-2 text-muted">{title}</h6>
          <p className="card-text">{text}</p>
        </div>
      </div>
    );
  };
  
  return (
    <div className="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
      <div className="my-3 py-3">
        <h2 className="display-5">{product.brand} {product.title}</h2>
        <p>{product.text}</p>
        <h3>{product.price}</h3>
        <img src={product.image} width="200" alt="Product" />
        <br />
        <br />
        <br />
        <br />
        <h1>Reviews:</h1>
        <div className="card-deck">
          {product.reviews.map((review) => (
            <ReviewItem
              key={review.userId}
              userId={review.userId}
              title={review.title}
              text={review.text}
              rating={review.rating}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

ProductPage.propTypes = {};

ProductPage.defaultProps = {};

export default ProductPage;
