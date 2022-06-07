import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ pictures, onClick }) =>
  pictures.map(picture => (
    <li className={s.galleryItem} key={picture.id}>
      <img
        onClick={() => onClick(picture)}
        src={picture.webformatURL}
        alt={picture.tags}
      />
    </li>
  ));

ImageGalleryItem.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      galleryItem: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
