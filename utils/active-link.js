// ../utils/active-link.js

import { useEffect, useState } from 'react';

function isActive() {
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  useEffect(() => {
    const handleLinkClick = (event) => {
      if (event.target.tagName === 'A') {
        setCurrentPath(event.target.pathname); 
      }
    };

    document.addEventListener('click', handleLinkClick);

    return () => {
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);

  const isActive = (url) => {
    const urlSegments = url.split('/').filter(seg => seg !== '');
    const currentPathSegments = currentPath.split('/').filter(seg => seg !== '');

    if (currentPathSegments.length < urlSegments.length) {
      return false; 
    }
   
    const currentPathSubPath = currentPathSegments.slice(0, urlSegments.length).join('/');
    return currentPathSubPath && urlSegments && currentPathSubPath === urlSegments.join('/') && currentPathSubPath !== '/';
  };

  return { isActive };
}

export default isActive;
