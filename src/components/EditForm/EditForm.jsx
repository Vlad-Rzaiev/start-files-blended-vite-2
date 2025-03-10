import { RiSaveLine } from 'react-icons/ri';
import { MdOutlineCancel } from 'react-icons/md';
import style from './EditForm.module.css';
// import { CgKey } from 'react-icons/cg';

const EditForm = ({ updateTodo, cancelUpdate, defaultValue: { text } }) => {
  const handleSubmit = e => {
    e.preventDefault();

    const updateData = e.target.elements.text.value.toLowerCase().trim();

    updateTodo(updateData);
    e.target.reset();
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <button className={style.submitButton} type="submit">
        <RiSaveLine color="green" size="16px" />
      </button>

      <button className={style.editButton} type="button" onClick={cancelUpdate}>
        <MdOutlineCancel color="red" size="16px" />
      </button>

      <input
        className={style.input}
        placeholder="What do you want to write?"
        name="text"
        required
        defaultValue={text}
        autoFocus
      />
    </form>
  );
};
export default EditForm;
