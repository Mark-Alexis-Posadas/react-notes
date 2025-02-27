import { useEffect, useState } from "react";
import { backgroundColorData } from "../data"; // data
import { NoteItem } from "./NoteItem";
import { ConfiramationDelete } from "./Delete";
import { NoteColors } from "./NoteColors";

export const Notes = ({ submittedNotes, setSubmittedNotes }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [validationErrors, setValidationErrors] = useState({
    title: false,
    description: false,
    color: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [activeBgColor, setActiveBgColor] = useState(null);
  const [fieldsBgColor, setFieldsBgColor] = useState(null);

  const [isDelete, setIsDelete] = useState(false);
  const [isSingleDelete, setIsSingleDelete] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [editColor, setEditColor] = useState(null);
  const [noteTitle, setNoteTitle] = useState("");

  const handleSetBgColor = (index) => {
    const selectedColor = backgroundColorData[index].color;
    setActiveBgColor(index);
    setValidationErrors((prev) => ({ ...prev, color: false }));
    setFieldsBgColor(selectedColor);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setValidationErrors((prev) => ({ ...prev, title: false }));
  };

  const handleTextChange = (e) => {
    setDescription(e.target.value);
    setValidationErrors((prev) => ({ ...prev, text: false }));
  };

  const handleToggleDelete = () => {
    setIsDelete(true);
  };

  const handleSingleDelete = (index) => {
    const title = [...submittedNotes];
    const test = title[index].title;
    setNoteTitle(test);
    setIsDelete(true);
    setIsSingleDelete(true);
    setDeleteIndex(index);
    console.log(noteTitle);
  };
  const handleProceedDelete = () => {
    setIsDelete(false);
    if (isSingleDelete) {
      const deleteNote = submittedNotes.filter((_, idx) => idx !== deleteIndex);
      setSubmittedNotes(deleteNote);
      setIsSingleDelete(false);
    } else {
      setSubmittedNotes([]);
      setIsEditing(false);
      setTitle("");
      setDescription("");
      setActiveBgColor(null);
    }
  };

  const handleEdit = (idx) => {
    if (width <= 768) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const notesCopy = [...submittedNotes];
    const selectedNoteBgColor = notesCopy[idx].bgColor;
    setFieldsBgColor(selectedNoteBgColor);

    setEditIndex(idx);
    const inputEditVal = submittedNotes[idx];
    setTitle(inputEditVal.title);
    setDescription(inputEditVal.description);
    setIsEditing(true);

    setActiveBgColor(
      backgroundColorData.findIndex(
        (color) => color.color === inputEditVal.bgColor
      )
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = {
      title: !title,
      description: !description,
      color: activeBgColor === null,
    };
    setValidationErrors(errors);
    setFieldsBgColor(null);
    if (errors.title || errors.description || errors.color) return;

    if (isEditing) {
      const editVal = submittedNotes.map((item, index) =>
        index === editIndex
          ? {
              title,
              description,
              bgColor: backgroundColorData[activeBgColor].color,
            }
          : item
      );
      setSubmittedNotes(editVal);
      setIsEditing(false);
    } else {
      const notes = {
        title: title,
        description: description,
        bgColor: backgroundColorData[activeBgColor].color,
      };

      setSubmittedNotes((prev) => [...prev, notes]);
    }

    setTitle("");
    setDescription("");
    setActiveBgColor(null);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col md:flex-row p-5 md:p-10 gap-4 xl:max-w-[1920px] xl:m-auto">
        <div>
          <form
            className="bg-slate-50 shadow-md p-5 w-full md:w-[300px] lg:w-[500px] flex flex-col"
            onSubmit={handleFormSubmit}
          >
            <input
              onChange={handleTitleChange}
              value={title}
              type="text"
              className={`${fieldsBgColor} ${
                isEditing ? "text-white" : "text-gray-500"
              } border-b mb-3 p-4 outline-none ${
                validationErrors.title ? "border-red-500" : "border-slate-300"
              }`}
              placeholder="Enter your title"
            />
            <textarea
              onChange={handleTextChange}
              value={description}
              className={`${fieldsBgColor} ${
                isEditing ? "text-white" : "text-gray-500"
              } border-b mb-3 p-4 outline-none ${
                validationErrors.description
                  ? "border-red-500"
                  : "border-slate-300"
              }`}
              placeholder="Enter your note text."
            ></textarea>

            <div
              className={`flex items-center justify-between flex-wrap ${
                isEditing && "gap-3"
              }`}
            >
              <div
                className={`flex items-center gap-2 flex-wrap mb-5 md:flex-row lg:mb-0 ${
                  validationErrors.color ? "border p-2 border-red-500" : ""
                }`}
              >
                {backgroundColorData.map((color, index) => (
                  <NoteColors
                    key={index}
                    index={index}
                    color={color}
                    setEditColor={setEditColor}
                    handleSetBgColor={handleSetBgColor}
                    activeBgColor={activeBgColor}
                  />
                ))}
              </div>
              <div className="flex items-center gap-3">
                {isEditing && (
                  <button
                    className="text-white rounded p-2 bg-gray-200"
                    onClick={() => {
                      setIsEditing(false);
                      setTitle("");
                      setDescription("");
                      setActiveBgColor(null);
                      setFieldsBgColor(null);
                    }}
                  >
                    cancel
                  </button>
                )}

                <button
                  type="submit"
                  className="text-white p-2 rounded bg-green-400"
                >
                  {isEditing ? "Update note" : "Add note"}
                </button>
              </div>
            </div>
          </form>
        </div>

        {submittedNotes.length === 0 ? (
          "Please Add Note"
        ) : (
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-5: md:mt-0">
              {submittedNotes.map((note, index) => (
                <NoteItem
                  idx={index}
                  key={index}
                  note={note}
                  noteBgColor={note.bgColor}
                  handleSingleDelete={handleSingleDelete}
                  handleEdit={handleEdit}
                />
              ))}
            </div>

            {submittedNotes.length <= 1 ? null : (
              <button
                className="text-white bg-red-600 rounded p-2 mt-10"
                onClick={handleToggleDelete}
              >
                {submittedNotes.length <= 1
                  ? "Delete note"
                  : "Delete all notes"}
              </button>
            )}

            {isDelete && (
              <ConfiramationDelete
                isSingleDelete={isSingleDelete}
                setIsSingleDelete={setIsSingleDelete}
                handleProceedDelete={handleProceedDelete}
                submittedNotes={submittedNotes}
                setIsDelete={setIsDelete}
                noteTitle={noteTitle}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
};
