// Lightweight inline SVG replacement for a small set of high-impact icons
(function () {
    'use strict';

    const svgs = {
        'moon': '<svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" focusable="false"><path fill="currentColor" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>',
        'download': '<svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 3v10m0 0l-4-4m4 4l4-4M4 21h16v-2H4v2z" stroke-width="0"/></svg>',
        'linkedin': '<svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" focusable="false"><path fill="currentColor" d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8.98h5V24H0V8.98zM8.98 8.98h4.78v2.07h.07c.66-1.25 2.28-2.57 4.69-2.57C22.98 8.48 24 10.65 24 14.12V24h-5v-8.3c0-2-.04-4.58-2.79-4.58-2.8 0-3.23 2.18-3.23 4.42V24h-5V8.98z"/></svg>',
        'github': '<svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 .5C5.73.5.9 5.33.9 11.6c0 4.8 3.11 8.86 7.43 10.3.54.1.74-.24.74-.52 0-.26-.01-1-.02-1.95-3.02.65-3.66-1.45-3.66-1.45-.5-1.3-1.22-1.65-1.22-1.65-.99-.67.08-.66.08-.66 1.1.08 1.68 1.14 1.68 1.14.97 1.66 2.55 1.18 3.17.9.1-.7.38-1.18.69-1.45-2.41-.27-4.95-1.21-4.95-5.39 0-1.19.42-2.16 1.12-2.92-.11-.28-.49-1.4.11-2.92 0 0 .91-.29 2.99 1.12A10.3 10.3 0 0112 6.8c.92.01 1.85.12 2.71.35 2.07-1.41 2.98-1.12 2.98-1.12.6 1.52.22 2.64.11 2.92.7.76 1.12 1.73 1.12 2.92 0 4.19-2.55 5.12-4.98 5.39.39.34.73 1.02.73 2.06 0 1.49-.01 2.69-.01 3.06 0 .29.2.63.75.52A10.1 10.1 0 0023.1 11.6C23.1 5.33 18.27.5 12 .5z"/></svg>',
        'envelope': '<svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" focusable="false"><path fill="currentColor" d="M2 4.5A2.5 2.5 0 014.5 2h15A2.5 2.5 0 0122 4.5v15A2.5 2.5 0 0119.5 22h-15A2.5 2.5 0 012 19.5v-15zM4.5 4L12 9l7.5-5H4.5zM4 19.5V6.3l8 5.33 8-5.33V19.5H4z"/></svg>',
        'check-circle': '<svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 0a12 12 0 1012 12A12 12 0 0012 0zm5.3 8.3l-5.9 7.1a1 1 0 01-1.5.1l-2.8-2.8a1 1 0 111.4-1.4l2.1 2.1 5.2-6.3a1 1 0 111.7 1.2z"/></svg>',
        'exclamation-circle': '<svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 0a12 12 0 1012 12A12 12 0 0012 0zm1 17a1 1 0 11-2 0 1 1 0 012 0zm0-10v6a1 1 0 11-2 0V7a1 1 0 112 0z"/></svg>',
        'external-link': '<svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" focusable="false"><path fill="currentColor" d="M14 3h7v7h-2V6.41L10.41 15 9 13.59 17.59 5H14V3zM5 5h6v2H7v10h10v-4h2v6H5V5z"/></svg>'
    };

    function replaceIcons(root=document) {
        Object.keys(svgs).forEach(name => {
            const els = root.querySelectorAll('[data-icon="' + name + '"]');
            els.forEach(el => {
                // preserve accessible name and classes
                const title = el.getAttribute('aria-label') || el.getAttribute('title') || el.textContent.trim();
                const svg = document.createElement('span');
                svg.className = 'inline-icon';
                svg.setAttribute('aria-hidden', 'true');
                svg.innerHTML = svgs[name];
                // Clear existing content and insert svg
                el.innerHTML = '';
                el.appendChild(svg);
                // If there was no aria-label on the original, ensure link has appropriate label
                if (!el.getAttribute('aria-label') && title) {
                    el.setAttribute('aria-label', title);
                }
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => replaceIcons());
    } else {
        replaceIcons();
    }

    // Expose replaceIcons for dynamic content
    window.inlineIcons = { replaceIcons };
})();
