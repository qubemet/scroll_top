import React from 'react';
import {createRoot } from 'react-dom/client';
import Dashboard from "./Dashboard";

if (document.body.contains( document.getElementById( 'qmt-scroll-dashboard' )) ) {
    const dashboardRoot = createRoot(document.getElementById( 'qmt-scroll-dashboard' ));
    dashboardRoot.render(
        <React.StrictMode><Dashboard/></React.StrictMode>
    );
}