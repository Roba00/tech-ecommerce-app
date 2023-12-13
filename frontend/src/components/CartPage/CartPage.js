import React from 'react';
import PropTypes from 'prop-types';

const ProductItem = ({ productId, brand, title, price, image, quantity }) => {
  console.log(brand, title, price, image);
  return (
    <tr>
      <td>
        <h5>{brand} {title}</h5>
        <img src={image} class="card-img-top" style={{ width: "100px", height: "auto" }} />
      </td>
      <td>{quantity}</td>
      <td>{quantity} * ${(price).toLocaleString(undefined, { minimumFractionDigits: 2 })} = ${(quantity * price).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
    </tr>
  )
};

const CartPage = ({ userToken, cart, setCart }) => {

  function getTotalPrice() {
    let totalPrice = 0;
    cart.forEach(cartItem => { totalPrice += cartItem.price });
    return totalPrice;
  }

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    setCart([]);
    alert("Successfully submitted order!");
    window.location.reload();
  }

  return (
    <div id="cart-view">
      <h1 style={{ marginTop: "10px", textAlign: "center" }}>Cart</h1>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(product => (<ProductItem
            key={product.productId}
            productId={product.productId}
            brand={product.brand}
            title={product.title}
            price={product.price}
            image={product.image}
            quantity={product.quantity}
          />))}
          <tr>
            <td></td>
            <td><strong>Total</strong></td>
            <td>${(getTotalPrice()).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
          </tr>
        </tbody>
      </table>
      <br />

      <div class="col-6">
        <div class="input-group">
          <form class="row g-3" id="checkout-form" onSubmit={handleSubmit}>
            <div class="col-md-6">
              <label for="inputName" class="form-label">Full Name</label>
              <input type="text" class="form-control" id="inputName" required/>
              <div class="valid-feedback">
                Looks good!
              </div>
              <div class="invalid-feedback">
                Must be like, "John Doe"
              </div>
            </div>

            <div class="col-md-6">
              <label for="inputEmail4" class="form-label">Email</label>
              <input type="email" class="form-control" id="inputEmail4" required/>
              <div class="valid-feedback">
                Looks good!
              </div>
              <div class="invalid-feedback">
                Must be like, "abc@xyz.efg"
              </div>
            </div>

            <div class="col-12">
              <label for="inputCard" class="form-label">Card</label>
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1"><i class="bi-credit-card-fill"></i></span>
                <input type="text" id="inputCard" class="form-control" placeholder="XXXX-XXXX-XXXX-XXXX"
                  aria-label="Username" aria-describedby="basic-addon1" required/>
                <div class="valid-feedback">
                  Looks good!
                </div>
                <div class="invalid-feedback">
                  Must be like, "7777-7777-7777-7777"
                </div>
              </div>
            </div>

            <div class="col-12">
              <label for="inputAddress" class="form-label">Address</label>
              <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" required/>
            </div>
            <div class="col-12">
              <label for="inputAddress2" class="form-label">Address 2</label>
              <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
            </div>
            <div class="col-md-6">
              <label for="inputCity" class="form-label">City</label>
              <input type="text" class="form-control" id="inputCity" required/>
            </div>
            <div class="col-md-4">
              <label for="inputState" class="form-label">State</label>
              <input type="text" class="form-control" id="inputState" required/>
              <div class="valid-feedback">
                Looks good!
              </div>
              <div class="invalid-feedback">
                Must be like, "New York"
              </div>
            </div>
            <div class="col-md-2">
              <label for="inputZip" class="form-label">Zip</label>
              <input type="text" class="form-control" id="inputZip" required/>
            </div>
            <div class="col-12">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="gridCheck" required/>
                <label class="form-check-label" for="gridCheck">
                  Check me out
                </label>
              </div>
            </div>
            <div class="col-12">
              <button type="submit" class="btn btn-success"> <i class="bi-bag-check"></i> Confirm</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
};

CartPage.propTypes = {};

CartPage.defaultProps = {};

export default CartPage;
