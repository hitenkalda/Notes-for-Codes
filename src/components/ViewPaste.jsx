import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);

  const paste = allPastes.find((paste) => paste._id === id);

  if (!paste) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-red-500 text-xl font-bold">Paste not found!</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">View Paste</h1>
        <div className="mb-6">
          <label className="block text-gray-600 text-sm font-medium mb-2">
            Title
          </label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800"
            value={paste.title}
            disabled
          />
        </div>
        <div>
          <label className="block text-gray-600 text-sm font-medium mb-2">
            Content
          </label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800"
            value={paste.content}
            rows={10}
            disabled
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;
