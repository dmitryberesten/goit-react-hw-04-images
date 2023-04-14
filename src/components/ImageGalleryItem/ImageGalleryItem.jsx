import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ webformatURL, largeImageURL, onImageClick }) => (
  <li className={css.imageGalleryItem}>
    <img
      src={webformatURL}
      alt=""
      className={css.imageGalleryItemImage}
      onClick={() => onImageClick(largeImageURL)}
    />
  </li>
);

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  onImageClick: PropTypes.func,
};

export default ImageGalleryItem;
