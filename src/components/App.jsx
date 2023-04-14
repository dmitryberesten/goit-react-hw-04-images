import { useState, useEffect } from 'react';
import fetchImages from 'services/api';
import '../index.css';
import Searchbar from './Searchbar/Searchbar';
import Section from './Section/Section';
import ImageGallery from './ImageGallery/ImageGallery';
import ButtonLoadMore from './ButtonLoadMore/ButtonLoadMore';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastPage, setLastPage] = useState(0);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState({
    showModal: false,
    largeImageURL: '',
  });
  const [noResults, setNoResults] = useState(false);

  const handleChange = event => {
    setInputValue(event.target.value);
  };

  const onClickClear = () => {
    setInputValue('');
  };

  const handleSubmit = event => {
    event.preventDefault(); // зупиняємо перезавантаження сторінки

    if (inputValue === '') {
      alert('Please enter your query'); // сповіщення про пустий запит
      return;
    }

    if (query === inputValue) return; // якщо запит не змінився, то нічого не робимо
    setImages([]);
    setQuery(inputValue);
    setPage(1);
  };

  const handleLoadMore = () => { // функція для кнопки "Load more"
    setPage(prevState => prevState + 1);
  };

  const toggleModal = () => {
    setModal(prevState => ({ ...prevState, showModal: !prevState.showModal })); // змінюємо значення showModal на протилежне
  };

  // функція для відкриття модального вікна
  const handleImageClick = largeImageURL => {
    setModal(prevState => ({ ...prevState, largeImageURL }));
    toggleModal();
  };

  useEffect(() => {
    if (page === 0) return;

    const fetchImagesByQuery = async searchQuery => {
      setIsLoading(true); // показуємо лоадер
      setError(null); // очищаємо помилку
      setNoResults(false); // очищаємо сповіщення про відсутність результатів

      try {
        const response = await fetchImages(searchQuery, page);
        setImages(prevState => [...prevState, ...response.hits]);
        setLastPage(Math.ceil(response.totalHits / 12));
        response.totalHits === 0 && setNoResults(true); // якщо результатів немає, то відображаємо сповіщення

      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false); // прибираємо лоадер
      }
    };

    fetchImagesByQuery(query);
  }, [page, query]);

  return (
    <div className="App">
      <Searchbar
        onSubmit={handleSubmit}
        onChange={handleChange}
        onClickClear={onClickClear}
        inputValue={inputValue}
      />
      <Section>

        {/* якщо є помилка, то відображаємо сповіщення */}
        {error && <p className="alertStyle">Something went wrong: {error.message}</p>}

        {/* якщо результатів немає, то відображаємо сповіщення */}
        {noResults && <p className="alertStyle">No results found</p>}

        {/* якщо завантаження, то відображаємо лоадер */}
        {isLoading && <Loader />}
        <ImageGallery images={images} onImageClick={handleImageClick} />
      </Section>

      {/* якщо є результати і не завантаження, то відображаємо кнопку "Load more" */}
      {page < lastPage && !isLoading ? (
        <ButtonLoadMore label="Load more" handleLoadMore={handleLoadMore} />
      ) : (
        <div style={{ height: 40 }}></div>
      )}

      {/* якщо showModal === true, то відображаємо модальне вікно */}
      {modal.showModal && <Modal onClose={toggleModal} largeImageURL={modal.largeImageURL} />}
    </div>
  );
};

export default App;
