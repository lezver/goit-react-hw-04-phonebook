import './ContactForm.scss';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { useState } from 'react';

export const ContactForm = ({ addContact }) => {
  const [name, getName] = useState('');
  const [number, getNumber] = useState('');

  const handleForm = e => {
    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    e.preventDefault();

    addContact(newContact);

    e.target.reset();
  };

  const handleChangeValue = ({ currentTarget: { name, value } }) => {
    switch (name) {
      case 'name':
        return getName(value);
      case 'number':
        return getNumber(value);
      default:
        return;
    }
  };

  return (
    <form className="phonebook__form" onSubmit={handleForm}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChangeValue}
        />
      </label>
      <label>
        Number:
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChangeValue}
        />
      </label>
      <button type="submit">Add contact</button>
    </form>
  );
};

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};
