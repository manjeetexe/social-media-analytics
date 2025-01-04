import React, { useState } from 'react';


const formatNumber = (num) => {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    } else {
        return num; 
    }
};

const AnalyzePost = () => {
    const [postType, setPostType] = useState('');
    const [insights, setInsights] = useState('');
    const [averageMetrics, setAverageMetrics] = useState(null); 
    const [comparativeInsights, setComparativeInsights] = useState(null); 
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const fetchInsights = async () => {
        setIsLoading(true);
        setSuccessMessage('');  
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/run-model`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ postType }),
            });

            const data = await response.json();
            const result = JSON.parse(data.outputs?.[0].outputs?.[0].results.message.text);
            

            
            setAverageMetrics(result["Average Metrics"]);
            
           
            setComparativeInsights(result["Comparative Insights"]);

            if (response.ok) {
                setSuccessMessage('Data successfully fetched!');
            } else {
                setInsights('No Data available. Try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setInsights('Error analyzing data. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 p-6 rounded-lg shadow-lg max-w-3xl mx-auto mt-10">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Analyze Post Engagement</h2>
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Post Type</label>
                <select
                    value={postType}
                    onChange={(e) => setPostType(e.target.value)}
                    className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 transition-all"
                    required
                >
                    <option value="">Select Post Type</option>
                    <option value="carousel">Carousel</option>
                    <option value="reels">Reels</option>
                    <option value="static">Static Image</option>
                </select>
            </div>
            <div className="text-center mb-6">
                <button
                    onClick={fetchInsights}
                    disabled={!postType}
                    className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all disabled:bg-gray-400"
                >
                    {isLoading ? 'Analyzing...' : 'Analyze Post'}
                </button>
            </div>

            {/* Success message */}
            {successMessage && (
                <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg">
                    <p>{successMessage}</p>
                </div>
            )}

            {averageMetrics && (
                <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Average Metrics</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="font-medium text-gray-700">Likes:</p>
                            <p className="text-lg text-gray-800">{formatNumber(averageMetrics.Likes)}</p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="font-medium text-gray-700">Shares:</p>
                            <p className="text-lg text-gray-800">{formatNumber(averageMetrics.Shares)}</p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="font-medium text-gray-700">Comments:</p>
                            <p className="text-lg text-gray-800">{formatNumber(averageMetrics.Comments)}</p>
                        </div>
                    </div>
                </div>
            )}

            {comparativeInsights && (
                <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Comparative Insights</h3>
                    <ul className="list-disc pl-5 space-y-3 text-gray-800">
                        {comparativeInsights.map((insight, index) => (
                            <li key={index} className="text-lg">{insight}</li>
                        ))}
                    </ul>
                </div>
            )}

            {insights && (
                <div className="mt-6 text-center">
                    <p className="text-green-600 text-lg">{insights}</p>
                </div>
            )}
        </div>
    );
};

export default AnalyzePost;