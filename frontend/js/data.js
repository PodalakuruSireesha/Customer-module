/* VILLAGKART SUPPORT MODULE - STATE & DATA STORE */

const VillagKartData = {
  activeDateFilter: '7days',
  activeView: 'dashboard',
  
  // Agent Performance Data (matches exact reference screenshot values)
  agents: [
    { id: 1, name: 'Rahul Kumar', dept: 'Order Delivery Desk', assigned: 142, resolved: 128, avgTime: '3h 12m', firstResp: '14 min', sla: 96, fcr: 72, csat: 4.8 },
    { id: 2, name: 'Priya Sharma', dept: 'Refunds & Returns', assigned: 118, resolved: 104, avgTime: '4h 05m', firstResp: '16 min', sla: 92, fcr: 69, csat: 4.6 },
    { id: 3, name: 'Anil Reddy', dept: 'Escalation & SLA', assigned: 96, resolved: 79, avgTime: '4h 28m', firstResp: '18 min', sla: 88, fcr: 64, csat: 4.4 },
    { id: 4, name: 'Sneha Verma', dept: 'Produce Quality', assigned: 84, resolved: 71, avgTime: '3h 56m', firstResp: '15 min', sla: 94, fcr: 71, csat: 4.7 },
    { id: 5, name: 'Karthik Iyer', dept: 'Customer Relations', assigned: 62, resolved: 51, avgTime: '5h 14m', firstResp: '22 min', sla: 81, fcr: 58, csat: 4.2 }
  ],

  // 10 Ticket Overview Metrics
  overviewMetrics: {
    '7days': { total: '1,428', new: '184', open: '296', in_progress: '342', waiting: '115', escalated: '48', breached: '24', resolved: '892', closed: '780', reopened: '38' },
    'Today': { total: '214', new: '42', open: '68', in_progress: '82', waiting: '22', escalated: '7', breached: '3', resolved: '138', closed: '124', reopened: '6' },
    'Yesterday': { total: '298', new: '35', open: '72', in_progress: '94', waiting: '28', escalated: '9', breached: '4', resolved: '182', closed: '160', reopened: '8' },
    '30days': { total: '5,820', new: '740', open: '310', in_progress: '450', waiting: '190', escalated: '112', breached: '58', resolved: '3,920', closed: '3,480', reopened: '92' }
  },

  // Recent Live Tickets
  recentTickets: [
    { id: 'VK-10892', customer: 'Suresh Babu', issue: 'Delayed Morning Milk Delivery (Order #ORD-9821)', priority: 'Urgent', agent: 'Rahul Kumar', sla: '⏳ 24m left', slaClass: 'sla-timer-warning', status: 'In Progress', statusClass: 'pill-blue' },
    { id: 'VK-10891', customer: 'Anitha Devi', issue: 'Organic Cow Ghee Jar Damaged in Transit', priority: 'High', agent: 'Sneha Verma', sla: '⏳ 1h 12m', slaClass: 'sla-timer-ok', status: 'Under Review', statusClass: 'pill-orange' },
    { id: 'VK-10890', customer: 'Ramesh Naidu', issue: 'UPI Double Deduction on Produce Box ₹1,240', priority: 'Urgent', agent: 'Priya Sharma', sla: '⚠ Breached (+35m)', slaClass: 'sla-timer-breached', status: 'Escalated', statusClass: 'pill-red' },
    { id: 'VK-10889', customer: 'Kavitha R', issue: 'Wrong Quantity of Country Eggs (Delivered 6 instead of 12)', priority: 'Medium', agent: 'Rahul Kumar', sla: '✓ On Time', slaClass: 'sla-timer-ok', status: 'Resolved', statusClass: 'pill-green' }
  ],

  // Escalation Matrix Items
  escalations: [
    { id: 'ESC-401', ticketId: 'VK-10890', level: 'L2', reason: 'Repeated Spoiled Vegetable Complaint • Order #ORD-8472', customer: 'Venkatesh Rao', phone: '+91 98480 23145', value: '₹890', time: '18 mins ago' },
    { id: 'ESC-402', ticketId: 'VK-10882', level: 'L1', reason: 'Delivery Rider Unreachable > 45 mins • Morning Route 4', customer: 'Lakshmi Devi', phone: '+91 94401 56890', assigned: 'Anil Reddy', time: '42 mins ago' },
    { id: 'ESC-403', ticketId: 'VK-10875', level: 'L3', reason: 'Partner Store Node Inventory Discrepancy (A2 Milk Batch #14)', source: 'Store Inventory Audit', impact: '18 Orders', time: '1h 10m ago' }
  ]
};

// Export to window
window.VillagKartData = VillagKartData;
