import React, { useState } from 'react';

const SubmitEngagement = () => {
    const [postType, setPostType] = useState('');
    const [likes, setLikes] = useState(0);
    const [shares, setShares] = useState(0);
    const [comments, setComments] = useState(0);
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const resetForm = () => {
        setPostType('');
        setLikes(0);
        setShares(0);
        setComments(0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('http://localhost:8000/api/save-post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ postType, likes, shares, comments }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setMessage(data.message || 'Post saved successfully');
            resetForm();
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error saving data. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-center">Submit Engagement Data</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Post Type</label>
                    <input
                        type="text"
                        value={postType}
                        onChange={(e) => setPostType(e.target.value)}
                        className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4 grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Likes</label>
                        <input
                            type="number"
                            value={likes}
                            onChange={(e) => setLikes(Math.max(0, e.target.value))}
                            className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Shares</label>
                        <input
                            type="number"
                            value={shares}
                            onChange={(e) => setShares(Math.max(0, e.target.value))}
                            className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Comments</label>
                        <input
                            type="number"
                            value={comments}
                            onChange={(e) => setComments(Math.max(0, e.target.value))}
                            className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>
                <div className="text-center">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </form>

            {message && (
                <div className="mt-4 text-center">
                    <p className={message.includes('Error') ? 'text-red-500' : 'text-green-500'}>{message}</p>
                </div>
            )}
        </div>
    );
};

export default SubmitEngagement;