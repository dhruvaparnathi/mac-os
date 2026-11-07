import React, { useState } from 'react';
import {
  RiHardDrive2Fill,
  RiFilePdf2Fill,
  RiFolderFill,
  RiFileCodeFill,
  RiDeleteBinFill
} from '@remixicon/react';
import { useWindows } from '../../context/WindowContext';
import './desktop.scss';

const ICONS = [
  { id: 'hd', name: 'Macintosh HD', icon: RiHardDrive2Fill, color: '#a0a0a5', action: 'finder' },
  { id: 'resume', name: 'Dhruv_Resume.pdf', icon: RiFilePdf2Fill, color: '#ff3b30', action: 'pdf' },
  { id: 'projects', name: 'Projects', icon: RiFolderFill, color: '#007aff', action: 'github' },
  { id: 'notes', name: 'profile.config.ts', icon: RiFileCodeFill, color: '#ff9500', action: 'note' },
  { id: 'trash', name: 'Bin', icon: RiDeleteBinFill, color: '#8e8e93', action: 'finder' }
];

const DesktopIcons = () => {
  const { openWindow } = useWindows();
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div className="desktop-icons-container" onClick={() => setSelectedId(null)}>
      {ICONS.map((item) => {
        const Icon = item.icon;
        const isSelected = selectedId === item.id;

        return (
          <div
            key={item.id}
            className={`desktop-icon ${isSelected ? 'selected' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              if (selectedId === item.id) {
                openWindow(item.action);
                setSelectedId(null);
              } else {
                setSelectedId(item.id);
              }
            }}
            onDoubleClick={(e) => {
              e.stopPropagation();
              openWindow(item.action);
            }}
          >
            <div className="icon-graphic" style={{ color: item.color }}>
              <Icon size={36} />
            </div>
            <span className="icon-label">{item.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default DesktopIcons;
