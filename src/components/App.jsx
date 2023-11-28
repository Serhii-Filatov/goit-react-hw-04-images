import { useState, useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { searchService } from 'utils/searchService';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { PER_PAGE } from '../utils/searchService';

export const App = () => {
  const [imageArray, setImageArray] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalData, setModalData] = useState(false);

  useEffect(() => {
    async function fetchImages() {
      try {
        setIsLoading(true);

        const response = await searchService(searchValue, currentPage);
        const newImages = response.hits;

        if (newImages.length === 0) {
          setLoadMore(false);
          toast.warning(
            `Sorry, there are no images matching your search query. Please try again.`
          );
          return;
        }

        setImageArray(prevImages => [...prevImages, ...newImages]);

        if (response.totalHits !== 0 && currentPage === 1) {
          toast.success(`Hooray! We found ${response.totalHits} images!`);
        }

        const totalPage = Math.ceil(response.totalHits / PER_PAGE);

        if (totalPage > currentPage) {
          setLoadMore(true);
        } else if (totalPage === currentPage && response.totalHits) {
          toast.error(`Sorry, but you've reached the end of search results.`);
          setLoadMore(false);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (!searchValue) return;
    fetchImages();
  }, [searchValue, currentPage]);

  const handleSearch = event => {
    event.preventDefault();

    const form = event.currentTarget;
    const query = form.search.value.trim().toLowerCase();

    if (query === '') {
      toast.warning(`Sorry, the query can't be empty, enter some value.`);
      return;
    } else if (query === searchValue) {
      toast.error(`Please enter a new search.`);
      return;
    } else {
      setSearchValue(query);
      setCurrentPage(1);
      setImageArray([]);
    }
  };

  const handleLoadMore = () => {
    setCurrentPage(prevState => prevState + 1);
  };

  const openModal = someDataToModal => {
    setIsOpenModal(true);
    setModalData(someDataToModal);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setModalData(null);
  };

  return (
    <div className="container">
      <Searchbar onSubmit={handleSearch} />
      {isloading && <Loader />}

      {imageArray.length > 0 && (
        <ImageGallery images={imageArray} openModal={openModal} />
      )}

      {loadMore && <Button onClick={handleLoadMore} />}

      <ToastContainer
        autoClose={5000}
        position="top-right"
        containerClassName="text-base"
      />

      {isOpenModal && <Modal closeModal={closeModal} modalData={modalData} />}
    </div>
  );
};
