import React, { Component } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { searchService } from 'utils/searchService';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { PER_PAGE } from '../utils/searchService';

export class App extends Component {
  state = {
    images: [],
    isloading: false,
    searchValue: '',
    currentPage: 1,
    loadMore: false,
    isOpenModal: false,
    modalData: null,
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.currentPage !== this.state.currentPage ||
      prevState.searchValue !== this.state.searchValue
    ) {
      this.getImages();
    }
  }

  getImages = async () => {
    try {
      this.setState({ isloading: true });
      const { searchValue, currentPage } = this.state;
      const response = await searchService(searchValue, currentPage);

      const newImages = response.hits.map(
        ({ id, webformatURL, largeImageURL, tags }) => ({
          id,
          webformatURL,
          largeImageURL,
          tags,
        })
      );
      this.setState(prevState => ({
        images: [...(prevState.images || []), ...newImages],
      }));

      if (response.totalHits !== 0 && this.state.currentPage === 1) {
        toast.success(`Hooray! We found ${response.totalHits} images!`);
      }
      const totalPage = Math.ceil(response.totalHits / PER_PAGE);

      if (totalPage > currentPage) {
        this.setState({ loadMore: true });
      } else if (totalPage === currentPage && response.totalHits) {
        toast.error("Sorry, but you've reached the end of search results.");
        this.setState({ loadMore: false });
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      this.setState({ isloading: false });
    }
  };

  handleSearch = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const query = form.search.value.trim().toLowerCase();
    if (query === '') {
      toast.error('Sorry, there are no images matching your search query.');
      return;
    }
    this.setState({ searchValue: query, currentPage: 1, images: null });
    form.reset();
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };

  openModal = someDataToModal => {
    this.setState({
      isOpenModal: true,
      modalData: someDataToModal,
    });
  };

  closeModal = () => {
    this.setState({
      isOpenModal: false,
      modalData: null,
    });
  };

  render() {
    const { images, isloading } = this.state;

    return (
      <div className="container">
        <Searchbar onSubmit={this.handleSearch} />

        {images && images.length > 0 && (
          <ImageGallery images={images} openModal={this.openModal} />
        )}

        {this.state.loadMore && <Button onClick={this.handleLoadMore} />}

        {isloading && <Loader />}

        <ToastContainer
          autoClose={5000}
          position="top-right"
          containerClassName="text-base"
        />

        {this.state.modalData !== null && (
          <Modal
            closeModal={this.closeModal}
            modalData={this.state.modalData}
          />
        )}
      </div>
    );
  }
}
