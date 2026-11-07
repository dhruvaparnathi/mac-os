import React, { useState } from 'react';
import MacWindow from '../../components/common/MacWindow';
import githubData from '../../assets/github.json';
import {
  RiGithubFill,
  RiSearchLine,
  RiExternalLinkLine,
  RiCodeSSlashLine,
  RiAspectRatioLine,
  RiFullscreenLine
} from '@remixicon/react';
import './github.scss';

const CATEGORIES = ['All', 'Full-Stack', 'AI / ML', 'React', 'Tools'];

const Github = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [imageFitMode, setImageFitMode] = useState('contain'); // 'contain' for whole image visible, 'cover' for full bleed
  const [zoomImage, setZoomImage] = useState(null);

  const filteredProjects = githubData.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

    if (!matchesSearch) return false;
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Full-Stack') {
      return item.tags.some((t) => ['Node.js', 'Express', 'MongoDB', 'PostgreSQL'].includes(t));
    }
    if (activeCategory === 'AI / ML') {
      return item.tags.some((t) => ['Gemini API', 'LangChain', 'LangGraph', 'TensorFlow.js', 'Face-api.js'].includes(t));
    }
    if (activeCategory === 'React') {
      return item.tags.includes('React');
    }
    if (activeCategory === 'Tools') {
      return item.tags.some((t) => ['Canvas', 'LocalStorage', 'CSS', 'HTML'].includes(t));
    }
    return true;
  });

  return (
    <MacWindow
      windowId="github"
      title="Projects — GitHub"
      icon={RiGithubFill}
      defaultWidth={860}
      defaultHeight={540}
    >
      <div className="github-window-wrapper">
        {/* Header Toolbar */}
        <div className="github-header-bar">
          <div className="gh-search-box">
            <RiSearchLine size={15} className="gh-search-icon" />
            <input
              type="text"
              placeholder="Filter projects by title, stack, or tech..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="category-chips">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`cat-chip ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Image Fit Mode Toggle */}
          <div className="view-mode-toggle">
            <button
              className={`fit-btn ${imageFitMode === 'contain' ? 'active' : ''}`}
              onClick={() => setImageFitMode(imageFitMode === 'contain' ? 'cover' : 'contain')}
              title={imageFitMode === 'contain' ? 'Showing whole image (click for fill)' : 'Fill frame (click to fit whole image)'}
            >
              <RiAspectRatioLine size={14} />
              <span>{imageFitMode === 'contain' ? 'Whole Image' : 'Fill Frame'}</span>
            </button>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="github-container">
          {filteredProjects.map((data) => (
            <div className="git-card" key={data.id}>
              {/* Media Container with Guaranteed Height & Full Image Display */}
              <div
                className={`card-media ${imageFitMode}`}
                onClick={() => setZoomImage(data)}
                title="Click to view full preview"
              >
                {/* Blurred Ambient Backdrop so there are no empty black bars */}
                <img
                  src={data.image}
                  alt=""
                  aria-hidden="true"
                  className="media-backdrop"
                />

                {/* Main Image (Guaranteed 100% visible) */}
                <img
                  src={data.image}
                  alt={data.title}
                  loading="lazy"
                  className="media-img"
                />

                <span className="zoom-hint">
                  <RiFullscreenLine size={13} />
                </span>
              </div>

              <div className="git-content">
                <h3>{data.title}</h3>
                <p>{data.description}</p>

                <div className="tags">
                  {data.tags.map((tag, index) => (
                    <span key={index}>{tag}</span>
                  ))}
                </div>

                <div className="links">
                  <a
                    href={data.repoLink}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-repo"
                  >
                    <RiCodeSSlashLine size={15} /> Code
                  </a>

                  {data.demoLink && (
                    <a
                      href={data.demoLink}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-demo"
                    >
                      <RiExternalLinkLine size={15} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Lightbox for Zoomed Image */}
        {zoomImage && (
          <div className="zoom-modal-overlay" onClick={() => setZoomImage(null)}>
            <div className="zoom-modal-dialog" onClick={(e) => e.stopPropagation()}>
              <div className="zoom-modal-header">
                <h4>{zoomImage.title}</h4>
                <button className="close-zoom-btn" onClick={() => setZoomImage(null)}>
                  ×
                </button>
              </div>
              <div className="zoom-modal-body">
                <img src={zoomImage.image} alt={zoomImage.title} />
              </div>
            </div>
          </div>
        )}
      </div>
    </MacWindow>
  );
};

export default Github;
