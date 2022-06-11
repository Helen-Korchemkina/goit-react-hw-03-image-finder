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
  picture: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
}

export default ImageGalleryItem;
