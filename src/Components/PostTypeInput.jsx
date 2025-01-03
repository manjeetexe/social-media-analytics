import React, { useState } from 'react';

const AnalyzePost = () => {
    const [postType, setPostType] = useState('');
    const [insights, setInsights] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchInsights = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8000/api/analyze-post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ postType }),  // Send postType to backend
            });

            const data = await response.json();

            if (response.ok) {
                setInsights(data.insights.join('\n'));  // Display insights as a string
            } else {
                setInsights('No insights available. Try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setInsights('Error analyzing data. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-center">Analyze Post Engagement</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Post Type</label>
                <select
                    value={postType}
                    onChange={(e) => setPostType(e.target.value)}
                    className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    required
                >
                    <option value="">Select Post Type</option>
                    <option value="carousel">Carousel</option>
                    <option value="reels">Reels</option>
                    <option value="static">Static Image</option>
                </select>
            </div>
            <div className="text-center">
                <button
                    onClick={fetchInsights}
                    disabled={!postType}
                    className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {isLoading ? 'Analyzing...' : 'Analyze Post'}
                </button>
            </div>

            {insights && (
                <div className="mt-4 text-center">
                    <p className="text-green-500">{insights}</p>
                </div>
            )}
        </div>
    );
};

export default AnalyzePost;