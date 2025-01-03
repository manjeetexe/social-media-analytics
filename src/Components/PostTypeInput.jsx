import React, { useState } from 'react';

const PostTypeInput = () => {
    const [postType, setPostType] = useState('');
    const [metrics, setMetrics] = useState(null);
    const [insight, setInsight] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchData = async (postType) => {
        try {
            setIsSubmitting(true);
            const response = await fetch('http://localhost:8000/analyze-post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ postType }),
            });
            const data = await response.json();
            setMetrics(data.metrics);
            setInsight(data.insight);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData(postType);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-center">Analyze Post Performance</h2>
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
                <div className="text-center">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {isSubmitting ? 'Analyzing...' : 'Analyze Post'}
                    </button>
                </div>
            </form>

            {metrics && (
                <div className="mt-6">
                    <h3 className="font-semibold">Metrics:</h3>
                    <div className="text-sm text-gray-600">
                        <p>Likes: {metrics.likes}</p>
                        <p>Shares: {metrics.shares}</p>
                        <p>Comments: {metrics.comments}</p>
                    </div>
                </div>
            )}
            {insight && (
                <div className="mt-4">
                    <h3 className="font-semibold">Insight:</h3>
                    <p className="text-gray-700">{insight}</p>
                </div>
            )}
        </div>
    );
};

export default PostTypeInput;