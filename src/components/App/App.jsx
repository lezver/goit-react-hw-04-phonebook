import './App.scss';
import { ContactForm, Filter, ContactList, startContacts } from 'components';
import Notiflix from 'notiflix';
import { useEffect, useState } from 'react';

Notiflix.Notify.init({ width: 'fit-content', fontSize: '20px' });
const STOREG_KEY = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem(STOREG_KEY)) ?? startContacts
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(STOREG_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const handleSearch = ({ currentTarget: { value } }) => setFilter(value);

  const handleAddContact = contact => {
    if (contacts.find(({ name }) => name === contact.name)) {
      return Notiflix.Notify.failure(`${contact.name} is already in contacts.`);
    } else {
      setContacts([...contacts, contact]);
      Notiflix.Notify.success('You have a new contact!');
    }
  };

  const handleFilter = () => {
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const handleDeleteContact = contactId => {
    setContacts([...contacts.filter(({ id }) => id !== contactId)]);
  };

  return (
    <section className="phonebook">
      <h1>Phonebook</h1>
      <ContactForm addContact={handleAddContact} />
      <h2>Contacts</h2>
      <Filter search={handleSearch} />

      <ContactList
        contacts={handleFilter()}
        deleteContact={handleDeleteContact}
      />
    </section>
  );
};
