import React, { Component } from "react";
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
      if (event.code === 'Escape') {
      this.props.toggleModal();
    }
  };

    handleBackdropClick = event => {
      if (event.currentTarget === event.target) {
      this.props.toggleModal();
    }
    };
    
    render() {
        console.log(this.props.bigPicture.largeImageURL)
        return createPortal(
            <div className={s.overlay} onClick={this.handleBackdropClick}>
                <div className={s.modal}>
                    <img src={this.props.bigPicture.largeImageURL} alt={this.props.bigPicture.tags} />
                </div>
            </div>, modalRoot
        );
    }
} 

export default Modal;

