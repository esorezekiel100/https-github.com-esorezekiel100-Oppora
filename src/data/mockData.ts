import { Opportunity, SuccessStory, CommunityPost } from '../types';

export const mockOpportunities: Opportunity[] = [
  {
    id: 'opp-1',
    title: 'Mastercard Foundation Scholars Program',
    provider: 'Mastercard Foundation / University of Cape Town',
    type: 'Scholarship',
    category: 'Humanities',
    field: 'Engineering & Humanities',
    region: 'Pan-African',
    deadline: '2026-09-30',
    description: 'Fully-funded scholarships for academically talented yet economically disadvantaged young people from Sub-Saharan Africa to pursue undergraduate or postgraduate studies.',
    eligibility: [
      'Be a citizen of a Sub-Saharan African country.',
      'Show evidence of academic talent and potential.',
      'Demonstrate a commitment to giving back to their home community.',
      'Be economically disadvantaged or face barriers to tertiary education.'
    ],
    benefits: [
      'Full tuition fees coverage.',
      'Accommodation in university residence.',
      'Living stipend for meals and books.',
      'Travel costs to and from Cape Town.',
      'Leadership development training and mentorship.'
    ],
    applyUrl: 'https://mastercardfdn.org/all/scholars/',
    verified: true,
    viewsCount: 1450,
    clicksCount: 382,
    postedDate: '2026-07-15',
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'opp-2',
    title: 'MEST Africa Entrepreneurship Training Program',
    provider: 'Meltwater Entrepreneurial School of Technology (MEST)',
    type: 'Fellowship',
    category: 'STEM',
    field: 'Software Engineering & Business',
    region: 'Pan-African',
    deadline: '2026-08-15',
    description: 'A 12-month, fully-sponsored graduate-level program in software development, business, and entrepreneurship. At the end of the program, participants pitch for seed funding.',
    eligibility: [
      'Have a deep passion for technology and entrepreneurship.',
      'Hold a degree or equivalent experience from a recognized institution.',
      'Excellent communication and leadership skills.',
      'Willing to relocate to Accra, Ghana for the 12-month program.'
    ],
    benefits: [
      'Full tuition scholarship and course materials.',
      'Free housing and 3 meals daily.',
      'Monthly stipend.',
      'Opportunity to pitch for $50k - $100k seed funding.',
      'Access to a global network of mentors and advisors.'
    ],
    applyUrl: 'https://meltwater.org/training-program/',
    verified: true,
    viewsCount: 924,
    clicksCount: 215,
    postedDate: '2026-07-10',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'opp-3',
    title: 'Tony Elumelu Foundation Entrepreneurship Programme',
    provider: 'Tony Elumelu Foundation (TEF)',
    type: 'Grant',
    category: 'Social Sciences',
    field: 'Business & Entrepreneurship',
    region: 'Pan-African',
    deadline: '2026-10-31',
    description: 'The leading philanthropy initiative empowering African entrepreneurs across 54 countries with non-refundable seed capital, business training, and mentorship.',
    eligibility: [
      'Business must be based in Africa.',
      'Business must be in the early stage (0 to 5 years).',
      'The entrepreneur must be at least 18 years old.',
      'All business sectors are eligible.'
    ],
    benefits: [
      '$5,000 non-refundable seed capital.',
      '12-week online business management training program.',
      'Mentorship from experienced industry leaders.',
      'Access to Africa\'s largest digital entrepreneurial network (TEFConnect).'
    ],
    applyUrl: 'https://www.tonyelumelufoundation.org/',
    verified: true,
    viewsCount: 2310,
    clicksCount: 512,
    postedDate: '2026-07-18',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'opp-4',
    title: 'ALX Africa Software Engineering Career Accelerator',
    provider: 'ALX Africa',
    type: 'Internship',
    category: 'STEM',
    field: 'Computer Science & Software',
    region: 'Pan-African',
    deadline: '2026-08-30',
    description: 'A rigorous tech training program designed to prepare young African talent with advanced technical and professional skills required to land global tech jobs.',
    eligibility: [
      'Be between 18 and 34 years of age.',
      'Have access to a computer and stable internet connection.',
      'Be willing to commit 20-30 hours per week for training.',
      'No prior coding experience is required.'
    ],
    benefits: [
      'Full scholarship sponsored by the Mastercard Foundation for eligible youth.',
      'Comprehensive software engineering curriculum.',
      'Access to physical ALX Tech Hubs across Africa.',
      'Global job placement services and community networking.'
    ],
    applyUrl: 'https://www.alxafrica.com/',
    verified: true,
    viewsCount: 1780,
    clicksCount: 423,
    postedDate: '2026-07-20',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'opp-5',
    title: 'Mandela Washington Fellowship for Young African Leaders',
    provider: 'U.S. Department of State',
    type: 'Fellowship',
    category: 'Social Sciences',
    field: 'Leadership & Public Management',
    region: 'Sub-Saharan Africa',
    deadline: '2026-09-15',
    description: 'The flagship program of the Young African Leaders Initiative (YALI), bringing outstanding young civic, business, and public leaders to the US for academic and leadership study.',
    eligibility: [
      'Are between 25 and 35 years old at the time of application.',
      'Are citizens and residents of a Sub-Saharan African country.',
      'Have a proven record of leadership and community service.',
      'Proficient in reading, writing, and speaking English.'
    ],
    benefits: [
      '6-week academic and leadership institute at a U.S. college or university.',
      'Round-trip travel to the United States.',
      'Accident and sickness health benefits.',
      'Participation in the annual Mandela Washington Fellowship Summit.',
      'Access to ongoing professional development and alumni grants.'
    ],
    applyUrl: 'https://www.mandelawashingtonfellowship.org/',
    verified: true,
    viewsCount: 3120,
    clicksCount: 844,
    postedDate: '2026-07-12',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'opp-6',
    title: 'Google Africa Developer Scholarship (GADS)',
    provider: 'Google / Pluralsight / Andela',
    type: 'Scholarship',
    category: 'STEM',
    field: 'Tech & Mobile Development',
    region: 'Pan-African',
    deadline: '2026-08-25',
    description: 'A program designed to provide continuous learning opportunities and career readiness paths to aspiring and professional developers in Africa.',
    eligibility: [
      'Be a resident of an African country.',
      'Interested in mobile web development, Android development, or Cloud training.',
      'Willingness to study independently on Pluralsight platform.'
    ],
    benefits: [
      'Free access to Pluralsight learning channels.',
      'Guided mentorship from Andela learning community.',
      'Official certification vouchers for top-performing students.',
      'Opportunities to participate in community hackathons.'
    ],
    applyUrl: 'https://andela.com/gads/',
    verified: true,
    viewsCount: 1150,
    clicksCount: 310,
    postedDate: '2026-07-16',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'opp-7',
    title: 'MTN Graduate Development Program',
    provider: 'MTN Group',
    type: 'Tech Role',
    category: 'STEM',
    field: 'Telecommunications & Business',
    region: 'Sub-Saharan Africa',
    deadline: '2026-09-05',
    description: 'A fast-track program aimed at nurturing fresh graduates into top business leaders and technology experts across MTN\'s African footprint.',
    eligibility: [
      'First-class or Upper Second-class degree in STEM, Business, or Economics.',
      'Graduated within the last 2 years.',
      'Under 26 years of age.',
      'Strong analytical and leadership potential.'
    ],
    benefits: [
      'Full-time employment with competitive salary.',
      'Rotational assignments across core business departments.',
      'International immersion and cross-cultural mentorship.',
      'Structured professional certifications and leadership training.'
    ],
    applyUrl: 'https://www.mtn.com/',
    verified: true,
    viewsCount: 1280,
    clicksCount: 290,
    postedDate: '2026-07-19',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'opp-8',
    title: 'YALI Regional Leadership Center Fellowship',
    provider: 'YALI RLC West Africa',
    type: 'Fellowship',
    category: 'Social Sciences',
    field: 'Civic Leadership & Business',
    region: 'West Africa',
    deadline: '2026-08-20',
    description: 'A transformative leadership program providing modern training, networking, and mentoring in Civic Leadership, Business and Entrepreneurship, or Public Policy.',
    eligibility: [
      'Citizens of West African countries (Nigeria, Ghana, Liberia, Sierra Leone, Gambia, etc.).',
      'Aged 18 to 35 at the time of application.',
      'Demonstrated commitment to positive community change.',
      'Able to commit to 3 weeks online and 2 weeks in-person training.'
    ],
    benefits: [
      'Fully-funded training and materials.',
      'In-person residency board and lodging in Accra or Lagos.',
      'Alumni network access of over 10,000 African leaders.',
      'Post-training mentorship and small project grant eligibility.'
    ],
    applyUrl: 'https://yaliwestafrica.net/',
    verified: true,
    viewsCount: 1040,
    clicksCount: 198,
    postedDate: '2026-07-14',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'opp-9',
    title: 'Nairobi Creative Arts & Digital Media Grant',
    provider: 'Nairobi Creative Arts Council',
    type: 'Grant',
    category: 'Arts',
    field: 'Fine Arts & Digital Media',
    region: 'East Africa',
    deadline: '2026-11-15',
    description: 'A dedicated funding initiative supporting young African visual artists, digital designers, and filmmakers to scale their portfolios and showcase their works.',
    eligibility: [
      'Must be a citizen or resident of an African country.',
      'Age between 18 and 35.',
      'Active portfolio in fine arts, photography, illustration, or digital media.'
    ],
    benefits: [
      '$3,500 direct development grant.',
      'Mentorship from established global curators.',
      'Feature in the annual Pan-African Digital Exhibition.'
    ],
    applyUrl: 'https://nairobiartscouncil.org/grants',
    verified: true,
    viewsCount: 650,
    clicksCount: 120,
    postedDate: '2026-07-21',
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'opp-10',
    title: 'Google Software Engineer, Early Career (Lagos & Nairobi)',
    provider: 'Google Africa',
    type: 'Job',
    category: 'STEM',
    field: 'Software Engineering',
    region: 'Pan-African',
    deadline: '2026-10-15',
    description: 'Full-time software engineering role for university graduates. Focus on developing next-generation technologies that change how billions of users connect, explore, and interact.',
    eligibility: [
      'Bachelor’s degree in Computer Science or equivalent practical experience.',
      'Experience in programming in Java, C++, Python, or Go.',
      'Familiarity with software design, algorithms, and data structures.'
    ],
    benefits: [
      'Highly competitive tech salary with annual bonus opportunities.',
      'Full comprehensive medical, dental, and vision insurance.',
      'Equity/Stock awards and savings programs.',
      'World-class tech infrastructure, mentorship, and career growth.'
    ],
    applyUrl: 'https://careers.google.com/',
    verified: true,
    viewsCount: 1845,
    clicksCount: 492,
    postedDate: '2026-07-21',
    imageUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'opp-11',
    title: 'Microsoft Software Engineer II',
    provider: 'Microsoft ADC (African Development Centre)',
    type: 'Job',
    category: 'STEM',
    field: 'Cloud & AI Engineering',
    region: 'West Africa',
    deadline: '2026-11-05',
    description: 'Build robust and highly scalable cloud solutions on Azure, working alongside global engineering teams to deliver state-of-the-art developer services and enterprise systems.',
    eligibility: [
      '2+ years of professional software development experience.',
      'Proficiency in C#, Rust, Java, or C++.',
      'Solid foundation in cloud architecture, databases, and microservices.'
    ],
    benefits: [
      'Industry-leading salary and annual performance bonuses.',
      'Wellness and fitness allowance with complete healthcare cover.',
      'Relocation assistance for qualifying hires.',
      'Opportunities for international travel and cross-team collaborations.'
    ],
    applyUrl: 'https://careers.microsoft.com/',
    verified: true,
    viewsCount: 1530,
    clicksCount: 310,
    postedDate: '2026-07-21',
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'opp-12',
    title: 'Chevening Scholarships (UK Government)',
    provider: 'Foreign, Commonwealth & Development Office (FCDO)',
    type: 'Scholarship',
    category: 'Social Sciences',
    field: 'Leadership & Public Policy',
    region: 'Global',
    deadline: '2026-11-03',
    description: 'The UK Government’s global scholarship program offering outstanding leaders fully-funded master’s degrees at any top university in the United Kingdom.',
    eligibility: [
      'Citizen of a Chevening-eligible country or territory.',
      'Completed an undergraduate degree that qualifies for a UK postgraduate course.',
      'At least two years of professional work experience.',
      'Commitment to return to your home country for a minimum of two years after studies.'
    ],
    benefits: [
      'Full university tuition fees coverage.',
      'Monthly living stipend and arrival/departure allowances.',
      'Round-trip economy flights between your country and the UK.',
      'Access to exclusive networking events and cultural workshops.'
    ],
    applyUrl: 'https://www.chevening.org/',
    verified: true,
    viewsCount: 2980,
    clicksCount: 940,
    postedDate: '2026-07-21',
    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'opp-13',
    title: 'Rhodes Scholarship for West & East Africa',
    provider: 'Rhodes Trust / Oxford University',
    type: 'Scholarship',
    category: 'Humanities',
    field: 'Postgraduate Research',
    region: 'Pan-African',
    deadline: '2026-08-31',
    description: 'A prestigious global postgraduate award supporting exceptional all-round students to pursue master’s or doctoral studies at the University of Oxford.',
    eligibility: [
      'Completed an undergraduate degree with First-Class or Upper Second-Class Honors.',
      'Aged between 19 and 25 at the time of application.',
      'Citizen and resident of an eligible African country.',
      'Strong record of leadership and commitment to public service.'
    ],
    benefits: [
      'All University and College tuition fees paid in full.',
      'Annual personal living stipend of over £19,000.',
      'Private health insurance and initial relocation flights.',
      'Life-long membership in a highly elite alumni network.'
    ],
    applyUrl: 'https://www.rhodeshouse.ox.ac.uk/',
    verified: true,
    viewsCount: 2120,
    clicksCount: 615,
    postedDate: '2026-07-21',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'opp-14',
    title: 'Mozilla Common Voice Africa Dataset Grant',
    provider: 'Mozilla Foundation',
    type: 'Grant',
    category: 'STEM',
    field: 'AI & Machine Learning',
    region: 'Pan-African',
    deadline: '2026-10-10',
    description: 'Dedicated financial grants to build open-source African voice and language datasets, encouraging digital inclusivity and representation in artificial intelligence systems.',
    eligibility: [
      'Language researchers, local community builders, or ML engineers.',
      'Project must focus on building datasets for local African languages (e.g. Swahili, Yoruba, Zulu).',
      'Commitment to release datasets under open licenses.'
    ],
    benefits: [
      'Direct development grant ranging from $10,000 to $25,000.',
      'Technical mentorship and platform support from Mozilla AI engineers.',
      'Cloud credits and high-performance computing resources.'
    ],
    applyUrl: 'https://foundation.mozilla.org/grants/',
    verified: true,
    viewsCount: 1110,
    clicksCount: 242,
    postedDate: '2026-07-21',
    imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'opp-15',
    title: 'National Geographic Society Explorer Grant',
    provider: 'National Geographic Society',
    type: 'Grant',
    category: 'Social Sciences',
    field: 'Conservation & Exploration',
    region: 'Global',
    deadline: '2026-09-12',
    description: 'Funding for scientists, conservationists, educators, and storytellers who are leading innovative projects to document, understand, and protect our planet.',
    eligibility: [
      'Must be at least 18 years old.',
      'Early-career or established researcher, explorer, or conservationist.',
      'Project must align with biodiversity, conservation, or environmental storytelling.'
    ],
    benefits: [
      'Direct research funding up to $20,000.',
      'Connection to a global network of National Geographic Explorers.',
      'Professional development opportunities, media training, and gear discounts.'
    ],
    applyUrl: 'https://www.nationalgeographic.org/grants/',
    verified: true,
    viewsCount: 1350,
    clicksCount: 290,
    postedDate: '2026-07-21',
    imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'opp-16',
    title: 'Ashoka Fellowship for Social Innovators',
    provider: 'Ashoka',
    type: 'Fellowship',
    category: 'Social Sciences',
    field: 'Social Innovation',
    region: 'Global',
    deadline: '2026-12-01',
    description: 'Lifetime fellowship program that supports social entrepreneurs with systemic, innovative ideas that address critical social challenges around the world.',
    eligibility: [
      'Founder of an early-stage social venture with demonstrated regional or national impact.',
      'Strong moral character and a clear vision for systemic shift.',
      'Must be prepared to focus on the social venture full-time.'
    ],
    benefits: [
      'Tailored lifetime monthly stipend support.',
      'Strategic advising and legal support from corporate partners.',
      'Lifetime membership to a global peer network of 4,000+ top social entrepreneurs.'
    ],
    applyUrl: 'https://www.ashoka.org/',
    verified: true,
    viewsCount: 1405,
    clicksCount: 211,
    postedDate: '2026-07-21',
    imageUrl: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'opp-17',
    title: 'Flutterwave Software Engineering Internship',
    provider: 'Flutterwave Inc.',
    type: 'Internship',
    category: 'STEM',
    field: 'Fintech & Product Dev',
    region: 'Pan-African',
    deadline: '2026-08-15',
    description: '6-month paid intensive tech internship where junior developers work alongside seasoned software engineers building Africa’s largest digital payments infrastructure.',
    eligibility: [
      'Recent graduate or in the final year of a Computer Science or quantitative engineering program.',
      'Basic familiarity with API development, databases, and JavaScript/TypeScript.',
      'Strong problem-solving skills and eagerness to learn fintech systems.'
    ],
    benefits: [
      'Competitive monthly internship stipend.',
      'Workstation equipment and data allowance.',
      'Direct mentorship from senior technical architects.',
      'High conversion rate to full-time engineering roles.'
    ],
    applyUrl: 'https://flutterwave.com/careers',
    verified: true,
    viewsCount: 1990,
    clicksCount: 520,
    postedDate: '2026-07-21',
    imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'opp-18',
    title: 'Andela Technical Product Management Internship',
    provider: 'Andela',
    type: 'Internship',
    category: 'STEM',
    field: 'Product Management',
    region: 'Global Remote',
    deadline: '2026-09-01',
    description: 'Remote technical internship focused on Agile product management. Work with engineering and UI/UX teams to define specifications, plan sprints, and launch real products.',
    eligibility: [
      'Eager to learn modern cloud product management processes.',
      'Basic knowledge of Jira, agile methodology, and product mockups.',
      'Excellent written and verbal English communication.'
    ],
    benefits: [
      'USD-denominated monthly stipend.',
      'Remote work allowance (laptop, high-speed internet setup).',
      'Direct hands-on experience on enterprise client-facing products.'
    ],
    applyUrl: 'https://andela.com/',
    verified: true,
    viewsCount: 1450,
    clicksCount: 380,
    postedDate: '2026-07-21',
    imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'opp-19',
    title: 'Y Combinator African Startup Seed Funding',
    provider: 'Y Combinator (YC)',
    type: 'Funding',
    category: 'STEM',
    field: 'Venture Capital',
    region: 'Global',
    deadline: '2026-09-08',
    description: 'Twice-yearly funding program investing $500k in early-stage startups worldwide. Includes three months of intense mentorship and preparation for Demo Day.',
    eligibility: [
      'Early-stage founding teams developing highly scalable technology solutions.',
      'Startups must have a functional prototype or clear technical roadmap.',
      'Willingness to participate in the intense 12-week batch program.'
    ],
    benefits: [
      '$500,000 standard investment package ($125k for 7% equity, $375k on uncapped SAFE).',
      'World-class startup mentoring and advisory network.',
      'Unparalleled access to top global venture capital funds.'
    ],
    applyUrl: 'https://www.ycombinator.com/',
    verified: true,
    viewsCount: 3410,
    clicksCount: 1105,
    postedDate: '2026-07-21',
    imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'opp-20',
    title: 'Google for Startups Accelerator Africa',
    provider: 'Google for Startups',
    type: 'Funding',
    category: 'STEM',
    field: 'Tech & AI Innovation',
    region: 'Pan-African',
    deadline: '2026-09-20',
    description: 'A 3-month equity-free program designed to bring the absolute best of Google’s programs, AI technologies, products, and mentors to African startups.',
    eligibility: [
      'African-based, early-stage tech startup (Seed to Series A).',
      'Utilizing technology/AI to solve critical market or societal challenges.',
      'Co-founders must be actively working full-time on the startup.'
    ],
    benefits: [
      'Equity-free accelerator participation.',
      'Up to $100,000 in Google Cloud and Firebase credits.',
      'Direct technical training on Machine Learning, Cloud, and UX Design from Google experts.',
      'Access to a highly vetted network of international founders.'
    ],
    applyUrl: 'https://startup.google.com/accelerator/africa/',
    verified: true,
    viewsCount: 2280,
    clicksCount: 570,
    postedDate: '2026-07-21',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800'
  }
];

export const mockSuccessStories: SuccessStory[] = [
  {
    id: 'story-1',
    name: 'Amina Bello',
    role: 'Mastercard Scholar & Data Scientist',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    story: 'Oppora was the ultimate turning point for my career. Being a graduate from Kaduna, Nigeria, I always thought prestigious overseas scholarships were out of reach. I stumbled upon the verified Mastercard Scholarship listing on Oppora, followed the application guide step-by-step, and today I have completed my Master\'s at UCT and work as a lead Data Analyst at a global health tech company.',
    opportunityName: 'Mastercard Foundation Scholars Program',
    year: 'Class of 2024'
  },
  {
    id: 'story-2',
    name: 'Kofi Mensah',
    role: 'Co-Founder, Agritech Solutions',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    story: 'After graduating from KNUST in Ghana, our startup team struggled to find reliable early-stage capital. We used Oppora to search for Africa-focused grants. We applied to the Tony Elumelu Foundation Entrepreneurship Programme directly from the verified link here. Winning the $5,000 seed grant and the business training was the launching pad we desperately needed.',
    opportunityName: 'Tony Elumelu Foundation Grant',
    year: 'Winner, 2025'
  },
  {
    id: 'story-3',
    name: 'Chinedu Okafor',
    role: 'Full Stack Engineer',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    story: 'The tech landscape can be highly noisy with so many bootcamp advertisements. The "Verified by Oppora" badge gave me the confidence to apply to the ALX Africa Career Accelerator. I didn\'t have any prior programming background, but the accelerator set me on an incredible path, and I recently landed an internship with a high-growth fintech startup in Nairobi.',
    opportunityName: 'ALX Africa Software Engineering',
    year: 'Graduate, 2025'
  },
  {
    id: 'story-4',
    name: 'Zola Mthembu',
    role: 'Civic Tech Fellow',
    photoUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=400',
    story: 'Oppora helped me filter civic-focused fellowships. The Mandela Washington Fellowship deadline tracker sent me an email alert 2 weeks before the deadline, which pushed me to complete my personal essays in time. I spent 6 weeks at Cornell University, expanding my worldview and connecting with other change-makers across Sub-Saharan Africa.',
    opportunityName: 'Mandela Washington Fellowship',
    year: 'Fellow, 2024'
  }
];

export const mockCommunityPosts: CommunityPost[] = [
  {
    id: 'post-1',
    authorName: 'Ebenezer Gyamfi',
    authorRole: 'Tech Recruiter / Accra',
    authorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150',
    content: 'Just heard from the recruitment lead at MTN that they are particularly looking for graduates with Python and data analysis backgrounds for this year\'s Graduate Development cohort. Make sure to tailor your CVs around project-based achievements rather than just listing courses!',
    likes: 42,
    hasLiked: false,
    comments: [
      {
        id: 'c-1',
        author: 'Faith Adebayo',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
        content: 'Thanks for the tip, Ebenezer! Does the role require an electrical engineering or strictly computer science degree?',
        date: '2026-07-20T10:30:00'
      },
      {
        id: 'c-2',
        author: 'Ebenezer Gyamfi',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150',
        content: 'Faith, they accept any STEM or quantitative degree! As long as you can show analytical aptitude.',
        date: '2026-07-20T11:15:00'
      }
    ],
    timestamp: '2 hours ago',
    tags: ['MTN Graduate Program', 'Tech Careers', 'CV Tips']
  },
  {
    id: 'post-2',
    authorName: 'Nesta Chanda',
    authorRole: 'Mastercard Scholar',
    authorAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=150',
    content: 'For everyone applying for the Mastercard Foundation Scholars Program at UCT, the essay section is key. Do not just talk about your academic successes; they want to see deep evidence of social responsibility. Highlight your high school tutoring, community cleanup drives, or local volunteer work!',
    likes: 56,
    hasLiked: false,
    comments: [
      {
        id: 'c-3',
        author: 'Sipho Ndlovu',
        avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=150',
        content: 'Super helpful. What is the word limit on those essay prompts this year?',
        date: '2026-07-19T14:22:00'
      }
    ],
    timestamp: '1 day ago',
    tags: ['Mastercard Scholars', 'Essay Guide', 'Scholarship Tips']
  },
  {
    id: 'post-3',
    authorName: 'Oluwaseun Ajayi',
    authorRole: 'Business Consultant / Lagos',
    authorAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150',
    content: 'The Tony Elumelu Foundation application portal is opening up next month! I am hosting a free, interactive mock-pitching and proposal writing session for early-stage founders. Reply with your startup sector if you want an invitation!',
    likes: 89,
    hasLiked: false,
    comments: [
      {
        id: 'c-4',
        author: 'Amina Diallo',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
        content: 'I would love to join! Sector: Agritech / Poultry logistics in Kaduna.',
        date: '2026-07-20T09:05:00'
      },
      {
        id: 'c-5',
        author: 'Tariq Al-Fayed',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
        content: 'Please include me too! Sector: EdTech / Local language learning platform.',
        date: '2026-07-20T09:40:00'
      }
    ],
    timestamp: '1 day ago',
    tags: ['Tony Elumelu Grant', 'TeFConnect', 'Agritech', 'Edtech']
  }
];
