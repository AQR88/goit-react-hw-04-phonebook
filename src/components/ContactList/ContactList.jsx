import css from './Conacts.module.css';

const ContactList = ({ createList, onDelete }) => {
  const list = createList.map(({ id, name, number }) => {
    return (
      <li key={id} className={css.list}>
        <span>{name}:</span>
        <span>{number}</span>
        <button type="button" onClick={() => onDelete(id)} className={css.btn}>
          Delete
        </button>
      </li>
    );
  });
  return <ul className={css.contacts}>{list}</ul>;
};

export default ContactList;
