/* VILLAGKART SUPPORT MODULE - MODALS & NOTIFICATIONS CONTROLLER */

const ModalController = {
  open(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  },

  close(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  },

  toggleNotificationDrawer() {
    const drawer = document.getElementById('notificationDrawer');
    if (drawer) drawer.classList.toggle('active');
  },

  openTicketDetail(id, customer, subject, agent, sla, status) {
    document.getElementById('modalTicketId').innerText = '#' + id;
    document.getElementById('modalCustomerName').innerText = customer;
    document.getElementById('modalTicketSubject').innerText = subject;
    document.getElementById('modalAssignedAgent').innerText = agent;
    this.open('ticketDetailModal');
  },

  applyDateFilter(filterKey, labelText) {
    window.VillagKartData.activeDateFilter = filterKey;
    document.getElementById('activeDateRangeLabel').innerText = labelText;
    this.close('dateFilterModal');
    window.DashboardController.renderOverviewMetrics(filterKey);
  },

  handleCreateTicket(event) {
    event.preventDefault();
    const name = document.getElementById('newCustName').value;
    const phone = document.getElementById('newCustPhone').value;
    const category = document.getElementById('newTicketCategory').value;
    const priority = document.getElementById('newTicketPriority').value;
    const subject = document.getElementById('newTicketSubject').value;

    const newId = 'VK-' + Math.floor(10893 + Math.random() * 50);

    // Add to table
    const tbody = document.getElementById('recentTicketsTableBody');
    const tr = document.createElement('tr');
    tr.onclick = () => ModalController.openTicketDetail(newId, name, subject, 'Rahul Kumar (Auto-assigned)', '⏳ 2h 00m', 'New');
    tr.innerHTML = `
      <td><span class="ticket-id-tag">#${newId}</span></td>
      <td>
        <div style="font-weight:700;">${name}</div>
        <div style="font-size:11.5px; color:var(--text-secondary);">${subject} (${category})</div>
      </td>
      <td><span class="pill-badge ${priority === 'Urgent' ? 'pill-red' : (priority === 'High' ? 'pill-orange' : 'pill-green')}">${priority}</span></td>
      <td>Rahul Kumar (Auto-assigned)</td>
      <td><span class="sla-timer-badge sla-timer-ok">⏳ New SLA</span></td>
      <td><span class="pill-badge pill-blue">New</span></td>
    `;
    tbody.insertBefore(tr, tbody.firstChild);

    // Increment Total
    const totalElem = document.getElementById('stat-total');
    if (totalElem) {
      const current = parseInt(totalElem.innerText.replace(/,/g, ''));
      totalElem.innerText = (current + 1).toLocaleString();
    }

    this.close('createTicketModal');
    alert(`Ticket #${newId} created successfully for ${name} and routed to Order Delivery Desk!`);
  }
};

// Global click listener to close modals or notification drawer when clicking outside
window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
    document.body.style.overflow = '';
  }
  const drawer = document.getElementById('notificationDrawer');
  const btn = document.getElementById('notifBellBtn');
  if (drawer && drawer.classList.contains('active') && !drawer.contains(e.target) && !btn.contains(e.target)) {
    drawer.classList.remove('active');
  }
});

window.ModalController = ModalController;
