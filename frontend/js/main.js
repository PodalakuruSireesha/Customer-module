/* VILLAGKART SUPPORT MODULE - MAIN ENTRY POINT */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Dashboard Controller
  if (window.DashboardController) {
    window.DashboardController.init();
  }

  // Setup Keyboard Shortcuts
  setupShortcuts();
});

// Viewport / Screen Resolution Switcher (4K UHD 3840x2160, 1440p QHD, 1080p FHD, Fit Screen)
function setViewMode(mode) {
  const root = document.getElementById('appRoot');
  const buttons = document.querySelectorAll('.viewport-control-btn');
  buttons.forEach(btn => btn.classList.remove('active'));

  if (mode === 'fit') {
    const btn = document.getElementById('btnFitScreen');
    if (btn) btn.classList.add('active');
    root.style.transform = 'none';
    root.style.width = '100%';
    root.style.maxWidth = '100%';
    root.style.margin = '0';
    document.body.style.overflowX = 'auto';
  } else if (mode === '1080p') {
    const btn = document.getElementById('btn1080p');
    if (btn) btn.classList.add('active');
    root.style.width = '1920px';
    root.style.maxWidth = '1920px';
    root.style.margin = '0 auto';
    root.style.boxShadow = '0 0 35px rgba(0,0,0,0.12)';
  } else if (mode === '1440p') {
    const btn = document.getElementById('btn1440p');
    if (btn) btn.classList.add('active');
    root.style.width = '2560px';
    root.style.maxWidth = '2560px';
    root.style.margin = '0 auto';
    root.style.boxShadow = '0 0 45px rgba(0,0,0,0.18)';
  } else if (mode === '4k') {
    const btn = document.getElementById('btn4k');
    if (btn) btn.classList.add('active');
    root.style.width = '3840px';
    root.style.maxWidth = '3840px';
    root.style.margin = '0 auto';
    root.style.boxShadow = '0 0 60px rgba(0,0,0,0.25)';
    alert('Display mode set to Native 4K UHD (3840 × 2160 px). Best experienced on a 4K UHD display or zoomed to 100%.');
  }
}

// Global Shortcuts
function setupShortcuts() {
  document.addEventListener('keydown', (e) => {
    // ⌘K or Ctrl+K to focus search
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      const search = document.getElementById('globalSearchInput');
      if (search) {
        search.focus();
        search.select();
      }
    }
    // Escape to close active modal or flyout
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
      const drawer = document.getElementById('notificationDrawer');
      if (drawer) drawer.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// Expose setViewMode globally
window.setViewMode = setViewMode;
