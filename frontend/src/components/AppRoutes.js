import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";

const AppRoutes = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route exact path="/" element={<p>Home</p>}/>
                    <Route exact path="/settings" element={<p>A sample settings page</p>}/>
                </Routes>
            </div>
        </Router>
    )
}

export default AppRoutes