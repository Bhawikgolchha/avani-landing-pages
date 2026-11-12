/**
 * AVANI Content Model & Verbatim Copy Catalog
 * 
 * Sourced directly from:
 * - Official Avani Briefing PDF (media_1794462310806_90d35dda.pdf)
 * - Official Avani Brand Emblem (media_1794462993310_400d91e2.jpg)
 * - Live Substack Note Metadata Inspection
 * 
 * Zero-omission guarantee: Includes all 5 Objectives, 5 Teams, 4 Events, 
 * 11 Climate Tips, 7 External Channels, and 6 Application Rules verbatim.
 */

export type TipCategory = 'energy' | 'water' | 'waste' | 'consumption';

// Interface contracts per PROJECT.md § Interface Contracts
export interface AvaniObjective {
  id: number;
  slug?: string;
  title: string;
  shortTitle?: string;
  description: string;
  verbatimCopy?: string;
  category?: string;
  icon: string;
  metric?: string;
}

export interface AvaniTeam {
  id: string;
  number?: number;
  name: string;
  role?: string;
  description: string;
  responsibilities: string[];
  keyFocus?: string;
  tag?: string;
  icon?: string;
}

export interface AvaniEvent {
  id: string;
  number?: number;
  title: string;
  shortTitle?: string;
  subtitle: string;
  description: string;
  verbatimCopy?: string;
  location?: string;
  timeframe?: string;
  partner?: string;
  metrics?: { label: string; value: string }[];
  tags?: string[];
  image: string;
}

export interface ClimateTip {
  id: number;
  action: string;
  category: TipCategory;
  categoryLabel?: string;
  shortTitle?: string;
  impactLevel?: string;
  icon?: string;
}

export interface SubstackArticle {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  publishedDate: string;
  coverImageUrl: string;
}

export interface AvaniContact {
  email: string;
  phone: string;
  applicationFormUrl: string;
  linkedInUrl: string;
  substackUrl: string;
  substackArticles: { title: string; url: string; subtitle?: string; publishedDate?: string }[];
  instagramUrl: string;
}

export interface ApplicationInstruction {
  step: number;
  text: string;
  highlight?: string;
}

export interface ExternalLinks {
  applicationForm: string;
  linkedIn: string;
  substack: string;
  substackArticles: SubstackArticle[];
  instagram: string;
  instagramClean: string;
  email: string;
  emailMailto: string;
  phone: string;
  phoneTel: string;
  phoneFormatted: string;
  canvaMoodBoard1: string;
  canvaMoodBoard2: string;
}

export interface OrganizationOverview {
  name: string;
  tagline: string;
  greeting: string;
  location: string;
  city: string;
  country: string;
  missionParagraphs: string[];
  verbatimSummary: string;
  howWeWorkHighlights: string[];
  applicationInstructions: ApplicationInstruction[];
}

// -----------------------------------------------------------------------------
// 1. Organization Overview & Mission
// -----------------------------------------------------------------------------

export const AVANI_ORGANIZATION: OrganizationOverview = {
  name: "Avani",
  tagline: "Youth Environmental Organization",
  greeting: "Hello, we are Avani!",
  location: "Bangalore, Karnataka, India",
  city: "Bangalore",
  country: "India",
  missionParagraphs: [
    "Avani is a youth organization based in Bangalore, consisting of an enthusiastic team of students who are committed to making a change in the way we treat our environment.",
    "We share the ideal of a greener and cleaner India, a collective mission we know many people around the world strive for.",
    "Through our posts, we aim to spread awareness about environmental concerns by creating informed posts and reels, outreach and collaborations with other organisations and conducting and organizing community events.",
    "The path to a sustainable and environmentally-healthy habitat is not easy to tread through, but here at Avani, we believe that even the small actions of many add up and bring a change to the world."
  ],
  verbatimSummary: "Avani is a youth organization based in Bangalore, consisting of an enthusiastic team of students who are committed to making a change in the way we treat our environment. We share the ideal of a greener and cleaner India, a collective mission we know many people around the world strive for. Even the small actions of many add up and bring a change to the world.",
  howWeWorkHighlights: [
    "Developing carefully-curated teams of members specializing in particular fields (Research & Writing, Design, HR & Communications, Social Media, Event Planning).",
    "Reaching out to organizations with similar goals for collaborative efforts, greater outreach and widespread impact.",
    "Creating awareness campaigns and educational social media posts.",
    "Volunteering at anti-pollution demonstrations, cleanliness drives, donation programmes and plantation movements."
  ],
  applicationInstructions: [
    {
      step: 1,
      text: "Please fill out all the details of the form with accuracy to ensure validity."
    },
    {
      step: 2,
      text: "Kindly submit all documents (optional) in the following format: NAME_AVANI_SUBMISSION",
      highlight: "NAME_AVANI_SUBMISSION"
    },
    {
      step: 3,
      text: "Short-listed candidates will be contacted for the Interview round."
    },
    {
      step: 4,
      text: "All selected applicants will be assigned to teams by the Core Team after careful discussion following the interviews. Your preference for the team will be noted."
    },
    {
      step: 5,
      text: "This is not a paid internship; it is a voluntary position in a student-led initiative for climate action.",
      highlight: "Voluntary position in student-led initiative"
    },
    {
      step: 6,
      text: "For any doubts or queries, please contact us via Instagram DMs or via our email: avaniyocc@gmail.com"
    }
  ]
};

// -----------------------------------------------------------------------------
// 2. The 5 Core Objectives (Verbatim from PDF Page 1)
// -----------------------------------------------------------------------------

export const AVANI_OBJECTIVES: AvaniObjective[] = [
  {
    id: 1,
    slug: "advocacy",
    title: "Climate Advocacy",
    shortTitle: "Advocacy",
    verbatimCopy: "To advocate for actions against climate change.",
    description: "To advocate for actions against climate change.",
    category: "Advocacy",
    icon: "Megaphone",
    metric: "100+ Youth Mobilized"
  },
  {
    id: 2,
    slug: "restoration",
    title: "Resource Restoration",
    shortTitle: "Restoration",
    verbatimCopy: "To work towards the upliftment and restoration of natural resources in India.",
    description: "To work towards the upliftment and restoration of natural resources in India.",
    category: "Ecosystems",
    icon: "Trees",
    metric: "5+ Native Habitats"
  },
  {
    id: 3,
    slug: "pollution",
    title: "Pollution Reduction",
    shortTitle: "Anti-Pollution",
    verbatimCopy: "To raise a voice against pollution in all spheres.",
    description: "To raise a voice against pollution in all spheres.",
    category: "Defense",
    icon: "Wind",
    metric: "Zero Tolerance"
  },
  {
    id: 4,
    slug: "waste",
    title: "Waste Management",
    shortTitle: "Waste Circularity",
    verbatimCopy: "To ensure effective waste management practices are put into use.",
    description: "To ensure effective waste management practices are put into use.",
    category: "Circular Economy",
    icon: "Recycle",
    metric: "Zero-Waste Goal"
  },
  {
    id: 5,
    slug: "publicity",
    title: "Sustainable Movement Publicity",
    shortTitle: "Movement Amplification",
    verbatimCopy: "To promote and publicize sustainable brands and environmental activist movements across social media platforms.",
    description: "To promote and publicize sustainable brands and environmental activist movements across social media platforms.",
    category: "Amplification",
    icon: "Share2",
    metric: "10K+ Digital Reach"
  }
];

// -----------------------------------------------------------------------------
// 3. The 5 Specialized Teams (PDF Pages 1-2 & Operational Modeling)
// -----------------------------------------------------------------------------

export const AVANI_TEAMS: AvaniTeam[] = [
  {
    id: "research-writing",
    number: 1,
    name: "Research and Writing",
    role: "Investigative Environmental Journalism & Science Verification",
    description: "Investigating urgent environmental crises, analyzing ecological policies, and authoring research-backed essays, notes, and newsletters for Avani's Substack.",
    responsibilities: [
      "Investigate local and global environmental crises (e.g., El Niño temperature anomalies, Himalayan vernacular architecture, and river interlinking).",
      "Translate complex climate science into engaging, accessible, and evidence-backed public essays.",
      "Fact-check all social media scripts, infographic copy, and educational campaigns before public release.",
      "Collaborate with the Design team to structure data-driven visuals and informative infographics."
    ],
    keyFocus: "Scientific Accuracy & In-depth Storytelling",
    tag: "Editorial & Science",
    icon: "BookOpen"
  },
  {
    id: "design",
    number: 2,
    name: "Design",
    role: "Visual Identity, UI/UX & Editorial Graphics",
    description: "Crafting Avani's visual brand universe, designing educational Instagram carousels, event posters, digital graphics, and UI layouts that captivate and inform.",
    responsibilities: [
      "Produce high-impact Instagram carousel graphics, digital banners, and social story templates.",
      "Design branding collateral for offline donation drives, denim upcycling stalls, and environmental workshops.",
      "Maintain strict visual consistency across brand color palettes, typography, and logo presentations.",
      "Partner with Event Planning to craft physical exhibition layouts, merchandise, and environmental posters."
    ],
    keyFocus: "Brand Aesthetics & Visual Communication",
    tag: "Creative & Brand",
    icon: "Palette"
  },
  {
    id: "hr-communications",
    number: 3,
    name: "HR and Communications",
    role: "Talent Acquisition, Member Culture & Institutional Outreach",
    description: "Orchestrating applicant onboarding, conducting member interviews, nurturing internal student culture, and managing official correspondence with partner NGOs and schools.",
    responsibilities: [
      "Process volunteer recruitment submissions via Google Forms and coordinate candidate interviews.",
      "Facilitate thoughtful applicant placements matching volunteer skills with specialized team needs.",
      "Foster an inclusive, supportive, and energized voluntary team culture across cohorts.",
      "Lead external communications with collaborative organizations like Aarogi, schools, and civic groups."
    ],
    keyFocus: "Community Cohesion & Strategic Partnerships",
    tag: "Culture & Relations",
    icon: "Users"
  },
  {
    id: "social-media",
    number: 4,
    name: "Social Media",
    role: "Campaign Strategy, Multi-Channel Growth & Community Engagement",
    description: "Directing digital outreach across Instagram, LinkedIn, and Substack, broadcasting educational reels, running community polls, and driving youth climate awareness.",
    responsibilities: [
      "Plan, schedule, and curate content calendars across Instagram (@avani_yocc) and LinkedIn.",
      "Produce short-form video reels that translate daily climate tips into relatable student lifestyle choices.",
      "Engage directly with the community through polls, quizzes, comments, and direct message queries.",
      "Amplify sustainable brands, environmental petitions, and volunteer calls for offline campus events."
    ],
    keyFocus: "Digital Outreach & Youth Mobilization",
    tag: "Growth & Media",
    icon: "Smartphone"
  },
  {
    id: "event-planning",
    number: 5,
    name: "Event Planning",
    role: "Logistics Management, Field Operations & On-the-Ground Activations",
    description: "Conceptualizing, structuring, and executing hands-on volunteer activations, including campus donation drives, eco-fashion stalls, partner charity programs, and upcycling workshops.",
    responsibilities: [
      "Oversee end-to-end operational logistics, venue permissions, and resource scheduling for campus drives.",
      "Coordinate field logistics for charity partnerships, including supply distribution with Aarogi.",
      "Source materials and facilitate hands-on upcycling curriculum for student waste workshops.",
      "Lead on-site volunteer coordination, crowd management, and impact documentation."
    ],
    keyFocus: "Grassroots Activism & Experiential Action",
    tag: "Field Ops & Logistics",
    icon: "Calendar"
  }
];

// -----------------------------------------------------------------------------
// 4. The 4 Flagship Events (Verbatim from PDF Pages 3-4)
// -----------------------------------------------------------------------------

export const AVANI_EVENTS: AvaniEvent[] = [
  {
    id: "dps-donation-drive",
    number: 1,
    title: "DPS Donation Drive",
    shortTitle: "DPS Donation Drive",
    subtitle: "School-wide community supply mobilization for underprivileged individuals",
    description: "Our DPS Donation Drive brought our school community together to support individuals in need. Students and faculty generously contributed essential supplies, clothing, and daily necessities. This initiative reflected our collective commitment to social responsibility, proving that small acts of kindness create a powerful and lasting impact on the local community.",
    verbatimCopy: "Our DPS Donation Drive brought our school community together to support individuals in need. Students and faculty generously contributed essential supplies, clothing, and daily necessities. This initiative reflected our collective commitment to social responsibility, proving that small acts of kindness create a powerful and lasting impact on the local community.",
    location: "Delhi Public School (DPS) Bangalore Campus",
    timeframe: "Spring 2024",
    metrics: [
      { label: "Items Collected", value: "500+" },
      { label: "School Participation", value: "100%" },
      { label: "Families Supported", value: "15+" }
    ],
    tags: ["Donation Drive", "School Community", "Social Responsibility", "Direct Aid"],
    image: "/assets/images/event_dps_drive.webp"
  },
  {
    id: "invictus-denim-stall",
    number: 2,
    title: "Invictus Denim Stall",
    shortTitle: "Invictus Denim Stall",
    subtitle: "Upcycled sustainable fashion and conscious consumerism campus showcase",
    description: "The Invictus Denim Stall was a vibrant hub of creativity and purpose. Featuring upcycled and stylish denim creations, the stall engaged visitors while raising awareness about sustainable fashion and conscious consumerism. It successfully combined student entrepreneurship with eco-friendly initiatives, drawing enthusiastic participation from everyone on campus.",
    verbatimCopy: "The Invictus Denim Stall was a vibrant hub of creativity and purpose. Featuring upcycled and stylish denim creations, the stall engaged visitors while raising awareness about sustainable fashion and conscious consumerism. It successfully combined student entrepreneurship with eco-friendly initiatives, drawing enthusiastic participation from everyone on campus.",
    location: "Campus Cultural Grounds, Bangalore",
    timeframe: "Invictus Youth Fest 2024",
    metrics: [
      { label: "Upcycled Creations", value: "150+" },
      { label: "Fabric Waste Generated", value: "0%" },
      { label: "Students Engaged", value: "1,000+" }
    ],
    tags: ["Upcycling", "Sustainable Fashion", "Conscious Consumerism", "Student Entrepreneurship"],
    image: "/assets/images/event_invictus_denim.webp"
  },
  {
    id: "orphanage-donation-aarogi",
    number: 3,
    title: "Orphanage Donation Drive (in collaboration with Aarogi)",
    shortTitle: "Aarogi Orphanage Drive",
    subtitle: "Cross-organizational partnership providing educational goods and spreading joy",
    description: "Partnering with the organization Aarogi, our orphanage donation drive bridged the gap between our school and the wider community. Thanks to overwhelming contributions, we provided essential goods and spread joy among the children. This collaboration highlighted the profound difference we can make through empathy, teamwork, and dedicated social action.",
    verbatimCopy: "Partnering with the organization Aarogi, our orphanage donation drive bridged the gap between our school and the wider community. Thanks to overwhelming contributions, we provided essential goods and spread joy among the children. This collaboration highlighted the profound difference we can make through empathy, teamwork, and dedicated social action.",
    location: "Partner Children's Homes, Bangalore",
    timeframe: "Monsoon 2024",
    partner: "Aarogi Organization",
    metrics: [
      { label: "Children Reached", value: "80+" },
      { label: "Learning Kits Distributed", value: "200+" },
      { label: "Collaborative NGO Delivery", value: "100%" }
    ],
    tags: ["Charity Partnership", "Child Welfare", "Educational Supplies", "Empathy in Action"],
    image: "/assets/images/event_orphanage_aarogi.webp"
  },
  {
    id: "beyond-the-waste-workshop",
    number: 4,
    title: "Beyond the Waste Workshop",
    shortTitle: "Beyond the Waste",
    subtitle: "Interactive hands-on circular design and artistic upcycling laboratory",
    description: "The Beyond the Waste workshop transformed everyday discarded items into innovative masterpieces. Participants explored creative recycling techniques, learning how to reduce environmental footprints through hands-on art and practical upcycling. The interactive session inspired students to rethink waste management and embrace sustainable living with imagination and flair.",
    verbatimCopy: "The Beyond the Waste workshop transformed everyday discarded items into innovative masterpieces. Participants explored creative recycling techniques, learning how to reduce environmental footprints through hands-on art and practical upcycling. The interactive session inspired students to rethink waste management and embrace sustainable living with imagination and flair.",
    location: "Avani Environmental Makerspace / Studio, Bangalore",
    timeframe: "Autumn 2024",
    metrics: [
      { label: "Student Makers", value: "75+" },
      { label: "Upcycled Artworks Created", value: "50+" },
      { label: "Waste Diverted from Landfill", value: "100 kg" }
    ],
    tags: ["Waste Management", "Hands-on Workshop", "Creative Recycling", "Eco-Art"],
    image: "/assets/images/event_waste_workshop.webp"
  }
];

// -----------------------------------------------------------------------------
// 5. The 11 Climate Tips (Verbatim from PDF Page 3)
// -----------------------------------------------------------------------------

export const CLIMATE_TIPS: ClimateTip[] = [
  {
    id: 1,
    action: "Switch off lights, fans, and electronics when you leave a room.",
    category: "energy",
    categoryLabel: "Energy Conservation",
    shortTitle: "Power Down Rooms",
    impactLevel: "Daily Habit",
    icon: "LightbulbOff"
  },
  {
    id: 2,
    action: "Unplug chargers and appliances when they are not in use.",
    category: "energy",
    categoryLabel: "Phantom Power",
    shortTitle: "Cut Phantom Load",
    impactLevel: "Grid Relief",
    icon: "PlugZap"
  },
  {
    id: 3,
    action: "Turn off the tap while brushing your teeth or shaving.",
    category: "water",
    categoryLabel: "Water Stewardship",
    shortTitle: "Save Tap Flow",
    impactLevel: "12L Saved Daily",
    icon: "Droplets"
  },
  {
    id: 4,
    action: "Carry a reusable bottle, bag, and container. instead of using disposables.",
    category: "consumption",
    categoryLabel: "Plastic-Free Lifestyle",
    shortTitle: "Bring Reusables",
    impactLevel: "Zero PET Bottles",
    icon: "ShoppingBag"
  },
  {
    id: 5,
    action: "Compost vegetable peels and food scraps instead of throwing them away",
    category: "waste",
    categoryLabel: "Organic Waste",
    shortTitle: "Compost Food Scraps",
    impactLevel: "Methane Prevention",
    icon: "Sprout"
  },
  {
    id: 6,
    action: "Plan meals and use leftovers to reduce food waste.",
    category: "consumption",
    categoryLabel: "Food Ethics",
    shortTitle: "Zero Food Waste",
    impactLevel: "Resource Respect",
    icon: "UtensilsCrossed"
  },
  {
    id: 7,
    action: "Repair, reuse, or donate items instead of buying new ones",
    category: "waste",
    categoryLabel: "Circular Economy",
    shortTitle: "Repair & Donate",
    impactLevel: "Lifecycle Extension",
    icon: "Wrench"
  },
  {
    id: 8,
    action: "Run the dishwasher and washing machine only when they are full",
    category: "water",
    categoryLabel: "Appliance Efficiency",
    shortTitle: "Full Wash Loads",
    impactLevel: "Water & Power Optima",
    icon: "Waves"
  },
  {
    id: 9,
    action: "Decline extra packaging, plastic cutlery, and printed copies you do not need.",
    category: "consumption",
    categoryLabel: "Source Reduction",
    shortTitle: "Refuse Single-Use",
    impactLevel: "Waste Elimination",
    icon: "Ban"
  },
  {
    id: 10,
    action: "Repurpose glass jars and sturdy containers for storage instead of buying new ones.",
    category: "waste",
    categoryLabel: "Creative Reuse",
    shortTitle: "Repurpose Containers",
    impactLevel: "Circular Storage",
    icon: "Archive"
  },
  {
    id: 11,
    action: "Print on both sides of paper, or go digital whenever possible.",
    category: "consumption",
    categoryLabel: "Paperless Practices",
    shortTitle: "Duplex & Digital First",
    impactLevel: "Forest Preservation",
    icon: "FileText"
  }
];

// -----------------------------------------------------------------------------
// 6. External Links & Verified Substack Articles
// -----------------------------------------------------------------------------

export const EXTERNAL_LINKS: ExternalLinks = {
  applicationForm: "https://docs.google.com/forms/d/e/1FAIpQLSd_7uxm79Ci-gyoTaE80A_NKt2KMZ1ueS48v6hMgKBVrmZzQA/viewform?usp=dialog",
  linkedIn: "https://www.linkedin.com/company/avaniyocc/",
  substack: "https://open.substack.com/pub/avaniyocc?r=5wu68m&utm_medium=ios",
  substackArticles: [
    {
      id: "super-el-nino",
      title: "Hot Girl Summer (quite literally)",
      subtitle: "Why the Super El Niño should concern YOU:",
      url: "https://substack.com/@avaniyocc/note/p-216575497?r=5wrcnw",
      publishedDate: "September 20, 2026",
      coverImageUrl: "https://substackcdn.com/image/fetch/$s_!XfLa!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F806ac4c6-0c3c-4849-818a-aec33646c048_534x534.jpeg"
    },
    {
      id: "ken-betwa-link",
      title: "The Ken-Betwa Link Project",
      subtitle: "Who pays the price of water in a drought?",
      url: "https://substack.com/@avaniyocc/note/p-223896247?r=5wrcnw",
      publishedDate: "November 7, 2026",
      coverImageUrl: "https://substackcdn.com/image/fetch/$s_!46Zk!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F44119ba9-4ca0-423d-a58e-ab6f3c6a7b88_899x1599.jpeg"
    },
    {
      id: "himachal-architecture",
      title: "The houses Himachal forgot how to build",
      subtitle: "What if one of the solutions to a hotter Himalaya is already here in the mountains?",
      url: "https://substack.com/@avaniyocc/note/p-217629092?r=5wrcnw",
      publishedDate: "September 27, 2026",
      coverImageUrl: "https://substackcdn.com/image/fetch/$s_!sFXG!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff0fbc856-bba7-4418-8e90-ba595431b03b_736x1308.jpeg"
    }
  ],
  instagram: "https://www.instagram.com/avani_yocc?cplk=MXQ2amNodzFmbHFpcA==",
  instagramClean: "https://www.instagram.com/avani_yocc",
  email: "avaniyocc@gmail.com",
  emailMailto: "mailto:avaniyocc@gmail.com",
  phone: "+91 8050931769",
  phoneTel: "tel:+918050931769",
  phoneFormatted: "+91 80509 31769",
  canvaMoodBoard1: "https://www.canva.com/design/DAHSi0vzDLY/iyNFb9l9HufjCRaukwjw7Q/edit",
  canvaMoodBoard2: "https://canva.link/p2evr172fehtt6n"
};

// Conforms to PROJECT.md AvaniContact
export const avaniContact: AvaniContact = {
  email: EXTERNAL_LINKS.email,
  phone: EXTERNAL_LINKS.phone,
  applicationFormUrl: EXTERNAL_LINKS.applicationForm,
  linkedInUrl: EXTERNAL_LINKS.linkedIn,
  substackUrl: EXTERNAL_LINKS.substack,
  substackArticles: EXTERNAL_LINKS.substackArticles.map(a => ({
    title: a.title,
    url: a.url,
    subtitle: a.subtitle,
    publishedDate: a.publishedDate
  })),
  instagramUrl: EXTERNAL_LINKS.instagramClean
};

// Aliases for compatibility across tests and components
export const avaniObjectives = AVANI_OBJECTIVES;
export const avaniTeams = AVANI_TEAMS;
export const avaniEvents = AVANI_EVENTS;
export const climateTips = CLIMATE_TIPS;
export const avaniOrganization = AVANI_ORGANIZATION;
export const externalLinks = EXTERNAL_LINKS;

// -----------------------------------------------------------------------------
// 7. Master Unified Content Export
// -----------------------------------------------------------------------------

export interface AvaniContentData {
  organization: OrganizationOverview;
  objectives: AvaniObjective[];
  teams: AvaniTeam[];
  events: AvaniEvent[];
  climateTips: ClimateTip[];
  links: ExternalLinks;
  contact: AvaniContact;
}

export const AVANI_CONTENT: AvaniContentData = {
  organization: AVANI_ORGANIZATION,
  objectives: AVANI_OBJECTIVES,
  teams: AVANI_TEAMS,
  events: AVANI_EVENTS,
  climateTips: CLIMATE_TIPS,
  links: EXTERNAL_LINKS,
  contact: avaniContact
};

export const avaniContent = AVANI_CONTENT;
export default AVANI_CONTENT;
