import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToPastes, updateToPastes } from '../assets/redux/pasteSlice';

const Home = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get('PasteId');
  const dispatch = useDispatch();

  // Fetch the existing paste from Redux if editing
  const pastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const pasteToEdit = pastes.find((paste) => paste._id === pasteId);
      if (pasteToEdit) {
        setTitle(pasteToEdit.title);
        setValue(pasteToEdit.content);
      }
    }
  }, [pasteId, pastes]);

  function createPaste() {
    const paste = {
      title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle('');
    setValue('');
    setSearchParams({});
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-700 mb-8 text-center">
          {pasteId ? 'Edit Your Code Paste' : 'Create a New Code Paste'}
        </h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-600 mb-2">
              Code Title
            </label>
            <input
              type="text"
              placeholder="Enter a descriptive title for your code"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-600 mb-2">
              Code Content
            </label>
            <textarea
              placeholder="Enter your code here"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={value}
              rows={12}
              onChange={(e) => setValue(e.target.value)}
            ></textarea>
          </div>
          <button
            onClick={createPaste}
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all duration-300"
          >
            {pasteId ? 'Update Code' : 'Create Code'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
