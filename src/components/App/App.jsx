import { Component } from 'react';
import './App.scss';
import { startContacts, ContactForm, Filter, ContactList } from 'components';
import Notiflix from 'notiflix';

Notiflix.Notify.init({ width: 'fit-content', fontSize: '20px' });

export class App extends Component {
  state = {
    contacts: [...startContacts],
    filter: '',
  };

  componentDidMount() {
    const localContacts = localStorage.getItem('contacts');

    if (!localContacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    } else {
      this.setState({ contacts: JSON.parse(localStorage.getItem('contacts')) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleSearch = ({ currentTarget: { value } }) =>
    this.setState({ filter: value });

  handleAddContact = contact => {
    const { contacts } = this.state;

    if (contacts.find(({ name }) => name === contact.name)) {
      return Notiflix.Notify.failure(`${contact.name} is already in contacts.`);
    } else {
      this.setState({
        contacts: [...contacts, contact],
      });
      Notiflix.Notify.success('You have a new contact!');
    }
  };

  handleFilter = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  handleDeleteContact = contactId => {
    const { contacts } = this.state;

    this.setState({ contacts: contacts.filter(({ id }) => id !== contactId) });
  };

  render() {
    const { contacts } = this.state;

    if (contacts.length === 0) Notiflix.Notify.info('No contacts!');
    return (
      <section className="phonebook">
        <h1>Phonebook</h1>
        <ContactForm handleAddContact={this.handleAddContact} />
        <h2>Contacts</h2>
        <Filter handleSearch={this.handleSearch} />

        <ContactList
          contacts={this.handleFilter()}
          handleDeleteContact={this.handleDeleteContact}
        />
      </section>
    );
  }
}
