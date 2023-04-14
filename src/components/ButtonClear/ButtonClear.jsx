import css from './ButtonClear.module.css';
import PropTypes from 'prop-types';

const ButtonClear = ({ onClickClear }) => (
  <button
    type="button"
    className={css.ButtonClear}
    onClick={onClickClear}
  ></button>
);

ButtonClear.propTypes = {
  onClickClear: PropTypes.func,
};

export default ButtonClear;