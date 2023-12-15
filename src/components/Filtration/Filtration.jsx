import css from './filtration.module.css';

const Filtration = ({ title, onChange, value }) => {
  return (
    <label className={css.label}>
      {title !== false && <h3 className={css.title}>{title}</h3>}
      <input
        type="text"
        name="filter"
        value={value}
        placeholder="Search"
        onChange={onChange}
      />
    </label>
  );
};

export default Filtration;
