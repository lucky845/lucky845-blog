(function () {
  'use strict';
  /* schematic-marks.js — 可选增强：① 目录当前节加粗 ② 正文右侧阅读进度刻度 */
  function boot() {
    var toc = document.querySelector('#aside-content #card-toc');
    if (toc) {
      var sync = function () {
        var links = toc.querySelectorAll('.toc-link');
        for (var i = 0; i < links.length; i++) {
          links[i].classList.toggle('sc-current', links[i].classList.contains('active'));
        }
      };
      var raf = 0;
      new MutationObserver(function () {
        if (!raf) {
          raf = requestAnimationFrame(function () { raf = 0; sync(); });
        }
      }).observe(toc, { subtree: true, attributes: true, attributeFilter: ['class'] });
      sync();
    }

    var art = document.querySelector('#article-container');
    if (!art || !('ResizeObserver' in window)) return;
    var bar = document.createElement('div');
    bar.id = 'sc-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);
    new ResizeObserver(function () {
      var r = art.getBoundingClientRect();
      bar.style.height = Math.max(0, r.height - innerHeight) + 'px';
      bar.style.top = (r.top + scrollY + 80) + 'px';
    }).observe(art);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
