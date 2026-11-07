import React, { useState } from 'react';
import MacWindow from '../../components/common/MacWindow';
import {
  RiFolder3Fill,
  RiMacLine,
  RiFileTextLine,
  RiFolder3Line,
  RiCodeLine,
  RiDeleteBinLine,
  RiLayoutGridFill,
  RiListCheck,
  RiFilePdf2Fill,
  RiFileCodeFill,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiSearchLine
} from '@remixicon/react';
import { FILE_SYSTEM } from '../../data/filesystem';
import { useWindows } from '../../context/WindowContext';
import './finder.scss';

const Finder = () => {
  const { openWindow } = useWindows();
  const [currentFolder, setCurrentFolder] = useState('desktop');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFileId, setSelectedFileId] = useState(null);

  const sidebarLinks = [
    { id: 'desktop', label: 'Desktop', icon: RiMacLine },
    { id: 'documents', label: 'Documents', icon: RiFileTextLine },
    { id: 'skills', label: 'Skills & Stack', icon: RiCodeLine },
    { id: 'trash', label: 'Bin', icon: RiDeleteBinLine }
  ];

  const files = (FILE_SYSTEM[currentFolder] || []).filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFileAction = (file) => {
    if (file.action === 'open_pdf') {
      openWindow('pdf');
    } else if (file.action === 'open_notes') {
      openWindow('note');
    } else if (file.action === 'open_github') {
      openWindow('github');
    } else if (file.action === 'open_cli') {
      openWindow('cli');
    } else if (file.type === 'pdf') {
      openWindow('pdf');
    } else if (file.type === 'code' || file.type === 'markdown' || file.type === 'text') {
      openWindow('note');
    }
  };

  const getFileIcon = (file) => {
    if (file.type === 'pdf') return <RiFilePdf2Fill size={viewMode === 'grid' ? 36 : 18} color="#ff3b30" />;
    if (file.type === 'folder') return <RiFolder3Fill size={viewMode === 'grid' ? 36 : 18} color="#007aff" />;
    if (file.type === 'code') return <RiFileCodeFill size={viewMode === 'grid' ? 36 : 18} color="#ff9500" />;
    return <RiFileTextLine size={viewMode === 'grid' ? 36 : 18} color="#64d2ff" />;
  };

  return (
    <MacWindow
      windowId="finder"
      title={`Finder — ${currentFolder.charAt(0).toUpperCase() + currentFolder.slice(1)}`}
      icon={RiFolder3Fill}
      defaultWidth={780}
      defaultHeight={480}
    >
      <div className="finder-container">
        {/* Finder Sidebar */}
        <div className="finder-sidebar">
          <span className="sidebar-group-title">Favorites</span>
          {sidebarLinks.map((item) => {
            const Icon = item.icon;
            const isActive = currentFolder === item.id;
            return (
              <div
                key={item.id}
                className={`sidebar-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setCurrentFolder(item.id);
                  setSelectedFileId(null);
                }}
              >
                <Icon size={16} className="sidebar-item-icon" />
                <span>{item.label}</span>
              </div>
            );
          })}

          <div className="sidebar-divider" />
          <span className="sidebar-group-title">Applications</span>
          <div className="sidebar-item" onClick={() => openWindow('safari')}>
            <RiFolder3Line size={16} className="sidebar-item-icon" />
            <span>Safari</span>
          </div>
          <div className="sidebar-item" onClick={() => openWindow('github')}>
            <RiFolder3Line size={16} className="sidebar-item-icon" />
            <span>Projects App</span>
          </div>
          <div className="sidebar-item" onClick={() => openWindow('messages')}>
            <RiFolder3Line size={16} className="sidebar-item-icon" />
            <span>Messages</span>
          </div>
        </div>

        {/* Finder Main Area */}
        <div className="finder-main">
          {/* Finder Toolbar */}
          <div className="finder-toolbar">
            <div className="history-nav">
              <button className="nav-arrow" disabled>
                <RiArrowLeftSLine size={18} />
              </button>
              <button className="nav-arrow" disabled>
                <RiArrowRightSLine size={18} />
              </button>
              <span className="current-folder-label">
                {currentFolder.charAt(0).toUpperCase() + currentFolder.slice(1)}
              </span>
            </div>

            <div className="toolbar-center">
              <div className="view-toggle">
                <button
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  title="Icon View"
                >
                  <RiLayoutGridFill size={15} />
                </button>
                <button
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  title="List View"
                >
                  <RiListCheck size={15} />
                </button>
              </div>
            </div>

            <div className="finder-search">
              <RiSearchLine size={14} className="search-icon" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Files Display */}
          <div
            className={`files-area ${viewMode}`}
            onClick={() => setSelectedFileId(null)}
          >
            {viewMode === 'grid' ? (
              <div className="files-grid">
                {files.map((file) => {
                  const isSelected = selectedFileId === file.id;
                  return (
                    <div
                      key={file.id}
                      className={`grid-file-item ${isSelected ? 'selected' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (selectedFileId === file.id) {
                          handleFileAction(file);
                        } else {
                          setSelectedFileId(file.id);
                        }
                      }}
                      onDoubleClick={(e) => {
                        e.stopPropagation();
                        handleFileAction(file);
                      }}
                    >
                      <div className="file-icon-box">{getFileIcon(file)}</div>
                      <span className="file-name">{file.name}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="files-list">
                <div className="list-header">
                  <span className="col-name">Name</span>
                  <span className="col-date">Date Modified</span>
                  <span className="col-size">Size</span>
                  <span className="col-kind">Kind</span>
                </div>
                {files.map((file) => {
                  const isSelected = selectedFileId === file.id;
                  return (
                    <div
                      key={file.id}
                      className={`list-file-row ${isSelected ? 'selected' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (selectedFileId === file.id) {
                          handleFileAction(file);
                        } else {
                          setSelectedFileId(file.id);
                        }
                      }}
                      onDoubleClick={(e) => {
                        e.stopPropagation();
                        handleFileAction(file);
                      }}
                    >
                      <div className="col-name file-name-col">
                        {getFileIcon(file)}
                        <span>{file.name}</span>
                      </div>
                      <span className="col-date">{file.updated || 'Recently'}</span>
                      <span className="col-size">{file.size || '--'}</span>
                      <span className="col-kind">
                        {file.type ? file.type.toUpperCase() : 'Document'}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Finder Status Footer */}
          <div className="finder-status-bar">
            <span>{files.length} items</span>
            <span>142.8 GB available</span>
          </div>
        </div>
      </div>
    </MacWindow>
  );
};

export default Finder;

