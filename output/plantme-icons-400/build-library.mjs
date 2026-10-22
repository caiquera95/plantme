import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('output/plantme-icons-400');
const strokeDir = path.join(root, 'svg', 'stroke-rounded');
const solidDir = path.join(root, 'svg', 'solid-rounded');
fs.mkdirSync(strokeDir, { recursive: true });
fs.mkdirSync(solidDir, { recursive: true });

const GREEN = '#214F38';
const IVORY = '#FAF8F2';
const TERRACOTTA = '#B86E45';

const categories = {
  navigation: [
    ['home','home','none'],['home-add','home','plus'],['home-check','home','check'],['menu','menu','none'],
    ['grid','grid','none'],['search','search','none'],['close','close','none'],['arrow-left','arrow-left','none'],
    ['arrow-right','arrow-right','none'],['arrow-up','arrow-up','none'],['arrow-down','arrow-down','none'],
    ['chevron-left','chevron-left','none'],['chevron-right','chevron-right','none'],['expand','expand','none'],
    ['collapse','collapse','none'],['more-horizontal','more-h','none'],['more-vertical','more-v','none'],
    ['filter','filter','none'],['sort','sort','none'],['refresh','refresh','none']
  ],
  plants: [
    ['leaf','leaf','none'],['leaf-check','leaf','check'],['leaf-alert','leaf','alert'],['sprout','sprout','none'],
    ['seedling','sprout','sparkle'],['potted-plant','pot','leaf'],['plant-add','pot','plus'],['plant-check','pot','check'],
    ['flower','flower','none'],['cactus','cactus','none'],['succulent','succulent','none'],['herb','herb','none'],
    ['tree','tree','none'],['palm','palm','none'],['seed','seed','none'],['roots','roots','none'],
    ['vine','vine','none'],['bonsai','bonsai','none'],['garden','garden','none'],['plant-identify','leaf','scan']
  ],
  care: [
    ['water','drop','none'],['water-check','drop','check'],['watering-can','watering-can','none'],['mist','mist','none'],
    ['fertilizer','fertilizer','none'],['prune','scissors','none'],['repot','repot','none'],['soil','soil','none'],
    ['humidity','drop','percent'],['sunlight','sun','none'],['shade','shade','none'],['temperature','thermometer','none'],
    ['clean-leaves','leaf','sparkle'],['rotate-plant','pot','refresh'],['support-stake','stake','none'],['inspect-plant','leaf','search'],
    ['measure-plant','ruler','leaf'],['care-schedule','calendar','leaf'],['care-completed','clipboard','check'],['care-overdue','clipboard','alert']
  ],
  time: [
    ['calendar','calendar','none'],['calendar-add','calendar','plus'],['calendar-check','calendar','check'],['calendar-alert','calendar','alert'],
    ['calendar-heart','calendar','heart'],['clock','clock','none'],['clock-add','clock','plus'],['clock-check','clock','check'],
    ['timer','timer','none'],['stopwatch','stopwatch','none'],['history','history','none'],['repeat','repeat','none'],
    ['reminder','bell','none'],['reminder-active','bell','sparkle'],['reminder-off','bell','close'],['streak','flame','none'],
    ['day','sun','clock'],['night','moon','clock'],['week','calendar','star'],['month','calendar','grid']
  ],
  weather: [
    ['sun','sun','none'],['moon','moon','none'],['cloud','cloud','none'],['cloud-sun','cloud','sun'],
    ['cloud-moon','cloud','moon'],['rain','cloud','rain'],['heavy-rain','cloud','rain-heavy'],['drizzle','cloud','drizzle'],
    ['storm','cloud','bolt'],['wind','wind','none'],['snow','snow','none'],['fog','fog','none'],
    ['hot','thermometer','sun'],['cold','thermometer','snow'],['humidity-weather','drop','percent'],['uv-index','sun','alert'],
    ['sunrise','horizon','sunrise'],['sunset','horizon','sunset'],['location-weather','pin','cloud'],['forecast','calendar','cloud']
  ],
  community: [
    ['community','users','none'],['community-add','users','plus'],['friend','user','heart'],['user-add','user','plus'],
    ['user-check','user','check'],['chat','chat','none'],['chat-add','chat','plus'],['chat-heart','chat','heart'],
    ['comment','comment','none'],['share','share','none'],['send','send','none'],['post','post','none'],
    ['photo-post','image','plus'],['like','heart','none'],['favorite','star','none'],['follow','user','check'],
    ['group','group','none'],['discover-people','users','search'],['report-post','flag','alert'],['block-user','user','close']
  ],
  profile: [
    ['profile','user','none'],['profile-edit','user','edit'],['profile-verified','user','check'],['account','id-card','none'],
    ['settings','settings','none'],['preferences','sliders','none'],['privacy','shield','lock'],['security','shield','check'],
    ['password','key','none'],['notifications','bell','none'],['language','globe','none'],['theme','palette','none'],
    ['light-mode','sun','none'],['dark-mode','moon','none'],['help','help','none'],['support','headset','none'],
    ['terms','document','check'],['about','info','none'],['logout','logout','none'],['delete-account','user','trash']
  ],
  content: [
    ['book','book','none'],['article','document','none'],['tutorial','play','none'],['video','video','none'],
    ['audio','audio','none'],['bookmark','bookmark','none'],['bookmark-fill','bookmark','star'],['guide','map','none'],
    ['tip','bulb','none'],['idea','bulb','sparkle'],['education','graduation','none'],['library','books','none'],
    ['search-content','search','document'],['filter-content','filter','document'],['category','folder','none'],['folder-open','folder','open'],
    ['download','download','none'],['upload','upload','none'],['external-link','external','none'],['copy','copy','none']
  ],
  commerce: [
    ['store','store','none'],['cart','cart','none'],['cart-add','cart','plus'],['bag','bag','none'],
    ['gift','gift','none'],['coupon','ticket','percent'],['discount','tag','percent'],['tag','tag','none'],
    ['wallet','wallet','none'],['card','card','none'],['payment-check','card','check'],['coin','coin','none'],
    ['subscription','repeat','star'],['premium','crown','none'],['reward','medal','none'],['achievement','trophy','none'],
    ['challenge','target','none'],['points','sparkles','none'],['receipt','receipt','none'],['history-payment','clock','card']
  ],
  system: [
    ['camera','camera','none'],['camera-add','camera','plus'],['scan','scan','none'],['qr-code','qr','none'],
    ['image','image','none'],['image-add','image','plus'],['microphone','microphone','none'],['location','pin','none'],
    ['location-add','pin','plus'],['map','map','none'],['wifi','wifi','none'],['bluetooth','bluetooth','none'],
    ['sync','refresh','none'],['cloud-upload','cloud','upload'],['cloud-download','cloud','download'],['lock','lock','none'],
    ['unlock','unlock','none'],['eye','eye','none'],['eye-off','eye','close'],['warning','warning','none']
  ]
};

const icons = Object.entries(categories).flatMap(([category, items]) => items.map(([name, base, badge]) => ({ category, name, base, badge })));
if (icons.length !== 200) throw new Error(`Expected 200 symbols, got ${icons.length}`);

const esc = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const stroke = (tag, attrs='') => `<${tag} ${attrs}/>`;

function baseStroke(base) {
  const p = d => `<path d="${d}"/>`;
  const c = (cx,cy,r) => `<circle cx="${cx}" cy="${cy}" r="${r}"/>`;
  const r = (x,y,w,h,rx=2) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}"/>`;
  const l = (x1,y1,x2,y2) => `<path d="M${x1} ${y1}L${x2} ${y2}"/>`;
  const map = {
    home: p('M3.5 11.5 12 4l8.5 7.5v7a2 2 0 0 1-2 2h-4v-5h-5v5h-4a2 2 0 0 1-2-2Z'),
    menu: p('M4 7h16M4 12h16M4 17h16'), grid: [r(4,4,6,6,2),r(14,4,6,6,2),r(4,14,6,6,2),r(14,14,6,6,2)].join(''),
    search: c(10.5,10.5,6.5)+p('m15.5 15.5 4.5 4.5'), close: p('M6 6l12 12M18 6 6 18'),
    'arrow-left': p('M20 12H5m6-6-6 6 6 6'), 'arrow-right': p('M4 12h15m-6-6 6 6-6 6'),
    'arrow-up': p('M12 20V5m-6 6 6-6 6 6'), 'arrow-down': p('M12 4v15m-6-6 6 6 6-6'),
    'chevron-left': p('m15 5-7 7 7 7'), 'chevron-right': p('m9 5 7 7-7 7'),
    expand: p('M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5'), collapse: p('M4 9h5V4M20 9h-5V4M4 15h5v5M20 15h-5v5'),
    'more-h': c(5,12,1)+c(12,12,1)+c(19,12,1), 'more-v': c(12,5,1)+c(12,12,1)+c(12,19,1),
    filter: p('M4 6h16l-6.5 7v5l-3 2v-7Z'), sort: p('M8 5v14m0 0-3-3m3 3 3-3M16 19V5m0 0-3 3m3-3 3 3'),
    refresh: p('M20 7v5h-5M4 17v-5h5M6.2 8a7 7 0 0 1 11.8-1l2 3M4 14l2 3a7 7 0 0 0 11.8-1'),
    leaf: p('M20 4C11 3 4 7.5 4 14c0 4 3 6 6.5 6C17 20 20 12.5 20 4ZM6 18c3-4 6-7 11-10'),
    sprout: p('M12 21v-9M12 14C7 14 4.5 11 4 6c5-.5 8 2 8 7M12 10c0-4 3-6 8-5 0 4-3 6-8 5'),
    pot: p('M8 12h8l-1 8H9l-1-8ZM7 9h10v3H7Z')+p('M12 9V5m0 2c-3 0-5-1.5-5-4 3 0 5 1.5 5 4Zm0-1c0-3 2-5 5-5 0 3-2 5-5 5Z'),
    flower: c(12,8,2)+c(12,4.5,2.5)+c(15.3,6.7,2.5)+c(14,10.5,2.5)+c(10,10.5,2.5)+c(8.7,6.7,2.5)+p('M12 12v9m0-4c-3 0-5-1-6-3m6 5c3 0 5-1 6-3'),
    cactus: p('M9 20V7a3 3 0 0 1 6 0v5h2V9a2 2 0 0 1 4 0v4a3 3 0 0 1-3 3h-3v4M9 13H6a3 3 0 0 1-3-3V8a2 2 0 0 1 4 0v2h2M7 20h10'),
    succulent: p('M12 14c-4-1-6-4-6-7 3 0 5 1 6 4 1-3 3-5 6-5 0 3-2 6-6 8Zm0 0c-3 0-5 2-5 5h10c0-3-2-5-5-5Z'),
    herb: p('M12 21V9m0 5C8 14 5 12 5 8c4 0 7 2 7 6Zm0-3c0-4 3-7 7-7 0 4-3 7-7 7Z'),
    tree: c(12,9,6)+c(8,11,4)+c(16,11,4)+p('M12 14v7m-3 0h6'), palm: p('M12 21c0-7 0-12 1-16M13 7c-3-4-7-4-9-1 4 0 7 1 9 4M13 7c2-4 6-5 9-3-3 1-6 3-9 6M13 7c-1-4 1-6 4-7 0 3-1 5-4 7'),
    seed: p('M18 5c-7 0-12 4-12 10 0 3 2 5 5 5 6 0 8-8 7-15ZM8 18c2-4 4-7 8-10'),
    roots: p('M12 3v9m0 0-5 3m5-3 5 3m-5 0-3 4m3-4 3 4M7 15l-2 4m12-4 2 4'),
    vine: p('M7 21c9-3 2-12 10-18M8 16c-4 0-5-2-5-5 3 0 5 1 5 5Zm5-6c0-4 2-6 6-6 0 4-2 6-6 6Z'),
    bonsai: p('M6 12c0-3 2-5 5-5 0-2 2-4 4-4 3 0 5 2 5 5 0 3-2 5-5 5H8a2 2 0 0 1-2-1Zm6 1v3m-5 0h10l-1 5H8Z'),
    garden: p('M3 19c4-3 8-3 12 0 2-2 4-2 6-1M7 17v-5m0 2c-3 0-4-2-4-4 3 0 4 1 4 4Zm0-2c0-3 2-5 5-5 0 3-2 5-5 5Zm9 5v-4m0 2c-2 0-3-1-3-3 2 0 3 1 3 3Zm0-1c0-2 1-3 3-3 0 2-1 3-3 3Z'),
    drop: p('M12 3c-2 3-6 7-6 11a6 6 0 0 0 12 0c0-4-4-8-6-11Z')+p('M9 15a3 3 0 0 0 3 3'),
    'watering-can': p('M6 9h9v9a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3Zm9 2 4-3 2 3-6 4M8 9V6h5v3'),
    mist: p('M4 8h9m-9 4h13m-9 4h12')+c(18,7,1)+c(20,11,1)+c(5,17,1),
    fertilizer: p('M7 4h10l1 5 2 11H4L6 9l1-5Zm-1 5h12')+p('M12 17v-4m0 2c-3 0-4-1-4-3 3 0 4 1 4 3Zm0-1c0-2 1-3 4-3 0 2-1 3-4 3Z'),
    scissors: c(6,17,3)+c(18,17,3)+p('m8 15 9-11M16 15 7 4M12 11h.1'),
    repot: p('M6 12h12l-1 8H7Zm6 0V7m0 2c-3 0-5-2-5-5 3 0 5 2 5 5Zm0-1c0-3 2-5 5-5 0 3-2 5-5 5ZM4 9l-2 2 2 2m16-4 2 2-2 2'),
    soil: p('M3 15c3-3 6-3 9 0 3-3 6-3 9 0v5H3Zm4 0c0-4 2-7 5-10 3 3 5 6 5 10'),
    sun: c(12,12,4)+p('M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5'),
    shade: p('M4 13a8 8 0 0 1 16 0H4Zm8 0v7m-3 0h6')+p('M12 3v2M5 6l1.5 1.5M19 6l-1.5 1.5'),
    thermometer: p('M10 14.5V5a2 2 0 0 1 4 0v9.5a4 4 0 1 1-4 0Z')+p('M12 9v8'),
    stake: p('M8 21V5m8 16V3M8 8c4 0 6 2 8 5M8 13c4 0 6 2 8 5'), ruler: r(5,3,14,18,2)+p('M9 6h3M9 10h5M9 14h3M9 18h5'),
    calendar: r(3.5,5,17,16,3)+p('M8 3v4m8-4v4M4 10h16'), clipboard: p('M8 5H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2')+r(8,3,8,4,2),
    clock: c(12,12,9)+p('M12 7v5l3 2'), timer: p('M9 3h6m-3 0v3')+c(12,14,7)+p('M12 10v4l3 2'), stopwatch: p('M9 2h6m-3 0v3m6 2 2-2')+c(12,14,7)+p('M12 10v4'),
    history: p('M4 5v5h5M5 10a8 8 0 1 1 2 8')+p('M12 8v5l3 2'), repeat: p('M5 7h11l-2-2m2 2-2 2M19 17H8l2 2m-2-2 2-2'),
    bell: p('M5 17h14l-2-3v-3a5 5 0 0 0-10 0v3Zm5 3h4'), flame: p('M13 3c1 5-3 5-1 9 1-2 3-3 5-2 2 2 3 4 2 7a7 7 0 0 1-14-1c0-4 3-7 6-10 0 3 1 4 2 5'),
    moon: p('M20 15a8 8 0 0 1-11-11 8 8 0 1 0 11 11Z'),
    cloud: p('M6 18h11a4 4 0 0 0 0-8h-.5A6 6 0 0 0 5 11a3.5 3.5 0 0 0 1 7Z'),
    wind: p('M3 8h11a3 3 0 1 0-3-3M3 12h16a2 2 0 1 1-2 2M3 16h9'), snow: p('M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9M8 5l4 2 4-2M8 19l4-2 4 2'),
    fog: p('M4 8h16M2 12h18M5 16h17'), horizon: p('M3 18h18M5 15a7 7 0 0 1 14 0M12 3v4M5 8l2 2m10 0 2-2'),
    users: c(9,8,3)+c(16.5,9,2.5)+p('M3 20c0-4 2-6 6-6s6 2 6 6M14 15c4 0 6 2 6 5'), user: c(12,8,4)+p('M4 21c0-5 3-8 8-8s8 3 8 8'),
    chat: p('M4 5h16v12H9l-5 4Z')+p('M8 10h8m-8 3h5'), comment: p('M5 6h14v10H9l-4 4Z'), share: c(6,12,2)+c(18,6,2)+c(18,18,2)+p('m8 11 8-4m-8 6 8 4'),
    send: p('m3 4 18 8-18 8 4-8Zm4 8h14'), post: r(4,3,16,18,3)+p('M8 8h8m-8 4h8m-8 4h5'), image: r(3,4,18,16,3)+c(9,9,2)+p('m5 18 5-5 3 3 2-2 4 4'),
    heart: p('M12 20 4.5 13A5 5 0 0 1 12 6a5 5 0 0 1 7.5 7Z'), star: p('m12 3 2.7 5.5 6 .9-4.4 4.3 1 6.1-5.3-2.9-5.3 2.9 1-6.1-4.4-4.3 6-.9Z'),
    group: c(8,8,3)+c(16,8,3)+p('M2 20c0-4 2-6 6-6s6 2 6 6m-4 0c0-4 2-6 6-6s6 2 6 6'), flag: p('M5 21V4m0 1h12l-2 4 2 4H5'),
    'id-card': r(3,5,18,14,3)+c(8,11,2)+p('M5 16c.5-2 1.5-3 3-3s2.5 1 3 3m3-5h4m-4 3h3'),
    settings: c(12,12,3)+p('M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6 7 7m10 10 1.4 1.4M5.6 18.4 7 17m10-10 1.4-1.4'),
    sliders: p('M4 7h6m4 0h6M4 17h10m4 0h2')+c(12,7,2)+c(16,17,2), shield: p('M12 3 20 6v6c0 5-3 8-8 10-5-2-8-5-8-10V6Z'),
    key: c(8,12,4)+p('M12 12h9m-3 0v3m-3-3v2'), globe: c(12,12,9)+p('M3 12h18M12 3c3 3 4 6 4 9s-1 6-4 9c-3-3-4-6-4-9s1-6 4-9'),
    palette: p('M12 3a9 9 0 1 0 0 18h2a2 2 0 0 0 0-4h-1a2 2 0 0 1 0-4h8A9 9 0 0 0 12 3Z')+c(7,10,1)+c(9,7,1)+c(13,6,1)+c(17,8,1),
    help: c(12,12,9)+p('M9.5 9a3 3 0 1 1 4 2.8c-1 .5-1.5 1-1.5 2.2m0 3h.1'), headset: p('M4 13v-1a8 8 0 0 1 16 0v1M4 13v5h4v-6H5m15 1v5h-4v-6h3M16 20h-4'),
    document: p('M6 3h8l4 4v14H6Z')+p('M14 3v5h4M9 12h6m-6 4h6'), info: c(12,12,9)+p('M12 11v6m0-9h.1'), logout: p('M10 5H5v14h5m4-4 4-3-4-3m4 3H9'),
    book: p('M4 5a4 4 0 0 1 4-2h4v17H8a4 4 0 0 0-4 2Zm16 0a4 4 0 0 0-4-2h-4v17h4a4 4 0 0 1 4 2Z'), play: c(12,12,9)+p('m10 8 6 4-6 4Z'),
    video: r(3,6,13,12,3)+p('m16 10 5-3v10l-5-3Z'), audio: p('M9 18V6l10-2v12')+c(6,18,3)+c(16,16,3), bookmark: p('M6 3h12v18l-6-4-6 4Z'), map: p('m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3Zm6-3v15m6-12v15'),
    bulb: p('M9 18h6m-5 3h4m3-9a5 5 0 1 0-10 0c0 2 1 3 2 4h6c1-1 2-2 2-4Z'), graduation: p('m3 10 9-5 9 5-9 5Zm3 2v5c3 2 9 2 12 0v-5m3-2v6'),
    books: p('M4 4h4v16H4Zm6 2h4v14h-4Zm6-3 4 1-3 16-4-1Z'), folder: p('M3 6h7l2 2h9v11H3Z'), download: p('M12 4v11m-4-4 4 4 4-4M4 20h16'), upload: p('M12 16V5m-4 4 4-4 4 4M4 20h16'), external: p('M13 4h7v7m0-7-9 9M18 13v7H4V6h7'), copy: r(8,8,12,12,2)+p('M16 8V4H4v12h4'),
    store: p('M4 9h16l-1-5H5Zm1 0v11h14V9M9 20v-6h6v6'), cart: p('M3 5h2l2 11h10l3-8H6')+c(9,20,1)+c(17,20,1), bag: p('M5 8h14l1 13H4Zm4 0V6a3 3 0 0 1 6 0v2'),
    gift: r(3,9,18,12,2)+p('M12 9v12M3 13h18M12 9H8a2.5 2.5 0 1 1 4-2Zm0 0h4a2.5 2.5 0 1 0-4-2Z'), ticket: p('M4 6h16v4a2 2 0 0 0 0 4v4H4v-4a2 2 0 0 0 0-4Z'),
    tag: p('M3 12 12 3h7l2 2v7l-9 9Z')+c(16.5,7.5,1.5), wallet: r(3,6,18,14,3)+p('M15 10h6v6h-6a3 3 0 0 1 0-6Z'), card: r(3,6,18,13,3)+p('M3 10h18M7 15h4'),
    coin: c(12,12,9)+p('M15 9c-1-1-5-1-5 1 0 3 5 1 5 4 0 2-4 2-6 1m3-9v2m0 12v2'), crown: p('m3 7 5 5 4-8 4 8 5-5-2 12H5Z'), medal: c(12,14,5)+p('m8 10-3-7h5l2 4 2-4h5l-3 7M10 14l1.5 1.5L14 13'), trophy: p('M7 4h10v5a5 5 0 0 1-10 0Zm0 2H3v2a4 4 0 0 0 4 4m10-6h4v2a4 4 0 0 1-4 4M12 14v4m-4 3h8'),
    target: c(12,12,9)+c(12,12,5)+c(12,12,1)+p('m16 8 5-5'), sparkles: p('m7 3 1.5 3.5L12 8l-3.5 1.5L7 13 5.5 9.5 2 8l3.5-1.5Zm10 8 1 2.5L21 15l-3 1.5-1 2.5-1-2.5-3-1.5 3-1.5Zm-5 7 .7 1.3L14 20l-1.3.7L12 22l-.7-1.3L10 20l1.3-.7Z'), receipt: p('M6 3h12v18l-3-2-3 2-3-2-3 2Zm3 5h6m-6 4h6m-6 4h4'),
    camera: r(3,7,18,13,3)+p('M8 7l2-3h4l2 3')+c(12,13,4), scan: p('M8 3H4v4M16 3h4v4M8 21H4v-4m12 4h4v-4')+r(8,8,8,8,2), qr: p('M4 4h6v6H4Zm10 0h6v6h-6ZM4 14h6v6H4Zm11 0h2v2h-2Zm3 0h2v6h-6v-2m0-2h2'),
    microphone: r(9,3,6,12,3)+p('M5 11a7 7 0 0 0 14 0M12 18v3m-4 0h8'), pin: p('M12 21s7-6 7-12a7 7 0 0 0-14 0c0 6 7 12 7 12Z')+c(12,9,2.5),
    wifi: p('M3 9a14 14 0 0 1 18 0M6 13a9 9 0 0 1 12 0m-9 4a4 4 0 0 1 6 0')+c(12,20,1), bluetooth: p('M12 3v18l6-5-6-4 6-4Zm0 9L6 7m6 5-6 5'),
    lock: r(5,10,14,11,3)+p('M8 10V7a4 4 0 0 1 8 0v3')+c(12,15,1), unlock: r(5,10,14,11,3)+p('M16 10V7a4 4 0 0 0-7-2')+c(12,15,1),
    eye: p('M3 12s3-6 9-6 9 6 9 6-3 6-9 6-9-6-9-6Z')+c(12,12,3), warning: p('M12 3 22 20H2Z')+p('M12 9v5m0 3h.1'),
    edit: p('m5 19 1-5L16 4l4 4-10 10Zm9-13 4 4'), trash: p('M5 7h14m-11 0V4h8v3m-9 0 1 14h8l1-14M10 11v6m4-6v6'),
    flag2: p('M5 21V4m0 1h12l-2 4 2 4H5'), percentage: p('M7 17 17 7')+c(7,7,2)+c(17,17,2)
  };
  return map[base] ?? c(12,12,8)+p('M12 8v8M8 12h8');
}

function baseSolid(base) {
  const simple = {
    home:'M3 11.2 12 3l9 8.2V20a2 2 0 0 1-2 2h-5.5v-7h-3v7H5a2 2 0 0 1-2-2Z',
    leaf:'M21 3C10 2 3 7 3 14c0 5 4 8 8 8 8 0 10-10 10-19ZM6 19c3-5 7-9 12-12',
    drop:'M12 2C9 6 5 10 5 14a7 7 0 0 0 14 0c0-4-4-8-7-12Z',
    sun:'M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z', moon:'M20 15A8 8 0 0 1 9 4a8 8 0 1 0 11 11Z',
    heart:'M12 21 4 13.6A5.2 5.2 0 0 1 12 6a5.2 5.2 0 0 1 8 7.6Z',
    star:'m12 2 3 6 6.6 1-4.8 4.7 1.1 6.7-5.9-3.2-5.9 3.2 1.1-6.7L2.4 9 9 8Z',
    cloud:'M6 19h11a5 5 0 0 0 .5-10A6.5 6.5 0 0 0 5 10a4.5 4.5 0 0 0 1 9Z',
    user:'M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM3 22c0-5.5 3.5-8.5 9-8.5s9 3 9 8.5Z',
    users:'M8.5 11.5a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM2 22c0-5 2.5-8 7-8s7 3 7 8Zm15-9a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-1 1.5c4 0 6 2.7 6 7.5h-4.5c0-3.4-.8-5.9-2.6-7.4.4-.1.7-.1 1.1-.1Z',
    bell:'M4 18h16l-2-3v-4a6 6 0 0 0-12 0v4Zm6 2h4a2 2 0 0 1-4 0Z',
    calendar:'M6 4h12a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4Z',
    chat:'M3 4h18v14H10l-7 4Z', comment:'M4 5h16v12H9l-5 4Z',
    shield:'M12 2 21 6v6c0 6-3.5 9.5-9 11-5.5-1.5-9-5-9-11V6Z',
    bookmark:'M5 2h14v21l-7-4.5L5 23Z', pin:'M12 23S4 16.5 4 9a8 8 0 0 1 16 0c0 7.5-8 14-8 14Z',
    lock:'M6 9V7a6 6 0 0 1 12 0v2h1a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-8a3 3 0 0 1 3-3Z',
    camera:'M7 6 9 2h6l2 4h3a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3Zm5 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z',
    bag:'M7 7V6a5 5 0 0 1 10 0v1h3l2 16H2L4 7Zm3 0h4V6a2 2 0 0 0-4 0Z',
    card:'M3 5h18a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3Z',
    gift:'M2 10h20v13H2Zm9-7c-4-3-7 0-5 4h5Zm2 0v4h5c2-4-1-7-5-4Z',
    trophy:'M6 3h12v6a6 6 0 0 1-5 5.9V18h4v4H7v-4h4v-3.1A6 6 0 0 1 6 9ZM2 5h4v6C3 11 2 9 2 5Zm16 0h4c0 4-1 6-4 6Z',
    warning:'M12 2 23 22H1Z',
    flame:'M13 2c2 6-2 7 0 11 1-2 3-4 6-3 3 3 4 7 2 10a9 9 0 0 1-18-2c0-5 4-10 8-14 0 4 1 6 4 8',
    settings:'M12 1l2 3 3-1 2 2-1 3 3 2v3l-3 2 1 3-2 2-3-1-2 3h-3l-2-3-3 1-2-2 1-3-3-2v-3l3-2-1-3 2-2 3 1 2-3Zm0 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z'
  };
  const d = simple[base];
  if (d) return `<path d="${d}" fill-rule="evenodd" clip-rule="evenodd"/>`;
  const stroked = baseStroke(base);
  return `<g fill="none" stroke="currentColor" stroke-width="3.8" stroke-linecap="round" stroke-linejoin="round">${stroked}</g>`;
}

function badgeStroke(kind) {
  const map = {
    none:'', plus:'<path d="M17 17v5m-2.5-2.5h5"/>', check:'<path d="m15.5 19 2 2 4-4"/>',
    heart:'<path d="M18 22c-3-2-4.5-3.5-4.5-5.2a2.5 2.5 0 0 1 4.5-1.3 2.5 2.5 0 0 1 4.5 1.3C22.5 18.5 21 20 18 22Z"/>',
    star:'<path d="m18 15 1 2 2.2.3-1.6 1.6.4 2.2-2-1.1-2 1.1.4-2.2-1.6-1.6 2.2-.3Z"/>',
    alert:'<circle cx="19" cy="19" r="3"/><path d="M19 17.5v2m0 1.5h.1"/>', sparkle:'<path d="m18 15 1 2 2 1-2 1-1 2-1-2-2-1 2-1Z"/>',
    clock:'<circle cx="18" cy="18" r="4"/><path d="M18 16v2l1.5 1"/>', drop:'<path d="M18 15c-1 1.5-3 3.5-3 5a3 3 0 0 0 6 0c0-1.5-2-3.5-3-5Z"/>',
    leaf:'<path d="M21 15c-5 0-8 2-8 5 0 2 1.5 3 3.5 3 3.5 0 4.5-4 4.5-8Zm-6 6 4-4"/>', scan:'<path d="M15 16v-2h2m4 2v-2h-2m-4 4v2h2m4-2v2h-2"/>',
    percent:'<path d="m15 21 6-6m-5 1h.1m4 4h.1"/>', refresh:'<path d="M15 18a4 4 0 0 1 7-1v-2m0 2h-2m2 1a4 4 0 0 1-7 1v2m0-2h2"/>',
    search:'<circle cx="18" cy="18" r="3"/><path d="m20 20 2 2"/>', grid:'<path d="M15 15h3v3h-3Zm5 0h3v3h-3Zm-5 5h3v3h-3Zm5 0h3v3h-3Z"/>',
    sun:'<circle cx="18" cy="18" r="2"/><path d="M18 14v1m0 6v1m-4-4h1m6 0h1"/>', moon:'<path d="M21 20a3 3 0 0 1-4-4 3 3 0 1 0 4 4Z"/>',
    rain:'<path d="m16 17-1 3m4-3-1 3m4-3-1 3"/>','rain-heavy':'<path d="m15 16-1 5m4-5-1 5m4-5-1 5"/>', drizzle:'<path d="m16 18-.5 1m3.5-1-.5 1m3.5-1-.5 1"/>', bolt:'<path d="m19 14-3 5h3l-2 4 5-6h-3Z"/>', snow:'<path d="M18 15v7m-3-3.5h6"/>',
    sunrise:'<path d="M15 21h7m-5-3a3 3 0 0 1 5 0m-2-5v2"/>', sunset:'<path d="M15 21h7m-5-3a3 3 0 0 1 5 0m-2-3v-2"/>',
    edit:'<path d="m15 21 1-4 4-4 3 3-4 4Z"/>', lock:'<rect x="15" y="17" width="7" height="5" rx="1.5"/><path d="M17 17v-1a2 2 0 0 1 4 0v1"/>',
    close:'<path d="m16 16 5 5m0-5-5 5"/>', trash:'<path d="M16 17h6m-5 0 .5 5h3l.5-5m-3-2h2"/>',
    document:'<path d="M15 14h6v8h-6Zm2 3h2m-2 2h2"/>', open:'<path d="m16 20 5-5m0 0v4m0-4h-4"/>',
    upload:'<path d="M18 22v-7m-3 3 3-3 3 3"/>', download:'<path d="M18 15v7m-3-3 3 3 3-3"/>', card:'<rect x="14" y="16" width="9" height="6" rx="2"/><path d="M14 18h9"/>',
    flag:'<path d="M16 22v-7m0 1h6l-1.5 2L22 20h-6"/>', 'rain-heavy2':''
  };
  return map[kind] ?? '';
}

function badgeSolid(kind) {
  if (kind === 'none') return '';
  const mark = {
    plus:'<path d="M18.5 15.5v6m-3-3h6"/>',
    check:'<path d="m15.4 18.5 2 2 4.2-4.4"/>',
    alert:'<path d="M18.5 15.5v3.4m0 2.2h.01"/>',
    heart:'<path d="M18.5 21.6c-3-1.8-4.1-3-4.1-4.4a2.2 2.2 0 0 1 4.1-1.1 2.2 2.2 0 0 1 4.1 1.1c0 1.4-1.1 2.6-4.1 4.4Z" fill="currentColor" stroke="none"/>',
    star:'<path d="m18.5 14.8 1.1 2.2 2.5.4-1.8 1.7.4 2.5-2.2-1.2-2.2 1.2.4-2.5-1.8-1.7 2.5-.4Z" fill="currentColor" stroke="none"/>',
    percent:'<path d="m16 21 5-5m-4.8.2h.01m4.6 4.6h.01"/>',
    sparkle:'<path d="m18.5 14.8 1.1 2.6 2.6 1.1-2.6 1.1-1.1 2.6-1.1-2.6-2.6-1.1 2.6-1.1Z" fill="currentColor" stroke="none"/>',
    search:'<circle cx="17.8" cy="17.8" r="2.2"/><path d="m19.5 19.5 2.1 2.1"/>',
    close:'<path d="m16 16 5 5m0-5-5 5"/>',
    clock:'<circle cx="18.5" cy="18.5" r="3.2"/><path d="M18.5 16.6v2.1l1.4 1"/>',
    drop:'<path d="M18.5 14.8c-1.2 1.6-3 3.5-3 5a3 3 0 0 0 6 0c0-1.5-1.8-3.4-3-5Z"/>',
    leaf:'<path d="M22 15c-4.8-.3-7.5 1.8-7.3 4.5.2 2.2 2 3.2 4 2.3 2.7-1.2 3.3-4.2 3.3-6.8Zm-6 5.7 4.3-3.7"/>',
    scan:'<path d="M16.2 17v-1.5h1.5m3.1 1.5v-1.5h-1.5m-3.1 4.5v1.5h1.5m3.1-1.5v1.5h-1.5"/>',
    grid:'<path d="M15.5 15.5h2.3v2.3h-2.3Zm3.7 0h2.3v2.3h-2.3Zm-3.7 3.7h2.3v2.3h-2.3Zm3.7 0h2.3v2.3h-2.3Z" fill="currentColor" stroke="none"/>',
    sun:'<circle cx="18.5" cy="18.5" r="2.1"/><path d="M18.5 14.7v.8m0 6v.8m-3.8-3.8h.8m6 0h.8"/>',
    moon:'<path d="M21.5 20.3a3.2 3.2 0 0 1-3.8-3.8 3.2 3.2 0 1 0 3.8 3.8Z"/>',
    rain:'<path d="m16 17.5-.8 2.7m3.7-2.7-.8 2.7m3.7-2.7-.8 2.7"/>',
    'rain-heavy':'<path d="m15.8 16.8-1 3.8m4.1-3.8-1 3.8m4.1-3.8-1 3.8"/>',
    drizzle:'<path d="m16 18-.4 1.2m3.3-1.2-.4 1.2m3.3-1.2-.4 1.2"/>',
    bolt:'<path d="m19.2 14.7-3.4 4.2h2.7l-1.2 3.4 4-4.8h-2.8Z" fill="currentColor" stroke="none"/>',
    snow:'<path d="M18.5 15v7m-3-5.3 6 3.6m-6 0 6-3.6"/>',
    sunrise:'<path d="M15 21h7m-5.8-2.2a2.8 2.8 0 0 1 4.6 0m-2.3-4.1v1"/>',
    sunset:'<path d="M15 21h7m-5.8-2.2a2.8 2.8 0 0 1 4.6 0m-2.3-3v-1"/>',
    edit:'<path d="m15.5 21.5.8-3.5 3.6-3.6 2.2 2.2-3.6 3.6Z"/>',
    lock:'<rect x="15.2" y="17.2" width="6.6" height="4.8" rx="1.4"/><path d="M17 17.2v-1a1.5 1.5 0 0 1 3 0v1"/>',
    trash:'<path d="M15.5 17h6m-5.1 0 .5 4.6h3.2l.5-4.6m-3-1.8h1.8"/>',
    document:'<path d="M15.5 14.8h6v7.4h-6Z"/><path d="M17.2 17.2h2.6m-2.6 2.3h2.6"/>',
    open:'<path d="m15.8 21.2 5.4-5.4m0 0v4m0-4h-4"/>',
    upload:'<path d="M18.5 22v-7m-2.8 2.8 2.8-2.8 2.8 2.8"/>',
    download:'<path d="M18.5 15v7m-2.8-2.8 2.8 2.8 2.8-2.8"/>',
    card:'<rect x="14.5" y="16" width="8" height="6" rx="1.8"/><path d="M14.5 18h8"/>',
    flag:'<path d="M16.2 22v-7m0 1h5.8l-1.3 2 1.3 2h-5.8"/>',
    refresh:'<path d="M15.1 18.2a3.6 3.6 0 0 1 6.4-1.3v-1.8m0 1.8h-1.8m2.2 2a3.6 3.6 0 0 1-6.4 1.2v1.8m0-1.8h1.8"/>'
  }[kind] ?? '<circle cx="18.5" cy="18.5" r="1" fill="currentColor" stroke="none"/>';
  return `<circle cx="18.5" cy="18.5" r="5" fill="${TERRACOTTA}"/><g fill="none" stroke="${IVORY}" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round" color="${IVORY}">${mark}</g>`;
}

function svg(icon, style) {
  const label = `${icon.name} — ${style}`;
  const body = style === 'stroke-rounded'
    ? `<g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${baseStroke(icon.base)}${badgeStroke(icon.badge)}</g>`
    : `<g fill="currentColor">${baseSolid(icon.base)}</g>${badgeSolid(icon.badge)}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" color="${GREEN}"><title>${esc(label)}</title>${body}</svg>\n`;
}

for (const icon of icons) {
  fs.writeFileSync(path.join(strokeDir, `${icon.name}.svg`), svg(icon, 'stroke-rounded'));
  fs.writeFileSync(path.join(solidDir, `${icon.name}.svg`), svg(icon, 'solid-rounded'));
}

const manifest = {
  name: 'PlantMe Icons', version: '1.0.0', grid: 24, count: { symbols: 200, assets: 400 },
  styles: { 'stroke-rounded': { strokeWidth: 1.8, linecap: 'round', linejoin: 'round' }, 'solid-rounded': { fill: GREEN } },
  colors: { primary: GREEN, accent: TERRACOTTA, cutout: IVORY }, icons
};
fs.writeFileSync(path.join(root, 'manifest.json'), JSON.stringify(manifest, null, 2));

const categoryLabels = { navigation:'Navegação', plants:'Plantas', care:'Cuidados', time:'Tempo', weather:'Clima', community:'Comunidade', profile:'Perfil', content:'Conteúdo', commerce:'Loja e conquistas', system:'Sistema' };
const cards = icons.map((icon, index) => {
  const col = index % 10, row = Math.floor(index / 10);
  const x = 60 + col * 144, y = 180 + row * 112;
  const strokeBody = svg(icon, 'stroke-rounded').replace(/^<svg[^>]*>|<\/svg>\s*$/g, '').replace(/<title>.*?<\/title>/, '');
  const solidBody = svg(icon, 'solid-rounded').replace(/^<svg[^>]*>|<\/svg>\s*$/g, '').replace(/<title>.*?<\/title>/, '');
  return `<g transform="translate(${x} ${y})"><rect width="128" height="96" rx="18" fill="#FFFFFF"/><g transform="translate(22 18) scale(1.25)">${strokeBody}</g><g transform="translate(74 18) scale(1.25)">${solidBody}</g><text x="64" y="78" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="${GREEN}">${esc(icon.name)}</text></g>`;
}).join('');
const catalogHeight = 180 + Math.ceil(icons.length / 10) * 112 + 80;
const catalog = `<svg xmlns="http://www.w3.org/2000/svg" width="1560" height="${catalogHeight}" viewBox="0 0 1560 ${catalogHeight}"><rect width="100%" height="100%" fill="${IVORY}"/><text x="60" y="68" font-family="Arial, sans-serif" font-size="34" font-weight="700" fill="${GREEN}">PlantMe Icons</text><text x="60" y="105" font-family="Arial, sans-serif" font-size="17" fill="#68776D">200 símbolos · Stroke Rounded + Solid Rounded · 400 SVGs</text><text x="60" y="140" font-family="Arial, sans-serif" font-size="12" fill="#68776D">Cada cartão mostra contorno à esquerda e preenchido à direita.</text>${cards}</svg>`;
fs.writeFileSync(path.join(root, 'catalog.svg'), catalog);

const htmlCards = icons.map(icon => `<article data-category="${icon.category}" data-name="${icon.name}"><div class="pair"><img src="svg/stroke-rounded/${icon.name}.svg" alt="${icon.name} em contorno"><img src="svg/solid-rounded/${icon.name}.svg" alt="${icon.name} preenchido"></div><strong>${icon.name}</strong><span>${categoryLabels[icon.category]}</span></article>`).join('');
const options = Object.entries(categoryLabels).map(([v,l])=>`<option value="${v}">${l}</option>`).join('');
const html = `<!doctype html><html lang="pt-BR"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>PlantMe Icons — 400 SVGs</title><style>*{box-sizing:border-box}body{margin:0;background:${IVORY};color:${GREEN};font:15px/1.4 Arial,sans-serif}header{padding:48px clamp(24px,5vw,72px);border-bottom:1px solid #dfe5dc}h1{font-size:clamp(38px,6vw,76px);line-height:.95;margin:0 0 18px;letter-spacing:-.045em}p{color:#68776d}.tools{display:flex;gap:12px;flex-wrap:wrap;margin-top:24px}input,select{height:44px;border:1px solid #bdc7bc;border-radius:14px;background:white;padding:0 14px;font:inherit;color:inherit}input{min-width:280px}main{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px;padding:32px clamp(24px,5vw,72px)}article{background:white;border-radius:20px;padding:18px;min-height:132px}.pair{display:flex;gap:20px;margin-bottom:16px}.pair img{width:36px;height:36px}article strong{display:block;font-size:13px;word-break:break-word}article span{font-size:11px;color:#839087}</style><header><h1>PlantMe<br>Icons</h1><p>200 símbolos originais em duas linguagens arredondadas. Total: 400 SVGs.</p><div class="tools"><input id="q" placeholder="Buscar ícone"><select id="cat"><option value="">Todas as categorias</option>${options}</select></div></header><main>${htmlCards}</main><script>const q=document.querySelector('#q'),c=document.querySelector('#cat'),cards=[...document.querySelectorAll('article')];function f(){const t=q.value.toLowerCase(),v=c.value;cards.forEach(x=>x.hidden=!(x.dataset.name.includes(t)&&(!v||x.dataset.category===v)))}q.oninput=f;c.onchange=f;</script></html>`;
fs.writeFileSync(path.join(root, 'index.html'), html);

const readme = `# PlantMe Icons v1\n\nBiblioteca original com 200 símbolos e duas variantes vetoriais: Stroke Rounded e Solid Rounded. Total de 400 SVGs.\n\n## Estrutura\n- \`svg/stroke-rounded\`: 200 SVGs com traço 1,8 px, pontas e junções arredondadas.\n- \`svg/solid-rounded\`: 200 SVGs preenchidos, com detalhes auxiliares vetoriais.\n- \`manifest.json\`: catálogo, categorias e tokens.\n- \`catalog.svg\`: prancha completa.\n- \`index.html\`: navegador local com busca e filtros.\n\n## Figma\nArraste as duas pastas para o Figma. Cada SVG possui viewBox 24 × 24 e cores explícitas editáveis. Organize cada par como variantes \`Style=Stroke Rounded\` e \`Style=Solid Rounded\`.\n\n## Direção visual\nA linguagem usa curvas contínuas, terminações arredondadas e proporções suaves. Os desenhos são originais e não reutilizam arquivos da Solar, Hugeicons ou 99.\n`;
fs.writeFileSync(path.join(root, 'README.md'), readme);

console.log(JSON.stringify({ symbols: icons.length, assets: icons.length * 2, categories: Object.keys(categories).length, root }, null, 2));
