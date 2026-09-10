import React from "react";

export default function Header() {
  return (
    <>
      <div className="portal-topbar">
        <div className="portal-topbar-inner">
          <div></div>

          <div className="portal-top-links">
            <span>DOCUMENTATION</span>
            <span>SUPPORT</span>
            <span>ABOUT</span>
          </div>
        </div>
      </div>

      <header className="portal-header">
        <div className="portal-header-inner">

          <div className="portal-brand">
            <div className="portal-brand-mark">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div>
              <div className="portal-brand-name">
                INTEGRATION HUB
              </div>

              <div className="portal-brand-subtitle">
                Enterprise Connectivity Platform
              </div>
            </div>
          </div>

          <div className="portal-header-actions">
            <button
              className="portal-search-button"
              type="button"
              aria-label="Search"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="16.5" y1="16.5" x2="21" y2="21" />
              </svg>
            </button>
          </div>

        </div>
      </header>
    </>
  );
}