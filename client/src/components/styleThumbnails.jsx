import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import { v4 as uuidv4 } from 'uuid';

const StyleThumbnails = ({ styles, setCurrentStyle, currentStyle }) => {
  const stylesArr = Object.entries(styles.results);

  const handleStyleSelect = (styleId) => {
    for (let i = 0; i < stylesArr.length; i += 1) {
      const current = stylesArr[i][1];
      if (current.style_id === styleId) {
        setCurrentStyle(current);
      }
    }
  };

  let className = 'thumbnails-img';

  return (
    <div>
      <Container className="thumbnails-cage">
        {stylesArr.map((photo) => {
          let photoUrl = '';
          const styleId = photo[1].style_id;
          if (photo[1].photos[0].thumbnail_url === null) {
            photoUrl = 'https://fec-image-bucket.s3-us-west-2.amazonaws.com/Coming+Soon+New+Announcement+Watercolor+Painterly+Social+Media.jpg';
          } else {
            photoUrl = photo[1].photos[0].thumbnail_url;
          }
          if (styleId === currentStyle.style_id) {
            className = 'thumbnails-selected';
          } else {
            className = 'thumbnails-img';
          }
          return (
            <Image
              id={styleId}
              key={uuidv4()}
              className={className}
              src={photoUrl}
              alt={photo.name}
              roundedCircle
              onClick={() => {
                handleStyleSelect(styleId);
              }}
            />
          );
        })}
      </Container>
    </div>
  );
};

StyleThumbnails.propTypes = {
  styles: PropTypes.shape({
    product_id: PropTypes.string,
    results: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  currentStyle: PropTypes.shape({
    'default?': PropTypes.number,
    name: PropTypes.string,
    original_price: PropTypes.string,
    photos: PropTypes.arrayOf(PropTypes.object),
    sale_price: PropTypes.string,
    skus: PropTypes.objectOf(PropTypes.number),
    style_id: PropTypes.number,
  }).isRequired,
  setCurrentStyle: PropTypes.func.isRequired,
};

export default StyleThumbnails;
