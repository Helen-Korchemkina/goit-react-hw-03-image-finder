import React from "react";
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ pictures, onClick }) => (
    pictures.map(picture => (
        <li className={s.galleryItem} key={picture.id}>
            <img onClick={() => onClick(picture)} src={picture.webformatURL}
            alt={picture.tags} />
        </li>))
);

export default ImageGalleryItem;