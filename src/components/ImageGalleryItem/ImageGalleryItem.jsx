import React from "react";
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ pictures }) => (
    pictures.map(picture => (
        <li className={s.galleryItem} key={picture.id}>
            <img src={picture.webformatURL} alt={picture.tags} />
        </li>))
);

export default ImageGalleryItem;