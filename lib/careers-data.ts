export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  level: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
}

export const jobListings: Job[] = [
  {
    id: "software-engineer",
    title: "Software Engineer",
    department: "Engineering",
    location: "Remote",
    level: "Mid-Level",
    description:
      "We're looking for a talented Software Engineer to join our growing engineering team. You'll work on building scalable applications and collaborate with cross-functional teams to deliver exceptional products.",
    responsibilities: [
      "Design and develop robust, scalable backend services",
      "Collaborate with product and design teams to implement new features",
      "Write clean, maintainable code with comprehensive test coverage",
      "Participate in code reviews and contribute to architectural decisions",
      "Debug production issues and optimize application performance",
    ],
    requirements: [
      "5+ years of software development experience",
      "Strong proficiency in TypeScript/JavaScript, Python, or Go",
      "Experience with REST APIs and database design",
      "Familiarity with cloud platforms (AWS, GCP, or Azure)",
      "Excellent problem-solving and communication skills",
    ],
    benefits: [
      "Competitive salary + equity",
      "Health insurance coverage",
      "Remote work flexibility",
      "Professional development budget",
      "Unlimited paid time off",
    ],
  },
  {
    id: "product-manager",
    title: "Product Manager",
    department: "Product",
    location: "San Francisco, CA",
    level: "Senior",
    description:
      "Lead the strategy and execution of product initiatives that impact millions of users. We're seeking an experienced Product Manager to own the product roadmap and drive growth.",
    responsibilities: [
      "Define product vision and strategy aligned with company goals",
      "Conduct user research and analyze market trends",
      "Work with engineering and design to deliver high-impact features",
      "Measure product success through data and user feedback",
      "Build and mentor junior product team members",
    ],
    requirements: [
      "8+ years of product management experience",
      "Track record of launching successful products",
      "Data-driven decision making mindset",
      "Strong analytical and communication skills",
      "Experience in SaaS or B2B products",
    ],
    benefits: [
      "Competitive salary + stock options",
      "Comprehensive health benefits",
      "Learning and development budget",
      "Quarterly bonuses",
      "Flexible work arrangement",
    ],
  },
  {
    id: "marketing-specialist",
    title: "Marketing Specialist",
    department: "Marketing",
    location: "New York, NY",
    level: "Mid-Level",
    description:
      "Join our marketing team and help drive customer acquisition and brand awareness. You'll create compelling campaigns and strategies that resonate with our target audience.",
    responsibilities: [
      "Develop and execute digital marketing campaigns",
      "Manage social media presence and content calendar",
      "Analyze campaign performance and optimize ROI",
      "Collaborate with sales team on lead generation strategies",
      "Create marketing materials and case studies",
    ],
    requirements: [
      "4+ years of digital marketing experience",
      "Strong written and verbal communication skills",
      "Experience with marketing automation tools",
      "Data analysis and reporting expertise",
      "Creative thinking and attention to detail",
    ],
    benefits: [
      "Competitive salary",
      "Health and wellness benefits",
      "Home office stipend",
      "Creative freedom",
      "Team collaboration opportunities",
    ],
  },
  {
    id: "sales-executive",
    title: "Sales Executive",
    department: "Sales",
    location: "Chicago, IL",
    level: "Mid-Level",
    description:
      "Drive revenue growth by building relationships with enterprise clients. We're looking for a results-driven Sales Executive to expand our customer base and hit ambitious targets.",
    responsibilities: [
      "Prospect and qualify leads in target market segments",
      "Conduct product demos and pitch presentations",
      "Close deals and exceed quarterly sales targets",
      "Maintain accurate sales pipeline and forecasting",
      "Build long-term strategic relationships with key accounts",
    ],
    requirements: [
      "5+ years of enterprise sales experience",
      "Proven track record of exceeding sales targets",
      "Strong negotiation and closing skills",
      "CRM proficiency (Salesforce preferred)",
      "Self-motivated and resilient mindset",
    ],
    benefits: [
      "Base salary + competitive commission",
      "Health insurance",
      "Sales incentive trips",
      "Car allowance",
      "Territory flexibility",
    ],
  },
  {
    id: "design-lead",
    title: "Design Lead",
    department: "Design",
    location: "Los Angeles, CA",
    level: "Senior",
    description:
      "Lead our design team and shape the user experience of our products. You'll define design standards, mentor designers, and create beautiful, intuitive interfaces.",
    responsibilities: [
      "Lead design strategy and vision across product lines",
      "Mentor and grow the design team",
      "Conduct user research and usability testing",
      "Create wireframes, prototypes, and high-fidelity designs",
      "Collaborate with engineering and product teams",
    ],
    requirements: [
      "8+ years of UX/UI design experience",
      "Strong portfolio demonstrating design excellence",
      "Proficiency in design tools (Figma, Adobe Suite)",
      "Leadership and team management experience",
      "Understanding of design systems and scalability",
    ],
    benefits: [
      "Competitive salary + stock options",
      "Health and wellness coverage",
      "Creative budget for tools and resources",
      "Flexible hours and remote options",
      "Paid sabbatical after 5 years",
    ],
  },
  {
    id: "customer-success",
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "Austin, TX",
    level: "Entry-Level",
    description:
      "Be the voice of the customer and help them achieve their goals. Join our Customer Success team and build lasting relationships with our valued clients.",
    responsibilities: [
      "Onboard new customers and ensure successful implementation",
      "Provide ongoing technical and business support",
      "Identify expansion opportunities and upsell potential",
      "Gather customer feedback and communicate to product team",
      "Create training materials and documentation",
    ],
    requirements: [
      "2+ years of customer support or success experience",
      "Excellent communication and empathy",
      "Problem-solving mindset",
      "CRM and ticketing system experience",
      "Ability to manage multiple customer relationships",
    ],
    benefits: [
      "Competitive salary",
      "Health insurance",
      "Customer appreciation bonuses",
      "Professional development fund",
      "Flexible PTO",
    ],
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    department: "Analytics",
    location: "Remote",
    level: "Mid-Level",
    description:
      "Transform data into actionable insights that drive business decisions. We need a skilled Data Analyst to help us understand our metrics and optimize performance.",
    responsibilities: [
      "Build and maintain dashboards and reports",
      "Conduct exploratory data analysis",
      "Develop SQL queries to extract and analyze data",
      "Identify trends and patterns in business data",
      "Collaborate with stakeholders to define KPIs",
    ],
    requirements: [
      "4+ years of data analysis experience",
      "Advanced SQL and Excel skills",
      "Experience with BI tools (Tableau, Looker, PowerBI)",
      "Statistical analysis knowledge",
      "Strong attention to detail",
    ],
    benefits: [
      "Competitive salary",
      "Health and dental coverage",
      "Remote work flexibility",
      "Learning budget",
      "Collaborative team environment",
    ],
  },
  {
    id: "operations-manager",
    title: "Operations Manager",
    department: "Operations",
    location: "Boston, MA",
    level: "Mid-Level",
    description:
      "Streamline our operations and drive efficiency across the organization. We're looking for an Operations Manager to optimize processes and support business growth.",
    responsibilities: [
      "Manage company operations and administrative functions",
      "Optimize workflows and implement process improvements",
      "Manage vendor relationships and contracts",
      "Create and maintain operational documentation",
      "Support cross-functional teams with resources and planning",
    ],
    requirements: [
      "5+ years of operations or business administration experience",
      "Process improvement and project management skills",
      "Financial acumen and budgeting experience",
      "Strong organizational and leadership abilities",
      "Proficiency with project management tools",
    ],
    benefits: [
      "Competitive salary",
      "Comprehensive health benefits",
      "Continuing education opportunities",
      "Performance bonuses",
      "Office flexibility",
    ],
  },
];
