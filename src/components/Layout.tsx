import React from 'react';
import TopBar from "./TopBar";

const Layout: React.FC<{ children: React.ReactNode}> = ({ children }) => {
    return (
        <div className="min-h-screen bg-blue-100">
            <TopBar />
            <main>{children}</main>
        </div>
    );
};

export default Layout;
