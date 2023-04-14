import css from './Section.module.css';
import PropTypes from 'prop-types';

const Section = ({ children }) => (
  <section className={css.Section}>{children}</section>
);

Section.propTypes = {
  children: PropTypes.node,
};

export default Section;
