/* ==========================================================================
   VILLAGKART SUPPORT MODULE - SLA MONITORING CONTROLLER & DATA
   ========================================================================== */

(function() {
  'use strict';

  // 10 Exact match rows from screenshot + realistic entries making 72 total tickets
  const initialSlaTickets = [
    // Page 1 (1–10) - Exact match to screenshots
    {
      id: 'VK-20260801-000029',
      customer: 'Shiva Kumar',
      issue: 'Order delayed',
      priority: 'Critical',
      stage: 'Ready',
      slaTime: '30 minutes',
      overdueBy: '2d 1h 00m',
      statusType: 'breached', // red
      assignedTo: { name: 'Priya Sharma', initial: 'PS', class: 'avatar-ps' },
      createdAt: '14 Aug 2026, 10:20 AM',
      dateKey: '7days',
      phone: '+91 98450 11234',
      orderId: 'ORD-98201',
      breachReason: 'Delivery partner vehicle breakdown in Hub Zone 3'
    },
    {
      id: 'VK-20260801-000016',
      customer: 'Kiran Reddy',
      issue: 'Delivery not received',
      priority: 'Critical',
      stage: 'Picking',
      slaTime: '30 minutes',
      overdueBy: '2d 5h 06m',
      statusType: 'breached',
      assignedTo: { name: 'Rahul Kumar', initial: 'RK', class: 'avatar-rk' },
      createdAt: '14 Aug 2026, 09:15 AM',
      dateKey: '7days',
      phone: '+91 99801 88712',
      orderId: 'ORD-98194',
      breachReason: 'Customer uncontactable during morning delivery window'
    },
    {
      id: 'VK-20260731-000052',
      customer: 'Nisha Reddy',
      issue: 'Order delay',
      priority: 'High',
      stage: 'Packing',
      slaTime: '1 hour',
      overdueBy: '2d 2h 02m',
      statusType: 'breached',
      assignedTo: { name: 'Anil Reddy', initial: 'AR', class: 'avatar-ar' },
      createdAt: '13 Aug 2026, 04:32 PM',
      dateKey: '7days',
      phone: '+91 97412 33490',
      orderId: 'ORD-98150',
      breachReason: 'A2 Milk inventory replenishment pending from dairy farm'
    },
    {
      id: 'CMP-20260730-0018',
      customer: 'Ramesh K',
      issue: 'Wrong item delivered',
      priority: 'High',
      stage: 'Ready',
      slaTime: '1 hour',
      overdueBy: '1d 8h 15m',
      statusType: 'breached',
      assignedTo: { name: 'Priya Sharma', initial: 'PS', class: 'avatar-ps' },
      createdAt: '13 Aug 2026, 11:40 AM',
      dateKey: '7days',
      phone: '+91 98480 23145',
      orderId: 'ORD-98082',
      breachReason: 'Incorrect barcode scan during secondary dispatch check'
    },
    {
      id: 'VK-20260729-00321',
      customer: 'Sneha Verma',
      issue: 'Product missing',
      priority: 'High',
      stage: 'Dispatched',
      slaTime: '1 hour',
      overdueBy: '1d 4h 22m',
      statusType: 'breached',
      assignedTo: { name: 'Sneha Verma', initial: 'SV', class: 'avatar-sv' },
      createdAt: '12 Aug 2026, 06:18 PM',
      dateKey: '7days',
      phone: '+91 91234 56789',
      orderId: 'ORD-97992',
      breachReason: 'Produce packet omitted during consolidation box packing'
    },
    {
      id: 'CMP-20260916-0045',
      customer: 'Ramesh K',
      issue: 'Order delayed',
      priority: 'High',
      stage: 'In Progress',
      slaTime: '1 hour',
      overdueBy: '18 minutes',
      statusType: 'warning', // yellow
      assignedTo: { name: 'Priya Sharma', initial: 'PS', class: 'avatar-ps' },
      createdAt: '16 Sep 2026, 11:42 AM',
      dateKey: 'today',
      phone: '+91 98480 23145',
      orderId: 'ORD-99120',
      breachReason: 'Traffic congestion on Phirangipuram highway route'
    },
    {
      id: 'VK-20260915-0012',
      customer: 'Lakshmi Devi',
      issue: 'Delivery delay',
      priority: 'High',
      stage: 'Packing',
      slaTime: '1 hour',
      overdueBy: '32 minutes',
      statusType: 'warning',
      assignedTo: { name: 'Rahul Kumar', initial: 'RK', class: 'avatar-rk' },
      createdAt: '15 Sep 2026, 04:20 PM',
      dateKey: 'yesterday',
      phone: '+91 94401 56890',
      orderId: 'ORD-99054',
      breachReason: 'Special packaging requested for country chicken eggs'
    },
    {
      id: 'VK-20260915-0008',
      customer: 'Arjun Mehta',
      issue: 'Address change',
      priority: 'Medium',
      stage: 'Accepted',
      slaTime: '4 hours',
      overdueBy: '1 hour 12 minutes',
      statusType: 'warning',
      assignedTo: { name: 'Anil Reddy', initial: 'AR', class: 'avatar-ar' },
      createdAt: '15 Sep 2026, 01:18 PM',
      dateKey: 'yesterday',
      phone: '+91 98860 44321',
      orderId: 'ORD-99031',
      breachReason: 'Rerouting delivery address to Guntur West branch'
    },
    {
      id: 'CMP-20260914-0061',
      customer: 'Priya Nair',
      issue: 'Refund request',
      priority: 'Medium',
      stage: 'In Progress',
      slaTime: '4 hours',
      overdueBy: '2 hours 06 minutes',
      statusType: 'warning',
      assignedTo: { name: 'Sneha Verma', initial: 'SV', class: 'avatar-sv' },
      createdAt: '14 Sep 2026, 05:40 PM',
      dateKey: '7days',
      phone: '+91 96543 21098',
      orderId: 'ORD-98940',
      breachReason: 'Awaiting UPI PG webhook confirmation for return payment'
    },
    {
      id: 'VK-20260914-0027',
      customer: 'Siddharth Rao',
      issue: 'Product damaged',
      priority: 'Low',
      stage: 'New',
      slaTime: '24 hours',
      overdueBy: '6 hours 20 minutes',
      statusType: 'warning',
      assignedTo: { name: 'Priya Sharma', initial: 'PS', class: 'avatar-ps' },
      createdAt: '14 Sep 2026, 11:10 AM',
      dateKey: '7days',
      phone: '+91 93456 78901',
      orderId: 'ORD-98892',
      breachReason: 'Cracked clay curd pot reported during morning unboxing'
    },

    // Page 2 (11–20)
    {
      id: 'VK-20260810-000084',
      customer: 'Kavitha Ramachandran',
      issue: 'Quality issue with tomatoes',
      priority: 'High',
      stage: 'In Progress',
      slaTime: '1 hour',
      overdueBy: '1d 2h 45m',
      statusType: 'breached',
      assignedTo: { name: 'Sneha Verma', initial: 'SV', class: 'avatar-sv' },
      createdAt: '10 Aug 2026, 02:15 PM',
      dateKey: '7days',
      phone: '+91 97890 12345',
      orderId: 'ORD-98744',
      breachReason: 'Overripe produce identified during batch audit'
    },
    {
      id: 'CMP-20260809-0033',
      customer: 'Venkatesh Babu',
      issue: 'Payment double charged',
      priority: 'Critical',
      stage: 'Ready',
      slaTime: '30 minutes',
      overdueBy: '3d 4h 10m',
      statusType: 'breached',
      assignedTo: { name: 'Anil Reddy', initial: 'AR', class: 'avatar-ar' },
      createdAt: '09 Aug 2026, 10:05 AM',
      dateKey: '7days',
      phone: '+91 98490 55667',
      orderId: 'ORD-98612',
      breachReason: 'Bank gateway sync failure for credit card settlement'
    },
    {
      id: 'VK-20260808-000102',
      customer: 'Sunita Chawla',
      issue: 'Order delayed',
      priority: 'Critical',
      stage: 'Picking',
      slaTime: '30 minutes',
      overdueBy: '2d 8h 12m',
      statusType: 'breached',
      assignedTo: { name: 'Rahul Kumar', initial: 'RK', class: 'avatar-rk' },
      createdAt: '08 Aug 2026, 08:30 AM',
      dateKey: '7days',
      phone: '+91 98112 33445',
      orderId: 'ORD-98520',
      breachReason: 'Heavy rain causing delay in fresh morning harvest delivery'
    },
    {
      id: 'VK-20260807-000041',
      customer: 'Mohan Krishna',
      issue: 'Milk packet leaked',
      priority: 'High',
      stage: 'Packing',
      slaTime: '1 hour',
      overdueBy: '1d 11h 20m',
      statusType: 'breached',
      assignedTo: { name: 'Priya Sharma', initial: 'PS', class: 'avatar-ps' },
      createdAt: '07 Aug 2026, 05:20 PM',
      dateKey: '7days',
      phone: '+91 94411 77889',
      orderId: 'ORD-98411',
      breachReason: 'Pouch seal puncture during crate loading'
    },
    {
      id: 'CMP-20260806-0012',
      customer: 'Deepa Srinivas',
      issue: 'Delivery not received',
      priority: 'Critical',
      stage: 'Dispatched',
      slaTime: '30 minutes',
      overdueBy: '4d 2h 00m',
      statusType: 'breached',
      assignedTo: { name: 'Rahul Kumar', initial: 'RK', class: 'avatar-rk' },
      createdAt: '06 Aug 2026, 09:40 AM',
      dateKey: '30days',
      phone: '+91 98660 11223',
      orderId: 'ORD-98305',
      breachReason: 'Customer gated community entry denial before 7 AM'
    },
    {
      id: 'VK-20260805-000078',
      customer: 'Gopal Raju',
      issue: 'Wrong items in box',
      priority: 'Medium',
      stage: 'Accepted',
      slaTime: '4 hours',
      overdueBy: '2d 6h 30m',
      statusType: 'breached',
      assignedTo: { name: 'Sneha Verma', initial: 'SV', class: 'avatar-sv' },
      createdAt: '05 Aug 2026, 03:10 PM',
      dateKey: '30days',
      phone: '+91 97001 99887',
      orderId: 'ORD-98240',
      breachReason: 'Mixed labels for Subscriptions #B14 and #B15'
    },
    {
      id: 'VK-20260804-000091',
      customer: 'Ananya Roy',
      issue: 'Order delayed',
      priority: 'High',
      stage: 'Ready',
      slaTime: '1 hour',
      overdueBy: '1d 18h 50m',
      statusType: 'breached',
      assignedTo: { name: 'Anil Reddy', initial: 'AR', class: 'avatar-ar' },
      createdAt: '04 Aug 2026, 11:55 AM',
      dateKey: '30days',
      phone: '+91 98220 44556',
      orderId: 'ORD-98188',
      breachReason: 'Cold storage unit temp calibration delay'
    },
    {
      id: 'CMP-20260803-0055',
      customer: 'Suresh Menon',
      issue: 'Missing ghee bottle',
      priority: 'High',
      stage: 'Packing',
      slaTime: '1 hour',
      overdueBy: '1d 15h 10m',
      statusType: 'breached',
      assignedTo: { name: 'Priya Sharma', initial: 'PS', class: 'avatar-ps' },
      createdAt: '03 Aug 2026, 04:45 PM',
      dateKey: '30days',
      phone: '+91 98455 66778',
      orderId: 'ORD-98110',
      breachReason: 'Special reserve ghee batch out of stock'
    },
    {
      id: 'VK-20260802-000063',
      customer: 'Harish Varma',
      issue: 'Delivery delay',
      priority: 'High',
      stage: 'In Progress',
      slaTime: '1 hour',
      overdueBy: '2d 0h 15m',
      statusType: 'breached',
      assignedTo: { name: 'Rahul Kumar', initial: 'RK', class: 'avatar-rk' },
      createdAt: '02 Aug 2026, 01:20 PM',
      dateKey: '30days',
      phone: '+91 99490 33221',
      orderId: 'ORD-98045',
      breachReason: 'Route realignment for festival rush'
    },
    {
      id: 'VK-20260801-000088',
      customer: 'Manjula Rao',
      issue: 'App coupon not applied',
      priority: 'Low',
      stage: 'New',
      slaTime: '24 hours',
      overdueBy: '1d 4h 00m',
      statusType: 'breached',
      assignedTo: { name: 'Anil Reddy', initial: 'AR', class: 'avatar-ar' },
      createdAt: '01 Aug 2026, 10:15 AM',
      dateKey: '30days',
      phone: '+91 98800 12121',
      orderId: 'ORD-97980',
      breachReason: 'Promo engine database timeout during checkout'
    },

    // Page 3 (21–30)
    {
      id: 'VK-20260731-000104',
      customer: 'Chaitanya Paul',
      issue: 'Order delayed',
      priority: 'Critical',
      stage: 'Ready',
      slaTime: '30 minutes',
      overdueBy: '3d 1h 22m',
      statusType: 'breached',
      assignedTo: { name: 'Priya Sharma', initial: 'PS', class: 'avatar-ps' },
      createdAt: '31 Jul 2026, 09:10 AM',
      dateKey: '30days',
      phone: '+91 94455 88990',
      orderId: 'ORD-97910',
      breachReason: 'Delivery van flat tire'
    },
    {
      id: 'CMP-20260730-0089',
      customer: 'Bhavani Shankar',
      issue: 'Organic honey jar broken',
      priority: 'High',
      stage: 'Picking',
      slaTime: '1 hour',
      overdueBy: '2d 12h 40m',
      statusType: 'breached',
      assignedTo: { name: 'Sneha Verma', initial: 'SV', class: 'avatar-sv' },
      createdAt: '30 Jul 2026, 03:30 PM',
      dateKey: '30days',
      phone: '+91 97011 22334',
      orderId: 'ORD-97860',
      breachReason: 'Inadequate bubble wrap during secondary sorting'
    },
    {
      id: 'VK-20260729-000072',
      customer: 'Rajesh Goud',
      issue: 'Subscription paused unexpectedly',
      priority: 'Medium',
      stage: 'Accepted',
      slaTime: '4 hours',
      overdueBy: '1d 19h 15m',
      statusType: 'breached',
      assignedTo: { name: 'Anil Reddy', initial: 'AR', class: 'avatar-ar' },
      createdAt: '29 Jul 2026, 12:00 PM',
      dateKey: '30days',
      phone: '+91 98488 44556',
      orderId: 'ORD-97790',
      breachReason: 'Autopay mandate renewal pending'
    },
    {
      id: 'VK-20260728-000033',
      customer: 'Geeta Nair',
      issue: 'Vegetable basket stale',
      priority: 'High',
      stage: 'Ready',
      slaTime: '1 hour',
      overdueBy: '2d 7h 05m',
      statusType: 'breached',
      assignedTo: { name: 'Sneha Verma', initial: 'SV', class: 'avatar-sv' },
      createdAt: '28 Jul 2026, 04:10 PM',
      dateKey: '30days',
      phone: '+91 98199 77889',
      orderId: 'ORD-97715',
      breachReason: 'Farm harvest dispatched after 18h lag'
    },
    {
      id: 'CMP-20260727-0044',
      customer: 'Srinivas Murthy',
      issue: 'Wrong delivery location',
      priority: 'Critical',
      stage: 'Dispatched',
      slaTime: '30 minutes',
      overdueBy: '4d 6h 30m',
      statusType: 'breached',
      assignedTo: { name: 'Rahul Kumar', initial: 'RK', class: 'avatar-rk' },
      createdAt: '27 Jul 2026, 08:45 AM',
      dateKey: '30days',
      phone: '+91 98850 66778',
      orderId: 'ORD-97650',
      breachReason: 'GPS geofence pin mismatch in apartment cluster'
    },
    {
      id: 'VK-20260726-000095',
      customer: 'Swathi Patel',
      issue: 'Order delayed',
      priority: 'High',
      stage: 'Packing',
      slaTime: '1 hour',
      overdueBy: '2d 16h 40m',
      statusType: 'breached',
      assignedTo: { name: 'Priya Sharma', initial: 'PS', class: 'avatar-ps' },
      createdAt: '26 Jul 2026, 02:25 PM',
      dateKey: '30days',
      phone: '+91 99200 33445',
      orderId: 'ORD-97590',
      breachReason: 'Fresh leafy greens shortage due to farm irrigation issue'
    },
    {
      id: 'VK-20260725-000019',
      customer: 'Tanmay Saxena',
      issue: 'Wallet cashback missing',
      priority: 'Low',
      stage: 'New',
      slaTime: '24 hours',
      overdueBy: '3d 2h 10m',
      statusType: 'breached',
      assignedTo: { name: 'Anil Reddy', initial: 'AR', class: 'avatar-ar' },
      createdAt: '25 Jul 2026, 11:30 AM',
      dateKey: '30days',
      phone: '+91 98330 11223',
      orderId: 'ORD-97510',
      breachReason: 'Partner promotion ledger credit batch error'
    },
    {
      id: 'CMP-20260916-0099',
      customer: 'Karthik Somayaji',
      issue: 'Order delayed',
      priority: 'High',
      stage: 'Picking',
      slaTime: '1 hour',
      overdueBy: '45 minutes',
      statusType: 'warning',
      assignedTo: { name: 'Rahul Kumar', initial: 'RK', class: 'avatar-rk' },
      createdAt: '16 Sep 2026, 10:15 AM',
      dateKey: 'today',
      phone: '+91 98450 99887',
      orderId: 'ORD-99180',
      breachReason: 'Morning farm crate sorting taking longer'
    },
    {
      id: 'VK-20260916-0105',
      customer: 'Leela Venkatesh',
      issue: 'Delivery delay',
      priority: 'High',
      stage: 'In Progress',
      slaTime: '1 hour',
      overdueBy: '52 minutes',
      statusType: 'warning',
      assignedTo: { name: 'Priya Sharma', initial: 'PS', class: 'avatar-ps' },
      createdAt: '16 Sep 2026, 09:50 AM',
      dateKey: 'today',
      phone: '+91 97400 44556',
      orderId: 'ORD-99195',
      breachReason: 'Rider battery issue on electric scooter'
    },
    {
      id: 'VK-20260915-0066',
      customer: 'Tarun Mathur',
      issue: 'Items missing in bag',
      priority: 'Medium',
      stage: 'Packing',
      slaTime: '4 hours',
      overdueBy: '3 hours 10 minutes',
      statusType: 'warning',
      assignedTo: { name: 'Sneha Verma', initial: 'SV', class: 'avatar-sv' },
      createdAt: '15 Sep 2026, 03:40 PM',
      dateKey: 'yesterday',
      phone: '+91 98101 22334',
      orderId: 'ORD-99080',
      breachReason: 'Secondary scale check required before dispatch'
    }
  ];

  // Generate realistic remaining tickets up to 72 tickets
  const priorities = ['Critical', 'High', 'Medium', 'Low'];
  const stages = ['Ready', 'Picking', 'Packing', 'In Progress', 'Accepted', 'New', 'Dispatched'];
  const agents = [
    { name: 'Priya Sharma', initial: 'PS', class: 'avatar-ps' },
    { name: 'Rahul Kumar', initial: 'RK', class: 'avatar-rk' },
    { name: 'Anil Reddy', initial: 'AR', class: 'avatar-ar' },
    { name: 'Sneha Verma', initial: 'SV', class: 'avatar-sv' }
  ];
  const issues = [
    'Order delayed', 'Delivery delay', 'Wrong item delivered', 'Product missing',
    'Product damaged', 'Refund request', 'Address change', 'Milk leak reported',
    'Subscription hold', 'Produce quality check'
  ];
  const customers = [
    'Padma Priya', 'Vikas Khanna', 'Ritu Aggarwal', 'Santosh Nadar', 'Meera Subramanian',
    'Alok Mishra', 'Sunil Gavaskar', 'Rukmini Devi', 'Prashant Hegde', 'Shruti Hassan',
    'Rameshwar Rao', 'Nandini Joshi', 'Kalyan Chakravarthy', 'Sarada Devi', 'Hariprasad K',
    'Bala Subramaniam', 'Vani Ganapathy', 'Chitra Raman', 'Ajay Varma', 'Lavanya Sundar'
  ];

  for (let i = initialSlaTickets.length + 1; i <= 72; i++) {
    const isBreached = i <= 27; // Keep total breached count around 27
    const isWarning = !isBreached && (i <= 35); // 8 at risk
    const statusType = isBreached ? 'breached' : (isWarning ? 'warning' : 'ontime');
    const priority = isBreached ? (i % 2 === 0 ? 'Critical' : 'High') : (priorities[i % priorities.length]);
    const agent = agents[i % agents.length];
    const customer = customers[i % customers.length];
    const issue = issues[i % issues.length];
    const stage = stages[i % stages.length];
    const slaTime = priority === 'Critical' ? '30 minutes' : (priority === 'High' ? '1 hour' : (priority === 'Medium' ? '4 hours' : '24 hours'));
    const overdueBy = isBreached ? `${1 + (i % 3)}d ${2 + (i % 10)}h ${10 + (i % 40)}m` : `${15 + (i * 3) % 45} minutes`;

    initialSlaTickets.push({
      id: (i % 3 === 0 ? 'CMP-202609' : 'VK-202609') + `${10 + (i % 20)}-000${i}`,
      customer: customer,
      issue: issue,
      priority: priority,
      stage: stage,
      slaTime: slaTime,
      overdueBy: overdueBy,
      statusType: statusType,
      assignedTo: agent,
      createdAt: `${10 + (i % 6)} Sep 2026, 1${i % 2}:${10 + (i % 45)} AM`,
      dateKey: i % 4 === 0 ? 'today' : (i % 3 === 0 ? 'yesterday' : '7days'),
      phone: `+91 984${10 + i} 56789`,
      orderId: `ORD-9${9000 + i}`,
      breachReason: 'Partner route transit buffer limit exceeded'
    });
  }

  // State Management
  const SlaState = {
    allTickets: initialSlaTickets,
    filteredTickets: [...initialSlaTickets],
    currentPage: 1,
    pageSize: 10,
    filters: {
      date: 'all',
      dateLabel: 'Date',
      status: 'all',
      statusLabel: 'Status',
      priority: 'all',
      priorityLabel: 'Priority',
      search: ''
    },
    // Metrics matching exact screenshots
    metrics: {
      total: 72,
      atRisk: 8,
      breached: 27,
      resolved: 42
    },
    // SLA Configurations
    config: {
      critical: { target: 30, unit: 'minutes', warning: 75, autoEscalate: true },
      high: { target: 1, unit: 'hours', warning: 75, autoEscalate: true },
      medium: { target: 4, unit: 'hours', warning: 75, autoEscalate: false },
      low: { target: 24, unit: 'hours', warning: 75, autoEscalate: false },
      operatingHours: '08:00 AM - 10:00 PM',
      notifyWhatsApp: true,
      notifyEmail: true,
      notifyPush: true
    }
  };

  // Controller
  const SlaController = {
    init() {
      this.bindEvents();
      this.applyFilters();
      this.updateMetricsDisplay();
    },

    bindEvents() {
      // Global Search in Top Header & Local Search in SLA toolbar
      const localSearch = document.getElementById('slaSearchInput');
      if (localSearch) {
        localSearch.addEventListener('input', (e) => {
          SlaState.filters.search = e.target.value.trim().toLowerCase();
          SlaState.currentPage = 1;
          this.applyFilters();
        });
      }

      const globalSearch = document.getElementById('globalSearchInput');
      if (globalSearch) {
        globalSearch.addEventListener('input', (e) => {
          if (localSearch) localSearch.value = e.target.value;
          SlaState.filters.search = e.target.value.trim().toLowerCase();
          SlaState.currentPage = 1;
          this.applyFilters();
        });
      }

      // Configure SLA Button
      const cfgBtn = document.getElementById('configureSlaBtn');
      if (cfgBtn) {
        cfgBtn.addEventListener('click', () => this.openConfigModal());
      }

      // Reset Filter Button
      const resetBtn = document.getElementById('resetFilterBtn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => this.resetFilters());
      }

      // Close dropdowns when clicking outside
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown-wrapper')) {
          document.querySelectorAll('.dropdown-wrapper').forEach(w => w.classList.remove('open'));
        }
      });

      // Keyboard Esc to close modals
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closeConfigModal();
          this.closeDrawer();
        }
      });
    },

    toggleDropdown(wrapperId) {
      const wrapper = document.getElementById(wrapperId);
      if (!wrapper) return;
      const isOpen = wrapper.classList.contains('open');
      document.querySelectorAll('.dropdown-wrapper').forEach(w => w.classList.remove('open'));
      if (!isOpen) {
        wrapper.classList.add('open');
      }
    },

    selectFilter(type, value, label) {
      SlaState.filters[type] = value;
      SlaState.filters[type + 'Label'] = label;

      const btn = document.getElementById(`btnFilter${type.charAt(0).toUpperCase() + type.slice(1)}`);
      if (btn) {
        const textSpan = btn.querySelector('.dropdown-label-text');
        if (textSpan) textSpan.textContent = value === 'all' ? type.charAt(0).toUpperCase() + type.slice(1) : label;
        if (value !== 'all') {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      }

      // Close menu
      const wrapper = document.getElementById(`dropdown${type.charAt(0).toUpperCase() + type.slice(1)}`);
      if (wrapper) wrapper.classList.remove('open');

      SlaState.currentPage = 1;
      this.applyFilters();
    },

    resetFilters() {
      SlaState.filters.date = 'all';
      SlaState.filters.dateLabel = 'Date';
      SlaState.filters.status = 'all';
      SlaState.filters.statusLabel = 'Status';
      SlaState.filters.priority = 'all';
      SlaState.filters.priorityLabel = 'Priority';
      SlaState.filters.search = '';

      // Reset inputs & buttons
      const search = document.getElementById('slaSearchInput');
      if (search) search.value = '';
      const gSearch = document.getElementById('globalSearchInput');
      if (gSearch) gSearch.value = '';

      ['Date', 'Status', 'Priority'].forEach(key => {
        const btn = document.getElementById(`btnFilter${key}`);
        if (btn) {
          btn.classList.remove('active');
          const span = btn.querySelector('.dropdown-label-text');
          if (span) span.textContent = key;
        }
      });

      SlaState.currentPage = 1;
      this.applyFilters();
      this.showToast('Filters reset to default view (72 tickets).');
    },

    applyFilters() {
      const { date, status, priority, search } = SlaState.filters;

      SlaState.filteredTickets = SlaState.allTickets.filter(ticket => {
        // Date filter
        if (date !== 'all') {
          if (date === 'today' && ticket.dateKey !== 'today') return false;
          if (date === 'yesterday' && ticket.dateKey !== 'yesterday') return false;
          if (date === '7days' && !['today', 'yesterday', '7days'].includes(ticket.dateKey)) return false;
        }

        // Status / Stage filter
        if (status !== 'all') {
          if (status.toLowerCase() !== ticket.stage.toLowerCase()) return false;
        }

        // Priority filter
        if (priority !== 'all') {
          if (priority.toLowerCase() !== ticket.priority.toLowerCase()) return false;
        }

        // Search query
        if (search) {
          const matchId = ticket.id.toLowerCase().includes(search);
          const matchCust = ticket.customer.toLowerCase().includes(search);
          const matchIssue = ticket.issue.toLowerCase().includes(search);
          const matchAgent = ticket.assignedTo.name.toLowerCase().includes(search);
          const matchStage = ticket.stage.toLowerCase().includes(search);
          if (!matchId && !matchCust && !matchIssue && !matchAgent && !matchStage) {
            return false;
          }
        }

        return true;
      });

      this.renderTable();
      this.renderPagination();
    },

    renderTable() {
      const tbody = document.getElementById('slaTableBody');
      if (!tbody) return;

      const { currentPage, pageSize, filteredTickets } = SlaState;
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = Math.min(startIndex + pageSize, filteredTickets.length);
      const pageTickets = filteredTickets.slice(startIndex, endIndex);

      if (pageTickets.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="9" class="empty-table-state">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
              <div style="font-size:15px; font-weight:600; color:#1E293B; margin-bottom:4px;">No tickets match the selected filters</div>
              <div style="font-size:13px; color:#64748B;">Try clearing your search query or reset filters.</div>
            </td>
          </tr>
        `;
        return;
      }

      let html = '';
      pageTickets.forEach(ticket => {
        // Priority bullet
        let bulletClass = 'bullet-medium';
        if (ticket.priority === 'Critical') bulletClass = 'bullet-critical';
        else if (ticket.priority === 'High') bulletClass = 'bullet-high';
        else if (ticket.priority === 'Low') bulletClass = 'bullet-low';

        // Overdue badge style
        const isBreached = ticket.statusType === 'breached';
        const badgeClass = isBreached ? 'overdue-badge-breached' : 'overdue-badge-warning';

        html += `
          <tr data-id="${ticket.id}">
            <td>
              <a href="javascript:void(0)" class="ticket-id-link" onclick="SlaController.openTicketDetail('${ticket.id}')">
                ${ticket.id}
              </a>
            </td>
            <td>
              <span class="customer-name">${ticket.customer}</span>
            </td>
            <td>
              <span class="issue-text">${ticket.issue}</span>
            </td>
            <td>
              <div class="priority-pill">
                <span class="priority-bullet ${bulletClass}"></span>
                <span>${ticket.priority}</span>
              </div>
            </td>
            <td>
              <span class="stage-badge">${ticket.stage}</span>
            </td>
            <td>
              <span class="sla-time-text">${ticket.slaTime}</span>
            </td>
            <td>
              <span class="overdue-badge ${badgeClass}">${ticket.overdueBy}</span>
            </td>
            <td>
              <div class="assigned-cell">
                <div class="assigned-avatar ${ticket.assignedTo.class}">${ticket.assignedTo.initial}</div>
                <span class="assigned-name">${ticket.assignedTo.name}</span>
              </div>
            </td>
            <td>
              <span class="created-at-text">${ticket.createdAt}</span>
            </td>
          </tr>
        `;
      });

      tbody.innerHTML = html;
    },

    renderPagination() {
      const footer = document.getElementById('slaPaginationWrapper');
      if (!footer) return;

      const { currentPage, pageSize, filteredTickets } = SlaState;
      const totalCount = filteredTickets.length;
      const totalPages = Math.ceil(totalCount / pageSize) || 1;

      const startIndex = totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
      const endIndex = Math.min(currentPage * pageSize, totalCount);

      // Update Showing 1-10 of 72 tickets
      const showingText = document.getElementById('slaShowingCount');
      if (showingText) {
        showingText.textContent = `Showing ${startIndex}–${endIndex} of ${totalCount} tickets`;
      }

      // Generate buttons: < 1 2 3 4 5 ... 8 >
      const controls = document.getElementById('slaPaginationControls');
      if (!controls) return;

      let btnHtml = '';

      // Prev Button
      btnHtml += `
        <button class="btn-page" ${currentPage <= 1 ? 'disabled' : ''} onclick="SlaController.goToPage(${currentPage - 1})" title="Previous Page">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
      `;

      // Page buttons matching reference screenshot: 1, 2, 3, 4, 5, ... 8
      if (totalPages <= 7) {
        for (let p = 1; p <= totalPages; p++) {
          btnHtml += `
            <button class="btn-page ${p === currentPage ? 'active' : ''}" onclick="SlaController.goToPage(${p})">
              ${p}
            </button>
          `;
        }
      } else {
        // Show 1, 2, 3, 4, 5 ... totalPages
        for (let p = 1; p <= Math.min(5, totalPages); p++) {
          btnHtml += `
            <button class="btn-page ${p === currentPage ? 'active' : ''}" onclick="SlaController.goToPage(${p})">
              ${p}
            </button>
          `;
        }
        if (totalPages > 6) {
          btnHtml += `<span class="pagination-ellipsis">...</span>`;
          btnHtml += `
            <button class="btn-page ${totalPages === currentPage ? 'active' : ''}" onclick="SlaController.goToPage(${totalPages})">
              ${totalPages}
            </button>
          `;
        }
      }

      // Next Button
      btnHtml += `
        <button class="btn-page" ${currentPage >= totalPages ? 'disabled' : ''} onclick="SlaController.goToPage(${currentPage + 1})" title="Next Page">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      `;

      controls.innerHTML = btnHtml;
    },

    goToPage(page) {
      const totalPages = Math.ceil(SlaState.filteredTickets.length / SlaState.pageSize) || 1;
      if (page < 1 || page > totalPages) return;
      SlaState.currentPage = page;
      this.renderTable();
      this.renderPagination();
      window.scrollTo({ top: 220, behavior: 'smooth' });
    },

    updateMetricsDisplay() {
      // Metric numbers in the 4 cards
      const mTotal = document.getElementById('metricTotalTickets');
      if (mTotal) mTotal.textContent = SlaState.metrics.total;

      const mAtRisk = document.getElementById('metricAtRisk');
      if (mAtRisk) mAtRisk.textContent = SlaState.metrics.atRisk;

      const mBreached = document.getElementById('metricBreached');
      if (mBreached) mBreached.textContent = SlaState.metrics.breached;

      const mResolved = document.getElementById('metricResolvedToday');
      if (mResolved) mResolved.textContent = SlaState.metrics.resolved;
    },

    // Ticket Quick Details Drawer
    openTicketDetail(ticketId) {
      const ticket = SlaState.allTickets.find(t => t.id === ticketId);
      if (!ticket) return;

      const drawer = document.getElementById('slaTicketDrawer');
      if (!drawer) return;

      const setEl = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
      };
      setEl('drawerTicketId', ticket.id);
      setEl('drawerCustomer', ticket.customer);
      setEl('drawerPhone', ticket.phone || '+91 98450 11234');
      setEl('drawerOrderId', ticket.orderId || 'ORD-98201');
      setEl('drawerIssue', ticket.issue);
      setEl('drawerPriority', ticket.priority);
      setEl('drawerStage', ticket.stage);
      setEl('drawerSlaTime', ticket.slaTime);
      setEl('drawerOverdueBy', ticket.overdueBy);
      setEl('drawerAgent', ticket.assignedTo.name);
      setEl('drawerCreatedAt', ticket.createdAt);
      setEl('drawerBreachReason', ticket.breachReason || 'Logistics route delay during hub transit');

      const overdueBadge = document.getElementById('drawerOverdueBadge');
      if (overdueBadge) {
        overdueBadge.className = ticket.statusType === 'breached' ? 'overdue-badge overdue-badge-breached' : 'overdue-badge overdue-badge-warning';
        overdueBadge.textContent = ticket.overdueBy;
      }

      drawer.classList.add('active');
      const overlay = document.getElementById('slaDrawerOverlay');
      if (overlay) overlay.classList.add('active');
    },

    closeDrawer() {
      const drawer = document.getElementById('slaTicketDrawer');
      if (drawer) drawer.classList.remove('active');
      const overlay = document.getElementById('slaDrawerOverlay');
      if (overlay) overlay.classList.remove('active');
    },

    // Configure SLA Modal
    openConfigModal() {
      const modal = document.getElementById('slaConfigModalOverlay');
      if (modal) modal.classList.add('active');
    },

    closeConfigModal() {
      const modal = document.getElementById('slaConfigModalOverlay');
      if (modal) modal.classList.remove('active');
    },

    saveSlaConfig(e) {
      if (e) e.preventDefault();
      this.closeConfigModal();
      this.showToast('SLA Configuration saved successfully! Operational thresholds updated.');
    },

    showToast(message) {
      let toast = document.getElementById('slaToast');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'slaToast';
        toast.className = 'sla-toast';
        document.body.appendChild(toast);
      }
      toast.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" stroke-width="2.5">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <span>${message}</span>
      `;
      toast.classList.add('active');
      setTimeout(() => {
        toast.classList.remove('active');
      }, 3500);
    }
  };

  // Expose to window
  window.SlaController = SlaController;

  // Initialize on DOM load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => SlaController.init());
  } else {
    SlaController.init();
  }
})();
