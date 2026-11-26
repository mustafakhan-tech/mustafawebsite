export const person = {
  name: "Mustafa Khan",
  place: "Edmonton, Alberta",
  email: "khan11mustafa@gmail.com",
  resume: "/Mustafa_Khan_Resume.pdf",
  // Add LinkedIn, GitHub or X here and they appear in the footer and links list.
  social: [] as { label: string; href: string }[],
};

export type CaseStudy = {
  slug: string;
  title: string;
  role: string;
  years: string;
  stage: string;
  summary: string;
  facts: [string, string][];
  sections: { heading: string; body: string[] }[];
  published: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "nexus-partners",
    title: "Nexus Partners Agency",
    role: "Founder",
    years: "2023 to now",
    stage: "Running",
    summary:
      "An agency that matches YouTubers with brand sponsors. I ran the outreach, the negotiation and the relationship on both sides of every deal.",
    facts: [
      ["Role", "Founder and operator"],
      ["Started", "2023"],
      ["Based", "Edmonton, Alberta"],
      ["Sells", "Sponsorship deals between creators and brands"],
      ["Paid by", "15 to 20 percent commission per deal"],
    ],
    sections: [
      {
        heading: "What it is",
        body: [
          "Nexus Partners connects YouTubers with brands that want to sponsor them. I started it in 2023 and built it from zero.",
        ],
      },
      {
        heading: "What I did",
        body: [
          "I owned the whole deal. That meant finding and contacting brands and creators, negotiating sponsorship terms and contracts, and managing the relationship on both sides after the deal closed.",
          "The agency earned a commission of 15 to 20 percent on each deal, so revenue depended on closing.",
        ],
      },
    ],
    published: true,
  },
  {
    slug: "philo",
    title: "Philo",
    role: "Co-founder",
    years: "2024 to now",
    stage: "iOS app",
    summary:
      "An iOS app that brings the ideas of more than 100 philosophers into everyday life. My part was positioning and go-to-market.",
    facts: [
      ["Role", "Co-founder"],
      ["Platform", "iOS"],
      ["Started", "2024"],
      ["My part", "Positioning and go-to-market"],
      ["Content", "Ideas from 100+ philosophers"],
    ],
    sections: [
      {
        heading: "What it is",
        body: [
          "Philo is an iOS app built around the ideas of more than 100 philosophers.",
        ],
      },
      {
        heading: "My part",
        body: [
          "I worked on positioning, who the app is for and how to describe it, and on how it reaches those users.",
        ],
      },
    ],
    published: true,
  },
  {
    slug: "solus",
    title: "Solus",
    role: "Co-founder and COO",
    years: "2025 to now",
    stage: "In development",
    summary:
      "An early-stage startup. I run operations, business development and go-to-market from the ground up.",
    facts: [
      ["Role", "Co-founder and COO"],
      ["Started", "2025"],
      ["Stage", "In development"],
      ["I run", "Operations, business development, go-to-market"],
    ],
    sections: [
      {
        heading: "What it is",
        body: [
          "Solus is an early-stage startup that is still in development. As COO I lead operations, business development and go-to-market.",
        ],
      },
      {
        heading: "What I'm doing",
        body: [
          "I run operations, business development and go-to-market from the ground up, using the sales background below.",
        ],
      },
    ],
    published: true,
  },
];

export const experience = [
  {
    org: "Firefly Solar",
    role: "Sales consultant",
    when: "January 2023 to February 2026",
    body: "Door-to-door residential solar. I booked appointments through high-volume outreach, ran in-home consultations, handled objections and closed on site, consistently above quota. I also recruited, onboarded and mentored new reps.",
  },
  {
    org: "Moores Clothing for Men",
    role: "Sales associate",
    when: "March 2022 to January 2023",
    body: "Personal suit consultations. I beat my targets with a consultative, relationship-first approach.",
  },
  {
    org: "Tommy Hilfiger",
    role: "Sales associate",
    when: "September 2021 to September 2023",
    body: "High-traffic retail. I beat sales targets through client engagement, product knowledge and upselling.",
  },
];

export const leadership = [
  { role: "VP of Marketing and co-founder", org: "Blockchain Society, University of Alberta" },
  { role: "Head basketball coach", org: "Allendale Junior High" },
  { role: "Sunday school teacher", org: "Annoor Islamic Center" },
];

export const skills = [
  { group: "Selling", items: "Door-to-door and high-ticket closing, B2B sales and negotiation, lead generation, pipeline building" },
  { group: "Partnerships", items: "Influencer marketing, brand partnerships, contract negotiation, client relationships" },
  { group: "Tools", items: "Python, JavaScript, CRM tools, e-commerce management" },
];

export const quickFacts: [string, string][] = [
  ["Based", "Edmonton, Alberta"],
  ["Studying", "CS, U of Alberta, 2027"],
  ["Founder", "Nexus Partners, since 2023"],
  ["Co-founder", "Philo and Solus"],
  ["Selling since", "2021"],
];
