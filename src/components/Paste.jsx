import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromPastes } from '../assets/redux/pasteSlice';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt, FaCopy, FaShareAlt, FaEye } from 'react-icons/fa';

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  const filterData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(search.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
    toast.error('Paste deleted!');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f1f1] to-[#e8eae6] p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-[#3e4a61]">Manage Pastes</h1>
      <input
        className="p-3 rounded-lg w-3/4 max-w-lg border border-[#d1d5db] bg-[#ffffff] focus:ring-2 focus:ring-[#a3c4f3] mb-6"
        type="search"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="w-full max-w-4xl">
        {filterData.length > 0 ? (
          filterData.map((paste) => (
            <div
              key={paste?._id}
              className="bg-[#ffffff] shadow-md rounded-lg p-6 mb-6 border border-[#e2e8f0]"
            >
              <h2 className="text-2xl font-semibold text-[#3e4a61] truncate">
                {paste.title}
              </h2>
              <p className="text-[#4a5568] mt-3 whitespace-pre-wrap text-lg">
                {paste.content}
              </p>
              <div className="flex items-center gap-4 mt-4">
                <Link to={`/?PasteId=${paste._id}`}>
                  <button
                    className="p-2 bg-[#90be6d] text-white rounded-full hover:bg-[#74a657] transition"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                </Link>

                <Link to={`/pastes/${paste._id}`}>
                  <button
                    className="p-2 bg-[#f4a261] text-white rounded-full hover:bg-[#e08a45] transition"
                    title="View"
                  >
                    <FaEye />
                  </button>
                </Link>

                <button
                  onClick={() => handleDelete(paste._id)}
                  className="p-2 bg-[#e63946] text-white rounded-full hover:bg-[#c62e3a] transition"
                  title="Delete"
                >
                  <FaTrashAlt />
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(paste.content);
                    toast.success('Copied to clipboard!');
                  }}
                  className="p-2 bg-[#457b9d] text-white rounded-full hover:bg-[#35657b] transition"
                  title="Copy"
                >
                  <FaCopy />
                </button>

                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator
                        .share({
                          title: 'Paste Content',
                          text: paste.content,
                          url: window.location.href,
                        })
                        .then(() => console.log('Shared successfully!'))
                        .catch((error) => console.error('Error sharing:', error));
                    } else {
                      alert('Sharing is not supported on this browser.');
                    }
                  }}
                  className="p-2 bg-[#f2cc8f] text-[#3e4a61] rounded-full hover:bg-[#e3b976] transition"
                  title="Share"
                >
                  <FaShareAlt />
                </button>
              </div>
              <div className="text-sm text-[#9a8c98] mt-3">
                Created at: {new Date(paste.createAt).toLocaleString()}
              </div>
            </div>
          ))
        ) : (
          <div className="text-[#9a8c98] text-center">
            No pastes found. Try searching for something else.
          </div>
        )}
      </div>
    </div>
  );
};

export default Paste;
