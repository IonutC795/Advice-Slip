import './FavoriteAdvicesModal.css';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DeleteIcon from '@mui/icons-material/Delete';

const FavoriteAdvicesModal = ({ advices, closeModal, onDelete }) => {
  return (
    <div className="favorite-advices-modal-container" onClick={closeModal}>
      <div className="favorite-advices-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className='favorite-advices-modal-title'>
          <AutoAwesomeIcon />
          <h2>Favorited advices</h2>
        </div>
        <div className='favorite-advices-list'>
          {advices.map(advice => (
            <div key={advice.id} className='favorite-advice-item'>
              <p>{advice.content}</p>
              <p className='advice-timestamp'>Added at: {new Date(advice.addedAt).toLocaleString()}</p>
              <button onClick={() => onDelete(advice.id)} className='delete-favorite-button'>
                <DeleteIcon />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoriteAdvicesModal;