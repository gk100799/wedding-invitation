// Edit this file to customize your invite. Everything routes through here.

// Prepend to image paths so they resolve correctly under GH Pages basePath.
// Locally NEXT_PUBLIC_BASE_PATH is unset → empty string → paths work at root.
// In CI it is set to /wedding-invitation → paths get prefixed for the GH Pages URL.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const couple = {
  groom: {
    name: 'Gopal Krishna',
    initial: 'G',
  },
  bride: {
    name: 'Madhushri',
    initial: 'M',
  },
};

export const wedding = {
  date: '8 July 2026',
  // KEEP this dot-spaced format — RSVP.tsx splits on '.'
  shortDate: '08 . 07 . 26',
  city: 'Belagavi',
  venue: 'Maratha Mandir Marriage Hall',
  hashtag: '#KrishnaKaMadhu',
  // Optional: drop a venue photo at /public/images/venue.jpg, then set this to '/images/venue.jpg'.
  // While null, a styled placeholder card renders instead.
  venuePhoto: null as string | null,
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Maratha+Mandir+Marriage+Hall+Belagavi',
};

// Travel itinerary. Replaces the old "relationship journey" map scene.
export const travel = {
  outbound: {
    label: 'Outbound',
    date: '6 July 2026',
    train: '20653',
    departure: { time: '9:00 PM', station: 'KSR Bengaluru City', code: 'SBC' },
    arrival: { time: '6:40 AM', date: '7 July 2026', station: 'Belagavi', code: 'BGM' },
    note: 'Then to Maratha Mandir Marriage Hall — venue for everything that follows.',
  },
  return: {
    label: 'Return',
    date: '8 July 2026',
    train: '16590',
    departure: { time: '6:20 PM', station: 'Belagavi', code: 'BGM' },
    arrival: { time: '6:20 AM', date: '9 July 2026', station: 'KSR Bengaluru City', code: 'SBC' },
    note: 'Overnight haul. Sleep optional, snoring discouraged.',
  },
};

// Story photos live in /public/images.
export const story = [
  { src: '/images/engagement.jpg', caption: 'the engagement', date: 'sealed it', orientation: 'landscape' as const },
  { src: '/images/cute.jpg', caption: 'a favourite of ours', date: 'just us', orientation: 'portrait' as const },
];

export const day1 = {
  date: '7 July 2026',
  label: 'Day 1',
  mood: 'a slow yellow morning',
  events: [
    {
      time: '8:30 AM',
      name: 'Haldi',
      dressCode: 'Yellow — florals encouraged',
      blurb: 'Flowers, garlands, soft yellow petals. The Pinterest version of haldi — no turmeric chaos, just photos worth keeping.',
      venue: 'Maratha Mandir',
    },
    {
      time: '11:00 AM',
      name: 'Varapooje',
      dressCode: 'Traditional attire',
      blurb: 'The quiet ceremonial hour — please be on time, the priests are not negotiating.',
      venue: 'Maratha Mandir',
    },
    {
      time: '1:30 PM',
      name: 'Lunch',
      dressCode: '—',
      blurb: 'Eat. We will not skip dessert.',
      venue: 'Maratha Mandir',
    },
    {
      time: '6:00 PM',
      name: 'Baraat & Sangeet',
      dressCode: 'Lehenga / Indo-western',
      blurb: 'Bring rhythm, leave inhibitions. The dance floor opens whether you are ready or not.',
      venue: 'Maratha Mandir',
    },
  ],
};

export const day2 = {
  date: '8 July 2026',
  label: 'Day 2',
  mood: 'the morning it actually happens',
  events: [
    {
      time: '8:35 AM',
      name: 'Muhurta',
      dressCode: 'Traditional attire',
      blurb: 'The actual moment. Be there ten minutes early or be photographed running.',
      venue: 'Maratha Mandir',
    },
    {
      time: '12:30 PM',
      name: 'Reception',
      dressCode: 'Suits (men) · Saree, Anarkali, or Indo-western (women)',
      blurb: 'Photos, hugs, the works. We will find you. Please find us first.',
      venue: 'Maratha Mandir',
    },
    {
      time: '12:30 PM onwards',
      name: 'Lunch',
      dressCode: '—',
      blurb: 'Served alongside the reception. Eat as you mingle.',
      venue: 'Maratha Mandir',
    },
  ],
};
