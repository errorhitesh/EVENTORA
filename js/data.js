/**
 * EVENTORA - Event Data Store
 * Complete collection of realistic, curated events across multiple categories.
 * All event dates are in late 2026 / 2027 to remain strictly in the future.
 */

const EVENT_CATEGORIES = [
  { id: 'all', name: 'All Categories', icon: 'fa-globe', count: 16 },
  { id: 'technology', name: 'Technology', icon: 'fa-microchip', count: 3 },
  { id: 'music', name: 'Music & Concerts', icon: 'fa-music', count: 3 },
  { id: 'business', name: 'Business & Startups', icon: 'fa-briefcase', count: 2 },
  { id: 'sports', name: 'Sports & Fitness', icon: 'fa-person-running', count: 2 },
  { id: 'education', name: 'Education & Academic', icon: 'fa-graduation-cap', count: 2 },
  { id: 'art', name: 'Art & Culture', icon: 'fa-palette', count: 2 },
  { id: 'workshops', name: 'Workshops & Bootcamps', icon: 'fa-laptop-code', count: 2 },
  { id: 'entertainment', name: 'Entertainment & Comedy', icon: 'fa-masks-theater', count: 2 }
];

const INITIAL_EVENTS = [
  {
    id: 'evt-101',
    title: 'Global AI & Web3 Innovators Summit 2026',
    category: 'technology',
    categoryLabel: 'Technology',
    shortDescription: 'Asia’s premier conference uniting leading artificial intelligence researchers, Web3 founders, and tech pioneers.',
    description: 'Join over 2,500 engineers, researchers, startup founders, and venture capitalists at the Global AI & Web3 Innovators Summit 2026. This two-day flagship conference delves into Large Language Models, agentic workflows, decentralized protocols, autonomous computing, and sustainable cloud architectures. Experience hands-on technical demos, keynote speeches from global tech luminaries, and dedicated founder-investor matching lounges.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    fallbackImage: 'assets/images/tech-fallback.svg',
    date: '2026-11-20',
    displayDate: 'Nov 20 - 21, 2026',
    startTime: '09:00 AM',
    endTime: '06:30 PM',
    venue: 'Bengaluru International Exhibition Centre (BIEC)',
    city: 'Bengaluru',
    organizer: 'TechFrontiers Global',
    organizerRole: 'Leading Global Tech Event Organizer',
    organizerEmail: 'support@techfrontiers.io',
    price: 1999,
    isFree: false,
    capacity: 450,
    seatsRemaining: 42,
    registrationDeadline: '2026-11-19T23:59:59',
    featured: true,
    trending: true,
    rating: 4.9,
    reviewsCount: 382,
    tags: ['AI', 'Web3', 'Machine Learning', 'Cloud', 'Founders'],
    speakers: [
      {
        name: 'Dr. Aris Thorne',
        role: 'Chief AI Scientist',
        company: 'DeepHorizon Labs',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
      },
      {
        name: 'Elena Rostova',
        role: 'VP of Protocol Engineering',
        company: 'EtherScale',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80'
      },
      {
        name: 'Karan Mehra',
        role: 'General Partner',
        company: 'Vertex Ventures',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
      }
    ],
    agenda: [
      { time: '09:00 AM', title: 'Registration & Welcome Networking Breakfast', speaker: 'Eventora Team' },
      { time: '10:00 AM', title: 'Keynote: The Dawn of Multi-Agent Systems & Sovereign AI', speaker: 'Dr. Aris Thorne' },
      { time: '11:45 AM', title: 'Panel: Scalable Layer-2 Protocols & Real-World Utility', speaker: 'Elena Rostova & Guests' },
      { time: '01:00 PM', title: 'Gourmet Networking Lunch & Startup Pavilion', speaker: 'Expo Zone' },
      { time: '02:30 PM', title: 'Venture Capital Panel: What Gets Funded in 2027', speaker: 'Karan Mehra' },
      { time: '05:00 PM', title: 'Closing Fireside Chat & VIP Cocktail Reception', speaker: 'All Speakers' }
    ],
    perks: [
      'Official Accredited Certificate of Participation',
      'All-Access Pass to Keynotes, Panels & Hack Lobbies',
      'Gourmet Networking Buffet Lunch & Refreshments',
      'Exclusive Access to Recorded Keynotes & Presentation Decks',
      'Entry into the $50,000 Startup Pitch Competition Showcase'
    ],
    faq: [
      { q: 'Is this event suitable for students?', a: 'Yes! We offer discounted student passes and hands-on workshops tailored for learners.' },
      { q: 'Can I get a refund if I cancel?', a: 'You can cancel anytime up to 48 hours before the event through your My Registrations dashboard for a full refund.' },
      { q: 'Is there parking available at BIEC?', a: 'Yes, BIEC provides secure on-site parking for both two-wheelers and four-wheelers.' }
    ]
  },
  {
    id: 'evt-102',
    title: 'Neon Horizon: Electric Music & Light Carnival',
    category: 'music',
    categoryLabel: 'Music & Concerts',
    shortDescription: 'An electrifying multi-stage audiovisual spectacle with international electronic music icons and laser installations.',
    description: 'Immerse your senses in Neon Horizon 2026, Mumbai’s grandest electronic dance music festival. Featuring three custom-engineered stages with 360-degree holographic visuals, spatial sound engineering, and top-tier international and national EDM, house, and synthwave producers. Prepare for an unforgettable open-air night under starlight and laser beams.',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
    fallbackImage: 'assets/images/music-fallback.svg',
    date: '2026-11-28',
    displayDate: 'Nov 28, 2026',
    startTime: '04:00 PM',
    endTime: '11:30 PM',
    venue: 'Jio World Garden, BKC',
    city: 'Mumbai',
    organizer: 'VibeCraft Live',
    organizerRole: 'International Music Experience Producers',
    organizerEmail: 'passes@vibecraft.in',
    price: 1499,
    isFree: false,
    capacity: 1200,
    seatsRemaining: 86,
    registrationDeadline: '2026-11-27T23:59:59',
    featured: true,
    trending: true,
    rating: 4.8,
    reviewsCount: 520,
    tags: ['Music', 'EDM', 'Concert', 'Festival', 'Mumbai'],
    speakers: [
      {
        name: 'DJ KROMA (Berlin)',
        role: 'Headliner / Sound Architect',
        company: 'Synergy Records',
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=300&q=80'
      },
      {
        name: 'Zoya Varma',
        role: 'Live Synthwave Performer',
        company: 'Starlight Collective',
        image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80'
      }
    ],
    agenda: [
      { time: '04:00 PM', title: 'Gates Open & Indie Electronic DJ Opening Sets', speaker: 'DJ Roster Stage A' },
      { time: '06:00 PM', title: 'Sunset Deep House Experience', speaker: 'Zoya Varma' },
      { time: '08:00 PM', title: 'Holographic Stage Reveal & Laser Show', speaker: 'Visual FX Team' },
      { time: '09:30 PM', title: 'Headline Performance: DJ KROMA Live', speaker: 'DJ KROMA' },
      { time: '11:15 PM', title: 'Grand Fireworks & Finale Symphony', speaker: 'VibeCraft Live' }
    ],
    perks: [
      'Access to All 3 Stages (Mainstage, Underground, Bass Den)',
      'Free Glowing Festival Wristband & Neon Merchandise Bag',
      'Access to Gourmet Food Trucks & Artisan Beverage Bars',
      'Express Entry Lane for Eventora Registered Ticket Holders'
    ],
    faq: [
      { q: 'What is the age restriction?', a: 'This event is strictly 18+. Government ID proof is mandatory at security gates.' },
      { q: 'Is outside food or drink allowed?', a: 'Outside consumables are prohibited; multiple hydration stations and licensed eateries are available on-site.' }
    ]
  },
  {
    id: 'evt-103',
    title: 'National Startup Conclave & Angel Pitch 2026',
    category: 'business',
    categoryLabel: 'Business & Startups',
    shortDescription: 'Connect with over 150 angel investors, VC firms, and successful founders to accelerate your startup growth.',
    description: 'The National Startup Conclave 2026 is India’s foremost entrepreneurship gathering. Highlighting seed to Series-B fundraising strategies, unit economics in modern retail & SaaS, cross-border expansion, and live on-stage elevator pitches where 20 curated early-stage startups compete for ₹5 Crore in direct angel commitments.',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80',
    fallbackImage: 'assets/images/business-fallback.svg',
    date: '2026-12-05',
    displayDate: 'Dec 05, 2026',
    startTime: '09:30 AM',
    endTime: '05:30 PM',
    venue: 'Bharat Mandapam Convention Center',
    city: 'New Delhi',
    organizer: 'VentureCatalyst India',
    organizerRole: 'Startup Accelerator & Angel Network',
    organizerEmail: 'pitch@venturecatalyst.org',
    price: 0,
    isFree: true,
    capacity: 600,
    seatsRemaining: 115,
    registrationDeadline: '2026-12-04T20:00:00',
    featured: true,
    trending: false,
    rating: 4.9,
    reviewsCount: 290,
    tags: ['Startup', 'Business', 'Angel Investors', 'Funding', 'Pitch'],
    speakers: [
      {
        name: 'Rajiv Singhania',
        role: 'Managing Partner',
        company: 'Indus Valley Capital',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80'
      },
      {
        name: 'Shreya Bansal',
        role: 'Founder & CEO',
        company: 'LogiQuick (Unicorn)',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'
      }
    ],
    agenda: [
      { time: '09:30 AM', title: 'Founder Breakfast & Investor Matching Check-in', speaker: 'Organizers' },
      { time: '10:30 AM', title: 'Fireside Chat: From Zero to ₹1,000 Cr ARR Without Burning Cash', speaker: 'Shreya Bansal' },
      { time: '12:00 PM', title: 'Top 10 Seed Startups Live Pitch Round 1', speaker: 'Pitch Finalists' },
      { time: '01:30 PM', title: 'Curated 1-on-1 Investor Speed-Dating & Lunch', speaker: 'All Attendees' },
      { time: '03:30 PM', title: 'Series A/B Masterclass: Term Sheet Nuances & Governance', speaker: 'Rajiv Singhania' },
      { time: '04:45 PM', title: 'Award Ceremony & ₹5 Crore Angel Syndicate Announcement', speaker: 'Jury' }
    ],
    perks: [
      'Free Entry for Verified Founders & Early Explorers',
      'Direct Access to Pitch Book & Curated Investor Directory',
      'Access to Free Cloud Credits Worth $10,000 from Cloud Partners',
      'Networking Directory with Direct WhatsApp & LinkedIn Connects'
    ],
    faq: [
      { q: 'Is registration truly free?', a: 'Yes, general founder admission is completely free courtesy of our partner ecosystem.' },
      { q: 'How can I apply to pitch on stage?', a: 'Register first, and you will receive a secondary link to submit your 10-slide pitch deck.' }
    ]
  },
  {
    id: 'evt-104',
    title: 'Hyderabad Open: Premier Badminton Championship Finals',
    category: 'sports',
    categoryLabel: 'Sports & Fitness',
    shortDescription: 'Witness international shuttlers and national champions clash in thrilling singles and doubles finals.',
    description: 'Feel the adrenaline at the premier Hyderabad Open Badminton Finals. Catch world-class rallies, lightning-fast smashes, and high-stakes championship games featuring India’s top Olympic medalists and international circuit contenders.',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80',
    fallbackImage: 'assets/images/sports-fallback.svg',
    date: '2026-12-12',
    displayDate: 'Dec 12 - 13, 2026',
    startTime: '02:00 PM',
    endTime: '08:30 PM',
    venue: 'Gachibowli Indoor Stadium',
    city: 'Hyderabad',
    organizer: 'National Badminton Federation',
    organizerRole: 'Apex Sports Governing Body',
    organizerEmail: 'tickets@badmintonfed.in',
    price: 499,
    isFree: false,
    capacity: 800,
    seatsRemaining: 74,
    registrationDeadline: '2026-12-11T22:00:00',
    featured: false,
    trending: true,
    rating: 4.7,
    reviewsCount: 194,
    tags: ['Badminton', 'Sports', 'Fitness', 'Championship', 'Tournament'],
    speakers: [
      {
        name: 'Coach P. Gopichand',
        role: 'Chief National Coach',
        company: 'National Sports Academy',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80'
      }
    ],
    agenda: [
      { time: '02:00 PM', title: 'Stadium Doors Open & Player Warmup Exhibitions', speaker: 'Arena Staff' },
      { time: '03:00 PM', title: 'Women’s Singles Grand Final Match', speaker: 'Finalists' },
      { time: '04:30 PM', title: 'Men’s Doubles Championship Clash', speaker: 'Finalists' },
      { time: '06:30 PM', title: 'Men’s Singles Marquee Title Match', speaker: 'Finalists' },
      { time: '08:00 PM', title: 'Trophy Presentation & Fan Autograph Session', speaker: 'Chief Guests' }
    ],
    perks: [
      'Reserved Lower Tier Seating with Optimal Court View',
      'Complimentary Tournament Fan Jersey & Rally Clapper',
      'Opportunity to Join Courtside Player Autograph Session'
    ],
    faq: [
      { q: 'Are child tickets required?', a: 'Children under 5 enter free if seated on a parent’s lap.' },
      { q: 'Is photography permitted?', a: 'Mobile cameras are allowed; professional zoom lenses and flashlights are prohibited.' }
    ]
  },
  {
    id: 'evt-105',
    title: 'Future of EdTech & STEM Education Conference',
    category: 'education',
    categoryLabel: 'Education & Academic',
    shortDescription: 'Empowering educators, school leaders, and students with AI tools, gamified learning, and futuristic curricula.',
    description: 'Explore the transformation of higher education and K-12 pedagogy at the Future of EdTech Summit. Discover how adaptive AI tutors, VR science laboratories, and micro-credentialing are redesigning modern classrooms. Network with deans, educational researchers, and EdTech founders.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    fallbackImage: 'assets/images/education-fallback.svg',
    date: '2026-12-18',
    displayDate: 'Dec 18, 2026',
    startTime: '10:00 AM',
    endTime: '04:30 PM',
    venue: 'Savitribai Phule Pune University Auditorium',
    city: 'Pune',
    organizer: 'NextGen Educators Alliance',
    organizerRole: 'Global Academic Advancement Forum',
    organizerEmail: 'info@edtechsummit.org',
    price: 0,
    isFree: true,
    capacity: 350,
    seatsRemaining: 58,
    registrationDeadline: '2026-12-17T20:00:00',
    featured: false,
    trending: false,
    rating: 4.8,
    reviewsCount: 142,
    tags: ['Education', 'EdTech', 'STEM', 'Teaching', 'AI in School'],
    speakers: [
      {
        name: 'Prof. Ananya Sen',
        role: 'Dean of Computing & Cognitive Science',
        company: 'IISc / EdTech Council',
        image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=300&q=80'
      }
    ],
    agenda: [
      { time: '10:00 AM', title: 'Opening Address: Navigating AI In Modern Assessment', speaker: 'Prof. Ananya Sen' },
      { time: '11:30 AM', title: 'Hands-on Demo: VR STEM Laboratories in Rural Classrooms', speaker: 'EdTech Labs' },
      { time: '01:00 PM', title: 'Lunch & Interactive Teacher Expo', speaker: 'Expo Hall' },
      { time: '02:30 PM', title: 'Panel: Rethinking College Degrees vs Micro-Credentials', speaker: 'Industry Deans' },
      { time: '04:00 PM', title: 'Actionable Takeaways & Resource Toolkit Distribution', speaker: 'Convenor' }
    ],
    perks: [
      'Digital Certificate of Participation for Educators and Students',
      'Curated 200-page STEM Classroom Curriculum Toolkit PDF',
      'Free 6-month Trial to Classroom AI Teaching Assistants'
    ],
    faq: [
      { q: 'Is this open to college students as well as teachers?', a: 'Yes, both educators and aspiring students are welcome.' }
    ]
  },
  {
    id: 'evt-106',
    title: 'Kolkata International Digital Art & Heritage Biennale',
    category: 'art',
    categoryLabel: 'Art & Culture',
    shortDescription: 'A mesmerizing confluence of traditional Indian craft, generative digital art, and interactive immersive galleries.',
    description: 'Set in the cultural heart of Kolkata, this Biennale brings together 60 visionary artists blending centuries-old Indian textile and folk art with generative algorithms, projection mapping, and AR installations. Experience live digital painting performances, acoustic sitar ensembles, and evening open-air gallery walks.',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1200&q=80',
    fallbackImage: 'assets/images/art-fallback.svg',
    date: '2026-12-26',
    displayDate: 'Dec 26 - 28, 2026',
    startTime: '11:00 AM',
    endTime: '08:00 PM',
    venue: 'Victoria Memorial Hall Lawns & Annex',
    city: 'Kolkata',
    organizer: 'Bengal Arts & Heritage Trust',
    organizerRole: 'Cultural Heritage & Contemporary Arts Foundation',
    organizerEmail: 'curator@bengalarts.org',
    price: 299,
    isFree: false,
    capacity: 500,
    seatsRemaining: 92,
    registrationDeadline: '2026-12-25T18:00:00',
    featured: false,
    trending: true,
    rating: 4.9,
    reviewsCount: 310,
    tags: ['Art', 'Culture', 'Exhibition', 'Digital Art', 'Heritage'],
    speakers: [
      {
        name: 'Soumitra Mukherjee',
        role: 'Contemporary Visual Artist',
        company: 'Studio Kalakriti',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80'
      }
    ],
    agenda: [
      { time: '11:00 AM', title: 'Grand Inauguration & Traditional Consecration', speaker: 'Eminent Curators' },
      { time: '01:00 PM', title: 'Guided Curatorial Walk: Generative Meets Kantha Stitch', speaker: 'Soumitra Mukherjee' },
      { time: '04:00 PM', title: 'Live Projection Mapping & Sitar Fusion Performance', speaker: 'Ensemble' },
      { time: '06:30 PM', title: 'Illuminated Night Gallery Stroll & Artisan Bazaar', speaker: 'All Artists' }
    ],
    perks: [
      'Comprehensive Art Exhibition Catalog & Postcard Set',
      'Complimentary Traditional Bengal Sweets & Darjeeling Tea Voucher',
      'Exclusive Evening Access to Victoria Memorial Gardens'
    ],
    faq: [
      { q: 'Can we purchase artworks at the venue?', a: 'Yes, original artworks and certified limited-edition prints are available for purchase directly from the artists.' }
    ]
  },
  {
    id: 'evt-107',
    title: 'Full-Stack Modern Web & Cloud Architecture Masterclass',
    category: 'workshops',
    categoryLabel: 'Workshops & Bootcamps',
    shortDescription: 'Intensive 2-day hands-on workshop building production-ready serverless apps, micro-frontends, and automated CI/CD pipelines.',
    description: 'Supercharge your engineering career with this intensive hands-on masterclass. Led by Senior Principal Architects from top tech unicorns, you will build and deploy a distributed event-driven web application from scratch using modern TypeScript, serverless backends, edge caching, and automated testing suites. Bring your laptop and leave with production code in your GitHub repository.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    fallbackImage: 'assets/images/workshop-fallback.svg',
    date: '2027-01-09',
    displayDate: 'Jan 09 - 10, 2027',
    startTime: '09:30 AM',
    endTime: '05:00 PM',
    venue: 'IIT Madras Research Park, Taramani',
    city: 'Chennai',
    organizer: 'DevCraft Academy',
    organizerRole: 'Advanced Developer Upskilling Cohorts',
    organizerEmail: 'masterclass@devcraft.in',
    price: 999,
    isFree: false,
    capacity: 120,
    seatsRemaining: 18,
    registrationDeadline: '2027-01-08T20:00:00',
    featured: true,
    trending: true,
    rating: 4.9,
    reviewsCount: 168,
    tags: ['Workshop', 'Coding', 'FullStack', 'Cloud', 'TypeScript'],
    speakers: [
      {
        name: 'Vikas Sundaram',
        role: 'Staff Infrastructure Architect',
        company: 'CloudNative Corp',
        image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80'
      }
    ],
    agenda: [
      { time: '09:30 AM', title: 'Environment Setup, Repo Clones & Micro-Frontend Blueprint', speaker: 'Vikas Sundaram' },
      { time: '11:00 AM', title: 'Building Event-Driven Serverless Edge APIs', speaker: 'Hands-on Lab' },
      { time: '01:00 PM', title: 'Catered Lunch & Peer Code Reviews', speaker: 'Dev Lounge' },
      { time: '02:00 PM', title: 'Edge Databases, Realtime WebSockets & Auth0 Integration', speaker: 'Lab 2' },
      { time: '04:00 PM', title: 'Deploying Production Kubernetes Cluster on Cloud with CI/CD', speaker: 'Live Deploy' }
    ],
    perks: [
      'Verified Certificate of Mastery issued by DevCraft Academy',
      'Complete GitHub starter templates and boilerplate repositories',
      '1-on-1 Resume & Portfolio Review Session with Hiring Managers',
      'Lifetime Access to Masterclass Video Recordings and Slack Community'
    ],
    faq: [
      { q: 'What prerequisites are required?', a: 'Basic familiarity with JavaScript or TypeScript and terminal commands.' },
      { q: 'Is remote attendance supported?', a: 'Yes! Attendees can join in-person in Chennai or via our high-definition interactive livestream.' }
    ]
  },
  {
    id: 'evt-108',
    title: 'LaughCraft: All-Star Standup Comedy Marathon',
    category: 'entertainment',
    categoryLabel: 'Entertainment & Comedy',
    shortDescription: 'Two hours of non-stop laughter featuring 5 of India’s most hilarious standup comedians.',
    description: 'Tired of the weekly grind? Treat yourself and your friends to an unforgettable evening of unfiltered comedy, witty observations, and audience roasts. LaughCraft brings together five celebrated comic personalities on one stage for an uproarious night of comedy magic.',
    image: 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&w=1200&q=80',
    fallbackImage: 'assets/images/comedy-fallback.svg',
    date: '2027-01-16',
    displayDate: 'Jan 16, 2027',
    startTime: '07:30 PM',
    endTime: '10:00 PM',
    venue: 'Good Shepherd Auditorium, Museum Road',
    city: 'Bengaluru',
    organizer: 'ChuckleBox Entertainment',
    organizerRole: 'Premier Live Standup Production House',
    organizerEmail: 'support@chucklebox.in',
    price: 699,
    isFree: false,
    capacity: 700,
    seatsRemaining: 48,
    registrationDeadline: '2027-01-16T17:00:00',
    featured: false,
    trending: true,
    rating: 4.8,
    reviewsCount: 420,
    tags: ['Comedy', 'Standup', 'Entertainment', 'Live Show', 'Bengaluru'],
    speakers: [
      {
        name: 'Aakash Verma',
        role: 'Celebrity Standup Comic',
        company: 'Prime Video Specials',
        image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=300&q=80'
      },
      {
        name: 'Sneha Roy',
        role: 'Touring Comedian & Writer',
        company: 'Netflix Is A Joke Fest',
        image: 'https://images.unsplash.com/photo-1534751516642-a171ed2a2188?auto=format&fit=crop&w=300&q=80'
      }
    ],
    agenda: [
      { time: '07:00 PM', title: 'Auditorium Doors Open & Seating', speaker: 'ChuckleBox Crew' },
      { time: '07:30 PM', title: 'Opening Host Act & Crowd Interaction', speaker: 'MC Varun' },
      { time: '08:00 PM', title: 'Feature Set 1 & 2', speaker: 'Sneha Roy & Comic Guest' },
      { time: '09:00 PM', title: 'Headliner Marquee Set', speaker: 'Aakash Verma' },
      { time: '09:50 PM', title: 'Curtain Call & Fan Photos', speaker: 'All Artists' }
    ],
    perks: [
      'Guaranteed Laughs and Premium Assigned Seating',
      'Complimentary Popcorn and Soft Drink Voucher',
      'Priority Access to Meet & Greet Photo Wall'
    ],
    faq: [
      { q: 'Is there language exclusivity?', a: 'The show is in bilingual Hinglish (Hindi + English).' },
      { q: 'Is recording permitted during the performance?', a: 'Video recording during the acts is strictly prohibited to protect original material.' }
    ]
  },
  {
    id: 'evt-109',
    title: 'CyberShield: Advanced Ethical Hacking & Defensive SecOps',
    category: 'technology',
    categoryLabel: 'Technology',
    shortDescription: 'Red team penetration testing, Zero Trust architectures, and real-time incident response simulations.',
    description: 'Defend enterprise infrastructure against next-generation autonomous cyber threats. CyberShield brings together global CISOs, bug bounty hunters, and threat intelligence experts for deep technical breakdowns of zero-day exploits, cloud infrastructure hardening, and defensive AI response protocols. Includes a 6-hour live Capture The Flag (CTF) tournament with ₹2,00,000 in bounties.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    fallbackImage: 'assets/images/tech-fallback.svg',
    date: '2027-01-23',
    displayDate: 'Jan 23, 2027',
    startTime: '09:00 AM',
    endTime: '06:00 PM',
    venue: 'Cyber Hub Amphitheatre, DLF Phase 2',
    city: 'Gurugram',
    organizer: 'DefSec Alliance India',
    organizerRole: 'Information Security Consortium',
    organizerEmail: 'secops@cybershield.in',
    price: 799,
    isFree: false,
    capacity: 300,
    seatsRemaining: 34,
    registrationDeadline: '2027-01-22T22:00:00',
    featured: false,
    trending: false,
    rating: 4.9,
    reviewsCount: 112,
    tags: ['Cybersecurity', 'Ethical Hacking', 'Infosec', 'CTF', 'Cloud Security'],
    speakers: [
      {
        name: 'Tara Narayanan',
        role: 'Chief Security Officer',
        company: 'ShieldGrid Global',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'
      }
    ],
    agenda: [
      { time: '09:00 AM', title: 'Keynote: Anatomy of Nation-State Cyber Attacks', speaker: 'Tara Narayanan' },
      { time: '10:30 AM', title: 'Live Exploit Decompilation & Memory Injections', speaker: 'Red Team Leads' },
      { time: '01:00 PM', title: 'Networking Lunch', speaker: 'Dining Area' },
      { time: '02:00 PM', title: '6-Hour Live CTF Challenge Begins', speaker: 'All Teams' },
      { time: '05:30 PM', title: 'CTF Award Ceremony & Winner Felicitation', speaker: 'Organizers' }
    ],
    perks: [
      'Certified Ethical Defense Participation Credential',
      'Direct Eligibility for Enterprise Bug Bounty Invitations',
      'Exclusive Swag: Custom CyberShield Hacker Hoodie & Stickers'
    ],
    faq: [
      { q: 'Do I need prior hacking experience?', a: 'Intermediate knowledge of networking protocols and Linux is strongly advised.' }
    ]
  },
  {
    id: 'evt-110',
    title: 'Acoustic Sunset: Indie Music & Poetry by the Waves',
    category: 'music',
    categoryLabel: 'Music & Concerts',
    shortDescription: 'Unplugged soulful melodies, acoustic guitars, and lyrical storytelling on the golden sands of Goa.',
    description: 'Leave the noise behind and spend an enchanting twilight listening to independent singer-songwriters, acoustic instrumentalists, and spoken-word poets. Set right on the sandy shores of Morjim Beach, this intimate gathering celebrates original compositions, warm bonfire camaraderie, and sea breezes.',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    fallbackImage: 'assets/images/music-fallback.svg',
    date: '2027-02-06',
    displayDate: 'Feb 06, 2027',
    startTime: '05:00 PM',
    endTime: '10:00 PM',
    venue: 'Morjim Beach Coastal Lawn',
    city: 'Goa',
    organizer: 'IndieRoots Cultural Co.',
    organizerRole: 'Intimate Music & Arts Experience Curators',
    organizerEmail: 'hello@indieroots.live',
    price: 499,
    isFree: false,
    capacity: 250,
    seatsRemaining: 21,
    registrationDeadline: '2027-02-05T20:00:00',
    featured: false,
    trending: true,
    rating: 4.9,
    reviewsCount: 210,
    tags: ['Acoustic', 'Indie', 'Live Music', 'Goa', 'Sunset'],
    speakers: [
      {
        name: 'Kabir & The Tides',
        role: 'Folk-Rock Singer-Songwriter',
        company: 'Indie Collective',
        image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80'
      }
    ],
    agenda: [
      { time: '05:00 PM', title: 'Beachside Seating, Welcome Fresh Mocktails & Sunset View', speaker: 'Host' },
      { time: '05:45 PM', title: 'Soulful Spoken Word & Acoustic Cello Preludes', speaker: 'Poetry Circle' },
      { time: '07:00 PM', title: 'Kabir & The Tides Unplugged Album Set', speaker: 'Kabir' },
      { time: '08:45 PM', title: 'Open Beach Jam & Community Starlight Bonfire', speaker: 'All Artists & Guests' }
    ],
    perks: [
      'Cozy Bohemian Rug & Floor Cushion Seating by the Sea',
      'Complimentary Handcrafted Sunset Drink & Artisanal Snack Box',
      'Exclusive Physical CD/Vinyl of Acoustic Sunset Session'
    ],
    faq: [
      { q: 'Is footwear required?', a: 'It is a barefoot beach setting; comfortable sandals are recommended.' }
    ]
  },
  {
    id: 'evt-111',
    title: 'E-Commerce Growth Summit & D2C Brand Expo 2027',
    category: 'business',
    categoryLabel: 'Business & Startups',
    shortDescription: 'Master customer acquisition, TikTok/Reels commerce, retention loops, and supply chain scaling.',
    description: 'Discover how modern Direct-to-Consumer (D2C) and omnichannel retail brands scale from ₹1 Crore to ₹100 Crore turnover. Featuring 30+ growth marketing masterminds, supply chain pioneers, and marketplace executives revealing their exact playbooks for profitability and customer lifetime value.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    fallbackImage: 'assets/images/business-fallback.svg',
    date: '2027-02-14',
    displayDate: 'Feb 14, 2027',
    startTime: '09:00 AM',
    endTime: '05:30 PM',
    venue: 'St. Regis Grand Ballroom, Lower Parel',
    city: 'Mumbai',
    organizer: 'RetailInnovators Forum',
    organizerRole: 'E-commerce & Retail Growth Network',
    organizerEmail: 'summit@retailinnovators.com',
    price: 1299,
    isFree: false,
    capacity: 400,
    seatsRemaining: 65,
    registrationDeadline: '2027-02-13T18:00:00',
    featured: false,
    trending: false,
    rating: 4.8,
    reviewsCount: 156,
    tags: ['ECommerce', 'D2C', 'Marketing', 'Business', 'Retail'],
    speakers: [
      {
        name: 'Rohan Deshmukh',
        role: 'Co-Founder & CMO',
        company: 'EarthGlow Organic (D2C Brand)',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
      }
    ],
    agenda: [
      { time: '09:00 AM', title: 'Breakfast Networking & Brand Showcase Pavilions', speaker: 'All Attendees' },
      { time: '10:15 AM', title: 'Cracking Meta & Performance Ads with Profitable ROAS', speaker: 'Rohan Deshmukh' },
      { time: '12:00 PM', title: 'Panel: Quick Commerce Logistics & Same-Day Delivery Mastery', speaker: 'Supply Chain Chiefs' },
      { time: '02:00 PM', title: 'Retention Marketing: Building 60%+ Repeat Customer Rates', speaker: 'Growth Leads' },
      { time: '04:30 PM', title: 'D2C Pitch Arena: Scaling to ₹100 Cr Profitable Run-Rate', speaker: 'Founder Panel' }
    ],
    perks: [
      'Comprehensive 150-page D2C Growth Playbook & Benchmark Report',
      'Exclusive Networking Lunch at St. Regis Grand Dining',
      'Over $5,000 in SaaS Discounts from Klaviyo, Shopify, and Shiprocket'
    ],
    faq: [
      { q: 'Is this event only for established brands?', a: 'Both budding D2C founders and established omnichannel retailers will find enormous value.' }
    ]
  },
  {
    id: 'evt-112',
    title: 'Delhi Heritage Half Marathon & 10K Fitness Sprint',
    category: 'sports',
    categoryLabel: 'Sports & Fitness',
    shortDescription: 'Lace up your running shoes and run past Delhi’s most iconic historic monuments at dawn.',
    description: 'Celebrate health, resilience, and architectural majesty at the Delhi Heritage Half Marathon. The scenic, flat course winds past India Gate, Lodhi Gardens, and Safdarjung Tomb in the crisp winter morning. Categorized into 21.1K Half Marathon, 10K Timed Run, and a 5K Fun Run for families and beginners.',
    image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=1200&q=80',
    fallbackImage: 'assets/images/sports-fallback.svg',
    date: '2027-02-27',
    displayDate: 'Feb 27, 2027',
    startTime: '05:30 AM',
    endTime: '10:30 AM',
    venue: 'Jawaharlal Nehru Stadium Central Plaza',
    city: 'New Delhi',
    organizer: 'Delhi Athletics & Runners Club',
    organizerRole: 'Non-profit Running & Athletics Association',
    organizerEmail: 'run@delhihalfmarathon.org',
    price: 350,
    isFree: false,
    capacity: 1500,
    seatsRemaining: 230,
    registrationDeadline: '2027-02-25T23:59:59',
    featured: false,
    trending: true,
    rating: 4.9,
    reviewsCount: 680,
    tags: ['Marathon', 'Running', 'Fitness', 'Delhi', 'Sports'],
    speakers: [
      {
        name: 'Major Sandeep Rawat',
        role: 'Ultra-Marathoner & Fitness Mentor',
        company: 'Indian Endurance Foundation',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80'
      }
    ],
    agenda: [
      { time: '05:30 AM', title: 'Reporting & Energetic Aerobic Warm-Up Session', speaker: 'Fitness Instructors' },
      { time: '06:00 AM', title: 'Flag-Off: 21.1K Heritage Half Marathon', speaker: 'Chief Guest' },
      { time: '06:30 AM', title: 'Flag-Off: 10K Open Timed Run', speaker: 'Guest of Honor' },
      { time: '07:15 AM', title: 'Flag-Off: 5K Community Health Sprint', speaker: 'Celebrity Runners' },
      { time: '09:00 AM', title: 'Post-Run Nutrition Breakfast & Podium Medal Ceremony', speaker: 'JLN Arena' }
    ],
    perks: [
      'Official Dry-Fit Breathable Marathon T-Shirt & Bib with Timing RFID Chip',
      'Heavyweight Embossed Finisher Medal for All Who Complete',
      'Healthy Post-Race Hot Breakfast & Electrolyte Energy Drinks',
      'Automated Digital Certificate with Split Times and Finish Line Photos'
    ],
    faq: [
      { q: 'Where do I collect the marathon bib kit?', a: 'Bib kits must be collected from JLN Stadium on Feb 25-26 between 10 AM and 6 PM.' }
    ]
  },
  {
    id: 'evt-113',
    title: 'Data Science & Machine Learning Hands-on Intensive',
    category: 'workshops',
    categoryLabel: 'Workshops & Bootcamps',
    shortDescription: 'Train deep learning models, fine-tune open-source LLMs, and master feature stores in Python.',
    description: 'Transform raw data into real-world predictive models in this immersive masterclass. From exploratory data analysis with Pandas and Polars to training neural networks with PyTorch and deploying LLMs using Ollama and vLLM on cloud GPUs. Every concept is accompanied by guided Jupyter notebook exercises.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    fallbackImage: 'assets/images/workshop-fallback.svg',
    date: '2027-03-13',
    displayDate: 'Mar 13 - 14, 2027',
    startTime: '10:00 AM',
    endTime: '04:30 PM',
    venue: 'IIIT Bangalore Campus, Electronic City',
    city: 'Bengaluru',
    organizer: 'DataCraft Guild',
    organizerRole: 'Data Science & AI Education Institute',
    organizerEmail: 'bootcamp@datacraft.ai',
    price: 899,
    isFree: false,
    capacity: 150,
    seatsRemaining: 24,
    registrationDeadline: '2027-03-12T18:00:00',
    featured: false,
    trending: false,
    rating: 4.8,
    reviewsCount: 95,
    tags: ['Data Science', 'Machine Learning', 'Python', 'AI', 'Deep Learning'],
    speakers: [
      {
        name: 'Dr. Siddharth Pillai',
        role: 'Principal ML Engineer',
        company: 'AI Research Institute',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80'
      }
    ],
    agenda: [
      { time: '10:00 AM', title: 'Data Wrangling at Scale: Fast Pipelines with Polars & DuckDB', speaker: 'Dr. Siddharth Pillai' },
      { time: '11:45 AM', title: 'PyTorch Deep Learning Foundations: Backpropagation & CNNs', speaker: 'Hands-on Lab' },
      { time: '01:00 PM', title: 'Campus Lunch & Networking', speaker: 'IIIT Lounge' },
      { time: '02:00 PM', title: 'Fine-Tuning Llama-3 with LoRA / QLoRA on Cloud GPUs', speaker: 'Lab 2' },
      { time: '03:45 PM', title: 'Model Evaluation, Bias Audits & Realtime API Deployment', speaker: 'Summary' }
    ],
    perks: [
      'Official IIIT Campus Certificate of Bootcamp Completion',
      'Access to $100 Cloud GPU Compute Credits for Course Projects',
      'Curated Portfolio Capstone Project ready to showcase on GitHub'
    ],
    faq: [
      { q: 'Is Python knowledge mandatory?', a: 'Yes, basic proficiency with Python data structures and syntax is needed.' }
    ]
  },
  {
    id: 'evt-114',
    title: 'Sufi & Classical Mystic Nights at Amber Fort',
    category: 'music',
    categoryLabel: 'Music & Concerts',
    shortDescription: 'Soul-stirring qawwalis and classical raags echoing through the royal courtyard of Amber Fort.',
    description: 'Experience an evening of transcendental Sufi poetry and Hindustani classical music set in the historic Diwan-e-Khas courtyard of Jaipur’s Amber Palace. Featuring celebrated maestros of the Patiala and Gwalior gharanas, accompanied by traditional harmoniums, sarangis, and dholaks under romantic palace torches.',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    fallbackImage: 'assets/images/music-fallback.svg',
    date: '2027-03-24',
    displayDate: 'Mar 24, 2027',
    startTime: '06:30 PM',
    endTime: '10:30 PM',
    venue: 'Amber Fort Historic Courtyard',
    city: 'Jaipur',
    organizer: 'Rajasthan Heritage Music Foundation',
    organizerRole: 'Classical Art Preservation Trust',
    organizerEmail: 'sufinight@rajasthanheritage.org',
    price: 850,
    isFree: false,
    capacity: 350,
    seatsRemaining: 40,
    registrationDeadline: '2027-03-23T20:00:00',
    featured: false,
    trending: false,
    rating: 4.9,
    reviewsCount: 280,
    tags: ['Sufi', 'Classical Music', 'Heritage', 'Jaipur', 'Concert'],
    speakers: [
      {
        name: 'Ustad Riaz Qawwal & Brothers',
        role: 'Renowned Sufi Vocal Ensemble',
        company: 'Heritage Cultural Troupe',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
      }
    ],
    agenda: [
      { time: '06:30 PM', title: 'Royal Welcome with Shehnai & Traditional Marigold Garlands', speaker: 'Palace Staff' },
      { time: '07:15 PM', title: 'Hindustani Classical Raga Yaman on Sarangi & Sitar', speaker: 'Classical Maestro' },
      { time: '08:30 PM', title: 'Grand Sufi Qawwali: Kalam of Rumi, Bulleh Shah & Amir Khusro', speaker: 'Ustad Riaz Qawwal' },
      { time: '10:00 PM', title: 'Traditional Rajasthani Royal Dinner Service', speaker: 'Courtyard Banquet' }
    ],
    perks: [
      'Reserved Royal Baithak Seating with Silk Bolsters and Carpets',
      'Traditional Royal Rajasthani Multi-Course Thali Dinner Included',
      'Private Night-time Guided Tour of Amber Fort Illuminated Wings'
    ],
    faq: [
      { q: 'Is dress code applicable?', a: 'Traditional Indian ethnic attire is warmly encouraged.' }
    ]
  },
  {
    id: 'evt-115',
    title: 'International Fiction & Creative Writing Symposium',
    category: 'education',
    categoryLabel: 'Education & Academic',
    shortDescription: 'Master the craft of storytelling, worldbuilding, dialog writing, and global publishing agreements.',
    description: 'Join Booker Prize nominees, bestselling literary authors, and senior commissioning editors from Penguin Random House and HarperCollins. Participate in constructive peer critiquing workshops, query letter clinics, and masterclasses in character development and suspense architecture.',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
    fallbackImage: 'assets/images/education-fallback.svg',
    date: '2027-04-09',
    displayDate: 'Apr 09 - 10, 2027',
    startTime: '10:00 AM',
    endTime: '05:00 PM',
    venue: 'India International Centre (IIC), Max Mueller Marg',
    city: 'New Delhi',
    organizer: 'National Writers Guild',
    organizerRole: 'Literary Society & Publishers Forum',
    organizerEmail: 'symposium@writersguild.in',
    price: 0,
    isFree: true,
    capacity: 200,
    seatsRemaining: 31,
    registrationDeadline: '2027-04-08T18:00:00',
    featured: false,
    trending: false,
    rating: 4.8,
    reviewsCount: 88,
    tags: ['Writing', 'Literature', 'Publishing', 'Books', 'Education'],
    speakers: [
      {
        name: 'Mira Roychoudhury',
        role: 'Bestselling Novelist & Essayist',
        company: 'Author of "The Whispering Monsoons"',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80'
      }
    ],
    agenda: [
      { time: '10:00 AM', title: 'Opening Address: Finding Your Authentic Voice as an Author', speaker: 'Mira Roychoudhury' },
      { time: '11:30 AM', title: 'Breakout Clinic: Crafting Riveting First Chapters & Hooks', speaker: 'Senior Editors' },
      { time: '01:00 PM', title: 'Writers Networking Lunch & Book Signing', speaker: 'IIC Gardens' },
      { time: '02:30 PM', title: 'Publishing Decoded: Literary Agents, Advances & Self-Publishing', speaker: 'Publishers Panel' },
      { time: '04:15 PM', title: 'Live Manuscript Pitch Session to Commissioning Editors', speaker: 'Selected Authors' }
    ],
    perks: [
      'Free Admission for Selected Aspiring Writers & Literature Enthusiasts',
      'Opportunity to Pitch Your Novel Manuscript Directly to Senior Editors',
      'Comprehensive Directory of Reputable Literary Agents & Writing Grants'
    ],
    faq: [
      { q: 'Can I bring my manuscript drafts?', a: 'Yes, bring up to 3 printed copies of your first chapter for the clinic.' }
    ]
  },
  {
    id: 'evt-116',
    title: 'The Grand Artisan Food & Gastronomy Expo 2027',
    category: 'entertainment',
    categoryLabel: 'Entertainment & Comedy',
    shortDescription: 'Savor gourmet dishes from 80+ celebrity chefs, craft bakers, coffee roasters, and mixologists.',
    description: 'The ultimate paradise for food lovers and culinary creators. Featuring live masterclasses by Michelin-starred and MasterChef winners, artisanal cheese tastings, specialty single-origin coffee brewing competitions, and an open-air night market celebrating global street cuisines.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    fallbackImage: 'assets/images/comedy-fallback.svg',
    date: '2027-04-24',
    displayDate: 'Apr 24 - 25, 2027',
    startTime: '12:00 PM',
    endTime: '10:00 PM',
    venue: 'Mahalaxmi Racecourse Lawns',
    city: 'Mumbai',
    organizer: 'CulinaryArts Guild India',
    organizerRole: 'Epicurean & Food Festivals Foundation',
    organizerEmail: 'tasting@culinaryexpo.in',
    price: 399,
    isFree: false,
    capacity: 1000,
    seatsRemaining: 180,
    registrationDeadline: '2027-04-23T22:00:00',
    featured: true,
    trending: true,
    rating: 4.9,
    reviewsCount: 450,
    tags: ['Food', 'Culinary', 'Festival', 'Chefs', 'Entertainment'],
    speakers: [
      {
        name: 'Chef Ranveer Vohra',
        role: 'Celebrity Chef & Restaurateur',
        company: 'Culinary Collective',
        image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=300&q=80'
      }
    ],
    agenda: [
      { time: '12:00 PM', title: 'Gates Open & Artisanal Farmers Market Tasting Begins', speaker: 'Expo Grounds' },
      { time: '02:00 PM', title: 'Live Masterclass: Modern Indian Fermentations & Plating', speaker: 'Chef Ranveer Vohra' },
      { time: '04:30 PM', title: 'National Barista Championship Finals & Latte Art Contest', speaker: 'Specialty Coffee Guild' },
      { time: '07:00 PM', title: 'Sunset Cocktails & Live Gypsy Jazz Performance', speaker: 'Band Stage' },
      { time: '08:30 PM', title: 'Grand Gourmet Food Truck Street Carnival', speaker: 'All Pavilions' }
    ],
    perks: [
      'Access to All 80+ Gourmet Food Pavilions & Tasting Booths',
      'Complimentary Tasting Passbook with 5 Tasting Token Stamps',
      'Exclusive Recipe Booklet Signed by Masterclass Celebrity Chefs'
    ],
    faq: [
      { q: 'Are vegetarian and vegan options available?', a: 'Yes, more than 50% of food stalls offer dedicated vegetarian and vegan gourmet menus.' }
    ]
  }
];

// Fallback images in case external Unsplash URLs are offline or slow
const FALLBACK_CATEGORY_IMAGES = {
  technology: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect width="800" height="500" fill="%231e1b4b"/><text x="400" y="250" font-family="sans-serif" font-size="32" font-weight="bold" fill="%23818cf8" text-anchor="middle">Technology %26 Innovation</text></svg>',
  music: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect width="800" height="500" fill="%234c0519"/><text x="400" y="250" font-family="sans-serif" font-size="32" font-weight="bold" fill="%23fb7185" text-anchor="middle">Live Music %26 Concerts</text></svg>',
  business: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect width="800" height="500" fill="%23064e3b"/><text x="400" y="250" font-family="sans-serif" font-size="32" font-weight="bold" fill="%2334d399" text-anchor="middle">Business %26 Startups</text></svg>',
  sports: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect width="800" height="500" fill="%231e3a8a"/><text x="400" y="250" font-family="sans-serif" font-size="32" font-weight="bold" fill="%2360a5fa" text-anchor="middle">Sports %26 Fitness</text></svg>',
  education: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect width="800" height="500" fill="%23312e81"/><text x="400" y="250" font-family="sans-serif" font-size="32" font-weight="bold" fill="%23a5b4fc" text-anchor="middle">Education %26 Learning</text></svg>',
  art: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect width="800" height="500" fill="%23581c87"/><text x="400" y="250" font-family="sans-serif" font-size="32" font-weight="bold" fill="%23c084fc" text-anchor="middle">Art %26 Culture</text></svg>',
  workshops: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect width="800" height="500" fill="%23134e4a"/><text x="400" y="250" font-family="sans-serif" font-size="32" font-weight="bold" fill="%232dd4bf" text-anchor="middle">Hands-on Workshops</text></svg>',
  entertainment: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect width="800" height="500" fill="%23701a75"/><text x="400" y="250" font-family="sans-serif" font-size="32" font-weight="bold" fill="%23e879f9" text-anchor="middle">Entertainment %26 Comedy</text></svg>'
};

