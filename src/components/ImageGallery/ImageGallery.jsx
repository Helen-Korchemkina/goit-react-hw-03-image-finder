import React, { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import picturesAPI from '../services/api';
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
    showModal: false,
    showLoader: false,
    bigPicture: null,
    ...INITIAL_STATE,
  };

  componentDidUpdate(prevProps, prevState) {
    const NAME = this.props.picturesName;

    if (prevProps.picturesName !== this.props.picturesName) {
      this.fetchFirstPage(NAME);
    }

    if (
      prevState.page !== this.state.page &&
      prevProps.picturesName === this.props.picturesName
    ) {
      this.fetchNextPage(NAME);
    }
  }

  fetchFirstPage = NAME => {
    this.setState({
      status: Status.PENDING,
      ...INITIAL_STATE,
    });

    if (this.state.page === 1) {
      picturesAPI
        .fetchPictures(NAME, this.state.page)
        .then(response => {
          if (response.data.total === 0) {
            toast.warn(
              `Sorry, there are no images matching your search query. Please try again.`
            );
            this.setState({ showButton: false, status: Status.IDLE });
            return;
          }
          if (response.data.hits.length < 12) {
          toast.warn(`Sorry, there are no more images.`);
          this.setState({
            pictures: [...this.state.pictures, ...response.data.hits],
            status: Status.RESOLVED,
            showLoader: false,
            showButton: false,
          })
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
  };

  fetchNextPage = NAME => {
    this.setState({ showLoader: true, showButton: false });
    picturesAPI
      .fetchPictures(NAME, this.state.page)
      .then(response => {
        if (response.data.hits.length < 12) {
          toast.warn(`Sorry, there are no more images.`);
          this.setState({
            pictures: [...this.state.pictures, ...response.data.hits],
            status: Status.RESOLVED,
            showLoader: false,
            showButton: false,
          })
        } else {
          this.setState({
            pictures: [...this.state.pictures, ...response.data.hits],
            status: Status.RESOLVED,
            showLoader: false,
            showButton: true,
          });
        }
      })
      .catch(error => {
        this.setState({ error, status: Status.REJECTED });
      });
  };

  changePage = () => {
    this.setState({ page: this.state.page + 1 });
  };

  toggleModal = picture => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
    this.setState({ bigPicture: picture });
  };

  render() {
    const {
      status,
      error,
      pictures,
      showButton,
      showLoader,
      showModal,
      bigPicture,
    } = this.state;
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
            <ImageGalleryItem pictures={pictures} onClick={this.toggleModal} />
          </ul>
          {showButton && <Button changePage={this.changePage} />}
          {showLoader && <Loader />}
          {showModal && (
            <Modal toggleModal={this.toggleModal} bigPicture={bigPicture} />
          )}
        </div>
      );
    }
  }
}

ImageGallery.propTypes = {
  picturesName: PropTypes.string.isRequired,
};

export default ImageGallery;
