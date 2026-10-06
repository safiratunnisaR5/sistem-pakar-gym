import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-soft bg-card/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-secondary">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-primary">BroGym</span>
          <span className="text-muted">•</span>
          <span className="text-muted">All rights reserved</span>
        </div>
        <div className="flex items-center gap-4 text-muted">
          <span>© {year}</span>
          <span className="hidden sm:inline">•</span>
          <span>v1.0.0</span>
          <span className="hidden sm:inline">•</span>
          <a
            href="#"
            className="hover:text-accent transition-colors"
          >
            Kebijakan Privasi
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;