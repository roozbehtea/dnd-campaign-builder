/* Campaign Forge — random generators
   Each generator returns { title, rows?, text?, sections?, saves: [{ label, items: [{ type, data }] }] }.
   The app turns each save's items into campaign records. Cultures shape names and places;
   adventures borrow monsters, riddles and dilemmas from the Mythic Codex. */
(function () {
  'use strict';
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const pickN = (a, n) => [...a].sort(() => Math.random() - 0.5).slice(0, n);
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
  const d = n => 1 + Math.floor(Math.random() * n);
  const mod = s => { const m = Math.floor((s - 10) / 2); return (m >= 0 ? '+' : '') + m; };
  const crNum = cr => String(cr).includes('/') ? 1 / +String(cr).split('/')[1] : +cr;

  /* ===================================================================
     Cultures: names, places and flavour
     =================================================================== */
  const CULTURES = {
    classic:      { label: 'Classic fantasy', trads: null },
    norse:        { label: 'Norse', trads: ['norse'] },
    persian:      { label: 'Persian', trads: ['shahnameh'] },
    indic:        { label: 'Indic', trads: ['mahabharata', 'buddhist'] },
    greek:        { label: 'Greek', trads: ['odyssey', 'western'] },
    mesopotamian: { label: 'Mesopotamian', trads: ['gilgamesh'] },
    chinese:      { label: 'Chinese', trads: ['taoist', 'buddhist'] },
  };

  const CLASSIC_NAMES = {
    Human: [['Aldric', 'Brenna', 'Cedric', 'Dara', 'Edwin', 'Freya', 'Gideon', 'Hilda', 'Isolde', 'Jasper', 'Kaelen', 'Liora', 'Marek', 'Nessa', 'Osric', 'Perrin', 'Rowena', 'Silas', 'Tamsin', 'Ulric', 'Vera', 'Wystan', 'Yara', 'Corin'], ['Ashford', 'Blackwood', 'Crane', 'Dunmore', 'Fairwind', 'Greaves', 'Hollow', 'Ironside', 'Kettle', 'Lark', 'Marsh', 'Pike', 'Redmane', 'Stone', 'Thorne', 'Vale']],
    Dwarf: [['Borin', 'Dagna', 'Eldrek', 'Gunnhild', 'Harbek', 'Kathra', 'Morgran', 'Rurik', 'Torga', 'Vistra', 'Brottor', 'Helja'], ['Ironfist', 'Stonebeard', 'Deepdelver', 'Coppervein', 'Anvilborn', 'Flintheart', 'Granitehand']],
    Elf: [['Aelar', 'Caelynn', 'Erevan', 'Ielenia', 'Lianthorn', 'Naivara', 'Quarion', 'Sariel', 'Thamior', 'Valanthe', 'Mialee', 'Theren'], ['Amakiir', 'Galanodel', 'Liadon', 'Moonwhisper', 'Siannodel', 'Starbloom', 'Nightbreeze']],
    Halfling: [['Cade', 'Lidda', 'Merric', 'Seraphina', 'Roscoe', 'Verna', 'Pip', 'Bree', 'Milo', 'Poppy'], ['Brushgather', 'Goodbarrel', 'Tealeaf', 'Underbough', 'Tosscobble', 'Greenbottle']],
    Gnome: [['Alston', 'Bimpnottin', 'Dimble', 'Ellyjobell', 'Fonkin', 'Orla', 'Zook', 'Nissa', 'Wrenn'], ['Beren', 'Daergel', 'Garrick', 'Nackle', 'Turen', 'Sprocketwhistle']],
    'Half-Orc': [['Dench', 'Gell', 'Holg', 'Krusk', 'Baggi', 'Emen', 'Ovak', 'Shautha', 'Yevelda', 'Thokk'], ['the Unbowed', 'Skullsplitter', 'of the Red Tusk', 'Ironjaw', 'the Quiet']],
    Tiefling: [['Akmenos', 'Damakos', 'Kallista', 'Mordai', 'Orianna', 'Rieta', 'Hope', 'Torment', 'Ash', 'Sorrow', 'Ember', 'Vesper'], ['', '', 'Vane', 'Kaziel', 'Nightshade']],
    Dragonborn: [['Arjhan', 'Donaar', 'Kriv', 'Medrash', 'Sora', 'Harann', 'Thava', 'Biri', 'Nala'], ['Clethtinthiallor', 'Kerrhylon', 'Myastan', 'Yarjerit', 'Delmirev']],
  };
  // Given names are split so patronymics and epithets read naturally.
  const CULTURE_NAMES = {
    norse: {
      m: ['Asgeir', 'Bjorn', 'Eirik', 'Halfdan', 'Kolbein', 'Thorvald', 'Ulf', 'Hrafn', 'Gunnar', 'Leif', 'Orm', 'Hallbjorn', 'Ketil', 'Vali'],
      f: ['Dagny', 'Freydis', 'Gudrun', 'Ingrid', 'Ragnhild', 'Sigrid', 'Solveig', 'Vigdis', 'Yrsa', 'Astrid', 'Thora', 'Hild', 'Aslaug', 'Bergthora'],
      build: (g, first) => `${first} ${pick(CULTURE_NAMES.norse.m)}${g === 'm' ? 'sson' : 'sdottir'}`,
    },
    persian: {
      m: ['Ardavan', 'Bahram', 'Kourosh', 'Mehrdad', 'Farhad', 'Bizhan', 'Giv', 'Arash', 'Siamak', 'Dariush', 'Nariman', 'Babak', 'Shapur', 'Kaveh'],
      f: ['Farangis', 'Gordafarid', 'Manizheh', 'Nahid', 'Parisa', 'Shirin', 'Tahmineh', 'Roxana', 'Azadeh', 'Mahsa', 'Katayun', 'Homa', 'Soudabeh', 'Pari'],
      build: (g, first) => `${first} of ${pick(['Balkh', 'Zabul', 'Merv', 'Istakhr', 'Rey', 'Nishapur', 'Tus', 'Hamadan', 'Kabul', 'Samangan'])}`,
    },
    indic: {
      m: ['Aditya', 'Bhanu', 'Gautam', 'Jayant', 'Pradyumna', 'Uttam', 'Vikram', 'Arun', 'Dhruva', 'Ravi', 'Kiran', 'Sudhir', 'Madhav', 'Satyaki'],
      f: ['Ambika', 'Chitra', 'Damayanti', 'Devika', 'Indira', 'Kalyani', 'Mira', 'Rohini', 'Savitri', 'Shanta', 'Vasudha', 'Yamini', 'Malini', 'Sunanda'],
      build: (g, first) => `${first} of ${pick(['Kashi', 'Panchala', 'Magadha', 'Anga', 'Matsya', 'Vidarbha', 'Kosala', 'Avanti', 'Kalinga', 'Madra'])}`,
    },
    greek: {
      m: ['Agathon', 'Demetrios', 'Glaukos', 'Iason', 'Leander', 'Melanthios', 'Nikandros', 'Zenon', 'Kleon', 'Theron', 'Lykos', 'Philon', 'Aristides', 'Eumaios'],
      f: ['Alkmene', 'Chryseis', 'Eurydike', 'Hermione', 'Kallisto', 'Phaidra', 'Theano', 'Xanthippe', 'Ione', 'Melitta', 'Thalia', 'Arete', 'Korinna', 'Nausikaa'],
      build: (g, first) => `${first} of ${pick(['Ithaka', 'Argos', 'Pylos', 'Thebes', 'Corinth', 'Crete', 'Delos', 'Naxos', 'Sparta', 'Mykenai'])}`,
    },
    mesopotamian: {
      m: ['Adapa', 'Belibni', 'Iddin-Ea', 'Ishme-Dagan', 'Lipit', 'Puzur', 'Shulgi', 'Zimri', 'Etana', 'Ur-Nanshe', 'Ibbi', 'Sumu'],
      f: ['Amat', 'Belessunu', 'Enheduanna', 'Iltani', 'Kubaba', 'Nanaya', 'Tabni', 'Geme', 'Ahati', 'Shiptu', 'Beltani', 'Ninsha'],
      build: (g, first) => `${first} of ${pick(['Uruk', 'Ur', 'Nippur', 'Kish', 'Lagash', 'Eridu', 'Sippar', 'Larsa', 'Mari', 'Akkad'])}`,
    },
    chinese: {
      m: ['Wei', 'Jun', 'Hao', 'Bo', 'Tao', 'Feng', 'Ming', 'Rui', 'Qiang', 'Long', 'Zhen', 'Kai'],
      f: ['Mei', 'Lan', 'Yu', 'Ling', 'Xiu', 'Yan', 'Shu', 'Qing', 'Hua', 'Jing', 'Lian', 'Yue'],
      build: (g, first) => `${pick(['Li', 'Wang', 'Zhang', 'Liu', 'Chen', 'Zhao', 'Huang', 'Zhou', 'Wu', 'Lin', 'Sun', 'Ma', 'Guo', 'He'])} ${first}`,
    },
  };
  const RACES = ['Human', 'Human', 'Human', 'Dwarf', 'Elf', 'Halfling', 'Gnome', 'Half-Orc', 'Tiefling', 'Dragonborn', 'Half-Elf'];

  function personName(culture, race = 'Human') {
    if (culture !== 'classic' && CULTURE_NAMES[culture]) {
      const C = CULTURE_NAMES[culture], g = Math.random() < 0.5 ? 'm' : 'f';
      return C.build(g, pick(C[g]));
    }
    if (race === 'Half-Elf') return `${pick(pick([CLASSIC_NAMES.Human, CLASSIC_NAMES.Elf])[0])} ${pick(CLASSIC_NAMES.Human[1])}`;
    const [f, l] = CLASSIC_NAMES[race] || CLASSIC_NAMES.Human;
    return `${pick(f)} ${pick(l)}`.trim();
  }
  const givenName = n => n.split(' ')[0];

  const PLACE_PARTS = {
    classic: [['Oak', 'Raven', 'Mill', 'Stone', 'Ash', 'Wolf', 'Cold', 'Brook', 'Thorn', 'Salt', 'Iron', 'Frost'], ['ford', 'haven', 'hollow', 'reach', 'wick', 'moor', 'gate', 'bury', 'fall', 'stead', 'mere', 'crest']],
    norse: [['Hrafn', 'Ulf', 'Kald', 'Svart', 'Hvit', 'Jarn', 'Sol', 'Myrk', 'Ask', 'Grim'], ['heim', 'vik', 'fjord', 'dal', 'stad', 'holt', 'nes', 'by']],
    persian: [['Mehr', 'Shir', 'Azar', 'Gol', 'Khor', 'Dar', 'Mah', 'Nush', 'Arsh', 'Sepid'], ['abad', 'gerd', 'shahr', 'kuh', 'rud', 'dasht', 'kand', 'bagh']],
    indic: [['Chandra', 'Surya', 'Indra', 'Mani', 'Kama', 'Vana', 'Hari', 'Soma', 'Deva', 'Nila'], ['pur', 'nagar', 'garh', 'vati', 'kshetra', 'giri', 'ghat', 'kund']],
    greek: [['Kal', 'Pyr', 'Thal', 'Chrys', 'Lyk', 'Aig', 'Melan', 'Leuk', 'Hel', 'Kor'], ['opolis', 'eia', 'ion', 'os', 'ai', 'ene', 'onia', 'ethra']],
    mesopotamian: [['Dur-', 'Kar-', 'Bad-', 'Tell '], ['Shamash', 'Sin', 'Ea', 'Nabu', 'Adad', 'Anu', 'Nergal', 'Ishtar']],
    chinese: [['Qing', 'Bai', 'Long', 'Yun', 'Shan', 'Jin', 'Hei', 'Yu', 'Hong', 'Feng'], ['he', 'shan', 'zhou', 'cheng', 'gu', 'ling', 'men', 'tai']],
  };
  const placeName = culture => { const [a, b] = PLACE_PARTS[culture] || PLACE_PARTS.classic; return pick(a) + pick(b); };

  const TAVERN_KIND = { classic: 'Tavern', norse: 'Mead hall', persian: 'Caravanserai', indic: 'Rest house', greek: 'Wine house', mesopotamian: 'Alehouse', chinese: 'Teahouse' };

  /* ===================================================================
     Shared tables
     =================================================================== */
  const T = {
    occ: ['blacksmith', 'innkeeper', 'priest of a minor god', 'disgraced knight', 'smuggler', 'herbalist', 'guard captain', 'traveling merchant', 'scholar', 'grave keeper', 'fortune teller', 'bounty hunter', 'noble’s steward', 'ferryman', 'retired adventurer', 'alchemist', 'bard', 'fence for the thieves’ guild', 'cartographer', 'hedge witch', 'temple scribe', 'horse breeder', 'court poet', 'caravan master'],
    look: ['a jagged scar across one cheek', 'ink-stained fingers', 'an eyepatch embroidered with gold thread', 'braided silver hair', 'a nervous twitch', 'immaculate, expensive clothing', 'two missing fingers on the left hand', 'freckles and a gap-toothed grin', 'a towering, broad-shouldered frame', 'a tiny, wiry build', 'the faint smell of smoke', 'tattoos of old sailing charts', 'gloves they never take off', 'a cane carved like a serpent', 'eyes of two different colours', 'a voice far too deep for their size'],
    pers: ['suspicious of strangers', 'relentlessly cheerful', 'blunt to the point of rudeness', 'a compulsive liar', 'fiercely loyal', 'greedy but honest about it', 'melancholy and poetic', 'nervous and eager to please', 'arrogant', 'kind but world-weary', 'curious about everything', 'quick to anger, quicker to forgive', 'serene in a way that unsettles people', 'theatrical'],
    want: ['to pay off a crushing debt', 'revenge on whoever ruined their family', 'to be remembered after they die', 'to protect a younger sibling', 'to find a legendary lost relic', 'to escape their past', 'respect from the local nobility', 'a cure for a mysterious illness', 'power, by any means', 'a quiet life, finally', 'to prove a rival wrong', 'the truth behind a friend’s disappearance', 'forgiveness from someone who is dead', 'to see the sea before they die'],
    secret: ['is secretly a spy for a rival faction', 'killed someone years ago and was never caught', 'is the heir to a fallen noble house', 'owes a favor to a devil', 'knows the location of a hidden dungeon', 'is a shapechanger in disguise', 'has been stealing from their employer', 'is being blackmailed', 'worships a forbidden god', 'is dying and has told no one', 'once abandoned their adventuring party to die', 'has a twin nobody knows about', 'is older than they look, by centuries', 'was the villain’s first teacher'],
    quirk: ['speaks in the third person', 'hums constantly', 'collects teeth', 'answers questions with questions', 'quotes proverbs, often incorrectly', 'never makes eye contact', 'laughs at inappropriate moments', 'rolls a coin across their knuckles', 'whispers everything', 'is painfully formal', 'calls everyone “friend”', 'chews on a pipe they never light'],
    tadj: ['Prancing', 'Drunken', 'Gilded', 'Rusty', 'Laughing', 'Sleeping', 'Crooked', 'Salty', 'Wandering', 'Silver', 'One-Eyed', 'Howling', 'Patient', 'Seventh'],
    tnoun: ['Griffon', 'Tankard', 'Dragon', 'Mermaid', 'Goat', 'Lantern', 'Boar', 'Wyvern', 'Owl', 'Anchor', 'Stag', 'Kraken', 'Camel', 'Crane'],
    tfeat: ['The owner never seems to age.', 'A bard plays the same song every night, and no one knows why.', 'There is a locked cellar door nobody talks about.', 'It is the unofficial headquarters of the thieves’ guild.', 'The notice board overflows with bounties.', 'The house drink has a faint magical shimmer.', 'Philosophers argue here every night; losers pay for the wine.', 'A storyteller recites a different epic each evening, and never finishes.'],
    rumor: ['Someone saw lights in the old tower again.', 'The lord’s daughter ran off with a sellsword.', 'Wolves took three sheep last night, and they walked on two legs.', 'A dragon was spotted over the mountains.', 'The priest has been buying an awful lot of lamp oil.', 'There is gold in the river caves, if you can get past what lives there.', 'An old hero was seen on the road, and they are supposed to be dead.', 'The oracle has stopped speaking.'],
    iobj: ['Ring', 'Cloak', 'Dagger', 'Amulet', 'Lantern', 'Boots', 'Shield', 'Staff', 'Mirror', 'Compass', 'Gauntlets', 'Quill', 'Bowl', 'Bell'],
    iof: ['Whispers', 'the Tides', 'Embers', 'the Hollow Moon', 'Second Chances', 'the Stag', 'Silent Steps', 'Clarity', 'the Deep', 'Warding', 'the Middle Way', 'Unspoken Things'],
    ipow: ['glows faintly when enemies are within 60 feet', 'lets the bearer cast misty step once per day', 'allows speaking with animals for 1 hour, once per day', 'grants advantage on checks to detect lies', 'always points toward the nearest fresh water', 'can store one spell of 3rd level or lower', 'makes the bearer immune to being frightened, but unable to sleep', 'whispers useful (and sometimes useless) advice'],
    iquirk: ['is always warm to the touch', 'hums when near gold', 'smells of lavender', 'sometimes speaks in its creator’s voice', 'feels heavier when its owner lies'],
    comp: ['A sudden storm forces the party to take shelter somewhere unfamiliar.', 'An old enemy arrives with a proposition.', 'A trusted NPC is revealed to be a traitor.', 'The party’s gear is stolen in the night.', 'A rival group reaches the goal first.', 'A bystander is caught in the crossfire.', 'The bridge, road or tunnel ahead collapses.', 'A message arrives: someone the party cares about is in danger.', 'The authorities mistake the party for criminals.', 'A creature follows the party, watching but never attacking.', 'A god takes an interest, and not a helpful one.', 'The party is asked to judge a dispute, and both sides are right.'],
  };

  /* ===================================================================
     Places
     =================================================================== */
  const PLACES = {
    settlement: {
      size: ['Village', 'Village', 'Town', 'Town', 'City'],
      known: ['its enormous annual fair', 'a miraculous healing spring', 'the finest horses in the realm', 'a haunted bell tower', 'its silver mines', 'a shrine to a forgotten saint', 'exotic spices from overseas', 'an ancient ring of standing stones', 'a sacred fire that has never gone out', 'its poets, who settle disputes in verse', 'a bridge older than the kingdom', 'an oracle who answers one question a year'],
      trouble: ['wolves have grown bold and clever', 'the headman has vanished', 'everyone shares the same nightmare', 'the river has turned red', 'bandits control the only road', 'strange lights hover in the hills each night', 'a dragon has been sighted', 'the dead refuse to stay buried', 'the well has started speaking', 'a tyrant’s tax collectors arrive in three days', 'the harvest god has not been seen at the festival', 'children are dreaming of the same stranger'],
    },
    dungeon: {
      form: ['a drowned temple', 'a king’s barrow', 'a sealed monastery', 'a collapsed mine', 'a sorcerer’s tower turned upside down', 'a palace inside a giant’s skull', 'a labyrinth beneath a court of law', 'a library that rearranges itself', 'a lighthouse at the edge of the world', 'a prison built for a god', 'a city of the dead carved into a cliff', 'a ship buried in a hillside'],
      builders: ['a forgotten dynasty', 'dwarves fleeing something below', 'a cult of the moon', 'a king who feared death', 'the first wizards', 'no one: it grew', 'giants, before the flood', 'monks who took a vow of silence'],
      holds: ['the cult that sealed it, still waiting', 'a guardian bound by an old oath', 'scavengers who think it is theirs', 'the restless dead of its builders', 'a monster that has outgrown its cage', 'a hermit who has forgotten why they came', 'a rival party, half of them already dead'],
      heart: ['a relic that grants one true answer', 'a sleeping god', 'the tomb of a hero who is not quite dead', 'the last copy of a forbidden text', 'a gate to another world', 'nothing: the treasure was taken long ago, and the guardian is furious about it'],
      hazard: ['rooms that flood at high tide', 'corridors that rearrange at night', 'a curse that steals one memory per level', 'doors that open only to a whispered password', 'darkness that swallows light', 'echoes that repeat your words to the monsters'],
      twist: ['Every room shows the fears of whoever enters it first.', 'The guardian wants to be relieved of its duty, and will let the worthy pass.', 'The deeper you go, the less you remember why you came.', 'The villain the heroes seek is sealed here, not free, and the seal is weakening because of them.', 'The builders are still here, as ghosts, and still arguing.', 'The treasure is real, but taking it breaks the only thing holding back a flood.'],
    },
    wilderness: {
      terrain: ['an ancient forest', 'a desert of red dunes', 'a marsh of drowned villages', 'knife-edged mountains', 'a frozen tundra', 'a sea of grass', 'a scatter of islands', 'white salt flats', 'a canyon of painted stone', 'a jungle over ruined cities'],
      feature: ['a tree older than the gods', 'a river that flows uphill', 'standing stones that hum at dusk', 'the bones of a titan', 'a lake that reflects a different sky', 'a road that no one built', 'a waterfall that falls silently'],
      folk: ['nomads who navigate by the stars', 'a lonely giant', 'wolves that can speak', 'bandits who were once soldiers', 'a hermit sage', 'spirits of the land who demand tribute', 'pilgrims walking to a shrine no one has seen'],
      hazard: ['sandstorms that strip flesh', 'blizzards that last for days', 'sinking mud', 'fog that shows the faces of the dead', 'flash floods', 'heat that shimmers into mirages'],
      hidden: ['a lost city under the dunes', 'a fallen star, still warm', 'the grave of a god', 'a bridge to the otherworld that appears at dawn', 'an army of statues facing the same direction'],
    },
    sacred: {
      site: {
        classic: ['a shrine to a forgotten saint', 'a ring of standing stones', 'a chapel built over a spring'],
        norse: ['a grove where offerings hang from the branches', 'a mound where a king sleeps with his ship', 'a spring beneath a great ash tree'],
        persian: ['a fire temple whose flame has burned for a thousand years', 'a tower of silence on a bare hill', 'a spring sacred to the goddess of the waters'],
        indic: ['a riverside ghat where the dead are burned', 'a cave shrine carved into a cliff', 'a banyan tree where a sage once sat for twelve years', 'a stupa holding a relic of an awakened teacher'],
        greek: ['an oracle’s cave filled with vapours', 'a hilltop sanctuary of the grey-eyed goddess', 'a seaside altar where sailors leave oars'],
        mesopotamian: ['a stepped ziggurat with a shrine at its summit', 'a moon temple with a sacred lake', 'a reed hut where a god once whispered through the wall'],
        chinese: ['a mountain monastery reached by a thousand steps', 'a shrine to the city god', 'a pavilion where immortals are said to play chess', 'a stupa holding a relic of an awakened teacher'],
      },
      keeper: ['a blind priestess', 'a child who was chosen by lot', 'monks who have not spoken in years', 'the ghost of the founder', 'a talking animal', 'no one: the keepers fled'],
      rite: ['a night of silence', 'an offering of something you love', 'washing in freezing water at dawn', 'confessing a true wrong aloud', 'walking the path barefoot', 'a question answered honestly'],
      boon: ['a true dream', 'healing of one wound or curse', 'a blessing that grants advantage on one roll that matters', 'a vision of a lost person', 'the right to ask the god one question'],
      wrong: ['The sacred flame has gone out.', 'Pilgrims who pray here have started going mad.', 'A tyrant has fenced it off and charges admission.', 'The god no longer answers, and the keepers are pretending.', 'Something has moved in beneath the altar.', 'Two faiths claim it, and both are about to fight.'],
    },
    otherworld: {
      realm: {
        classic: ['the Feywild court', 'the Shadowfell', 'an astral city of the gods'],
        norse: ['Hel’s cold hall', 'the hall of the honoured slain', 'the giants’ realm across the river'],
        persian: ['the Bridge of the Separator and the House of Song beyond', 'the realm of the divs beyond the mountains', 'Mount Qaf at the edge of the world'],
        indic: ['the court of Yama', 'the undersea palaces of the nagas', 'Indra’s heaven'],
        greek: ['the meadow of asphodel', 'the island of the sun', 'the isle of an enchantress'],
        mesopotamian: ['the House of Dust beyond seven gates', 'the island of the flood survivor', 'the garden of jewelled trees'],
        chinese: ['the Jade Emperor’s celestial court', 'the ten courts of the underworld', 'the peach orchard on Mount Kunlun'],
      },
      rule: ['Nothing eaten here may be taken back.', 'You may not lie here; lies rise from your mouth as smoke.', 'Names are currency: every favour costs part of yours.', 'A day here is a year outside.', 'The dead here do not know they are dead.', 'You may only leave the way you came, walking backward.', 'Every kindness is repaid here, and every cruelty.', 'Nothing here casts a shadow, except you.'],
      entry: ['through a mirror at midnight', 'by dying, briefly', 'across a river at a ford that is not on any map', 'by being invited', 'in a dream shared by three people', 'down a well in a ruined temple'],
      ruler: ['a monarch who has forgotten their own name', 'a council of animals', 'a god on trial', 'a bureaucracy with no one at the top', 'a child who dreamed the whole realm', 'no one, and everyone is fighting over it'],
    },
  };
  const PLACE_KIND_LABEL = { settlement: 'Settlement', dungeon: 'Dungeon / ruin', wilderness: 'Wilderness', sacred: 'Sacred site', otherworld: 'Otherworld' };

  // Lower-case a leading “The” so a place name reads naturally mid-sentence.
  const mid = n => n.replace(/^The /, 'the ');

  function makePlace(culture, kind) {
    if (!kind || kind === 'any') kind = pick(Object.keys(PLACES));
    const P = PLACES[kind];
    const cult = PLACES.sacred.site[culture] ? culture : 'classic';
    const base = placeName(culture);
    let name, rows, loc;
    if (kind === 'settlement') {
      name = base;
      const size = pick(P.size), known = pick(P.known), trouble = pick(P.trouble);
      const who = personName(culture), role = pick(T.occ);
      rows = [['Size', size], ['Known for', known], ['Trouble', `Lately, ${trouble}.`], ['Notable', `${who}, ${role}`]];
      loc = { kind: size, description: `A ${size.toLowerCase()} known for ${known}.`, features: `- ${who}, ${role}`, secrets: `Lately, ${trouble}.` };
    } else if (kind === 'dungeon') {
      const form = pick(P.form);
      name = `${cap(form.replace(/^(a|an) /, 'the '))} of ${base}`;
      const b = pick(P.builders), h = pick(P.holds), heart = pick(P.heart), hz = pick(P.hazard), tw = pick(P.twist);
      rows = [['What', cap(form)], ['Built by', b], ['Now holds', h], ['At its heart', heart], ['Hazard', hz], ['Twist', tw]];
      loc = { kind: 'Dungeon', description: `${cap(form)}, built by ${b}. It now holds ${h}.`, features: `- At its heart: ${heart}\n- Hazard: ${hz}`, secrets: tw };
    } else if (kind === 'wilderness') {
      const ter = pick(P.terrain);
      name = `${base} ${pick(['Wastes', 'Wilds', 'Reach', 'Expanse', 'Deep', 'March', 'Heights'])}`;
      const f = pick(P.feature), folk = pick(P.folk), hz = pick(P.hazard), hid = pick(P.hidden);
      rows = [['Terrain', cap(ter)], ['Landmark', f], ['Who lives there', folk], ['Hazard', hz], ['Hidden', hid]];
      loc = { kind: 'Wilderness', description: `${cap(ter)}, home to ${folk}.`, features: `- ${cap(f)}`, secrets: `Hazard: ${hz}.\nHidden: ${hid}.` };
    } else if (kind === 'sacred') {
      const site = pick(P.site[cult]);
      const short = site.split(/ (?:whose|where|with|on|beneath|holding|carved|reached|filled|sacred|built|at|to|in) /)[0];
      name = `${cap(short.replace(/^(a|an) /, 'the '))} at ${base}`;
      const k = pick(P.keeper), r = pick(P.rite), b = pick(P.boon), w = pick(P.wrong);
      rows = [['What', cap(site)], ['Kept by', k], ['Rite', r], ['Boon', b], ['What’s wrong', w]];
      loc = { kind: 'Landmark', description: `${cap(site)}, kept by ${k}.`, features: `- Rite: ${r}\n- Boon: ${b}`, secrets: w };
    } else {
      const realm = pick(P.realm[cult]);
      name = cap(realm.replace(/^(a|an) /, 'the '));
      const rule = pick(P.rule), e = pick(P.entry), ru = pick(P.ruler);
      rows = [['Realm', cap(realm)], ['Law of the realm', rule], ['Way in', cap(e)], ['Ruled by', ru]];
      loc = { kind: 'Plane', description: `${cap(realm)}. Ruled by ${ru}.`, features: `- Way in: ${e}`, secrets: `Law of the realm: ${rule}` };
    }
    return { kind, name, base, rows, loc: { name, ...loc } };
  }

  /* ===================================================================
     Factions
     =================================================================== */
  const FACTION = {
    type: ['secret society', 'merchant league', 'temple order', 'warrior brotherhood', 'thieves’ guild', 'noble house', 'academy of scholars', 'rebel movement', 'doomsday cult', 'mercenary company', 'sisterhood of seers', 'imperial bureau', 'order of wandering monks', 'guild of storytellers'],
    adj: ['Silent', 'Crimson', 'Ashen', 'Seventh', 'Unbroken', 'Hollow', 'Golden', 'Last', 'Veiled', 'Iron', 'Wandering', 'Burning', 'Patient', 'Nameless'],
    noun: ['Hand', 'Lantern', 'Circle', 'Oath', 'Flame', 'Crown', 'Wheel', 'Road', 'Tide', 'Chain', 'Lotus', 'Raven', 'Mirror', 'Key', 'Serpent', 'Feather'],
    creed: [
      ['All life is suffering, and suffering can be ended, by any means necessary.', 'a twisted reading of Buddhist teaching'],
      ['Do what duty demands, and let go of the outcome.', 'the Bhagavad Gita'],
      ['Yield like water and win without fighting.', 'the Tao Te Ching'],
      ['Keep the oath, whatever it costs.', 'the Norse sagas'],
      ['Truth must be defended from the Lie in thought, word and deed.', 'Zoroastrian teaching'],
      ['Death is certain; build what outlasts it.', 'the Epic of Gilgamesh'],
      ['Become who you are.', 'Nietzsche'],
      ['The unexamined life is not worth living.', 'Socrates'],
      ['Order is mercy; freedom is cruelty.', 'the Grand Inquisitor'],
      ['Only our own choices are truly ours.', 'the Stoics'],
      ['The world is absurd, so we will make our own meaning.', 'Camus'],
      ['Nothing exists by itself; so everything is our responsibility.', 'Nagarjuna, read generously'],
      ['Glory is the only thing that does not die.', 'the Hávamál'],
      ['A king rules only while the divine glory stays with him.', 'the Shahnameh'],
    ],
    goal: ['to put their chosen heir on the throne', 'to recover a relic stolen centuries ago', 'to open a gate to another world', 'to end a war by any means', 'to control the trade roads', 'to prevent a prophecy from coming true', 'to make a prophecy come true', 'to erase a heresy', 'to wake a sleeping god', 'to keep a sleeping god asleep', 'to free the enslaved people of a rival city', 'to bring down a corrupt temple'],
    method: ['blackmail and patience', 'assassination, rarely but perfectly', 'charity that creates debts', 'sermons in the marketplace', 'marriages and alliances', 'forged documents', 'mercenary armies', 'dreams sent to the powerful', 'buying up every debt in the city', 'kidnapping the children of rivals and raising them as their own'],
    resource: ['a hidden fortress in the mountains', 'the loyalty of the city watch', 'a fleet of fast ships', 'a library of secrets', 'a captive oracle', 'a vast fortune in cursed gold', 'thousands of devoted poor', 'an ancient contract with a devil'],
    leaderTitle: ['the Grand Master', 'the Mother Superior', 'the Voice', 'the Old Man of the Mountain', 'the Treasurer', 'the First Among Equals', 'the Unseen Abbot', 'the Captain'],
    secret: ['Its leader died years ago; a council keeps up the pretence.', 'It was founded by the villain it now fights.', 'Its sacred text is a forgery.', 'Its members are being quietly replaced by shapechangers.', 'It is funded by the very power it claims to oppose.', 'Its founder is still alive, imprisoned beneath its headquarters.', 'Half its members no longer believe, but no one dares say so.'],
    symbol: ['a broken chain', 'an eye inside a lotus', 'a raven over a flame', 'a key with no teeth', 'a closed hand', 'a wheel with one spoke missing', 'a feather on a scale'],
  };

  /* ===================================================================
     Adventurers
     =================================================================== */
  const CLASSES = {
    Barbarian: { hd: 12, pri: ['STR', 'CON', 'DEX', 'WIS', 'CHA', 'INT'] },
    Bard: { hd: 8, pri: ['CHA', 'DEX', 'CON', 'WIS', 'INT', 'STR'] },
    Cleric: { hd: 8, pri: ['WIS', 'CON', 'STR', 'CHA', 'DEX', 'INT'] },
    Druid: { hd: 8, pri: ['WIS', 'CON', 'DEX', 'INT', 'CHA', 'STR'] },
    Fighter: { hd: 10, pri: ['STR', 'CON', 'DEX', 'WIS', 'CHA', 'INT'] },
    Monk: { hd: 8, pri: ['DEX', 'WIS', 'CON', 'STR', 'INT', 'CHA'] },
    Paladin: { hd: 10, pri: ['STR', 'CHA', 'CON', 'WIS', 'DEX', 'INT'] },
    Ranger: { hd: 10, pri: ['DEX', 'WIS', 'CON', 'STR', 'INT', 'CHA'] },
    Rogue: { hd: 8, pri: ['DEX', 'INT', 'CON', 'CHA', 'WIS', 'STR'] },
    Sorcerer: { hd: 6, pri: ['CHA', 'CON', 'DEX', 'WIS', 'INT', 'STR'] },
    Warlock: { hd: 8, pri: ['CHA', 'CON', 'DEX', 'WIS', 'INT', 'STR'] },
    Wizard: { hd: 6, pri: ['INT', 'CON', 'DEX', 'WIS', 'CHA', 'STR'] },
  };
  const ABILS = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];
  const ADV = {
    background: ['Acolyte', 'Charlatan', 'Criminal', 'Entertainer', 'Folk Hero', 'Guild Artisan', 'Hermit', 'Noble', 'Outlander', 'Sage', 'Sailor', 'Soldier', 'Urchin'],
    ideal: [
      ['Duty', 'I do what must be done, and let go of the outcome.', 'the Bhagavad Gita'],
      ['Affirmation', 'I would live my life again, exactly as it was.', 'Nietzsche'],
      ['Faith', 'I trust what I cannot prove.', 'Kierkegaard'],
      ['Harmony', 'Force breaks; water wins.', 'the Tao Te Ching'],
      ['Compassion', 'Every being suffers; I will not add to it.', 'Buddhist teaching'],
      ['Honor', 'My word is iron.', 'the Norse sagas'],
      ['Truth', 'The Lie must be opposed in thought, word and deed.', 'Zoroastrian teaching'],
      ['Legacy', 'I will build something that outlasts me.', 'the Epic of Gilgamesh'],
      ['Homecoming', 'Everything I do is to get back to the people I love.', 'the Odyssey'],
      ['Inquiry', 'I know that I know nothing, and I want to know more.', 'Socrates'],
      ['Revolt', 'The world is absurd; I will live fully anyway.', 'Camus'],
      ['Authenticity', 'I will not live as “one” lives.', 'Heidegger'],
      ['Self-mastery', 'Only my own choices are truly mine.', 'the Stoics'],
      ['Responsibility', 'The face of another commands me.', 'Levinas'],
    ],
    bond: ['I am searching for a sibling taken by giants.', 'I owe my life to a hermit who would not tell me their name.', 'My teacher is on the other side of the coming war.', 'I carry the ashes of my mentor to a place I have never seen.', 'A god once spoke to me, and has been silent since.', 'The person I love is promised to someone else.', 'I swore to protect a village that no longer wants me.', 'I keep a journal for a child I have never met.', 'My old crew is scattered, and I will bring them back together.', 'I was raised in a temple, and I would die for its keepers.'],
    flaw: ['I cannot refuse a request, even from an enemy.', 'My pride demands that everyone know my name.', 'I fear death more than anything.', 'I trust my own judgment over any command.', 'I lie when the truth is inconvenient.', 'I hold grudges for generations.', 'I believe I am destined, and it makes me reckless.', 'I cannot resist forbidden knowledge.', 'I run from anyone who loves me.', 'I drink to forget something I did.'],
    raisedBy: ['a giant bird in the mountains', 'monks who never spoke', 'a band of smugglers', 'a disgraced knight', 'a river spirit', 'wolves, for a while', 'a wandering scholar', 'the widow of a famous hero', 'a travelling theatre troupe', 'the keepers of a sacred fire'],
    because: ['they were abandoned for a strange birthmark', 'their village burned', 'a prophecy named them', 'their parent vanished at sea', 'a plague took everyone else', 'they were traded to settle a debt', 'they were found floating down a river in a basket'],
    secret: ['they are the child of the enemy’s champion', 'they were promised to a god before birth', 'they have died once already', 'their teacher was the villain', 'they are not the person everyone thinks they are', 'they caused the disaster that orphaned them'],
  };

  /* ===================================================================
     Adventures
     =================================================================== */
  const ADVT = {
    theme: [
      ['What do we owe the dead?', 'Gilgamesh; Kisā Gotamī'],
      ['Can a promise made in bad faith bind you?', 'Tyr and Fenrir'],
      ['Is mercy a weakness?', 'Levinas; Humbaba'],
      ['Who deserves to rule?', 'the Shahnameh'],
      ['What is the price of knowledge?', 'Odin at the well; the Sirens'],
      ['Can you ever go home again?', 'the Odyssey'],
      ['What makes someone a monster?', 'Nietzsche, Beyond Good and Evil §146'],
      ['Should fate be fought, or loved?', 'the Völuspá; amor fati'],
      ['Can a lie serve the truth?', 'the Mahabharata; Kant'],
      ['Is it better to act or to wait?', 'the Tao Te Ching; the Gita'],
      ['What remains of a self that keeps changing?', 'Nagarjuna; the Ship of Theseus'],
      ['Is freedom worth the suffering it brings?', 'Dostoevsky'],
    ],
    titleNoun: ['Silent Bell', 'Weeping Stone', 'Last Oath', 'Hollow Crown', 'Drowned Lamp', 'Ninth Night', 'Stolen Name', 'Broken Wheel', 'Burning Feather', 'Sleeping King', 'Empty Throne', 'Seventh Gate'],
    task: ['to recover what was taken from', 'to bring back someone who went into', 'to stop the ritual being prepared at', 'to carry a message to the ruler of', 'to give a body its proper burial at', 'to find out why no one returns from'],
    antagType: ['a grieving sorcerer', 'a prince denied his throne', 'a priest who has lost faith and kept the power', 'a monster’s keeper who loves it', 'a merchant who owns everyone’s debts', 'a saint who has decided mercy is weakness', 'a warrior bound by a terrible oath', 'a regent ruling for a child-king'],
    antagWant: ['to bring back someone who died', 'to end a war by ending the other side', 'to prove the gods wrong', 'to erase a shameful history', 'to make the suffering stop, for good', 'to take back what was stolen from their ancestors', 'to be remembered'],
    twist: ['The patron is the antagonist’s sibling.', 'The antagonist is right about one thing, and the heroes will learn which.', 'The monster was the victim all along.', 'Success will cost the patron their life, and the patron knows it.', 'The place is a prison, and the heroes are the ones unlocking it.', 'Someone in the party has already met the antagonist, in a dream.', 'The reward was stolen from the antagonist’s family.'],
    fears: ['fire', 'silence', 'their own reflection', 'children', 'the sound of bells', 'being forgotten', 'the sea'],
  };

  function codexPick(codex, cat, culture, level) {
    const trads = CULTURES[culture]?.trads;
    let pool = codex.entries.filter(e => e.c === cat && (!trads || e.t.some(t => trads.includes(t))));
    if (!pool.length) pool = codex.entries.filter(e => e.c === cat);
    if (cat === 'monster' && level) {
      const fit = pool.filter(e => { const top = Math.max(...e.monsters.map(m => crNum(m.cr))); return Math.abs(top - level) <= 3; });
      if (fit.length) pool = fit;
    }
    return pool.length ? pick(pool) : null;
  }

  /* ===================================================================
     Generators
     =================================================================== */
  const G = {};

  G.adventure = { title: 'Adventure', icon: '🗺️', wide: true,
    blurb: 'A complete one-shot outline: a hook, five scenes and secrets to reveal, with a monster, riddle and dilemma drawn from the Mythic Codex.',
    make(ctx) {
      const c = ctx.culture, lvl = ctx.level;
      const theme = pick(ADVT.theme);
      const place = makePlace(c, pick(['dungeon', 'dungeon', 'sacred', 'wilderness', 'otherworld']));
      const patron = { name: personName(c), role: pick(T.occ) };
      const antag = { name: personName(c), type: pick(ADVT.antagType), want: pick(ADVT.antagWant) };
      const task = pick(ADVT.task), fear = pick(ADVT.fears);
      const monster = codexPick(ctx.codex, 'monster', c, lvl);
      const riddle = codexPick(ctx.codex, 'riddle', c);
      const dilemma = codexPick(ctx.codex, 'dilemma', c);
      const relic = codexPick(ctx.codex, 'relic', c);
      const title = `The ${pick(ADVT.titleNoun)} of ${place.base}`;
      const at = mid(place.name);
      const strong = pick([
        `The heroes wake to find the road to ${at} lined with fresh graves, and a dying messenger pressing a sealed letter into their hands.`,
        `A funeral procession stops at the heroes’ feet. The corpse sits up, points at them, and says the name “${antag.name}.”`,
        `Mid-feast, ${patron.name} collapses. The only cure lies in ${at}.`,
        `A child hands the heroes a map drawn in ash, leading to ${at}, and runs before they can ask a question.`,
        `The sky goes dark at noon, and every animal in town turns to face ${at}.`,
        `The heroes are arrested for a crime they did not commit, and ${patron.name} offers a pardon if they go to ${at}.`,
      ]);
      const hook = `${patron.name}, ${patron.role}, asks the heroes ${task} ${at}.`;
      const coins = Math.round((lvl * lvl * 40 + 50) / 10) * 10;
      const scenes = [
        `The call: ${hook}`,
        `The road: getting there means dealing with ${pick(PLACES.wilderness.folk)} and ${pick(PLACES.wilderness.hazard)}.`,
        riddle ? `The threshold (puzzle): ${riddle.name}. ${riddle.setup}` : `The threshold: a sealed door, and a guardian who asks why they came.`,
        monster ? `The guardian (combat): ${monster.name}. ${monster.tactics} Another way: ${monster.mercy}` : `The guardian: a creature bound to the place.`,
        dilemma ? `The choice (climax): ${antag.name}, ${antag.type}, is waiting. They want ${antag.want}. Then a hard choice: ${dilemma.name}. ${dilemma.situation}` : `The choice: ${antag.name} makes the heroes an offer.`,
      ];
      const clues = pickN([
        `${antag.name} was once ${pick(['a student of', 'in love with', 'saved by'])} ${patron.name}.`,
        `${cap(at)} was sealed ${pick(['a century', 'a thousand years', 'a generation'])} ago, for a reason no one wrote down.`,
        `The safest way into ${at} is ${pick(['at dawn', 'along the river bed', 'by speaking the founder’s name', 'with a guide who has died there'])}.`,
        `${antag.name} fears ${fear}.`,
        `There is a spy in ${givenName(patron.name)}’s household.`,
        monster ? `${monster.name} can be stopped without killing: ${monster.mercy}` : `The guardian can be reasoned with.`,
        `The theme of this adventure is a question: ${theme[0]}`,
        relic ? `Somewhere inside is a relic out of legend: ${relic.name}.` : `Somewhere inside is a relic out of legend.`,
      ], 6);
      const twist = pick(ADVT.twist);
      const reward = `${coins} gp in old coin${relic ? `, and a chance at ${relic.name} (${relic.rarity})` : ''}.`;
      const encounterData = monster ? {
        name: monster.name, kind: 'Combat', location: place.name, monsters: JSON.parse(JSON.stringify(monster.monsters)),
        setup: monster.lair, tactics: monster.tactics, notes: `${monster.lore}\n\n5e stats: ${monster.stats}\n\nAnother way: ${monster.mercy}\n\nSource: ${monster.src}`, tags: ['adventure'],
      } : null;
      const quest = { name: title, kind: 'Main', status: 'Idea', giver: patron.name, location: place.name, hook,
        objectives: scenes.map((s, i) => `${i + 1}. ${s}`).join('\n'), complications: twist, reward,
        notes: `Theme: ${theme[0]} (${theme[1]})\nAntagonist: [[${antag.name}]], ${antag.type}, who wants ${antag.want}.`, tags: ['adventure'] };
      const session = { name: title, status: 'Planned', strong, scenes: scenes.map((s, i) => `${i + 1}. ${s}`).join('\n'),
        clues: clues.map(x => `- ${x}`).join('\n'), npcsLocs: [patron.name, antag.name, place.name, monster?.name].filter(Boolean).map(n => `[[${n}]]`).join(', '), rewards: reward, tags: ['adventure'] };
      const npcs = [
        { type: 'npcs', data: { name: patron.name, role: cap(patron.role), attitude: 'Friendly', status: 'Alive', motivation: `Wants the heroes ${task} ${at}.`, tags: ['adventure'] } },
        { type: 'npcs', data: { name: antag.name, role: cap(antag.type), attitude: 'Hostile', status: 'Alive', motivation: cap(antag.want) + '.', secret: `Secretly fears ${fear}.`, tags: ['adventure', 'villain'] } },
      ];
      return {
        title,
        rows: [['Theme', `${theme[0]} (${theme[1]})`], ['Strong start', strong], ['Antagonist', `${antag.name}, ${antag.type}, who wants ${antag.want}`], ['Where', `${place.name}: ${place.loc.description}`], ['Twist', twist], ['Reward', reward]],
        sections: [['Scenes', scenes], ['Secrets & clues', clues]],
        saves: [
          { label: 'Save everything', items: [{ type: 'quests', data: quest }, { type: 'sessions', data: session }, { type: 'locations', data: { ...place.loc, tags: ['adventure'] } }, ...npcs, ...(encounterData ? [{ type: 'encounters', data: encounterData }] : [])], note: 'quest, session plan, place, NPCs and encounter' },
          { label: 'Save as quest', items: [{ type: 'quests', data: quest }] },
          { label: 'Save as session plan', items: [{ type: 'sessions', data: session }] },
        ],
      };
    } };

  G.adventurer = { title: 'Adventurer', icon: '🛡️', wide: true,
    blurb: 'A ready-to-play character: rolled ability scores, a philosophy to live by, and a backstory with hooks.',
    opts: { label: 'Level', choices: [['party', 'Party level'], ['1', 'Level 1'], ['3', 'Level 3'], ['5', 'Level 5'], ['10', 'Level 10']] },
    make(ctx) {
      const c = ctx.culture, lvl = ctx.opt === 'party' || !ctx.opt ? ctx.level : +ctx.opt;
      const race = pick(RACES), cls = pick(Object.keys(CLASSES)), C = CLASSES[cls];
      const name = personName(c, race), bg = pick(ADV.background);
      const rolls = Array.from({ length: 6 }, () => { const r = [d(6), d(6), d(6), d(6)].sort((a, b) => b - a); return r[0] + r[1] + r[2]; }).sort((a, b) => b - a);
      const scores = {}; C.pri.forEach((ab, i) => scores[ab] = rolls[i]);
      const con = Math.floor((scores.CON - 10) / 2);
      const hp = Math.max(1, C.hd + con + (lvl - 1) * (C.hd / 2 + 1 + con));
      const prof = 2 + Math.floor((lvl - 1) / 4);
      const ideal = pick(ADV.ideal), bond = pick(ADV.bond), flaw = pick(ADV.flaw), pers = pick(T.pers);
      const back = `Raised by ${pick(ADV.raisedBy)} after ${pick(ADV.because)}. What they do not know: ${pick(ADV.secret)}.`;
      const journey = codexPick(ctx.codex, 'journey', c);
      const statLine = ABILS.map(a => `${a} ${scores[a]} (${mod(scores[a])})`).join(' · ');
      const pc = { name, race, cls, level: lvl, background: bg,
        hooks: `${back}\n\nBond: ${bond}${journey ? `\n\nSuggested inner journey: ${journey.name} (${journey.thinker}). ${journey.trigger}` : ''}`,
        goals: `${ideal[0]}: ${ideal[1]} (${ideal[2]})`,
        notes: `${statLine}\nHP ${hp} · Proficiency +${prof} · Hit die d${C.hd}\nPersonality: ${cap(pers)}.\nFlaw: ${flaw}`, tags: ['pregen'] };
      return {
        title: name,
        rows: [['Who', `Level ${lvl} ${race} ${cls}, ${bg}`], ['Abilities', statLine], ['Combat', `HP ${hp} · Proficiency +${prof} · Hit die d${C.hd}`], ['Personality', cap(pers)], ['Ideal', `${ideal[0]}: ${ideal[1]} (${ideal[2]})`], ['Bond', bond], ['Flaw', flaw], ['Backstory', back], ...(journey ? [['Inner journey', `${journey.name}: ${journey.trigger}`]] : [])],
        saves: [
          { label: 'Add to party', items: [{ type: 'pcs', data: pc }] },
          { label: 'Save as NPC', items: [{ type: 'npcs', data: { name, race, role: `${cls}, level ${lvl}`, attitude: 'Neutral', status: 'Alive', personality: `${cap(pers)}. Flaw: ${flaw}`, motivation: `${ideal[1]} ${bond}`, secret: back, notes: pc.notes } }] },
        ],
      };
    } };

  G.place = { title: 'Place', icon: '🏰',
    opts: { label: 'Kind', choices: [['any', 'Any place'], ...Object.entries(PLACE_KIND_LABEL)] },
    make(ctx) {
      const p = makePlace(ctx.culture, ctx.opt);
      return { title: p.name, rows: [['Kind', PLACE_KIND_LABEL[p.kind]], ...p.rows], saves: [{ label: 'Save to Locations', items: [{ type: 'locations', data: p.loc }] }] };
    } };

  G.faction = { title: 'Faction', icon: '⚜️',
    make(ctx) {
      const c = ctx.culture, F = FACTION;
      const type = pick(F.type), name = pick([`The ${pick(F.adj)} ${pick(F.noun)}`, `The Order of the ${pick(F.adj)} ${pick(F.noun)}`, `The ${pick(F.noun)}s of ${placeName(c)}`]);
      const [creed, src] = pick(F.creed), goal = pick(F.goal), method = pick(F.method), res = pick(F.resource);
      const leader = `${personName(c)}, ${pick(F.leaderTitle)}`, secret = pick(F.secret), sym = pick(F.symbol);
      const stance = pick(['Ally', 'Friendly', 'Neutral', 'Neutral', 'Rival', 'Enemy']);
      return { title: name,
        rows: [['What', cap(type)], ['Creed', `“${creed}” (after ${src})`], ['Goal', cap(goal)], ['Methods', cap(method)], ['Strength', cap(res)], ['Leader', leader], ['Symbol', cap(sym)], ['Secret', secret]],
        saves: [{ label: 'Save to Factions', items: [{ type: 'factions', data: { name, attitude: stance, leader, goals: cap(goal) + '.', methods: cap(method) + '.', resources: cap(res) + '.', clock: pick(['0 / 6', '1 / 6', '2 / 6']), notes: `${cap(type)}. Creed: “${creed}” (after ${src}).\nSymbol: ${sym}.\nSecret: ${secret}` } }] }] };
    } };

  G.npc = { title: 'NPC', icon: '🎭',
    make(ctx) {
      const race = ctx.culture === 'classic' ? pick(RACES) : 'Human';
      const name = personName(ctx.culture, race), role = pick(T.occ), look = pick(T.look), pers = pick(T.pers), want = pick(T.want), secret = pick(T.secret), quirk = pick(T.quirk);
      return { title: name, rows: [['Who', `${race} ${role}`], ['Look', look], ['Manner', `${pers}; ${quirk}`], ['Wants', want], ['Secret', secret]],
        saves: [{ label: 'Save to NPCs', items: [{ type: 'npcs', data: { name, race, role: cap(role), appearance: cap(look) + '.', personality: `${cap(pers)}. ${cap(quirk)}.`, motivation: cap(want) + '.', secret: cap(secret) + '.', attitude: 'Neutral', status: 'Alive' } }] }] };
    } };

  G.tavern = { title: 'Inn & tavern', icon: '🍺',
    make(ctx) {
      const kind = TAVERN_KIND[ctx.culture] || 'Tavern';
      const name = `The ${pick(T.tadj)} ${pick(T.tnoun)}`, f = pick(T.tfeat), r = pick(T.rumor), host = `${personName(ctx.culture)}, the host`;
      return { title: name, rows: [['Kind', kind], ['Host', host], ['Notable', f], ['Rumor', r]],
        saves: [{ label: 'Save to Locations', items: [{ type: 'locations', data: { name, kind: 'Tavern / Shop', description: `${kind} run by ${host.replace(', the host', '')}.`, features: f, secrets: `Rumor overheard: ${r}` } }] }] };
    } };

  G.item = { title: 'Magic item', icon: '💎',
    make() {
      const name = `${pick(T.iobj)} of ${pick(T.iof)}`, pow = pick(T.ipow), q = pick(T.iquirk), rarity = pick(['Common', 'Uncommon', 'Uncommon', 'Rare', 'Rare', 'Very Rare']);
      return { title: name, rows: [['Rarity', rarity], ['Power', `It ${pow}.`], ['Quirk', `It ${q}.`]],
        saves: [{ label: 'Save to Items', items: [{ type: 'items', data: { name, rarity, description: `It ${pow}. It ${q}.`, kind: 'Wondrous item' } }] }] };
    } };

  G.complication = { title: 'Complication', icon: '⚡',
    make() { return { title: 'Complication', text: pick(T.comp), saves: [] }; } };

  window.GENERATORS = { cultures: CULTURES, gens: G };
})();
