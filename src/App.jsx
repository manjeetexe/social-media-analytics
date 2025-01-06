import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PostTypeInput from './Components/PostTypeInput';
import SubmitEngagement from './Components/SubmitEngagement';

const App = () => {
    return (
        <Router>
            <div className="min-h-screen bg-gray-50 p-8">
                <header className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Social Media Performance Analysis</h1>
                    <nav className="mt-4">
                        <Link to="/" className="text-blue-500 hover:underline mx-4">Home</Link>
                        <Link to="/submit-engagement" className="text-blue-500 hover:underline mx-4">Submit Engagement</Link>
                        <Link to="/analyze-post" className="text-blue-500 hover:underline mx-4">Analyze Post</Link>
                    </nav>
                </header>
                
                <div className="max-w-3xl mx-auto">
                    <Routes>
                        <Route path="/" element={<h2 className="text-xl text-center">Choose an option above to get started.</h2>} />
                        <Route path="/submit-engagement" element={<SubmitEngagement />} />
                        <Route path="/analyze-post" element={<PostTypeInput />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;