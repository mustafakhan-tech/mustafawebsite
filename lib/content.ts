export const person = {
  name: "Mustafa Khan",
  place: "Edmonton, Canada",
  email: "khan11mustafa@gmail.com",
  links: [{ label: "LinkedIn", href: "https://www.linkedin.com/in/mustafa-khan-77b062327/" }],
};

/* The four numbers on the home page ledger. */
export const ledger: { value: string; label: string; href?: string }[] = [
  { value: "$800K+", label: "in brand deals brokered through Nexus Partners since 2025", href: "/work/nexus-partners" },
  { value: "65K", label: "downloads for Philo, where I ran growth and marketing", href: "/work/philo" },
  { value: "3,000+", label: "people on Koba's waitlist, built with no ad spend", href: "/work/koba" },
  { value: "$2M+", label: "in solar sold door to door in my first six months", href: "/about" },
];

export type Stat = { value: string; label: string };
export type Block =
  | { kind: "text"; heading: string; body: string[] }
  | { kind: "list"; heading: string; intro?: string; numbered?: boolean; items: { title: string; body: string }[] };

export type CaseStudy = {
  slug: string;
  name: string;
  logo?: { src: string; alt: string; dark?: boolean; cover?: boolean };
  role: string;
  when: string;
  status: string;
  link?: { label: string; href: string };
  oneLiner: string;
  headline: string;
  lede: string;
  keyStat: Stat;
  visual: "koba" | "nexus" | "philo";
  blocks: Block[];
  results: Stat[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "koba",
    name: "Koba",
    logo: { src: "/img/koba-icon.jpg", alt: "Koba app icon", cover: true },
    role: "Co-founder and COO",
    when: "December 2025 to now",
    status: "Private beta",
    link: { label: "kobamoney.com", href: "https://kobamoney.com" },
    oneLiner: "An AI assistant that splits shared expenses right inside the group chat.",
    headline: "Koba built a 3,000-person waitlist before we spent a dollar on ads",
    lede:
      "Koba is an AI assistant for shared money. You text it in iMessage, SMS or WhatsApp, it splits the bill, and it keeps track of who has paid. Qendrim Beka and I started it together, and I run operations, growth and partnerships.",
    keyStat: { value: "3,000+", label: "on the waitlist, $0 ad spend" },
    visual: "koba",
    blocks: [
      {
        kind: "text",
        heading: "The product sells itself once someone sees it",
        body: [
          "Explaining a money app is hard. Watching someone send a photo of a receipt into the group chat and getting a split back in seconds is easy to understand. So we built growth around showing Koba working in real situations instead of listing features.",
          "Our line for students was simple: your group chat has a finance guy now.",
        ],
      },
      {
        kind: "list",
        heading: "Building the waitlist without paid ads",
        intro: "We had no ad budget, so every person on the waitlist came from people and channels we could reach directly.",
        items: [
          { title: "Campus surveys", body: "We ran surveys through campus channels to put Koba in front of students and start conversations about how they split money." },
          { title: "Newsletters", body: "We got Koba into newsletters on and off campus to reach students who weren't in our own circles." },
          { title: "Our own audiences", body: "We grew our personal brands on social media and used them to show what we were building." },
          { title: "Direct outreach", body: "We reached out to friends and family one by one and turned them into referrals. A shared expense always involves more than one person, so each user can bring in a group." },
        ],
      },
      {
        kind: "text",
        heading: "Letting people in 100 at a time",
        body: [
          "We didn't open the doors to everyone at once. We let people in from the waitlist in batches of 100.",
        ],
      },
      {
        kind: "text",
        heading: "Then I made the launch video",
        body: [
          "When we moved into private beta at the start of November 2026, I planned and choreographed our launch video from start to finish. It was the first time we put money behind ads. People who had never heard of Koba saw it and started using it, and it brought in more than 200 users.",
          "Koba now has 400 users in its private beta.",
        ],
      },
    ],
    results: [
      { value: "3,000+", label: "people on the waitlist" },
      { value: "$0", label: "spent on ads to build it" },
      { value: "400", label: "users in the private beta" },
      { value: "200+", label: "users from the launch video" },
    ],
  },
  {
    slug: "nexus-partners",
    name: "Nexus Partners",
    logo: { src: "/img/nexus-logo.png", alt: "Nexus Partners logo", dark: true },
    role: "Founder",
    when: "2023 to now",
    status: "Running",
    link: { label: "nexuspartnersagency.com", href: "https://www.nexuspartnersagency.com/" },
    oneLiner: "A creator marketing and talent agency that matches creators with brand deals.",
    headline: "I've brokered more than $800K in brand deals for creators on six continents",
    lede:
      "Nexus Partners is the agency I started to connect creators with brands on Instagram, TikTok and YouTube. Since the start of 2025 I've brokered more than $800K in deals for over 100 creators and 30 brands, and I run every one from the first email to the final post.",
    keyStat: { value: "$800K+", label: "in brand deals" },
    visual: "nexus",
    blocks: [
      {
        kind: "list",
        heading: "How a deal comes together",
        numbered: true,
        intro: "Every deal goes through the same five stages, and I own each one.",
        items: [
          { title: "Research", body: "I start with the creator. I study their niche and audience, then research the brands in that space that would actually fit them." },
          { title: "The pitch", body: "Brand reps get a detailed profile of each creator: who their audience is, where they are, how their content performs and what kind of content they make. A brand should be able to picture the campaign before we talk." },
          { title: "Negotiation", body: "I negotiate for both sides at once. The creator should be paid what they're worth, and the brand should get a deal it wants to repeat. The biggest single deal I've closed for a creator was more than $12,000." },
          { title: "Contracts", body: "I handle the business side. I draft the contract, make sure both parties agree on the terms and get it signed." },
          { title: "Delivery", body: "A deal isn't done when it's signed. I check every piece of content against what the brand needs, including the timeline, the format and the specifics of the video, before it goes live." },
        ],
      },
      {
        kind: "text",
        heading: "Any niche, any market",
        body: [
          "I've worked with global brands including OpenAI, Uber, Walmart, Nike and JD Sports, and with local restaurant chains. Because every deal starts from what the brand wants, I can match them with the right creator in almost any niche.",
          "I've managed creators across six continents, so I'm used to working across time zones, currencies and very different audiences.",
        ],
      },
    ],
    results: [
      { value: "$800K+", label: "in brand deals since 2025" },
      { value: "100+", label: "creators represented" },
      { value: "30+", label: "brands worked with" },
      { value: "6", label: "continents of creators" },
    ],
  },
  {
    slug: "philo",
    name: "Philo",
    role: "Growth and marketing",
    when: "2025 to now",
    status: "Live on iOS",
    link: { label: "getphiloapp.com", href: "https://getphiloapp.com" },
    oneLiner: "A thinking journal for iOS, built by Qendrim Beka.",
    headline: "Helping a one-person iOS app reach 65,000 downloads and $34K in revenue",
    lede:
      "Philo is a thinking journal for iOS that Qendrim Beka built on his own. I've run growth and marketing since he first made the app, getting it in front of people who care about philosophy, with no outside funding.",
    keyStat: { value: "65K", label: "downloads" },
    visual: "philo",
    blocks: [
      {
        kind: "list",
        heading: "Three channels",
        intro: "I put Philo where people were already talking about philosophy, and only recently added paid ads.",
        items: [
          { title: "Creator partnerships", body: "I used what I'd learned at Nexus Partners to set up brand deals between Philo and creators whose audiences already care about ideas and self-reflection." },
          { title: "Philosophy communities", body: "I joined the conversations on platforms where people already discuss philosophy and brought them to the app." },
          { title: "Meta ads", body: "I recently started running Facebook and Instagram ads to reach people beyond those creators' audiences." },
        ],
      },
    ],
    results: [
      { value: "65K", label: "downloads" },
      { value: "$34K", label: "in revenue" },
      { value: "$0", label: "in outside funding" },
    ],
  },
];

export const experience = [
  { org: "Koba", role: "Co-founder and COO", when: "Dec 2025 to now", body: "Operations, growth and partnerships for an AI assistant that splits shared expenses in the group chat.", href: "/work/koba" },
  { org: "Philo", role: "Growth and marketing", when: "2025 to now", body: "Creator partnerships, community growth and, more recently, Meta ads for an iOS thinking journal. 65K downloads, $34K revenue.", href: "/work/philo" },
  { org: "Nexus Partners", role: "Founder", when: "2023 to now", body: "Creator marketing and talent agency. $800K+ in brand deals since 2025 for 100+ creators and 30+ brands.", href: "/work/nexus-partners" },
  { org: "Firefly Solar", role: "Setter, then closer", when: "Jan 2023 to Feb 2026", body: "Door-to-door residential solar, where I learned to sell. Details below." },
  { org: "University of Alberta", role: "BSc Computer Science", when: "Graduating 2027", body: "" },
];

export const firefly = {
  intro:
    "I learned to sell by knocking on doors for Firefly Solar. Every door is a cold pitch to someone who didn't ask to talk to you, so you get good at reading people and handling objections fast.",
  stats: [
    { value: "$2M+", label: "in solar sales in my first six months" },
    { value: "$20K+", label: "a month in commission" },
    { value: "< 30 days", label: "to go from setting appointments to closing deals" },
  ] as Stat[],
  outro: "I was one of the top setters at the company the whole time I was there.",
};
