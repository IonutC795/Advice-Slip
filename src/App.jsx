import './App.css';
import { useState, useEffect } from 'react';
import dice from './assets/dice.svg';
import { initialAdvice } from './initialAdvice';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteAdvicesModal from './components/FavorieAdvicesModal/FavoriteAdvicesModal';
import AddAdviceForm from './components/AddAdviceForm/AddAdviceForm';

const App = () => {
  const storedFavorites = JSON.parse(localStorage.getItem('favoriteAdvices')) || [];
  const [advice, setAdvice] = useState(initialAdvice);
  const [isLoading, setIsLoading] = useState(false);
  const [favoriteAdvices, setFavoriteAdvices] = useState(storedFavorites);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('favoriteAdvices', JSON.stringify(favoriteAdvices));
  }, [favoriteAdvices]);

  const currentAdviceIsAddedToFavorite = favoriteAdvices.some(favoriteAdvice => favoriteAdvice.id === advice.id);

  const generateAdvice = async () => {
    setIsLoading(true);
    try {
      const serverResponse = await fetch('https://api.adviceslip.com/advice');
      const { slip: { id, advice } } = await serverResponse.json();
      setAdvice({ id, content: advice });
    } catch (e) {
      alert('An error occurred, try again later!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToFavorites = () => {
    setFavoriteAdvices(prevFavorites => {
      const isAlreadyFavorite = prevFavorites.some(favoriteAdvice => favoriteAdvice.id === advice.id);
      if (isAlreadyFavorite) {
        return prevFavorites.filter(favoriteAdvice => favoriteAdvice.id !== advice.id);
      } else {
        return [...prevFavorites, { ...advice, addedAt: new Date().toISOString() }];
      }
    });
  };

  const handleAddCustomAdvice = (customAdvice) => {
    setFavoriteAdvices(prevFavorites => [...prevFavorites, { ...customAdvice, addedAt: new Date().toISOString() }]);
  };

  const handleOpenModal = () => setModalIsOpen(true);
  const handleCloseModal = () => setModalIsOpen(false);

  const handleDeleteFavorite = (id) => {
    setFavoriteAdvices(prevFavorites => prevFavorites.filter(favoriteAdvice => favoriteAdvice.id !== id));
  };

  return (
    <div className='app-container'>
      <button onClick={handleOpenModal} className='show-favorites-buttons'> Show favorites </button>
      {modalIsOpen && <FavoriteAdvicesModal closeModal={handleCloseModal} advices={favoriteAdvices} onDelete={handleDeleteFavorite} />}
      <div className='advice-card-container'>
        <button onClick={handleAddToFavorites} className='add-to-favorites-button'>
          {currentAdviceIsAddedToFavorite ? (
            <FavoriteIcon sx={{ color: 'var(--lightGreen)' }} />
          ) : (
            <FavoriteBorderIcon sx={{ color: 'var(--lightGreen)' }} />
          )}
        </button>
        <p className='advice-id'>ADVICE #{advice.id}</p>
        <p className='advice-content'>{advice.content}</p>
        <div className='separator-container'>
          <hr className='horizontal-line' />
          <div className='vertical-lines-container'>
            <hr className='vertical-line' />
            <hr className='vertical-line' />
          </div>
          <hr className='horizontal-line' />
        </div>
        <button
          disabled={isLoading}
          onClick={generateAdvice}
          className='generate-advice-button'
        >
          {isLoading ? (
            <div className='spinner'></div>
          ) : (
            <img src={dice} alt="Dice Icon" />
          )}
        </button>
      </div>
      <AddAdviceForm onAddAdvice={handleAddCustomAdvice} />
    </div>
  );
}

export default App;