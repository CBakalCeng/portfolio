/**
 * ═══════════════════════════════════════════════════════════════════
 *  SINGLE SOURCE OF TRUTH — Edit this file to change all site content
 *  Non-developer friendly: just change the text/values below.
 *  Image paths: put files in /public/ and reference as '/filename.ext'
 * ═══════════════════════════════════════════════════════════════════
 */

// ── Profile photo (drop your photo in /public/profile.jpg) ─────────────────
import profileImg from '../assets/images/profile.png'

// ── Certification images ────────────────────────────────────────────────────
import imgPmp  from '../assets/images/cert-pmp.jpg'
import imgCeng from '../assets/images/cert-ceng.jpg'
import imgItil from '../assets/images/cert-itil.jpg'
import imgLss  from '../assets/images/cert-lss.jpg'
import imgIso  from '../assets/images/cert-iso31000.jpg'

// ───────────────────────────────────────────────────────────────────
//  HERO SECTION
// ───────────────────────────────────────────────────────────────────
export const hero = {
  name:       'Chetan Bakal',
  credentials: 'CEng · PMP® · ITIL® v4 · LSS GB',
  title:      'Global PMO Lead · Portfolio Governance',
  subtitle:   'Project, Program & Portfolio Leadership',
  tagline:    'Translating engineering complexity into boardroom-ready strategic insights.',
  summary:    'Chartered Engineer driving global infrastructure delivery across Data Centres, Oil & Gas, and Commercial Real Estate — spanning APAC, EMEA & Americas.',
  photo:      profileImg,
  email:      'chetanbakal@hotmail.com',
  phone:      '+91 77989 99978',
  location:   'Pune, Maharashtra, India',
  linkedin:   'https://linkedin.com/in/chetanbakal',
  resume:     '/resume.pdf',   // place resume.pdf in /public/
  status:     'Open to Senior Leadership Roles',
  kpis: [
    { value: '10+',      label: 'Years Experience' },
    { value: '150+',     label: 'Projects Managed' },
    { value: '₹3K Cr+',  label: 'Portfolio Value' },
    { value: '3',        label: 'Global Regions' },
  ],
  badges: [
    { icon: 'fa-globe',        label: 'Global PMO',            color: '#c9922a' },
    { icon: 'fa-chart-bar',    label: 'Portfolio Governance',   color: '#3B82F6' },
    { icon: 'fa-bolt',         label: 'Data Centres',           color: '#10B981' },
    { icon: 'fa-oil-can',      label: 'Oil & Gas',              color: '#8B5CF6' },
    { icon: 'fa-earth-asia',   label: 'APAC · EMEA · Americas', color: '#F59E0B' },
  ],
}

// ───────────────────────────────────────────────────────────────────
//  ABOUT / EXECUTIVE PROFILE
// ───────────────────────────────────────────────────────────────────
export const about = {
  paragraphs: [
    'A <strong>Chartered Engineer (CEng)</strong> and <strong>PMP® certified</strong> professional with over a decade of experience delivering complex, high-value infrastructure programs across global enterprise environments.',
    'Currently seconded within the <strong>Global Portfolio Management Office (GPMO) at bp</strong>, driving portfolio governance, delivery assurance, and executive reporting across 150+ projects spanning APAC, EMEA, and the Americas.',
    'The defining edge: a rare combination of deep infrastructure engineering expertise — Electrical, MEP, ICT, ELV, IBMS — fused with enterprise PMO governance, data-driven analytics, and cross-functional program leadership. This enables translation of technical complexity into boardroom-ready strategic insights.',
    'Forward focus is on advancing into senior program and portfolio leadership roles, enabling strategic infrastructure transformation through governance, analytics, and operational excellence at enterprise scale.',
  ],
  highlights: [
    { icon: 'fa-globe',        color: '#c9922a', title: 'Global Reach',        desc: 'APAC, EMEA & Americas — cross-regional delivery assurance at enterprise scale.' },
    { icon: 'fa-chart-line',   color: '#3B82F6', title: 'Data-Driven PMO',     desc: 'Power BI dashboards, KPI frameworks, and forecast models driving executive decisions.' },
    { icon: 'fa-gears',        color: '#10B981', title: 'Engineering Depth',   desc: 'Electrical, MEP, ICT, ELV & IBMS systems across Tier-3/4 Data Centres and refineries.' },
    { icon: 'fa-shield-halved',color: '#8B5CF6', title: 'Governance Expert',   desc: 'ISO-aligned frameworks, risk, compliance, and value realisation across 150+ projects.' },
  ],
  quickInfo: [
    { icon: 'fa-location-dot', label: 'Location',            value: 'Pune, Maharashtra, India' },
    { icon: 'fa-building',     label: 'Current Role',         value: 'Project Manager · Turner & Townsend' },
    { icon: 'fa-handshake',    label: 'Client',               value: 'bp – Global PMO (Secondment)' },
    { icon: 'fa-phone',        label: 'Phone',                value: '+91 77989 99978' },
    { icon: 'fa-language',     label: 'Languages',            value: 'English · Hindi · Marathi · Gujarati' },
  ],
}

// ───────────────────────────────────────────────────────────────────
//  EXPERTISE / CORE COMPETENCIES
// ───────────────────────────────────────────────────────────────────
export const expertise = {
  // Radar chart axes (must match radarValues length)
  radarLabels: ['Portfolio Governance', 'Program Delivery', 'PMO Analytics', 'Risk & Compliance', 'Stakeholder Mgmt', 'Engineering Depth'],
  radarValues:     [92, 88, 85, 87, 90, 93],
  benchmarkValue:  70,   // industry benchmark line
  competencyGroups: [
    {
      id: 'pmo', name: 'PMO & Governance', icon: 'fa-sitemap', color: '#c9922a',
      skills: ['Portfolio Governance', 'PMO Setup & Maturity', 'Delivery Assurance', 'Executive Reporting', 'KPI Frameworks', 'Earned Value Mgmt'],
    },
    {
      id: 'tech', name: 'Infrastructure & Engineering', icon: 'fa-server', color: '#3B82F6',
      skills: ['Tier-3/4 Data Centres', 'Oil & Gas (E&I)', 'MEP Systems', 'ICT/ELV/IBMS', 'HPC Environments', 'Substation (33kV/11kV)'],
    },
    {
      id: 'tools', name: 'Analytics & Tools', icon: 'fa-chart-pie', color: '#10B981',
      skills: ['Power BI', 'Primavera P6', 'MS Project', 'Excel (Advanced)', 'SharePoint', 'Dashboard Design'],
    },
    {
      id: 'std', name: 'Standards & Frameworks', icon: 'fa-certificate', color: '#8B5CF6',
      skills: ['PMI / PMBOK', 'TIA-942 (DC)', 'ISO 31000 (Risk)', 'ITIL® v4', 'Lean Six Sigma GB', 'ISO 37301 (Compliance)'],
    },
  ],
  proficiencyBars: [
    { name: 'Portfolio Governance',   pct: 92, color: '#c9922a' },
    { name: 'Data Centre Delivery',   pct: 90, color: '#3B82F6' },
    { name: 'Program Management',     pct: 88, color: '#10B981' },
    { name: 'Power BI / Analytics',   pct: 82, color: '#8B5CF6' },
    { name: 'Risk & ISO Compliance',  pct: 85, color: '#F59E0B' },
    { name: 'Stakeholder Leadership', pct: 88, color: '#EC4899' },
  ],
}

// ───────────────────────────────────────────────────────────────────
//  EXPERIENCE / CAREER TIMELINE
// ───────────────────────────────────────────────────────────────────
export const experiences = [
  {
    id: 1, year: '2026', current: true,
    icon: 'fa-globe', color: '#c9922a',
    role:    'Global PMO – Program Management Office',
    company: 'bp (via Turner & Townsend)',
    period:  'Jan 2026 – Present',
    location: 'APAC · Remote',
    type:    'Global Enterprise',
    bullets: [
      'Driving global portfolio governance across 150+ projects in APAC, EMEA & Americas.',
      'Leading data-driven reporting, dashboards and executive insights for senior leadership.',
      'Strengthening financial forecasting, portfolio analytics and KPI frameworks across bp.',
      'Advancing PMO maturity, process automation and continuous improvement globally.',
    ],
    tags: ['Portfolio Governance', 'Power BI', 'GPMO', 'Executive Reporting', 'bp'],
  },
  {
    id: 2, year: '2025', current: false,
    icon: 'fa-chart-bar', color: '#3B82F6',
    role:    'India PMO – Program Support',
    company: 'bp (via Turner & Townsend)',
    period:  'May 2025 – Dec 2025',
    location: 'Pune, India · Hybrid',
    type:    'Corporate PMO',
    bullets: [
      'Supported regional & global portfolio governance and assurance across Workplace programs.',
      'Developed dashboards, analytics, and structured reporting frameworks.',
      'Recognised for proactive ownership and continuous improvement mindset.',
      'Awarded Employee of the Month (Oct 2025) for benchmarking model improving governance efficiency.',
    ],
    tags: ['PMO', 'Governance', 'Analytics', 'Stakeholder Mgmt'],
  },
  {
    id: 3, year: '2023', current: false,
    icon: 'fa-server', color: '#10B981',
    role:    'Project Manager',
    company: 'Labotek Technologies',
    period:  'Jul 2023 – Mar 2025',
    location: 'Pune, India · On-site',
    type:    'Infrastructure',
    bullets: [
      'Delivered ₹90 Cr IITM Pune HPC Data Centre – 11.77 PetaFLOPS, 33PB storage, doubling India\'s weather research capacity.',
      'Directed ₹20 Cr Pune Metro Line 03 – UPS (20–400 KVA) and electrical systems across 23 stations.',
      'Oversaw O&M of 4 major Data Centres (NIC Pune, IMD Pune, PNB Mumbai, IITM Pune) at 99.9% uptime.',
      'Led cross-functional teams of 50+ engineers across electrical, HVAC, civil, IT and security disciplines.',
    ],
    tags: ['HPC Data Centre', 'Metro Rail', 'TIA-942', 'O&M', '₹110 Cr+'],
  },
  {
    id: 4, year: '2023', current: false,
    icon: 'fa-building', color: '#8B5CF6',
    role:    'Manager – Planning & MEP',
    company: 'Erecon Spaces',
    period:  'Feb 2023 – Jul 2023',
    location: 'Pune & Mumbai · Hybrid',
    type:    'Commercial Real Estate',
    bullets: [
      'Led ₹15 Cr interior, waterproofing & MEP works at Capgemini\'s SEZ Campus, Mumbai.',
      'Managed project planning & controls (Primavera P6, MS Project) improving schedule adherence by 15%.',
      'Oversaw MEP & ELV systems: HVAC, Electrical Distribution, Fire, CCTV & Access Control.',
    ],
    tags: ['MEP', 'Primavera P6', 'Commercial Real Estate', '₹15 Cr'],
  },
  {
    id: 5, year: '2022', current: false,
    icon: 'fa-bolt', color: '#F59E0B',
    role:    'Sr. Project Engineer – DC / MEP',
    company: 'Prasa',
    period:  'Jul 2022 – Feb 2023',
    location: 'Bengaluru, India · On-site',
    type:    'Data Centre',
    bullets: [
      'Delivered ₹30 Cr Data Centre & MEP works for IOCL\'s Karnataka State Office & BCC at K.R. Puram.',
      'Supervised ITC of electrical, cooling, safety & automation systems for Tier-4 DC environment.',
    ],
    tags: ['Tier-4 DC', 'IOCL', 'MEP', 'BCC', '₹30 Cr'],
  },
  {
    id: 6, year: '2019', current: false,
    icon: 'fa-industry', color: '#EC4899',
    role:    'Sr. Engineer – MEP',
    company: 'SHUBHAM EPC Private Limited',
    period:  'Dec 2019 – Jun 2022',
    location: 'Pune, India · On-site',
    type:    'EPC',
    bullets: [
      'Delivered ₹50+ Cr EPC projects: IISER Pune vertical expansion & IOCL Gujarat Refinery (BS-VI).',
      'Supervised HVAC, Electrical, ELV systems across Data Centres, Refinery Control Rooms and Labs.',
      'Recognised as Top Performer of the Quarter FY 2020–21.',
    ],
    tags: ['EPC', 'Refinery', 'Data Centre', 'HVAC', '₹50 Cr+'],
  },
  {
    id: 7, year: '2016', current: false,
    icon: 'fa-oil-can', color: '#06b6d4',
    role:    'Sr. Project Engineer',
    company: 'Laxmi Engineering Pvt. Ltd.',
    period:  'May 2016 – Dec 2019',
    location: 'Vadodara, Gujarat · On-site',
    type:    'Oil & Gas',
    bullets: [
      'Delivered Electrical & E&I works for IOCL\'s ₹3,000 Cr BS-VI Refinery Upgrade Project.',
      'Commissioned 33kV/11kV substations (up to 12.5 MVA) with zero safety incidents.',
      'Managed 250+ km of HT/LT cabling and full E&I scope across multiple process units.',
    ],
    tags: ['Oil & Gas', 'Substation', 'E&I', '₹3,000 Cr Project'],
  },
]

export const education = [
  {
    icon: 'fa-graduation-cap', color: '#c9922a',
    degree: 'MBA – Project Management',
    institution: 'Dr. D.Y. Patil Vidyapeeth',
    period: '2022 – 2024', grade: 'Grade A',
    detail: 'Project Finance, Scheduling, Performance Measurement. Capstone: Lean Construction applied to IITM HPC Data Centre.',
  },
  {
    icon: 'fa-bolt', color: '#3B82F6',
    degree: 'B.E. – Electrical Engineering',
    institution: 'Zeal College of Engineering, Pune',
    period: '2013 – 2016', grade: 'First Class',
    detail: 'Project leadership exposure through ESSA events, social awareness programs and cross-functional technical competitions.',
  },
  {
    icon: 'fa-plug', color: '#8B5CF6',
    degree: 'Diploma – Electrical Engineering',
    institution: 'Cusrow Wadia Institute of Technology',
    period: '2010 – 2013', grade: 'First Class with Distinction',
    detail: 'Golden Jubilee Prize for Best Project Work. Strong foundations in electrical systems and structured technical thinking.',
  },
]

// ───────────────────────────────────────────────────────────────────
//  CERTIFICATIONS & CREDENTIALS
// ───────────────────────────────────────────────────────────────────
export const certifications = {
  featured: [
    {
      title: 'Project Management Professional (PMP®)',
      issuer: 'Project Management Institute (PMI)',
      date: 'Issued Aug 2025 · Expires Aug 2031',
      credentialId: '4166051',
      active: true, img: imgPmp,
      color: '#c9922a',
    },
    {
      title: 'Registered Chartered Engineer (C.Eng.)®',
      issuer: 'Institution of Engineers (India) – IEI',
      date: 'Issued Aug 2024 · AM3131001',
      credentialId: 'AM3131001',
      active: true, img: imgCeng,
      color: '#3B82F6',
    },
    {
      title: 'ITIL® V4 Foundation',
      issuer: 'PeopleCert',
      date: 'Issued May 2026 · Expires May 2029',
      credentialId: 'GR671885449CB',
      active: true, img: imgItil,
      color: '#8B5CF6',
    },
    {
      title: 'Lean Six Sigma Green Belt (Accredited)',
      issuer: 'Six Sigma Academy Amsterdam',
      date: 'Credential ID: 86ec8feb',
      credentialId: '86ec8feb-1cad-4bae',
      active: true, img: imgLss,
      color: '#10B981',
    },
    {
      title: 'Certified ISO 31000 Expert & ERM',
      issuer: 'Six Sigma Academy Amsterdam',
      date: 'Credential ID: fa9f5104',
      credentialId: 'fa9f5104-cb1e-402e',
      active: true, img: imgIso,
      color: '#F59E0B',
    },
    {
      title: 'AMIE – Associate Member of IEI',
      issuer: 'Institution of Engineers of India, Kolkata',
      date: 'Jul 2024 – Present',
      credentialId: 'IEI Membership',
      active: true, img: imgCeng,
      color: '#EC4899',
    },
  ],
  additional: [
    { icon: 'fa-robot',       title: 'CPMAI™ Foundation',          issuer: 'PMI – Cognitive Project Management in AI', date: '2025', color: '#3B82F6' },
    { icon: 'fa-scale-balanced', title: 'ISO 37301 Compliance Mgmt', issuer: 'Rig Cert Education',                    date: '2025', color: '#8B5CF6' },
    { icon: 'fa-chart-bar',   title: 'Microsoft Power BI',           issuer: 'Skill Nation',                           date: '2024', color: '#F59E0B' },
    { icon: 'fa-award',       title: 'Lean Six Sigma Yellow Belt',   issuer: 'SSAA (UK CPD Accredited)',               date: '2024', color: '#10B981' },
  ],
  awards: [
    {
      icon: 'fa-trophy',   color: '#c9922a',
      title: 'Employee of the Month',
      by:    'Turner & Townsend · Oct 2025',
      desc:  'Recognised for exceptional contribution to bp account and a cost & timeline benchmarking model that improved governance efficiency programme-wide.',
    },
    {
      icon: 'fa-shield',   color: '#3B82F6',
      title: 'Certificate of Appreciation – Safety',
      by:    'L&T Construction · Jan 2025',
      desc:  'Awarded for leading high safety standards and operational excellence at the CCS Project, New Delhi.',
    },
    {
      icon: 'fa-star',     color: '#10B981',
      title: 'Top Performer of the Quarter',
      by:    'Shubham EPC · Jan 2021',
      desc:  'Recognised for outstanding performance in FY 2020–21 Q4 across EPC project delivery.',
    },
    {
      icon: 'fa-medal',    color: '#8B5CF6',
      title: 'Golden Jubilee Best Project Award',
      by:    'Cusrow Wadia Institute · 2014',
      desc:  'Best project work award and Shree Venkatesh Purushottam Budhhikot Prize at graduation.',
    },
  ],
}

// ───────────────────────────────────────────────────────────────────
//  CONTACT
// ───────────────────────────────────────────────────────────────────
export const contact = {
  email:    'chetanbakal@hotmail.com',
  phone:    '+91 77989 99978',
  location: 'Pune, Maharashtra, India',
  linkedin: 'https://linkedin.com/in/chetanbakal',
  resume:   '/resume.pdf',
  availability: 'Open to senior leadership, advisory & strategic collaboration roles globally.',
}
