/**
 * Personal video collection — R5.
 *
 * One shared source, keyed by unique YouTube ID, rendered in BOTH /about and
 * /videos. All ten must be reachable and playable from each page.
 *
 * `sourceTitle` is the original supplied title, preserved exactly. It is
 * platform metadata and must NOT set the register for site copy (brief §19,
 * §3.3). `displayTitle` is authored, readable, concise, and does not change
 * the subject.
 *
 * Tracking parameters have been removed and the stray "Mak" after the
 * dog-treat URL has been dropped. Video IDs are unaltered, casing preserved.
 *
 * Nothing here summarises advice or claims professional expertise. The crypto,
 * diet, tea, dog, truck, fishing and grappling videos are personal content and
 * are categorised as such. `verification: 'unverified'` means playback and
 * embed permission have not been tested — that test is a runtime check, not a
 * URL-syntax check, and it is currently NOT RUN.
 */

export type PersonalVideo = {
  id: string;                 // P-number, stable internal reference
  youtubeId: string;          // exact, case-sensitive
  sourceTitle: string;        // original, preserved
  displayTitle: string;       // authored, neutral
  watchUrl: string;           // canonical, no tracking params
  category: 'personal';
  source: 'observed-in-v1-embed' | 'raw-report';
  verification: 'unverified';
};

const yt = (id: string) => `https://www.youtube.com/watch?v=${id}`;

export const personalVideos: PersonalVideo[] = [
  {
    id: 'P01',
    youtubeId: '806LTuoQN5s',
    sourceTitle:
      'GRAPPLING 01 - NOMAD KRAV MAGA Las Vegas NO GI BJJ Jason Wheeler 12-19-24',
    displayTitle: 'No-gi grappling at Nomad Krav Maga, Las Vegas',
    watchUrl: yt('806LTuoQN5s'),
    category: 'personal',
    source: 'observed-in-v1-embed',
    verification: 'unverified',
  },
  {
    id: 'P02',
    youtubeId: 'm991z3RqBPU',
    sourceTitle:
      'YOU WONT BELIEVE HOW EASY IT IS TO MAKE A GALLON OF FRESH BREWED ICED TEA!',
    displayTitle: 'Making a gallon of fresh brewed iced tea',
    watchUrl: yt('m991z3RqBPU'),
    category: 'personal',
    source: 'raw-report',
    verification: 'unverified',
  },
  {
    id: 'P03',
    youtubeId: 'BbPZFm9CbIo',
    sourceTitle:
      '"HUGE STRIPER" released at Willow Beach AZ Oct 16 2021 with Mary and Duncan',
    displayTitle: 'Striper released at Willow Beach, Arizona',
    watchUrl: yt('BbPZFm9CbIo'),
    category: 'personal',
    source: 'raw-report',
    verification: 'unverified',
  },
  {
    id: 'P04',
    youtubeId: 'dtERk3wi8sA',
    sourceTitle: 'Northfork River Brook Trout, Mountain Home, AR',
    displayTitle: 'Brook trout on the North Fork River, Mountain Home, Arkansas',
    watchUrl: yt('dtERk3wi8sA'),
    category: 'personal',
    source: 'raw-report',
    verification: 'unverified',
  },
  {
    id: 'P05',
    youtubeId: 'Q0VVDpKOhyY',
    sourceTitle:
      '001 Chevy Silverado 2500HD 4x4 WORK TRUCK utility bed 3" lift video walk thru',
    displayTitle: 'Walk-through of a Chevy Silverado 2500HD work truck',
    watchUrl: yt('Q0VVDpKOhyY'),
    category: 'personal',
    source: 'raw-report',
    verification: 'unverified',
  },
  {
    id: 'P06',
    youtubeId: 'kAw0um0oYQs',
    sourceTitle:
      'Tanners Treats Doggie cookies Las Vegas BEST DOG TREATS whole ingredients',
    displayTitle: "Tanner's Treats dog cookies, Las Vegas",
    watchUrl: yt('kAw0um0oYQs'),
    category: 'personal',
    source: 'raw-report',
    verification: 'unverified',
  },
  {
    id: 'P07',
    youtubeId: '4zQFsvwXvaA',
    sourceTitle: 'The story of the Doodle and the plants',
    displayTitle: 'The doodle and the plants',
    watchUrl: yt('4zQFsvwXvaA'),
    category: 'personal',
    source: 'raw-report',
    verification: 'unverified',
  },
  {
    id: 'P08',
    youtubeId: 'lzeOgvaESgQ',
    sourceTitle:
      "Crypto warnings for NOOBs. Don't get damaged or REKT as the kids say!",
    displayTitle: 'Crypto warnings for beginners',
    watchUrl: yt('lzeOgvaESgQ'),
    category: 'personal',
    source: 'raw-report',
    verification: 'unverified',
  },
  {
    id: 'P09',
    youtubeId: 'KeekIZfDjrg',
    sourceTitle: 'Uber/LYFT, Amazon, Zillow CRYPTO Bitcoin Disruptive tech',
    displayTitle: 'Talking about disruptive tech',
    watchUrl: yt('KeekIZfDjrg'),
    category: 'personal',
    source: 'raw-report',
    verification: 'unverified',
  },
  {
    id: 'P10',
    youtubeId: 'I-vM3OQESPA',
    sourceTitle: 'Keto diet basics from THE CRYPTO REALTOR Jason Wheeler',
    displayTitle: 'Keto diet basics',
    watchUrl: yt('I-vM3OQESPA'),
    category: 'personal',
    source: 'raw-report',
    verification: 'unverified',
  },
];

/** Guard against a duplicate slipping into either destination. */
export const personalVideoIds = personalVideos.map((v) => v.youtubeId);
if (new Set(personalVideoIds).size !== personalVideos.length) {
  throw new Error('Duplicate YouTube ID in the personal video collection');
}
