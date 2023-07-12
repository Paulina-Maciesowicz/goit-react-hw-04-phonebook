import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
    name: '',
    number: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const newContact = {
      name: this.state.name,
      number: this.state.number,
      id: nanoid(),
    };
    if (this.state.contacts.find(contact => contact.name === newContact.name)) {
      alert(`${this.state.name} is already in contacts`);
      return;
    }
    localStorage.setItem(
      'contacts',
      JSON.stringify([...this.state.contacts, newContact])
    );
    this.setState({ contacts: [...this.state.contacts, newContact] });
    e.target.reset();
  };

  handleDelete = id => {
    const filteredContacts = this.state.contacts.filter(
      contact => contact.id !== id
    );
    localStorage.setItem('contacts', JSON.stringify(filteredContacts));
    this.setState({ contacts: filteredContacts });
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts) {
      this.setState({ contacts });
    }
  }

  render() {
    const { contacts } = this.state;

    return (
      <>
        <h1>Phonebook</h1>
        <ContactForm
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
        />
        <h2>Contacts</h2>
        <Filter onChange={this.handleChange} />
        <ContactList
          contacts={contacts}
          filter={this.state.filter}
          onClick={this.handleDelete}
        />
      </>
    );
  }
}
