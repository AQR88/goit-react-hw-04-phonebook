import { Component } from 'react';
import Section from './Section/Section';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filtration/Filtration';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  dataInputHandler = data => {
    const { name, number } = data;
    const isExist = this.state.contacts.some(elem => {
      return (
        elem.name.toLowerCase().trim() === name.toLowerCase().trim() ||
        elem.number.trim() === number.trim()
      );
    });

    return isExist
      ? alert(`${name} is already in contacts.`)
      : this.setState(prev => {
          return {
            contacts: [data, ...prev.contacts],
          };
        });
  };

  findByName = evt => {
    this.setState({ filter: evt.target.value.toLowerCase().trim() });
  };

  visibleContacts = () => {
    const { filter, contacts } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
  };

  contactRemover = id => {
    this.setState(prev => {
      return {
        contacts: prev.contacts.filter(contact => contact.id !== id),
      };
    });
  };
  componentDidMount() {
    const contactsArr = localStorage.getItem('contacts');
    // console.log(contactsArr);
    const parsedContacts = JSON.parse(contactsArr);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { filter } = this.state;
    const createContactList = this.visibleContacts();
    return (
      <>
        <Section title="Phonebook">
          <ContactForm onSubmit={this.dataInputHandler} />
        </Section>
        <Section title="Contacts">
          <Filter
            title="Find contacts by name"
            value={filter}
            onChange={this.findByName}
          />
          <ContactList
            createList={createContactList}
            onDelete={this.contactRemover}
          />
        </Section>
      </>
    );
  }
}

export default App;
