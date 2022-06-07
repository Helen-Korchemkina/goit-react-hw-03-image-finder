import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import s from './App.module.css';

export default class App extends Component {
  state = {
    picturesName: '',
  };

  handleFormSubmit = picturesName => {
    this.setState({ picturesName });
  };

  render() {
    const formSubmit = this.handleFormSubmit;
    const { picturesName } = this.state;
    return (
      <div className={s.app}>
        <Searchbar onSubmit={formSubmit} />
        <ImageGallery picturesName={picturesName} />
        <ToastContainer position="top-center" theme="colored" />
      </div>
    );
  }
}
