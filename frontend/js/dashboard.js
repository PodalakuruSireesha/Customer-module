/* VILLAGKART SUPPORT MODULE - DASHBOARD CONTROLLER */

const DashboardController = {
  init() {
    this.renderOverviewMetrics(window.VillagKartData.activeDateFilter);
  },

  // Update Overview Metric Counts based on date filter
  renderOverviewMetrics(filterKey) {
    const metrics = window.VillagKartData.overviewMetrics[filterKey] || window.VillagKartData.overviewMetrics['7days'];
    document.getElementById('stat-total').innerText = metrics.total;
    document.getElementById('stat-new').innerText = metrics.new;
    document.getElementById('stat-open').innerText = metrics.open;
    document.getElementById('stat-inprogress').innerText = metrics.in_progress;
    document.getElementById('stat-waiting').innerText = metrics.waiting;
    document.getElementById('stat-escalated').innerText = metrics.escalated;
    document.getElementById('stat-breached').innerText = metrics.breached;
    document.getElementById('stat-resolved').innerText = metrics.resolved;
    document.getElementById('stat-closed').innerText = metrics.closed;
    document.getElementById('stat-reopened').innerText = metrics.reopened;
  },

  // Highlight active overview filter card
  filterOverview(category) {
    const cards = document.querySelectorAll('.overview-stat-card');
    cards.forEach(card => card.classList.remove('active-filter'));
    if (window.event && window.event.currentTarget) {
      window.event.currentTarget.classList.add('active-filter');
    }
    console.log(`Filtered view by: ${category}`);
  },

  // Global search filtering across recent tickets
  handleGlobalSearch(term) {
    const cleanTerm = term.trim().toLowerCase();
    const rows = document.querySelectorAll('#recentTicketsTableBody tr');
    rows.forEach(row => {
      if (!cleanTerm) {
        row.style.background = '';
        return;
      }
      const text = row.innerText.toLowerCase();
      if (text.includes(cleanTerm)) {
        row.style.background = '#F0FFF4';
      } else {
        row.style.background = '';
      }
    });
  },

  // Export report to CSV
  exportReport() {
    const agents = window.VillagKartData.agents;
    const header = ['#', 'Agent Name', 'Tickets Assigned', 'Tickets Resolved', 'Avg Resolution Time', 'First Response Time', 'SLA Compliance %', 'FCR %', 'CSAT'];
    const rows = agents.map(a => [a.id, a.name, a.assigned, a.resolved, a.avgTime, a.firstResp, `${a.sla}%`, `${a.fcr}%`, a.csat]);
    
    const csvContent = 'data:text/csv;charset=utf-8,' + [header, ...rows].map(e => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `VillagKart_Support_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  // Instant Escalation Resolution
  resolveEscalation(ticketId, customerName) {
    if (confirm(`Approve instant partner resolution for ${customerName} (${ticketId})?`)) {
      alert(`Resolution approved for #${ticketId}. Refund credit of ₹890 triggered to customer's UPI account.`);
      const countBadge = document.getElementById('escalationBadgeCount');
      if (countBadge) countBadge.innerText = '2 Pending';
    }
  },

  // Reassign Ticket
  reassignTicket(ticketId) {
    const agent = prompt(`Reassign Ticket #${ticketId} to agent:\n1. Rahul Kumar\n2. Sneha Verma\n3. Anil Reddy\n4. Priya Sharma`, 'Sneha Verma');
    if (agent) {
      alert(`Ticket #${ticketId} successfully reassigned to ${agent}.`);
    }
  }
};

window.DashboardController = DashboardController;
