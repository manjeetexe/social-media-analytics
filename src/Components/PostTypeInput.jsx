import React, { useState } from 'react';

const PostTypeInput = ({ onAnalyze }) => {
    const [postType, setPostType] = useState('');

    const handleAnalyze = () => {
        if (postType) {
            onAnalyze(postType);
        } else {
            alert('Please select a post type');
        }
    };

    return (
        <div className="p-6 bg-white shadow-md rounded-md">
            <label htmlFor="postType" className="block font-bold mb-2">
                Select Post Type:
            </label>
            <select
                id="postType"
                value={postType}
                onChange={(e) => setPostType(e.target.value)}
                className="block w-full border border-gray-300 rounded-md p-2 mb-4"
            >
                <option value="">--Select--</option>
                <option value="carousel">Carousel</option>
                <option value="reels">Reels</option>
                <option value="static">Static Image</option>
            </select>
            <button
                onClick={handleAnalyze}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
                Analyze
            </button>
        </div>
    );
};

export default PostTypeInput;