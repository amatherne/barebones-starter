// ../utils/finished-loading.js

import { useEffect } from 'react';

export function finishedLoading() {
  useEffect(() => {
    const Body = document.body;
    Body.classList.add('site-loaded');
  }, []);
}
