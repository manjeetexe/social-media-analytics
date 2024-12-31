import React from 'react';

const EngagementMetrics = ({ metrics }) => {
    return (
        <div className="p-6 bg-white shadow-md rounded-md">
            <h2 className="text-xl font-bold mb-4">Engagement Metrics</h2>
            <ul className="list-disc pl-5">
                <li>Average Likes: {metrics.likes}</li>
                <li>Average Shares: {metrics.shares}</li>
                <li>Average Comments: {metrics.comments}</li>
            </ul>
        </div>
    );
};

export default EngagementMetrics;