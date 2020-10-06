/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MainImage from './mainImage';
import StarRating from './starRatings';
import SocialShare from './socialShare';
import StylePrice from './stylesPrice';
import StyleThumbnails from './styleThumbnails';
import SizeDropdown from './sizeDropdown';
import QuantityDropdown from './quantityDropdown';
import StyleName from './styleNames';
import Cart from './shoppingCart';

const ProductInfo = ({
  styles, product, productId, reviews,
}) => {
  const [rating, setRating] = useState(0);
  const [count, setCount] = useState(0);

  const getTheAverageRating = (starData) => {
    console.log('ProductInfo: star data ', starData);
    let reviewCount = 0;
    let reviewTotal = 0;
    const ratingArr = Object.entries(starData);
    for (let i = 0; i < ratingArr.length; i += 1) {
      const current = ratingArr[i];
      const stars = Number(current[0]);
      const counter = current[1];
      reviewCount += counter;
      reviewTotal += stars * counter;
    }
    console.log('ProductInfo: logging total and count', reviewTotal, reviewCount);
    return reviewTotal / reviewCount;
  };

  const getTheReviewCount = (starData) => {
    let reviewCount = 0;
    const ratingArr = Object.entries(starData);
    for (let i = 0; i < ratingArr.length; i += 1) {
      const current = ratingArr[i];
      const counter = current[1];
      reviewCount += counter;
    }
    return reviewCount;
  };

  useEffect(() => {
    const average = getTheAverageRating(reviews);
    const numberOReviews = getTheReviewCount(reviews);
    setRating(average);
    setCount(numberOReviews);
  }, [reviews]);
  return (
    <Container>
      <Row>
        {/* Product Image Carousel & Thumbnail Viewer */}
        <div>
          <Col xs={12}>
            <MainImage productId={productId} styles={styles} />
          </Col>
        </div>
        <div className="product-container">
          <Col xs={12}>
            {/* Social Sharing */}
            <Row>
              <SocialShare product={product} styles={styles} />
            </Row>
            {/* Product Star Ratings */}
            <Row>
              <StarRating rating={rating} count={count} />
            </Row>
            {/* Product Category */}
            <Row>
              <div className="product-category">
                category:&nbsp;
                { product.category }
              </div>
            </Row>
            {/* Product Title */}
            <Row>
              <div className="product-title">
                { product.name }
              </div>
            </Row>
            {/* Product Price */}
            <Row><StylePrice styles={styles} /></Row>
            {/* Product Style */}
            <Row><StyleName styles={styles} /></Row>
            {/* Product Style Thumbnails */}
            <Row><StyleThumbnails productId={productId} styles={styles} /></Row>
            {/* Size and Quantity Selectors */}
            <Row>
              <SizeDropdown />
              <QuantityDropdown />
            </Row>
            {/* Add to Cart/Favorite Options */}
            <Row>
              <div className="cart-root cart-control">Add to Cart</div>
              <div className="favorite-root favorite-control">Favorite</div>
            </Row>
          </Col>
        </div>
        {/* Cart */}
        <div>
          <Cart />
        </div>
      </Row>
    </Container>
  );
};

ProductInfo.propTypes = {
  styles: PropTypes.shape({
    product_id: PropTypes.string,
    results: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    slogan: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
    default_price: PropTypes.string,
    features: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  reviews: PropTypes.shape({
    product_id: PropTypes.string,
    ratings: PropTypes.objectOf(PropTypes.string),
    recommended: PropTypes.objectOf(PropTypes.string),
    characteristics: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
  productId: PropTypes.number.isRequired,
};

export default ProductInfo;