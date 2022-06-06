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

const INITIAL_STATE = {
    showButton: true,
    pictures: [],
    page: 1,
};

class ImageGallery extends Component {
  state = {
    error: null,
    status: Status.IDLE,
    ...INITIAL_STATE,
  };

  fetchPictures = (q, page) => {
    const options = {
      params: {
        key: '26837460-553b8b6dbfe9a53b3dd0b8a3a',
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
        q,
        page,
      },
    };
    return axios.get('https://pixabay.com/api/', options);
  };

  componentDidUpdate(prevProps, prevState) {
    const NAME = this.props.picturesName;

    if (prevProps.picturesName !== this.props.picturesName) {
      this.setState({
        status: Status.PENDING,
        ...INITIAL_STATE
      });

      if (this.state.page === 1) {
      this.fetchPictures(NAME, this.state.page)
    .then(response => {
          if (response.data.total === 0) {
            toast.warn(
              `Sorry, there are no images matching your search query. Please try again.`
            );
            this.setState({ showButton: false, status: Status.IDLE });
            return;
          }

          return this.setState({
            pictures: response.data.hits,
            status: Status.RESOLVED,
          });
        })
        .catch(error => {
          this.setState({ error, status: Status.REJECTED });
        });
      }
    }

        if (prevState.page !== this.state.page && prevProps.picturesName === this.props.picturesName) {
          this.fetchPictures(NAME, this.state.page)
            .then(response => {
              if (response.data.hits.length < 12) {
                this.setState({ showButton: false });
                toast.warn(
                  `Sorry, there are no more images.`
                );
              }
              this.setState({
                pictures: [...this.state.pictures, ...response.data.hits],
                status: Status.RESOLVED,
              });
            })
          .catch (error => {
            this.setState({ error, status: Status.REJECTED });
          })
        }
  }

  changePage = () => {
    this.setState({ page: this.state.page + 1 });
  };

  render() {
    const { status, error, pictures, showButton } = this.state;

    if (status === 'idle') {
      return <h1>Please, enter something</h1>;
    }
    if (status === 'pending') {
      return <Loader />;
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
          {showButton && <Button changePage={this.changePage} />}
        </div>
      );
    }
  }
}

export default ImageGallery;
