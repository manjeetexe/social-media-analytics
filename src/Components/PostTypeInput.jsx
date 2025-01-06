import React, { useState } from 'react';

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
            if (!postType) {
                console.error('postType is undefined');
                setInsights('Post type is required.');
                setIsLoading(false);
                return;
            }
    
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/run-model`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ postType }),
            });
    
            if (!response.ok) {
                console.error('Error response from server:', response.status, response.statusText);
                setInsights('No Data available. Try again.');
                return;
            }
    
            let rawResponse = await response.text();
            rawResponse = rawResponse.replace(/```json|```/g, '').trim();
            const data = JSON.parse(rawResponse);
            
    
            const result = data.outputs?.[0].outputs?.[0]?.results?.message?.text;
             // Log the entire result to check structure
                const parsedResult = JSON.parse(result)
            

            setAverageMetrics(parsedResult["Average Metrics"] || 'N/A');
    
            const comparativeInsights = parsedResult?.["Comparative Insights"];
            if (comparativeInsights && comparativeInsights.length > 0) {
                setComparativeInsights(comparativeInsights);
            } else {
                setComparativeInsights(['No insights available.']);
            }
    
            setSuccessMessage('Data successfully fetched!');
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
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="postTypeSelect">
                    Post Type
                </label>
                <select
                    id="postTypeSelect"
                    value={postType}
                    onChange={(e) => setPostType(e.target.value)}
                    className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 transition-all"
                    aria-label="Select post type"
                    required
                >
                    <option value="">Select Post Type</option>
                    <option value="carousel">📚 Carousel</option>
                    <option value="reels">🎥 Reels</option>
                    <option value="static">🖼️ Static Image</option>
                </select>
            </div>
            <div className="text-center mb-6">
                <button
                    onClick={fetchInsights}
                    disabled={!postType}
                    className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all disabled:bg-gray-400 flex items-center justify-center"
                >
                    {isLoading ? (
                        <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8H4z"
                            ></path>
                        </svg>
                    ) : (
                        'Analyze Post'
                    )}
                </button>
            </div>

            {/* Success message */}
            {successMessage && (
                <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg flex items-center space-x-2">
                    <svg
                        className="h-6 w-6 text-green-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m2-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="font-medium">{successMessage}</p>
                </div>
            )}

            {/* Display Average Metrics */}
            {averageMetrics && (
                <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Average Metrics</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="font-medium text-gray-700">Likes:</p>
                            <p className="text-lg text-gray-800">{averageMetrics.Likes}</p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="font-medium text-gray-700">Shares:</p>
                            <p className="text-lg text-gray-800">{averageMetrics.Shares}</p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="font-medium text-gray-700">Comments:</p>
                            <p className="text-lg text-gray-800">{averageMetrics.Comments}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Display Comparative Insights */}
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

            {/* Error Message */}
            {insights && !successMessage && (
                <div className="mt-6 p-4 bg-red-100 text-red-800 rounded-lg">
                    <p>{insights}</p>
                </div>
            )}
        </div>
    );
};

export default AnalyzePost;