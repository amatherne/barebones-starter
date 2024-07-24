// ../utils/finished-loading.js

import { useEffect } from 'react';

export function finishedLoading() {
  useEffect(() => {
    const Body = document.body;
    Body.classList.add('site-loaded');

    if (isDarkMode) {
      // Body.classList.add('dark-mode');
      console.log('darkmode')
    }

  }, []);
}


// Function to check if dark mode is enabled
const isDarkMode = () => {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
};