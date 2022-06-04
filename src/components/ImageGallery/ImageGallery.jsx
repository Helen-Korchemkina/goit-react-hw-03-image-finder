import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import s from './ImageGallery.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class ImageGallery extends Component {
  state = {
    pictures: [],
    error: null,
    status: Status.IDLE,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.picturesName !== this.props.picturesName) {
      const API = '26837460-553b8b6dbfe9a53b3dd0b8a3a';
      const NAME = this.props.picturesName;
      let pageNumber = '1';
      const URL =
        'https://pixabay.com/api/?q=' +
        NAME +
        '&page=' +
        pageNumber +
        '&key=' +
        API +
        '&image_type=photo&orientation=horizontal&per_page=12';
      this.setState({ status: Status.PENDING });

      try {
        const response = await axios.get(URL);
        if (response.data.total === 0) {
          toast.warn(
            `Sorry, there are no images matching your search query. Please try again.`
          );
            this.setState({ status: Status.IDLE });
            return;
        }
        return this.setState({
          pictures: response.data.hits,
          status: Status.RESOLVED,
        });
      } catch (error) {
        this.setState({ error, status: Status.REJECTED });
      }
    }
  }

    render() {
    const { status, error, pictures} = this.state;
    
    if (status === 'idle') {
      return <h1>Please, enter something</h1>;
    }
    if (status === 'pending') {
      return  <Loader/>
    }
    if (status === 'rejected') {
      return <h1>Whoops, something went wrong: {error.message}</h1>;
    }
    if (status === 'resolved') {
      return (
        <div>
          <ul className={s.gallery}>
            <ImageGalleryItem pictures={pictures} />
          </ul>
          <Button />
        </div>
      );
    }
  }
}

export default ImageGallery;