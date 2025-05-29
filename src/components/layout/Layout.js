import React from 'react';
import Sidebar from '../common/Sidebar';
import Header from '../common/Header';
import VideoPlayer from '../common/VideoPlayer';
import { useApp } from '../../context/AppContext';

const Layout = ({ children }) => {
  const { currentVideo } = useApp();

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <main className="content">
          {children}
        </main>
      </div>
      {currentVideo && <VideoPlayer />}
    </div>
  );
};

export default Layout;