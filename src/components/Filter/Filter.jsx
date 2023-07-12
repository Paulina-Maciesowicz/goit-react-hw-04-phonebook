import PropTypes from 'prop-types';
import css from './Filter.module.css';

export const Filter = ({ onChange }) => (
  <>
    <p className={css.filterTitle}>Find contact by name</p>
    <input
      type="text"
      name="filter"
      onChange={onChange}
      className={css.formInput}
    />
  </>
);

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
};
