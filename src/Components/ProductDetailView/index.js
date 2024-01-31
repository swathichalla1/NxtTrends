import React, { useState, useEffect ,useCallback} from 'react';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { BsPlusSquare, BsDashSquare } from 'react-icons/bs';
import ContextFile from '../../context/contextfile';

import Header from '../Header';
import SimilarProductItem from '../SimilarProductItem';

import './index.css';

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
};

const ProductItemDetails = () => {
  const [productData, setProductData] = useState({});
  const [similarProductsData, setSimilarProductsData] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [quantity, setQuantity] = useState(1);
  const [message,setMessage] = useState("");
  

  const { id } = useParams();

  const getProductData = useCallback(async () => {
    //  console.log("getting data");
    setApiStatus(apiStatusConstants.inProgress);
    const jwtToken = Cookies.get('jwt_token');
    const apiUrl = `https://apis.ccbp.in/products/${id}`;
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    };

    try {
      const response = await fetch(apiUrl, options);

      if (response.ok) {
        const fetchedData = await response.json();
        const updatedData = getFormattedData(fetchedData);
        const updatedSimilarProductsData = fetchedData.similar_products.map(
          (eachSimilarProduct) => getFormattedData(eachSimilarProduct)
        );
        setProductData(updatedData);
        setSimilarProductsData(updatedSimilarProductsData);
        setApiStatus(apiStatusConstants.success);
      } else if (response.status === 404) {
        setApiStatus(apiStatusConstants.failure);
      }
    } catch (error) {
      console.error('Error during fetch:', error);
      setApiStatus(apiStatusConstants.failure);
    }
  },[id]);

  useEffect(() => {
    getProductData()
  },[getProductData]);

  const getFormattedData = (data) => ({
    availability: data.availability,
    brand: data.brand,
    description: data.description,
    id: data.id,
    imageUrl: data.image_url,
    price: data.price,
    rating: data.rating,
    title: data.title,
    totalReviews: data.total_reviews,
  });

  

  const renderLoadingView = (override) => (
    <div className="products-loader-container">
    <ClipLoader
    color="red"
    loading="true"
    cssOverride={override}
    size={20}
    aria-label="Loading Spinner"
    data-testid="loader"
  />
      
    </div>
  );

  const renderFailureView = () => (
    <div className="product-details-error-view-container">
    
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error-view-image"
      />
      <h1 className="product-not-found-heading">Product Not Found</h1>
      <button type="button" className="button">
        Continue Shopping
      </button>
    </div>
  );

  const onDecrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const onIncrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const renderProductDetailsView = () => (

    <ContextFile.Consumer>
    {(value)=>{
      const {
        availability,
        brand,
        description,
        imageUrl,
        price,
        rating,
        title,
        totalReviews,id
      } = productData;

      const {addCartItem,cartItemsList}=value;
      
      const addToCart = () => {
        const itemInCart = 
          cartItemsList.filter((each)=>(
            each.id === id
          ))
  
         if (itemInCart.length !== 0){
              itemInCart[0].quantity += quantity 
              setMessage("Item already in cart increasing its quantity!")
              setTimeout(function() {
                setMessage("");
            }, 3000);
            
              
         }
         else{
          addCartItem({...productData,quantity});
          setMessage("Item added to cart succesfully!");
          setTimeout(function(){
            setMessage("");
          },3000);
          
         }
         
        }
  
      return (
        
        <div className="product-details-success-view">
        <div className="product-details-container">
        
        <img src={imageUrl} alt="product" className="product-image" />
        <div className="product">
          <h1 className="product-name">{title}</h1>
          <p className="price-details">Rs {price}/-</p>
          <div className="rating-and-reviews-count">
            <div className="rating-container">
              <p className="rating">{rating}</p>
              <img
                src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                alt="star"
                className="star"
              />
            </div>
            <p className="reviews-count">{totalReviews} Reviews</p>
          </div>
          <p className="product-description">{description}</p>
          <div className="label-value-container">
            <p className="label">Available:</p>
            <p className="value">{availability}</p>
          </div>
          <div className="label-value-container">
            <p className="label">Brand:</p>
            <p className="value">{brand}</p>
          </div>
          <hr className="horizontal-line" />
          <div className="quantity-container">
            <button
              type="button"
              className="quantity-controller-button"
              onClick={onDecrementQuantity}
            >
              <BsDashSquare className="quantity-controller-icon" />
            </button>
            <p className="quantity">{quantity}</p>
            <button
              type="button"
              className="quantity-controller-button"
              onClick={onIncrementQuantity}
            >
              <BsPlusSquare className="quantity-controller-icon" />
            </button>
          </div>
          <button type="button" className="button add-to-cart-btn" onClick={addToCart}>
            ADD TO CART
          </button>
          <p className="addedToCartMessage">{message}</p>
        </div>
      </div>
      <h1 className="similar-products-heading">Similar Products</h1>
      <ul className="similar-products-list">
        {similarProductsData.map(eachSimilarProduct => (
          <SimilarProductItem
            productDetails={eachSimilarProduct}
            key={eachSimilarProduct.id}
          />
        ))}
      </ul>
        </div>
      );
    }}
    </ContextFile.Consumer>
    
  );

  const renderProductDetails = () => {
    const override = {
      display: 'block',
      margin: '0 auto',
      borderColor: 'red',
    };

    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderProductDetailsView();
      case apiStatusConstants.failure:
        return renderFailureView();
      case apiStatusConstants.inProgress:
        return renderLoadingView(override);
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className="product-item-details-container">{renderProductDetails()}</div>
    </>
  );
};

export default ProductItemDetails;
