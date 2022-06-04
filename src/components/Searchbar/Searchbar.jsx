import React, { Component } from "react";
import { FcSearch } from "react-icons/fc";
import { toast } from 'react-toastify';
import s from './Searchbar.module.css';


export default class Searchbar extends Component {
 state = {
    picturesName: '',
    }

handlePictureChange = event => {
    this.setState({picturesName: event.currentTarget.value.toLowerCase()})
    }
    
handleSubmit = event => {
    event.preventDefault();
    if (this.state.picturesName.trim() === '') {
    return toast.error('non name');
    }
    this.props.onSubmit(this.state.picturesName);
    this.setState({ picturesName: '' });
}

    render() {
    return (<header className={s.searchbar}>
  <form className={s.form} onSubmit={this.handleSubmit}>
    <button type="submit" className={s.button}>
      <span className={s.buttonLable}><FcSearch size="20"/></span>
    </button>

    <input
      className={s.input}
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
      onChange={this.handlePictureChange}
            />
        </form>
                
        </header>)
        
}
} 