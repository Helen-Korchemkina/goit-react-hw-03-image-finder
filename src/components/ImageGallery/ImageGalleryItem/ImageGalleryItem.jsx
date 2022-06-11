import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ picture, onClick }) => {
  return (
    <li className={s.galleryItem}>
      <img
        onClick={() => onClick(picture)}
        src={picture.webformatURL}
        alt={picture.tags}
      />
    </li>
  )
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string,
  }),
}

export default ImageGalleryItem;
