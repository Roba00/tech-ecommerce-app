import React from 'react';
import PropTypes from 'prop-types';


const ProductPage = ({product}) => {
  const [productId, brand, price, title, text, image, reviews] = product;
  // Reviews JSON Array: reviews[0].userId, reviews[0].title, reviews[0].text, reviews[0].rating
  // User name will be fetched later from the user id.

  return (
    <div>
      ProductPage Component
    </div>
  );
};

ProductPage.propTypes = {};

ProductPage.defaultProps = {};

export default ProductPage;
