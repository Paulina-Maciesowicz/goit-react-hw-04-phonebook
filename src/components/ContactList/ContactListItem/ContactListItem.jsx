import PropTypes from 'prop-types';
import css from './ContactListItem.module.css';

export const ContactListItem = ({ id, number, name, onClick }) => (
  <>
    <span>
      {name}: {number}
    </span>
    <button className={css.btnDelete}  type="button" onClick={() => onClick(id)}>
      Delete
    </button>
  </>
);

ContactListItem.propTypes = {
  id: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
