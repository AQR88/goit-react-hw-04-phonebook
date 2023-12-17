import { useState, useEffect } from 'react';
import Section from './Section/Section';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filtration from './Filtration/Filtration';

const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  const dataInputHandler = data => {
    const { name, number } = data;
    const isExist = contacts.some(
      elem =>
        elem.name.toLowerCase().trim() === name.toLowerCase().trim() ||
        elem.number.trim() === number.trim()
    );
    if (isExist) {
      alert(`${name} is already in contacts.`);
    } else {
      setContacts(prevContacts => [data, ...prevContacts]);
    }
  };

  const findByName = evt => {
    setFilter(evt.target.value.toLowerCase().trim());
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter)
  );

  const contactRemover = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    const contactsArr = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contactsArr);
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  return (
    <>
      <Section title="Phonebook">
        <ContactForm onSubmit={dataInputHandler} />
      </Section>
      <Section title="Contacts">
        <Filtration
          title="Find contacts by name"
          value={filter}
          onChange={findByName}
        />
        <ContactList createList={filteredContacts} onDelete={contactRemover} />
      </Section>
    </>
  );
};

export default App;
