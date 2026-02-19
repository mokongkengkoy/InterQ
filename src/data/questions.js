/**
 * THE INTERQ MASTER QUESTION ENGINE - V4
 * Logic: Restricted Technical Rounds & Path-Specific Behavioral Stems
 */

export const jobRoles = [
  // TECH (Technical Allowed)
  { id: 'swe', title: 'Software Engineer', category: 'Tech', description: 'General software development, algorithms, and system design.', icon: 'FiCode', color: 'bg-blue-500' },
  { id: 'frontend', title: 'Frontend Developer', category: 'Tech', description: 'UI frameworks, CSS, performance, and accessibility.', icon: 'FiLayout', color: 'bg-cyan-500' },
  { id: 'backend', title: 'Backend Developer', category: 'Tech', description: 'Databases, API design, security, and scalability.', icon: 'FiDatabase', color: 'bg-indigo-500' },
  { id: 'devops', title: 'DevOps Engineer', category: 'Tech', description: 'CI/CD, infrastructure as code, and cloud automation.', icon: 'FiRepeat', color: 'bg-orange-500' },
  
  // BUSINESS & MANAGEMENT (HR Only)
  { id: 'biz-analyst', title: 'Business Analyst', category: 'Business', description: 'Data-driven decision making, process mapping, and requirements.', icon: 'FiBarChart2', color: 'bg-emerald-600' },
  { id: 'project-mgr', title: 'Project Manager', category: 'Business', description: 'Agile methodologies, resource planning, and stakeholder management.', icon: 'FiBriefcase', color: 'bg-indigo-600' },
  { id: 'sales-exec', title: 'Sales Executive', category: 'Business', description: 'Relationship building, negotiation, and revenue growth.', icon: 'FiTrendingUp', color: 'bg-green-600' },
  { id: 'ops-mgr', title: 'Operations Manager', category: 'Business', description: 'Supply chain, logistics, and organizational efficiency.', icon: 'FiSettings', color: 'bg-slate-700' },

  // MARKETING (HR Only)
  { id: 'digital-marketer', title: 'Digital Marketer', category: 'Marketing', description: 'SEO, SEM, social media strategy, and brand growth.', icon: 'FiTarget', color: 'bg-pink-500' },
  { id: 'content-strat', title: 'Content Strategist', category: 'Marketing', description: 'Brand voice, editorial planning, and storytelling.', icon: 'FiEdit3', color: 'bg-rose-500' },
  { id: 'seo-spec', title: 'SEO Specialist', category: 'Marketing', description: 'Search engine optimization, keyword research, and analytics.', icon: 'FiSearch', color: 'bg-orange-400' },

  // HEALTHCARE (HR Only)
  { id: 'nurse', title: 'Registered Nurse', category: 'Healthcare', description: 'Patient care, clinical judgment, and emergency response.', icon: 'FiPlusSquare', color: 'bg-red-500' },
  { id: 'health-admin', title: 'Health Administrator', category: 'Healthcare', description: 'Hospital operations, policy compliance, and medical staff mgmt.', icon: 'FiActivity', color: 'bg-blue-400' },
  { id: 'pharmacist', title: 'Pharmacist', category: 'Healthcare', description: 'Medication management, clinical advice, and patient safety.', icon: 'FiHeart', color: 'bg-teal-500' },

  // ELECTRICAL ENGINEERING (Technical Allowed)
  { id: 'elec-eng', title: 'Electrical Engineer', category: 'Electrical', description: 'Circuit design, power systems, and electronics.', icon: 'FiZap', color: 'bg-yellow-500' },
  { id: 'power-eng', title: 'Power Systems Engineer', category: 'Electrical', description: 'Grid infrastructure, renewable energy, and high voltage.', icon: 'FiCpu', color: 'bg-amber-600' },

  // MECHANICAL ENGINEERING (Technical Allowed)
  { id: 'mech-eng', title: 'Mechanical Engineer', category: 'Mechanical', description: 'Thermodynamics, machine design, and CAD modeling.', icon: 'FiTool', color: 'bg-slate-500' },
  { id: 'robotics-eng', title: 'Robotics Engineer', category: 'Mechanical', description: 'Automation, sensors, and mechanical control systems.', icon: 'FiBox', color: 'bg-indigo-400' }
];

// --- UNIVERSAL BEHAVIORAL HR TEMPLATE POOL ---
const hrBehavioralStems = [
  "Tell me about a time you faced a significant roadblock as a {role} and how you navigated it.",
  "How do you stay updated with the rapidly evolving trends and tools relevant to a {role}?",
  "Describe a situation where you had to explain a complex {role}-related concept to a non-expert stakeholder.",
  "What is the most challenging feedback you've received regarding your work as a {role}?",
  "How do you balance the need for quality with strict project deadlines in your capacity as a {role}?",
  "Tell me about a time you had a disagreement with a fellow team member about a {role} decision.",
  "In your opinion, what is the most important soft skill for a {role} to possess?",
  "Describe a project where you took the lead on a {role} initiative. What were the results?",
  "How do you approach learning a completely new methodology or tool required for your {role} duties?",
  "Tell me about a time you identified a potential system or process failure before it happened as a {role}.",
  "How do you mentor junior members of the team or share your {role} expertise with others?",
  "Describe your ideal collaboration workflow between a {role} and the wider organization.",
  "What motivated you to specialize as a {role} specifically?",
  "Tell me about a time you had to work with outdated tools or legacy processes as a {role}.",
  "How do you handle 'context switching' or managing multiple high-priority {role} tasks?",
  "What is your philosophy on quality vs speed, and when do you believe it's acceptable for a {role} to prioritize speed?",
  "Describe a situation where you had to advocate for a specific strategy as a {role} against opposing views.",
  "How do you ensure your {role} output is accessible and inclusive?",
  "Tell me about a time a project you were working on as a {role} failed. What did you learn?",
  "How do you maintain your productivity and focus during high-pressure cycles as a {role}?",
  "What is the most interesting {role} problem you've solved in the last 6 months?",
  "How do you handle situations where the requirements for your {role} task are ambiguous?",
  "Tell me about a time you went above and beyond your standard {role} responsibilities.",
  "How do you evaluate the success of your own work as a {role}?",
  "If you could change one thing about the current industry standard for {role} workflows, what would it be?"
];

// --- TECHNICAL POOLS (Only for Tech, Elec, Mech) ---
const technicalPools = {
  Tech: [
    "Explain the CAP theorem.","How do you design a rate-limiter?","What is the N+1 query problem?",
    "Describe Monolith vs Microservices.","How do you handle state in distributed systems?",
    "Explain optimistic vs pessimistic locking.","How do you secure data in the cloud?",
    "Describe WebSockets vs Polling.","Benefits of a CDN?","SQL vs NoSQL scaling."
  ],
  Electrical: [
    "Explain the difference between AC and DC power.","How do you design a circuit for surge protection?",
    "What is Ohm's Law and how do you apply it to complex networks?","Describe the function of a transformer in a power grid.",
    "How do you troubleshoot a PCB failure?","Explain the principles of electromagnetic interference (EMI).",
    "How do you ensure safety compliance (IEEE/IEC) in your designs?","What is the role of a PLC in industrial automation?",
    "Describe the difference between analog and digital signal processing.","How do you optimize power consumption in embedded systems?"
  ],
  Mechanical: [
    "Explain the laws of thermodynamics.","How do you select materials for high-stress applications?",
    "Describe your process for Finite Element Analysis (FEA).","What is the difference between stress and strain?",
    "How do you design for manufacturability (DFM)?","Explain the function of a heat exchanger.",
    "How do you handle tolerance stack-up in complex assemblies?","Describe the principles of fluid dynamics in HVAC systems.",
    "What software do you prefer for 3D modeling and why?","How do you approach vibration analysis in moving machinery?"
  ]
};

const introPool = [
  "Walk me through your journey to becoming a {role}.",
  "What specific aspect of being a {role} at our company excites you the most?",
  "How does this {role} position align with your long-term career aspirations?",
  "Tell me about the most impactful project you've completed as a {role}."
];

const closingPool = [
  "Where do you see yourself evolving within the {role} career path in the next 3 years?",
  "What questions do you have for us regarding the {role} team or our culture?",
  "Is there anything about your experience as a {role} that we haven't covered?"
];

/**
 * ENGINE EXPORT
 */
export const getQuestions = (roleId, count = 5, roundType = 'balanced') => {
  const role = jobRoles.find(r => r.id === roleId);
  if (!role) return [];

  const roleTitle = role.title;
  const category = role.category;
  
  // Helper for HR Questions
  const generateHR = (n) => {
    let pool = [...hrBehavioralStems].sort(() => 0.5 - Math.random());
    return pool.slice(0, n).map(q => q.replace(/{role}/g, roleTitle));
  };

  // Helper for Technical Questions
  const generateTech = (n) => {
    const pool = technicalPools[category] || [];
    if (pool.length === 0) return generateHR(n); // Fallback if someone forces technical on non-tech role
    return [...pool].sort(() => 0.5 - Math.random()).slice(0, n);
  };

  if (roundType === 'hr') {
    const intro = introPool[Math.floor(Math.random() * introPool.length)].replace(/{role}/g, roleTitle);
    const closing = closingPool[Math.floor(Math.random() * closingPool.length)].replace(/{role}/g, roleTitle);
    return [intro, ...generateHR(count - 2), closing];
  }

  // If technical is requested but not allowed, force HR
  const technicalCategories = ['Tech', 'Electrical', 'Mechanical'];
  const canHaveTechnical = technicalCategories.includes(category);

  if (roundType === 'technical' && canHaveTechnical) {
    return generateTech(count);
  }

  // Balanced (Mix tech + hr)
  if (canHaveTechnical) {
    const techCount = Math.floor(count / 2);
    const hrCount = count - techCount;
    return [...generateTech(techCount), ...generateHR(hrCount)].sort(() => 0.5 - Math.random());
  }

  // If it's a non-technical role, always return HR questions regardless of roundType
  return generateHR(count);
};