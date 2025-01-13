import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const NoteItem = ({ idx, handleEdit, note, noteBgColor }) => {
  return (
    <div className={`${noteBgColor} p-2 rounded flex flex-col justify-between`}>
      <h1 className="font-bold mb-2 text-white text-md">{note.title}</h1>
      <p className="text-sm text-gray-50 mb-auto">{note.description}</p>
      <div className="flex items-center justify-end gap-3">
        <button
          className="w-[30px] h-[30px] rounded-full bg-white flex items-center justify-center"
          onClick={() => handleEdit(idx)}
        >
          <FontAwesomeIcon icon={faPencilAlt} />
        </button>
        <button className="w-[30px] h-[30px] rounded-full bg-white flex items-center justify-center">
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};
