import './ContactList.scss';
import PropTypes from 'prop-types';

export const ContactList = ({ contacts, deleteContact }) => {
  return (
    <ul className="phonebook__list">
      {contacts.length !== 0 ? (
        contacts.map(({ name, id, number }) => (
          <li key={id}>
            <span>{name}</span>
            <span>{number}</span>
            <button type="button" onClick={() => deleteContact(id)}>
              Delete
            </button>
          </li>
        ))
      ) : (
        <p className="phonebook__info">Sorry, but you have no contacts</p>
      )}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  deleteContact: PropTypes.func.isRequired,
};
