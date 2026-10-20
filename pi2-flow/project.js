'use strict';
(() => {
  // Lightbox viewer for figures
  const dialog = document.getElementById('figure-viewer');
  let opener;
  if (dialog) {
    document.querySelectorAll('[data-lightbox]').forEach(link => {
      link.addEventListener('click', event => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        opener = link;
        dialog.querySelector('img').src = link.href;
        dialog.querySelector('img').alt = link.querySelector('img')?.alt || '';
        dialog.showModal();
      });
    });
    dialog.querySelector('button')?.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
    dialog.addEventListener('close', () => { if (opener) opener.focus(); });
  }

  // Synchronized tabbed video showcases
  document.querySelectorAll('[data-video-showcase]').forEach(showcase => {
    const tabs = [...showcase.querySelectorAll('[role="tab"]')];
    const videos = [...showcase.querySelectorAll('video')];
    const promptEl = showcase.querySelector('[data-prompt-text]');
    const restartBtn = showcase.querySelector('[data-sync-restart]');

    const syncPlayAll = (resetTime = false) => {
      videos.forEach(v => {
        if (resetTime) v.currentTime = 0;
        const p = v.play();
        if (p && p.catch) p.catch(() => {});
      });
    };

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.setAttribute('aria-selected', String(t === tab)));
        const prefix = tab.dataset.prefix;
        if (promptEl && tab.dataset.prompt) {
          promptEl.innerHTML = `<strong>Prompt:</strong> &ldquo;${tab.dataset.prompt}&rdquo;`;
        }
        videos.forEach(v => {
          const model = v.dataset.model;
          const nextSrc = `assets/videos/${prefix}_${model}.mp4`;
          if (v.getAttribute('src') !== nextSrc) {
            v.setAttribute('src', nextSrc);
            v.load();
          }
        });
        syncPlayAll(true);
      });
    });

    if (restartBtn) {
      restartBtn.addEventListener('click', () => syncPlayAll(true));
    }
  });

  // Autoplay/pause non-stepper videos when scrolled into view
  const plainVideos = [...document.querySelectorAll('video:not(.mstep video)')];
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    plainVideos.forEach(video => { video.removeAttribute('autoplay'); video.pause(); });
  } else if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.play().catch(() => {});
      else entry.target.pause();
    }), {threshold: 0.15});
    plainVideos.forEach(video => observer.observe(video));
  }
  window.projectReady = true;
})();
