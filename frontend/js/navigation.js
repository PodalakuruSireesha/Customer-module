/* VILLAGKART SUPPORT MODULE - NAVIGATION CONTROLLER */

const NavigationController = {
  toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.toggle('collapsed');
  },

  setActiveNavItem(navId) {
    document.querySelectorAll('.nav-item, .nav-sub-item').forEach(el => el.classList.remove('active'));
    const target = document.getElementById(navId);
    if (target) target.classList.add('active');
  },

  navigateTo(sectionKey, navId) {
    this.setActiveNavItem(navId);
    window.VillagKartData.activeView = sectionKey;

    if (sectionKey === 'dashboard') {
      console.log('Viewing Support Dashboard');
      return;
    }

    // Secondary Screen Notification / Tab Filter
    console.log(`Navigating to partner module: ${sectionKey}`);
    const sectionNames = {
      'tickets': 'Customer Tickets Management',
      'requests': 'Customer Requests Desk',
      'sla': 'SLA Monitoring & Breached Matrix',
      'escalation': 'Multi-Tier Escalation Matrix',
      'categories': 'Issue Categories & Routing Configuration',
      'teams': 'Support Teams & Capacity Management'
    };

    alert(`Navigated to: ${sectionNames[sectionKey] || sectionKey}\nAll partner tools and live queues are synchronized for Phirangipuram Hub (#042).`);
  }
};

window.NavigationController = NavigationController;
