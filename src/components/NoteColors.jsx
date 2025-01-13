import React from "react";

export const NoteColors = ({
  index,
  color,
  setEditColor,
  handleSetBgColor,
  activeBgColor,
}) => {
  return (
    <button
      onClick={() => {
        handleSetBgColor(index), setEditColor(index);
      }}
      key={index}
      type="button"
      className={`w-[30px] h-[30px] rounded-full border-sky-500 border ${color.color}`}
      style={{
        border: activeBgColor === index ? "2px solid #222" : "",
      }}
    ></button>
  );
};
