# VillagKart – Support Management Module (Partner Portal)

High-fidelity, 4K UHD desktop web application interface designed specifically for **VillagKart Partners** to monitor customer complaints, manage requests, track SLA deadlines, handle escalations, and evaluate support team performance.

---

## 📁 Modular Frontend File Structure

The frontend architecture has been decoupled into a dedicated, clean directory structure:

```
c:\CustomerSupport\
├── frontend/
│   ├── index.html                  # Main application HTML shell
│   ├── sla-monitoring.html         # SLA Monitoring Screen (Exact match to reference screenshots)
│   ├── css/
│   │   ├── variables.css           # Design tokens, brand colors (#008F24, #FF6B00), typography
│   │   ├── layout.css              # Sidebar navigation, top header, main content layout, 4K viewport
│   │   ├── components.css          # Reusable buttons (+ POS), pill badges, CSAT scores, timers
│   │   ├── dashboard.css           # 10 Overview cards, 6 Support Performance cards, Agent table, charts
│   │   ├── tickets.css             # Tickets table, badge styles, priority tokens
│   │   ├── sla.css                 # SLA cards, overdue badges, filter bar, config modal, quick drawer
│   │   ├── modals.css              # POS terminal modal, ticket modal, date filter, notification drawer
│   │   └── style.css               # Master stylesheet importing all CSS modules
│   └── js/
│       ├── data.js                 # Central state store and mock data (tickets, agents, metrics)
│       ├── sla.js                  # SLA monitoring state, 72 tickets, multi-filter, pagination, config modal
│       ├── dashboard.js            # Dashboard metric calculations, CSV export, live filtering
│       ├── modals.js               # Modal dialog handlers (POS, ticket detail, create ticket, drawer)
│       ├── navigation.js           # Sidebar routing, active tab highlight, section transitions
│       └── main.js                 # App initialization, 4K resolution switcher, keyboard shortcuts
├── server.js                       # Lightweight static server serving the ./frontend directory
└── README.md                       # Architecture & design documentation
```

---

## 🎨 Design System & Visual Tokens

The user interface strictly adheres to the provided VillagKart brand guidelines and reference screenshots:

- **Brand Logo:** Green `#008F24` for **Villag**, Orange `#FF6B00` for **Kart** with custom agrarian leaf and shopping cart emblem.
- **Primary Colors:**
  - Primary Green: `#008F24` (Hover: `#00761E`, Light Tint: `#EAF7EE`)
  - Accent Orange: `#FF6B00` (Hover: `#E05E00`, Light Tint: `#FFF4EC`)
- **Backgrounds:**
  - Application Canvas: `#F7F7FB`
  - Sidebar & Top Header: `#FFFFFF`
  - Cards & Modals: `#FFFFFF`
- **Typography:** Google Font **Inter** (400, 500, 600, 700, 800)
- **Status Pills & Indicators:**
  - *Success / On-Time:* `#EAF7EE` background with `#16A34A` text
  - *Warning / Attention:* `#FFF4EC` background with `#EA580C` text
  - *Critical / SLA Breached:* `#FEECEB` background with `#DC2626` text
  - *Informational / Progress:* `#EFF6FF` background with `#2563EB` text

---

## 🖥️ Screen 1 – Support Dashboard Architecture

### 1. Left Sidebar Navigation
- **VillagKart Logo:** Scalable SVG logo with partner portal subtext.
- **Active Navigation Item:** Highlighted in primary green with white icon (`Dashboard`).
- **Support Management Sub-Menu:**
  - `Customer Tickets` (296 active)
  - `Customer Requests` (115 pending)
  - `SLA Monitoring` (24 breached - critical red badge)
  - `Escalation Matrix` (48 escalated - orange badge)
- **Configuration Sub-Menu:**
  - `Categories & Issues`
  - `Support Teams`
- **Partner Store Status Indicator:** Phirangipuram Hub (#042) Online indicator.

### 2. Top Header Bar
- **Sidebar Collapse Toggle:** Collapses to 76px compact mode.
- **Global Search:** Instant live filtering across tickets, agents, orders, and customer names (`⌘K` shortcut supported).
- **Green POS Button:** Direct access to Partner Point-of-Sale billing and return registration terminal.
- **Notification Center:** Flyout drawer for real-time SLA breach and customer rating alerts.
- **Partner Profile Avatar:** "VP" avatar for *Villagkart Phirangipuram* with `PARTNER` badge.

### 3. Ticket Overview Cards (10 Cards)
1. **Total Tickets:** 1,428 (+8.4% vs last period)
2. **New Tickets:** 184 (+12.1%)
3. **Open Tickets:** 296 (-3.2%)
4. **In Progress:** 342 (+5.6%)
5. **Waiting for Customer:** 115 (-1.8%)
6. **Escalated:** 48 (+14.2%)
7. **SLA Breached:** 24 (-9.5%)
8. **Resolved:** 892 (+15.3%)
9. **Closed:** 780 (+10.2%)
10. **Reopened:** 38 (-4.5%)

### 4. Support Performance Cards (6 Metric Cards - Reference Exact Match)
1. **First Response Time:** `12 min` (Green circular clock icon)
2. **Avg. Resolution Time:** `4h 18m` (Blue circular timer icon)
3. **SLA Compliance:** `92%` (Green circular star icon)
4. **First Contact Resolution:** `68%` (Green circular checkmark icon)
5. **Reopen Rate:** `4.2%` (Orange circular refresh arrow icon)
6. **Customer Satisfaction:** `4.6 / 5` (Gold circular star icon)

### 5. Agent Performance Table (Reference Exact Match)
- Columns: `#`, `AGENT NAME`, `TICKETS ASSIGNED`, `TICKETS RESOLVED`, `AVG. RESOLUTION TIME`, `FIRST RESPONSE TIME`, `SLA COMPLIANCE`, `FCR`, `CSAT`
- Agents:
  - `1. Rahul Kumar`: 142 assigned, 128 resolved, 3h 12m avg, 14m first response, `96%` SLA, `72%` FCR, `4.8` CSAT
  - `2. Priya Sharma`: 118 assigned, 104 resolved, 4h 05m avg, 16m first response, `92%` SLA, `69%` FCR, `4.6` CSAT
  - `3. Anil Reddy`: 96 assigned, 79 resolved, 4h 28m avg, 18m first response, `88%` SLA, `64%` FCR, `4.4` CSAT
  - `4. Sneha Verma`: 84 assigned, 71 resolved, 3h 56m avg, 15m first response, `94%` SLA, `71%` FCR, `4.7` CSAT
  - `5. Karthik Iyer`: 62 assigned, 51 resolved, 5h 14m avg, 22m first response, `81%` SLA, `58%` FCR, `4.2` CSAT

### 6. Additional Analytical & Operational Panels
- **Team Workload Distribution:** Visual capacity bars across Order & Delivery, Payments & Refunds, Fresh Produce Quality & Returns, and Technical Support.
- **Tickets by Priority & Status:** Urgent, High, Medium, Low breakdown with multi-segmented status composition bar.
- **SLA Breach Trends & Root Cause Analysis:** Area and bar analytics chart tracking daily compliance and top causes.
- **Recent Customer Tickets:** Live stream table with click-to-view detail modal.
- **Recent Escalations:** Priority escalation alerts with one-click actions (*Approve Instant Refund*, *Assign Backup Rider*, *Audit Stock*).

---

## ⚡ Interactive Features

- **4K UHD / Display Mode Switcher:** Floating control bar at bottom-right enabling 1-click toggling between:
  - *Fit Screen* (Responsive auto-fit)
  - *1080p FHD* (1920 × 1080 px container)
  - *1440p QHD* (2560 × 1440 px container)
  - *3840 × 2160 Native 4K UHD*
- **Live Search & Shortcuts:** Press `⌘K` or `Ctrl+K` to search tickets and customers instantly.
- **Date Filter:** Switch between Today, Yesterday, Last 7 Days, Month to Date with reactive metric updates.
- **Export Report:** Downloads real CSV report of agent and SLA metrics.
- **Modals:**
  - POS Terminal Modal
  - Ticket Detail Inspection & Resolution Modal
  - Create New Ticket Modal
  - Date Range Picker Modal

---

## 🚀 Running Locally

```bash
# Run the local server
node server.js
```

Open your browser at `http://localhost:3000/`.
>>>>>>> cd36130 (feat: Add VillagKart Support Management Module with SLA Monitoring, Customer Tickets, and Requests)
