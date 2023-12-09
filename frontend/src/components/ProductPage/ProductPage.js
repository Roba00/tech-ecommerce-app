import React from 'react';
import PropTypes from 'prop-types';


const ProductPage = ({product}) => {
  const [productId, brand, price, title, text, image, reviews] = product;
  // Reviews JSON Array: reviews[0].userId, reviews[0].title, reviews[0].text, reviews[0].rating
  // User name will be fetched later from the user id.
  
  const ReviewItem = ({userId, title, text, rating}) => (
    <div>
      <h2 id="reviewer">User: {userId}</h2>
      <h3 id="title">{title}</h3>
      <h2 id="text">{text}</h2>
      <h3 id="rating">User rating: {rating} / 5</h3>
    </div>
  );

  return (
    <div className='bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden'>
      <div className="my-3 py-3">
      <h2 id="item" className="display-5">{brand} {title}</h2>
      <p id="desc">{text}</p>
      <h3 id="price">{price}</h3>
      <img src={image} width="200" /> <br /> <br />
      <h3>Reviews:</h3>
        {reviews.map(review => (<ReviewItem 
          key={review.productId}
          userId={review.userId}
          title={review.title}
          text={review.text} 
          rating={review.rating}
        />))}
      </div>
    </div>
  );
};

ProductPage.propTypes = {};

ProductPage.defaultProps = {};

export default ProductPage;
