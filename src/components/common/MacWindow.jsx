import React, { useRef } from 'react';
import { Rnd } from 'react-rnd';
import { useWindows } from '../../context/WindowContext';
import './macwindow.scss';

const MacWindow = ({
  windowId,
  title,
  icon: Icon,
  children,
  className = '',
  defaultWidth,
  defaultHeight,
  defaultX,
  defaultY,
  resizable = true
}) => {
  const {
    windows,
    activeWindowId,
    focusWindow,
    closeWindow,
    minimizeWindow,
    toggleMaximizeWindow
  } = useWindows();

  const rndRef = useRef(null);
  const win = windows[windowId];

  if (!win || !win.isOpen || win.isMinimized) {
    return null;
  }

  const isActive = activeWindowId === windowId;
  const isMaximized = win.isMaximized;

  const w = defaultWidth || win.defaultSize?.width || 640;
  const h = defaultHeight || win.defaultSize?.height || 420;
  const initialX = defaultX ?? (win.defaultPosition?.x || (typeof window !== 'undefined' ? Math.max(30, (window.innerWidth - w) / 2) : 100));
  const initialY = defaultY ?? (win.defaultPosition?.y || 80);

  const displayTitle = title || win.title || 'Window';

  if (isMaximized) {
    return (
      <div
        className={`mac-window-wrapper maximized ${isActive ? 'is-active' : ''} ${className}`}
        style={{ zIndex: win.zIndex }}
        onMouseDown={() => focusWindow(windowId)}
      >
        <div className="mac-window">
          <div
            className="window-navbar"
            onDoubleClick={() => resizable && toggleMaximizeWindow(windowId)}
          >
            <div className="dots">
              <button
                className="dot red"
                title="Close"
                onClick={(e) => {
                  e.stopPropagation();
                  closeWindow(windowId);
                }}
              />
              <button
                className="dot yellow"
                title="Minimize"
                onClick={(e) => {
                  e.stopPropagation();
                  minimizeWindow(windowId);
                }}
              />
              {resizable && (
                <button
                  className="dot green"
                  title="Restore window"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMaximizeWindow(windowId);
                  }}
                />
              )}
            </div>

            <div className="title">
              {Icon && <Icon size={14} className="title-icon" />}
              <span>{displayTitle}</span>
            </div>

            <div className="window-navbar-spacer" />
          </div>

          <div className="content">{children}</div>
        </div>
      </div>
    );
  }

  return (
    <Rnd
      ref={rndRef}
      bounds="window"
      default={{
        x: initialX,
        y: initialY,
        width: w,
        height: h
      }}
      minWidth={resizable ? 300 : w}
      minHeight={resizable ? 220 : h}
      maxWidth={resizable ? undefined : w}
      maxHeight={resizable ? undefined : h}
      enableResizing={resizable}
      dragHandleClassName="window-navbar"
      style={{ zIndex: win.zIndex }}
      onMouseDown={() => focusWindow(windowId)}
      className={`mac-window-rnd ${isActive ? 'is-active' : ''} ${className}`}
    >
      <div className="mac-window">
        <div
          className="window-navbar"
          onDoubleClick={() => resizable && toggleMaximizeWindow(windowId)}
        >
          <div className="dots">
            <button
              className="dot red"
              title="Close"
              onClick={(e) => {
                e.stopPropagation();
                closeWindow(windowId);
              }}
            />
            <button
              className="dot yellow"
              title="Minimize"
              onClick={(e) => {
                e.stopPropagation();
                minimizeWindow(windowId);
              }}
            />
            {resizable && (
              <button
                className="dot green"
                title="Maximize"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMaximizeWindow(windowId);
                }}
              />
            )}
          </div>

          <div className="title">
            {Icon && <Icon size={14} className="title-icon" />}
            <span>{displayTitle}</span>
          </div>

          <div className="window-navbar-spacer" />
        </div>

        <div className="content">{children}</div>
      </div>
    </Rnd>
  );
};

export default MacWindow;

