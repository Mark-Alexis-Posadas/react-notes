import React from "react";

export const ConfiramationDelete = ({
  submittedNotes,
  handleProceedDelete,
  setIsDelete,
}) => {
  return (
    <div className="flex items-center justify-center fixed w-full top-0 left-0 min-h-screen bg-[rgba(0,0,0,0.4)]">
      <div className="bg-white rounded p-5 w-[600px] text-center">
        {`are you sure to delete ${
          submittedNotes.length > 1 ? "all these notes?" : "this note?"
        }`}
        <div className="flex items-center justify-center mt-5 gap-3">
          <button
            className="text-white rounded p-2 bg-gray-200"
            onClick={() => setIsDelete(false)}
          >
            cancel
          </button>
          <button
            className="text-white rounded p-2 bg-green-400"
            onClick={handleProceedDelete}
          >
            proceed
          </button>
        </div>
      </div>
    </div>
  );
};
