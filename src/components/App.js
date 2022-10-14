import { Component } from "react"
import { nanoid } from "nanoid"
import { ContactList } from "./ContactList/ContactList"
import { ContactForm } from "./ContactForm/ContactForm"
import { Filter } from "./Filter/Filter"
import { Wrap } from "./App.styled"
  
export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
        showModal: false,

  }
  
  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }
 componentDidUpdate(_, prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(nextContacts));
    }

    if (nextContacts.length > prevContacts.length && prevContacts.length !== 0) {
      this.toggleModal();
    }
  }
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  changeFilter = (e) => {
    this.setState({ filter: e.currentTarget.value });
  }
  getVisibleFriends = () => {
    const { filter, contacts } = this.state
    const normalizedFilter = filter.toLocaleLowerCase()
    
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter))
  }
  
  addFreind = ({name, number}) => {    
    const { contacts } = this.state
    const contact = {
      id: nanoid(),
      name,
      number,
    }  
    contacts.find(friend => friend.name.toLowerCase() ===   contact.name.toLowerCase())
      ? alert(`${contact.name} is already in contacts.`)
      :this.setState(({ contacts }) => ({
      contacts:[contact, ...contacts]
    }))

  }
  deleteFriend = friendId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== friendId)
    }))
  }

  render() {
    return <Wrap>
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={ this.addFreind}/>
        </div>
      <div>
        <h2>Contacts</h2>
        <Filter
          value={this.state.filter}
          onChange={this.changeFilter} />
        <ContactList
          contacts={this.getVisibleFriends()}
          onDelete={this.deleteFriend}
        />
        
      </div>
      </Wrap>
  }
};
