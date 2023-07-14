import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';

export const App = () => {
  // const [state, setState] = useState({
  //   contacts: [],
  //   filter: '',
  //   name: '',
  //   number: '',
  // });

  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    const contactsSave = JSON.parse(localStorage.getItem('contacts'));
    console.log(contactsSave);
    if (contactsSave) {
      setContacts(prevState => [prevState, ...contactsSave]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleChange = e => {
    const { name, value } = e.target;
    setName(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newContact = {
      name: name,
      number: number,
      id: nanoid(),
    };
    if (contacts.find(contact => contact.name === newContact.name)) {
      alert(`${name} is already in contacts`);
      return;
    }

    setContacts(prevState => ({
      ...prevState,
      contacts: [...contacts, newContact],
    }));
    e.target.reset();
  };

  const handleDelete = id => {
    const filteredContacts = contacts.filter(contact => contact.id !== id);

    setFilter(prevState => ({
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
      <ContactList contacts={contacts} filter={filter} onClick={handleDelete} />
    </>
  );
};
