import React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const GET_ACCOUNT_QUERY = "http://localhost:8081/getAccount";
const ADD_REVIEW_QUERY = "http://localhost:8081/addReview";
const DELETE_REVIEW_QUERY = "http://localhost:8081/deleteReview"

const getUserInformation = async (userToken, setAccountInfo) => {
  console.log("User:", userToken);
  const results = await fetch(GET_ACCOUNT_QUERY, {
    headers: { 'Content-Type': 'application/json', 'authorization': userToken },
    method: 'GET'
  });
  const data = await results.json();
  if (data.statusCode != 200) {
    alert("Login information expired or failed. Please log in again.");
    sessionStorage.removeItem("token");
    window.location.reload();
  }
  const userData = data.userData;
  console.log(userData);
  setAccountInfo(userData);
  console.log("Account:", userData);
}

const addReviewRequest = async (productId, userId, body) => {
  console.log("Request:", productId, userId, body);
  const results = await fetch(`${ADD_REVIEW_QUERY}/${productId}/${userId}`, {
    headers: { 'Content-Type': 'application/json'},
    method: 'PUT',
    body: JSON.stringify(body)
  });
  if (results.status != 200) {
    alert("Login information expired or review creation failed. Please log in again.");
    sessionStorage.removeItem("token");
    window.location.reload();
  }
  else {
    alert("Successfully added review!");
    window.location.reload();
  }
}

const deleteReviewRequest = async (productId, userId) => {
  console.log("Request:", productId, userId);
  const results = await fetch(`${DELETE_REVIEW_QUERY}/${productId}/${userId}`, {
    headers: { 'Content-Type': 'application/json'},
    method: 'DELETE'
  });
  if (results.status != 200) {
    alert("Login information expired or review deletion failed. Please log in again.");
    sessionStorage.removeItem("token");
    window.location.reload();
  }
  else {
    alert("Successfully deleted review!");
    window.location.reload();
  }
}

const ProductPage = ({ product, userToken }) => {
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
    // console.log("Fetched user:", data.name);
    console.log("Fetched user:", data)
    return data;
  }

  const [accountInfo, setAccountInfo] = useState({
    id: 0,
    name: "Loading name...",
    email: "Loading email...",
    password: "Loading password...",
    location: "Loading location...",
    image: "",
    wishlist: [],
    cart: [],
    recentlyPurchased: [],
    title: "Loading title...",
    phone: "Loading phone..."
  });

  useEffect(() => {
    getUserInformation(userToken, setAccountInfo);
  }, []);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    console.log(form);
    console.log("Star Rating", form.starRating.value);
    console.log("Review Title", form.reviewTitle.value);
    console.log("Review Text", form.reviewText.value);
    const body = {
      userId: parseInt(accountInfo.id),
      title: form.reviewTitle.value,
      text: form.reviewText.value,
      rating: parseInt(form.starRating.value)
    };

    addReviewRequest(parseInt(productId), parseInt(accountInfo.id), JSON.parse(JSON.stringify(body)));
  };

  const ReviewItem = ({ userId, title, text, rating, currentUserId }) => {
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
          {currentUserId === userId
            ? <h4 className="card-title">User: Me ({userName})</h4>
            : <h4 className="card-title">User: {userName}</h4>
          }
          <h5 className="card-subtitle mb-2 text-muted">Rating: {rating} / 5</h5>
          <h6 className="card-subtitle mb-2 text-muted">{title}</h6>
          <p className="card-text">{text}</p>
          {currentUserId === userId && <button class="btn btn-danger" onClick={() => {deleteReviewRequest(productId, userId)}}>Delete Review</button>}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
      <h2 className="display-5">{product.brand} {product.title}</h2>
      <p>{product.text}</p>
      <h3>{product.price}</h3>
      <img src={product.image} width="200" alt="Product" />
      <br />
      <br />
      <br />
      <br />
      <h1>Add Review:</h1><br />
      <form className='row' onSubmit={handleSubmit}>
        <fieldset id='starRating' className='col-2'>
          <legend>Select star rating:</legend>
          <div class="form-check">
            <input id="starRating1" className="form-check-input" type="radio" name="starRating" value={1} required />
            <label class="form-check-label" for="starRating1">1</label>
          </div>
          <div class="form-check">
            <input id="starRating2" className="form-check-input" type="radio" name="starRating" value={2} />
            <label class="form-check-label" for="starRating2">2</label>
          </div>
          <div class="form-check">
            <input id="starRating3" className="form-check-input" type="radio" name="starRating" value={3} />
            <label class="form-check-label" for="starRating3">3</label>
          </div>
          <div class="form-check">
            <input id="starRating4" className="form-check-input" type="radio" name="starRating" value={4} />
            <label class="form-check-label" for="starRating4">4</label>
          </div>
          <div class="form-check">
            <input id="starRating5" className="form-check-input" type="radio" name="starRating" value={5} />
            <label class="form-check-label" for="starRating5">5</label>
          </div>
        </fieldset>
        <div className='col-10'>
          <div class="mb-3">
            <label for="reviewTitle" class="form-label">Title</label>
            <input class="form-control" id="reviewTitle" placeholder="Title" required />
          </div>
          <div class="mb-3">
            <label for="reviewText" class="form-label">Review</label>
            <textarea class="form-control" id="reviewText" rows="3" placeholder="Review" required></textarea>
          </div>
        </div>
        <button type="submit" className='btn btn-primary'>Submit Review</button>
      </form>
      <br />
      <br />
      <br />
      <h1>Reviews:</h1><br />
      <div className="card-deck">
        {product.reviews.map((review) => (
          <ReviewItem
            key={review.userId}
            userId={review.userId}
            title={review.title}
            text={review.text}
            rating={review.rating}
            currentUserId={parseInt(accountInfo.id)}
          />
        ))}
      </div>
    </div>
  );
};

ProductPage.propTypes = {};

ProductPage.defaultProps = {};

export default ProductPage;
