import React from 'react';

const InsightsDisplay = ({ insight }) => {
    return (
        <div className="p-6 bg-white shadow-md rounded-md">
            <h2 className="text-xl font-bold mb-4">Insights</h2>
            <p>{insight}</p>
        </div>
    );
};

export default InsightsDisplay;