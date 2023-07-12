import { ContactListItem } from './ContactListItem/ContactListItem';
import css from './ContactList.module.css';
import PropTypes from 'prop-types';

export const ContactList = ({ contacts, filter, onClick }) => (
  <ul className={css.list}>
    {contacts
      .filter(contact =>
        contact.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
      )
      .map(contact => (
        <li className={css.item} key={contact.id}>
          <ContactListItem
            id={contact.id}
            number={contact.number}
            name={contact.name}
            onClick={onClick}
          />
        </li>
      ))}
  </ul>
);

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
