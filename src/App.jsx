import React, { useState } from 'react';
import PostTypeInput from './Components/PostTypeInput';
import EngagementMetrics from './Components/EngagementMetrics';
import InsightsDisplay from './Components/InsightsDisplay';

const App = () => {
    const [metrics, setMetrics] = useState(null);
    const [insight, setInsight] = useState('');

    const fetchData = async (postType) => {
        try {
            const response = await fetch('/analyze-post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ postType }),
            });
            const data = await response.json();
            setMetrics(data.metrics);
            setInsight(data.insight);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center mb-6">
                Social Media Performance Analysis
            </h1>
            <div className="max-w-3xl mx-auto space-y-6">
                <PostTypeInput onAnalyze={fetchData} />
                {metrics && <EngagementMetrics metrics={metrics} />}
                {insight && <InsightsDisplay insight={insight} />}
            </div>
        </div>
    );
};

export default App;