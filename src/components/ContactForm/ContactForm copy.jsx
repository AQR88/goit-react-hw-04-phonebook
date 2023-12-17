import { Component } from 'react';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  handlerInputChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ id: nanoid(), [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.reset();
  };
  render() {
    return (
      <>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <label className={css.label}>
            Name
            <input
              type="text"
              name="name"
              placeholder="Add name"
              value={this.state.name}
              onChange={this.handlerInputChange}
            />
          </label>
          <label className={css.label}>
            Number
            <input
              type="tel"
              name="number"
              placeholder="Add number"
              value={this.state.number}
              onChange={this.handlerInputChange}
            />
          </label>
          <button type="submit" className={css.btn}>
            Add Contact
          </button>
        </form>
      </>
    );
  }
}

export default ContactForm;
