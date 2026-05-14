/**
 * Customer Database proposition tables — structure aligned with
 * Sample Framework_Customer Database_Europe High-Speed Data Acquisition (DAQ) Systems Market_CMI.xlsx
 * (sheets: Proposition 1 - Basic, Proposition 2 - Advance, Proposition 3 - Premium)
 */

export interface PropositionGroup {
  label: string
  colspan: number
}

export interface PropositionTableConfig {
  id: string
  sheetTitle: string
  /** Row 4 in workbook: parent headers; empty following cells merge into colspan */
  row4: string[]
  /** Row 5: leaf column headers (same length as total columns) */
  row5: string[]
  /** Demo body rows (excluding headers) */
  demoRowCount: number
}

function norm(s: string): string {
  return String(s ?? '')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .trim()
}

/** Derive merged groups from Excel-style row (first non-empty cell, then run of empties = colspan). */
export function groupsFromRow4(row4: string[]): PropositionGroup[] {
  const groups: PropositionGroup[] = []
  let i = 0
  while (i < row4.length) {
    const label = norm(row4[i])
    let colspan = 1
    while (i + colspan < row4.length && norm(row4[i + colspan]) === '') {
      colspan++
    }
    groups.push({ label: label || '—', colspan })
    i += colspan
  }
  return groups
}

const P1_R4 = [
  'S.No.',
  'Customer Information',
  '',
  '',
  '',
  '',
  'Contact Details',
  '',
  '',
  '',
  '',
  '',
]

const P1_R5 = [
  '',
  'Customer Name/Company Name',
  'Business Overview',
  'Industry Vertical\n(Aerospace & Defense, Automotive & Mobility, Industrial Manufacturing, Semiconductor & Electronics, Healthcare & Life Sciences, Energy & Utilities, Telecommunications, Research & Academia)',
  'Total Annual Revenue (US$ Million)',
  'Customer Size / Scale\n(Large multinational enterprise, government research organization, defense contractor, mid-sized automation integrator, industrial testing laboratory, academic research center)',
  'Key Contact Person',
  'Designation/Role',
  'Email Address',
  'Phone/WhatsApp Number',
  'LinkedIn Profile',
  'Website URL',
]

/** Row 4 for Proposition 2 (includes Professional Drivers, same as original workbook layout). */
const P2_R4 = [
  'S.No.',
  'Customer Information',
  '',
  '',
  '',
  '',
  'Contact Details',
  '',
  '',
  '',
  '',
  '',
  'Professional Drivers',
  '',
  '',
]

const P2_R5 = [
  '',
  'Customer Name/Company Name',
  'Business Overview',
  'Industry Vertical\n(Aerospace & Defense, Automotive & Mobility, Industrial Manufacturing, Semiconductor & Electronics, Healthcare & Life Sciences, Energy & Utilities, Telecommunications, Research & Academia)',
  'Total Annual Revenue (US$ Million)',
  'Customer Size / Scale\n(Large multinational enterprise, government research organization, defense contractor, mid-sized automation integrator, industrial testing laboratory, academic research center)',
  'Key Contact Person',
  'Designation/Role',
  'Email Address',
  'Phone/WhatsApp Number',
  'LinkedIn Profile',
  'Website URL',
  'Key Buying Criteria\n(Sampling rate requirements, channel density requirements, synchronization capability, low-latency acquisition capability, FPGA integration support, modular scalability, real-time analytics support, signal fidelity, bandwidth capability, edge processing compatibility, ruggedized architecture requirements, software interoperability (LabVIEW/MATLAB/Python APIs), AI-enabled analytics compatibility)',
  'Key Pain Points\n(High infrastructure cost, data overload and storage bottlenecks, latency issues in real-time acquisition, synchronization challenges across multi-channel systems, integration complexity with industrial protocols, cybersecurity concerns in connected DAQ systems, calibration drift, hardware scalability limitations, shortage of skilled signal processing personnel)',
  'Upcoming Triggers and Initiatives\n(Industry 4.0 adoption, EV battery testing expansion, autonomous vehicle validation, predictive maintenance deployment, AI-integrated industrial monitoring, semiconductor manufacturing automation, aerospace testing modernization, defense electronics testing upgrades, digital twin implementation, smart grid monitoring initiatives)',
]

const P3_R4 = [
  'S.No.',
  'Customer Information',
  '',
  '',
  '',
  '',
  'Contact Details',
  '',
  '',
  '',
  '',
  '',
  'Professional Drivers',
  '',
  '',
  'Purchasing Behaviour Metrics',
  '',
  '',
  'Solution Requirements',
  '',
  '',
  'CMI Insights',
  '',
]

const P3_R5 = [
  '',
  'Customer Name/Company Name',
  'Business Overview',
  'Industry Vertical\n(Aerospace & Defense, Automotive & Mobility, Industrial Manufacturing, Semiconductor & Electronics, Healthcare & Life Sciences, Energy & Utilities, Telecommunications, Research & Academia)',
  'Total Annual Revenue (US$ Million)',
  'Customer Size / Scale\n(Large multinational enterprise, government research organization, defense contractor, mid-sized automation integrator, industrial testing laboratory, academic research center)',
  'Key Contact Person',
  'Designation/Role',
  'Email Address',
  'Phone/WhatsApp Number',
  'LinkedIn Profile',
  'Website URL',
  'Key Buying Criteria\n(Sampling rate requirements, channel density requirements, synchronization capability, low-latency acquisition capability, FPGA integration support, modular scalability, real-time analytics support, signal fidelity, bandwidth capability, edge processing compatibility, ruggedized architecture requirements, software interoperability (LabVIEW/MATLAB/Python APIs), AI-enabled analytics compatibility)',
  'Key Pain Points\n(High infrastructure cost, data overload and storage bottlenecks, latency issues in real-time acquisition, synchronization challenges across multi-channel systems, integration complexity with industrial protocols, cybersecurity concerns in connected DAQ systems, calibration drift, hardware scalability limitations, shortage of skilled signal processing personnel)',
  'Upcoming Triggers and Initiatives\n(Industry 4.0 adoption, EV battery testing expansion, autonomous vehicle validation, predictive maintenance deployment, AI-integrated industrial monitoring, semiconductor manufacturing automation, aerospace testing modernization, defense electronics testing upgrades, digital twin implementation, smart grid monitoring initiatives)',
  'Budget Ownership\n(CTO office, R&D department, industrial automation division, engineering procurement team, defense procurement authority, plant modernization teams, digital transformation office)',
  'Procurement Model\n(Direct OEM procurement, system integrator-led deployment, framework contracts, government tenders, industrial automation partnerships, co-development agreements, research grants and consortium projects)',
  'Preferred Engagement Type\n(Pilot deployment projects, proof-of-concept testing, multi-site deployment contracts, long-term maintenance agreements, engineering customization projects, embedded integration partnerships)',
  'Preferred Solution Type\n(Modular DAQ systems, PCIe/PXI-based DAQ platforms, portable DAQ systems, FPGA-enabled DAQ modules, edge DAQ systems, embedded DAQ devices, cloud-connected analytics platforms, software-defined acquisition systems)',
  'Preferred Deployment Model\n(On-premise industrial deployment, edge-based processing, hybrid edge-cloud analytics, embedded deployment within robotics/industrial systems, secure defense-grade deployment)',
  'Performance Expectations\n(Ultra-low latency, high-speed synchronized acquisition, deterministic real-time performance, high signal accuracy, high bandwidth processing, rugged industrial reliability, interoperability with industrial networks, scalable multi-channel architecture, AI-ready data pipeline compatibility)',
  'Customer Benchmarking Summary (Potential Customers)',
  'Additional Comments/Notes By CMI team',
]

export const PROPOSITION_TABLES: PropositionTableConfig[] = [
  {
    id: 'prop-1',
    sheetTitle: 'Proposition 1 — Basic',
    row4: P1_R4,
    row5: P1_R5,
    demoRowCount: 15,
  },
  {
    id: 'prop-2',
    sheetTitle: 'Proposition 2 — Advance',
    row4: P2_R4,
    row5: P2_R5,
    demoRowCount: 15,
  },
  {
    id: 'prop-3',
    sheetTitle: 'Proposition 3 — Premium',
    row4: P3_R4,
    row5: P3_R5,
    demoRowCount: 15,
  },
]
