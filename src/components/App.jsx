import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';

export const App = () => {
  const [state, setState] = useState({
    contacts: [],
    filter: '',
    name: '',
    number: '',
  });

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(state.contacts));
  }, [state.contacts]);

  useEffect(() => {
    const contactsSave = JSON.parse(localStorage.getItem('contacts'));
    console.log(contactsSave);
    if (contactsSave) {
      setState(prevState => ({
        ...prevState,
        contacts: [...contactsSave],
      }));
    }
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newContact = {
      name: state.name,
      number: state.number,
      id: nanoid(),
    };
    if (state.contacts.find(contact => contact.name === newContact.name)) {
      alert(`${state.name} is already in contacts`);
      return;
    }

    setState(prevState => ({
      ...prevState,
      contacts: [...state.contacts, newContact],
    }));
    e.target.reset();
  };

  const handleDelete = id => {
    const filteredContacts = state.contacts.filter(
      contact => contact.id !== id
    );

    setState(prevState => ({
      ...prevState,
      contacts: filteredContacts,
    }));
  };

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleSubmit} onChange={handleChange} />
      <h2>Contacts</h2>
      <Filter onChange={handleChange} />
      <ContactList
        contacts={state.contacts}
        filter={state.filter}
        onClick={handleDelete}
      />
    </>
  );
};
