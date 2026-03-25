/* ================================================================
   AWESOME — script.js
   ================================================================ */

let kidName         = "";
let currentCategory = "";
let difficulty      = "";
let words           = [];
let currentIndex    = 0;
let score           = 0;
let wordAttempts    = [];
let soundEnabled    = true;

/* ================================================================
   WORD BANK
   ================================================================ */
const wordBank = {
  "People": [
    { word: "champion",       file: "CHAMPION" },
    { word: "cheerleader",    file: "CHEERLEADER" },
    { word: "child",          file: "CHILD" },
    { word: "dracula",        file: "DRACULA" },
    { word: "drummer",        file: "DRUMMER" },
    { word: "plumber",        file: "PLUMBER" },
    { word: "student",        file: "STUDENT" },
    { word: "traveller",      file: "TRAVELLER" },
    { word: "craftsman",      file: "CRAFTS MAN" },
    { word: "sheriff",        file: "SHERIFF" },
    { word: "thief",          file: "THIEF" }
  ],
  "Places": [
    { word: "church",         file: "CHURCH" },
    { word: "plaza",          file: "PLAZA" },
    { word: "stadium",        file: "STADIUM" },
    { word: "store",          file: "STORE" },
    { word: "street",         file: "STREET" },
    { word: "track",          file: "TRACK" },
    { word: "creek",          file: "CREEK" },
    { word: "crossroad",      file: "CROSS ROAD" },
    { word: "frontier",       file: "FRONTIER" },
    { word: "theater",        file: "THEATER" }
  ],
  "Things": [
    { word: "chair",          file: "CHAIR" },
    { word: "chalk",          file: "CHALK" },
    { word: "chandelier",     file: "CHANDELIER" },
    { word: "cheese",         file: "CHEESE" },
    { word: "chocolate",      file: "CHOCOLATE" },
    { word: "drawer",         file: "DRAWER" },
    { word: "drill",          file: "DRILL" },
    { word: "driftwood",      file: "DRIFT WOOD" },
    { word: "plank",          file: "PLANK" },
    { word: "plaster",        file: "PLASTER" },
    { word: "plate",          file: "PLATE" },
    { word: "playlist",       file: "PLAYLIST" },
    { word: "platinum",       file: "PLATINUM" },
    { word: "statement",      file: "STATEMENT" },
    { word: "stick",          file: "STICK" },
    { word: "stone",          file: "STONE" },
    { word: "structure",      file: "STRUCTURE" },
    { word: "tray",           file: "TRAY" },
    { word: "treasure",       file: "TREASURE" },
    { word: "triangle",       file: "TRIANGLE" },
    { word: "trophy",         file: "TROPHY" },
    { word: "truck",          file: "TRUCK" },
    { word: "trumpet",        file: "TRUMPET" },
    { word: "train",          file: "TRAIN" },
    { word: "crate",          file: "CRATE" },
    { word: "crib",           file: "CRIB" },
    { word: "crown",          file: "CROWN" },
    { word: "frame",          file: "FRAME" },
    { word: "fridge",         file: "FRIDGE" },
    { word: "shade",          file: "SHADE" },
    { word: "shampoo",        file: "SHAMPOO" },
    { word: "shelf",          file: "SHELF" },
    { word: "shell",          file: "SHELL" },
    { word: "shirt",          file: "SHIRT" },
    { word: "shovel",         file: "SHOVEL" },
    { word: "showcase",       file: "SHOWCASE" },
    { word: "shuttle",        file: "SHUTTLE" },
    { word: "thermometer",    file: "THERMOMETER" },
    { word: "thesis",         file: "THESIS" },
    { word: "thorn",          file: "THORN" },
    { word: "thumb",          file: "THUMB" }
  ],
  "Events": [
    { word: "choreography",   file: "CHOREOGRAPHY" },
    { word: "drama",          file: "DRAMA" },
    { word: "dream",          file: "DREAM" },
    { word: "drought",        file: "DROUGHT" },
    { word: "plagiarism",     file: "PLAGIARISM" },
    { word: "play",           file: "PLAY" },
    { word: "plunge",         file: "PLUNGE" },
    { word: "step",           file: "STEP" },
    { word: "stop",           file: "STOP" },
    { word: "storm",          file: "STORM" },
    { word: "strategy",       file: "STRATEGY" },
    { word: "tradition",      file: "TRADITION" },
    { word: "transformation", file: "TRANSFORMATION" },
    { word: "transportation", file: "TRANSPORTATION" },
    { word: "trick",          file: "TRICK" },
    { word: "cram",           file: "CRAM" },
    { word: "crash",          file: "CRASH" },
    { word: "friction",       file: "FRICTION" },
    { word: "frictionless",   file: "FRICTION LESS" },
    { word: "shop",           file: "SHOP" },
    { word: "thought",        file: "THOUGHT" },
    { word: "thunder",        file: "THUNDER" }
  ],
  "Animals": [
    { word: "cheek",          file: "CHEEK" },
    { word: "cherry",         file: "CHERRY" },
    { word: "chicken",        file: "CHICKEN" },
    { word: "character",      file: "CHARACTER" },
    { word: "dragonfly",      file: "DRAGON FLY" },
    { word: "plant",          file: "PLANT" },
    { word: "plum",           file: "PLUM" },
    { word: "pleasure",       file: "PLEASURE" },
    { word: "plethora",       file: "PLETHORA" },
    { word: "platoon",        file: "PLATOON" },
    { word: "strength",       file: "STRENGTH" },
    { word: "tree",           file: "TREE" },
    { word: "crater",         file: "CRATER" },
    { word: "cream",          file: "CREAM" },
    { word: "crew",           file: "CREW" },
    { word: "cricket",        file: "CRICKET" },
    { word: "crow",           file: "CROW" },
    { word: "crowd",          file: "CROWD" },
    { word: "fragrance",      file: "FRAGRANCE" },
    { word: "frappe",         file: "FRAPPE" },
    { word: "fraternity",     file: "FRATERNITY" },
    { word: "freckle",        file: "FRECKLE" },
    { word: "freedom",        file: "FREEDOM" },
    { word: "friday",         file: "FRIDAY" },
    { word: "friend",         file: "FRIEND" },
    { word: "frog",           file: "FROG" },
    { word: "frost",          file: "FROST" },
    { word: "fruit",          file: "FRUIT" },
    { word: "shadow",         file: "SHADOW" },
    { word: "shark",          file: "SHARK" },
    { word: "sheep",          file: "SHEEP" },
    { word: "shrimp",         file: "SHRIMP" },
    { word: "thirsty",        file: "THIRSTY" },
    { word: "thirty",         file: "THIRTY" },
    { word: "thousands",      file: "THOUSANDS" },
    { word: "thrown",         file: "THROWN" }
  ]
};

/* ================================================================
   CATEGORY META
   ================================================================ */
const CATEGORY_META = {
  "People":  { icon: "👤" },
  "Places":  { icon: "🌍" },
  "Things":  { icon: "📦" },
  "Events":  { icon: "🎉" },
  "Animals": { icon: "🐾" }
};

/* ================================================================
   DEFINITIONS
   ================================================================ */
const definitions = {
  chair:"A seat with a back for one person.",
  chalk:"A soft white stick used to write on blackboards.",
  champion:"The person who wins first place in a game.",
  chandelier:"A decorative light fixture that hangs from the ceiling.",
  character:"A person or animal in a story.",
  cheek:"The soft part of the face beside the mouth.",
  cheerleader:"A person who cheers for and supports a sports team.",
  cheese:"A yellow or white food made from milk.",
  cherry:"A small, round, red fruit with a pit.",
  chicken:"A bird that lays eggs and is also used for food.",
  child:"A young person who is not yet an adult.",
  chocolate:"A sweet brown food made from cocoa beans.",
  choreography:"The planned movements and steps in a dance performance.",
  church:"A building where Christians gather to worship.",
  dracula:"A fictional vampire character in literature.",
  dragonfly:"A flying insect with a long body and large wings.",
  drama:"A play or movie that presents serious themes or emotions.",
  drawer:"A sliding storage compartment in a piece of furniture.",
  dream:"Images or stories experienced during sleep.",
  driftwood:"Wood that has been carried by water and washed ashore.",
  drill:"A tool used to make holes, or an activity done for practice.",
  drought:"A prolonged period with little or no rainfall.",
  drummer:"A person who plays the drums.",
  plagiarism:"Copying someone else's work and presenting it as your own.",
  plank:"A long, flat piece of wood.",
  plant:"A living organism that grows in soil.",
  plaster:"A soft mixture used for covering walls or surfaces.",
  plate:"A flat dish used for serving or eating food.",
  platinum:"A valuable, silver-colored metal.",
  platoon:"A small group of soldiers.",
  play:"To engage in an activity for enjoyment.",
  playlist:"A list of selected songs.",
  plaza:"A large open public space in a city.",
  pleasure:"A feeling of enjoyment or happiness.",
  plethora:"A large or excessive amount of something.",
  plum:"A small, round fruit with a large seed.",
  plumber:"A professional who installs and repairs pipes and sinks.",
  plunge:"To jump or fall quickly into water.",
  stadium:"A large venue for sports events.",
  statement:"A sentence that expresses a fact or opinion.",
  step:"To move the foot forward while walking.",
  stick:"A long, thin piece of wood.",
  stone:"A hard, solid piece of rock.",
  stop:"To cease movement or action.",
  store:"A place where goods are sold.",
  storm:"Severe weather with wind, rain, or thunder.",
  strategy:"A plan designed to achieve a goal.",
  street:"A public road in a town or city.",
  strength:"Physical power or ability.",
  structure:"The way something is built or organized.",
  student:"A person who attends school to learn.",
  track:"A path used for running or racing.",
  tradition:"A custom followed regularly by a group or family.",
  train:"A connected series of vehicles that runs on tracks.",
  transformation:"A complete change in form or appearance.",
  transportation:"The system or means of moving people or goods.",
  traveller:"A person who journeys from one place to another.",
  tray:"A flat surface with raised edges for carrying items.",
  treasure:"Valuable objects such as gold or jewels.",
  tree:"A tall plant with a trunk and branches.",
  triangle:"A three-sided geometric shape.",
  trick:"A clever action meant to surprise or deceive.",
  trophy:"An award given for winning.",
  truck:"A large vehicle used for transporting heavy goods.",
  trumpet:"A brass musical instrument with a bright sound.",
  craftsman:"A skilled person who makes items by hand.",
  cram:"To study intensively in a short period.",
  crash:"To collide violently with something.",
  crate:"A large container used for transporting goods.",
  crater:"A large hole formed by an explosion or impact.",
  cream:"A thick dairy product derived from milk.",
  creek:"A small stream of water.",
  crew:"A group of individuals working together.",
  crib:"A small bed designed for a baby.",
  cricket:"An insect known for its chirping sound.",
  crossroad:"An intersection where two roads meet.",
  crow:"A large black bird.",
  crowd:"A large group of people gathered together.",
  crown:"A decorative headpiece worn by a monarch.",
  fragrance:"A pleasant smell.",
  frame:"A structure that surrounds and supports something.",
  frappe:"A cold blended beverage.",
  fraternity:"A group united by shared interests or brotherhood.",
  freckle:"A small brown spot on the skin.",
  freedom:"The state of being free to act or think as one chooses.",
  friction:"The resistance that occurs when two surfaces rub together.",
  frictionless:"Having no resistance between surfaces in contact.",
  friday:"The day following Thursday.",
  fridge:"An appliance used to keep food cold.",
  friend:"A person whom one knows and trusts.",
  frog:"An amphibian known for jumping and living near water.",
  frontier:"The outer boundary of a territory.",
  frost:"A thin layer of ice formed in cold conditions.",
  fruit:"The edible, seed-bearing part of a plant.",
  shade:"An area protected from direct sunlight.",
  shadow:"A dark shape formed when light is blocked.",
  shampoo:"A cleansing product used for washing hair.",
  shark:"A large marine fish with sharp teeth.",
  sheep:"A domesticated animal raised for wool and meat.",
  shelf:"A flat surface used for holding objects.",
  shell:"The hard outer covering of certain animals.",
  sheriff:"A law enforcement officer.",
  shirt:"A garment worn on the upper body.",
  shop:"A retail establishment where goods are sold.",
  shovel:"A tool used for digging or moving materials.",
  showcase:"A glass display case for exhibiting items.",
  shrimp:"A small shellfish.",
  shuttle:"A vehicle that travels back and forth between locations.",
  theater:"A venue for live performances or films.",
  thermometer:"An instrument used to measure temperature.",
  thesis:"A formal academic paper presenting research.",
  thief:"A person who steals.",
  thirsty:"Feeling the need to drink liquids.",
  thirty:"The number 30.",
  thorn:"A sharp projection on a plant stem.",
  thought:"An idea or mental concept.",
  thousands:"A number amounting to one thousand or more.",
  thrown:"Propelled through the air by hand.",
  thumb:"The short, thick digit of the hand.",
  thunder:"The loud sound that follows lightning."
};

/* ================================================================
   INTRO SCRIPT
   ================================================================ */
const INTRO_SCRIPT = "Hello, awesome spellers! Are you ready to have some fun? Today, we are going to spell and learn about common nouns. Common nouns are general names for people, places, animals, things, and events. Please choose a category below and demonstrate your spelling skills. Good luck, and let us spell like champions!";

/* ================================================================
   STORAGE KEYS
   ================================================================ */
const STORAGE_USERS_KEY   = "awesome_users";
const STORAGE_HISTORY_KEY = "spf_history";

/* ================================================================
   UTILITY
   ================================================================ */
const el       = id => document.getElementById(id);
const sections = ()  => document.querySelectorAll("section");

function showSection(id) {
  sections().forEach(s => s.classList.remove("active"));
  const sec = el(id);
  if (sec) sec.classList.add("active");
}

/* ================================================================
   PERSISTENT USER STORAGE
   Per-user shape:
   {
     name,
     categoryProgress: {
       "CategoryName__Easy": { difficulty, currentIndex, score, wordAttempts, words, completed },
       "CategoryName__Hard": { difficulty, currentIndex, score, wordAttempts, words, completed },
       ...
     }
   }

   Storage key format: "<Category>__<Difficulty>"  (double underscore separator)
   ================================================================ */

/** Build the storage key for a category+difficulty pair */
function progKey(category, diff) {
  return category + "__" + diff;
}

function getAllUsers() {
  try { return JSON.parse(localStorage.getItem(STORAGE_USERS_KEY) || "[]"); }
  catch { return []; }
}

function saveUser(profile) {
  let users = getAllUsers();
  const idx = users.findIndex(u => u.name.toLowerCase() === profile.name.toLowerCase());
  if (idx >= 0) {
    users[idx] = Object.assign({}, users[idx], profile);
  } else {
    users.unshift(profile);
  }
  localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
}

function getUser(name) {
  return getAllUsers().find(u => u.name.toLowerCase() === name.toLowerCase()) || null;
}

/** Save progress for the current category + difficulty slot */
function saveCurrentProgress() {
  if (!kidName || !currentCategory || !difficulty) return;
  const user = getUser(kidName) || { name: kidName, categoryProgress: {} };
  if (!user.categoryProgress) user.categoryProgress = {};

  const key = progKey(currentCategory, difficulty);
  user.categoryProgress[key] = {
    difficulty,
    currentIndex,
    score,
    wordAttempts: wordAttempts.slice(),
    words: words.map(function(w){ return { word: w.word, file: w.file }; }),
    completed: false,
    savedAt: new Date().toISOString()
  };
  saveUser(user);
}

/** Mark the current category + difficulty slot as completed */
function markCategoryCompleted() {
  if (!kidName || !currentCategory || !difficulty) return;
  const user = getUser(kidName) || { name: kidName, categoryProgress: {} };
  if (!user.categoryProgress) user.categoryProgress = {};

  const key = progKey(currentCategory, difficulty);
  if (user.categoryProgress[key]) {
    user.categoryProgress[key].completed = true;
  }
  saveUser(user);
}

/** Retrieve saved progress for a specific category + difficulty */
function getCategoryProgress(name, category, diff) {
  const user = getUser(name);
  if (!user || !user.categoryProgress) return null;
  return user.categoryProgress[progKey(category, diff)] || null;
}

/** Delete saved progress for a specific category + difficulty */
function clearCategoryProgress(name, category, diff) {
  const user = getUser(name);
  if (!user || !user.categoryProgress) return;
  delete user.categoryProgress[progKey(category, diff)];
  saveUser(user);
}

/**
 * Returns a summary object for a category across BOTH difficulties.
 * Used for the category buttons badge logic.
 * Returns: { anyInProgress, anyCompleted, totalInProgress }
 */
function getCategoryOverview(name, category) {
  const user = getUser(name);
  const cp = (user && user.categoryProgress) ? user.categoryProgress : {};
  const difficulties = ["Easy", "Hard"];
  let anyInProgress = false;
  let anyCompleted  = false;
  let totalInProgress = 0;

  difficulties.forEach(function(d) {
    const prog = cp[progKey(category, d)];
    if (!prog) return;
    if (prog.completed) {
      anyCompleted = true;
    } else if (prog.currentIndex > 0) {
      anyInProgress = true;
      totalInProgress++;
    }
  });

  return { anyInProgress, anyCompleted, totalInProgress };
}

/* ================================================================
   INTRO MODAL — shown only for NEW users.
   Returning users (picked from recent list) skip straight to categories.
   ================================================================ */
let introProgressTimer = null;

function openIntroModal(name) {
  el("modal-player-name").textContent = name;
  el("intro-modal").style.display = "flex";

  const proceedBtn = el("proceed-btn");
  proceedBtn.disabled = true;
  proceedBtn.textContent = "🔒 Please wait for the introduction to finish…";

  el("intro-progress-wrap").style.display = "flex";
  el("intro-progress-fill").style.width = "0%";
  el("intro-status-text").textContent = "🔊 Playing introduction…";

  // Short delay to allow browser to register the user gesture before speaking
  setTimeout(function(){ playIntroVoiceAndUnlock(); }, 400);
}

function playIntroVoiceAndUnlock() {
  if (!soundEnabled) {
    animateIntroProgress(2500);
    setTimeout(function(){ onIntroFinished(); }, 2500);
    return;
  }

  speechSynthesis.cancel();
  const utter  = new SpeechSynthesisUtterance(INTRO_SCRIPT);
  utter.rate   = 0.92;
  utter.pitch  = 1.25;
  utter.lang   = "en-US";

  // Estimate ~14 seconds for the intro at this rate
  animateIntroProgress(14000);

  utter.onend  = function(){ onIntroFinished(); };
  utter.onerror = function(){ onIntroFinished(); };

  try { speechSynthesis.speak(utter); }
  catch(e) { onIntroFinished(); }
}

function animateIntroProgress(durationMs) {
  if (introProgressTimer) clearInterval(introProgressTimer);
  const fill  = el("intro-progress-fill");
  const start = Date.now();
  introProgressTimer = setInterval(function(){
    const elapsed = Date.now() - start;
    const pct = Math.min(100, Math.round((elapsed / durationMs) * 100));
    if (fill) fill.style.width = pct + "%";
    if (pct >= 100) { clearInterval(introProgressTimer); introProgressTimer = null; }
  }, 80);
}

function onIntroFinished() {
  if (introProgressTimer) { clearInterval(introProgressTimer); introProgressTimer = null; }
  const fill = el("intro-progress-fill");
  if (fill) fill.style.width = "100%";
  const statusText = el("intro-status-text");
  if (statusText) statusText.textContent = "✅ Introduction complete!";
  const proceedBtn = el("proceed-btn");
  if (proceedBtn) {
    proceedBtn.disabled = false;
    proceedBtn.textContent = "Choose a Category 🚀";
  }
}

function closeIntroModal() {
  speechSynthesis.cancel();
  if (introProgressTimer) { clearInterval(introProgressTimer); introProgressTimer = null; }
  el("intro-modal").style.display = "none";
  el("display-name").textContent = kidName;
  renderCategoryButtons();
  showSection("categories");
}

/** Navigate straight to categories without showing the intro modal */
function goToCategoriesDirect() {
  speechSynthesis.cancel();
  el("display-name").textContent = kidName;
  renderCategoryButtons();
  showSection("categories");
}

/* ================================================================
   HOME — start game
   ================================================================ */
function startGameIntro() {
  const nameInput = el("kid-name");
  const name = nameInput.value.trim();
  if (!name) { alert("Please enter your name first!"); return; }
  kidName = name;

  const isReturning = !!getUser(kidName);

  if (!isReturning) {
    // Brand new user — save profile then show intro
    saveUser({ name: kidName, categoryProgress: {} });
    openIntroModal(kidName);
  } else {
    // Returning user typed their name manually — skip intro
    goToCategoriesDirect();
  }
}

/* ================================================================
   CATEGORY BUTTONS — dynamic with progress badges
   ================================================================ */
function renderCategoryButtons() {
  const container = el("category-buttons");
  if (!container) return;

  const html = Object.keys(CATEGORY_META).map(function(cat){
    const meta     = CATEGORY_META[cat];
    const overview = getCategoryOverview(kidName, cat);
    let badge      = "";
    let extraClass = "";

    if (overview.anyInProgress) {
      const label = overview.totalInProgress === 2 ? "▶ Both levels" : "▶ In progress";
      badge = '<span class="cat-badge resume">' + label + '</span>';
      extraClass = " cat-has-progress";
    } else if (overview.anyCompleted) {
      badge = '<span class="cat-badge done">✅ Done</span>';
      extraClass = " cat-completed";
    }

    return '<button class="btn category' + extraClass + '" onclick="chooseCategory(\'' + cat + '\')">'
      + meta.icon + ' ' + cat + badge
      + '</button>';
  }).join("");

  container.innerHTML = html;
}

/* ================================================================
   CHOOSE CATEGORY
   ================================================================ */
function chooseCategory(category) {
  currentCategory = category;
  el("cat-heading").textContent = "Category: " + category;

  // Check if either difficulty has an in-progress session
  const easyProg = getCategoryProgress(kidName, category, "Easy");
  const hardProg = getCategoryProgress(kidName, category, "Hard");

  const hasEasyResume = easyProg && !easyProg.completed && easyProg.currentIndex > 0 && easyProg.words && easyProg.words.length > 0;
  const hasHardResume = hardProg && !hardProg.completed && hardProg.currentIndex > 0 && hardProg.words && hardProg.words.length > 0;

  const banner       = el("difficulty-resume-banner");
  const startOverWrap = el("start-over-wrap");

  if (hasEasyResume || hasHardResume) {
    let lines = [];
    if (hasEasyResume) {
      const rem = easyProg.words.length - easyProg.currentIndex;
      lines.push('😺 <strong>Easy</strong>: word ' + (easyProg.currentIndex + 1) + ' of ' + easyProg.words.length
        + ' (' + rem + ' remaining, score ' + easyProg.score + '/' + easyProg.words.length + ')');
    }
    if (hasHardResume) {
      const rem = hardProg.words.length - hardProg.currentIndex;
      lines.push('🦁 <strong>Hard</strong>: word ' + (hardProg.currentIndex + 1) + ' of ' + hardProg.words.length
        + ' (' + rem + ' remaining, score ' + hardProg.score + '/' + hardProg.words.length + ')');
    }
    banner.style.display = "block";
    banner.innerHTML = '<span>▶ Saved progress found — selecting a difficulty will <strong>resume</strong> from where you left off.<br>'
      + lines.join('<br>') + '</span>';
    startOverWrap.style.display = "block";
  } else {
    banner.style.display = "none";
    startOverWrap.style.display = "none";
  }

  showSection("difficulty");
}

/* ================================================================
   START OVER — clears BOTH difficulty slots for the category
   ================================================================ */
function confirmStartOver() {
  if (!confirm('Start "' + currentCategory + '" from the beginning for ALL difficulties? Your saved progress will be lost.')) return;
  clearCategoryProgress(kidName, currentCategory, "Easy");
  clearCategoryProgress(kidName, currentCategory, "Hard");
  el("difficulty-resume-banner").style.display = "none";
  el("start-over-wrap").style.display = "none";
}

/* ================================================================
   START SPELLING
   Each difficulty level resumes or starts independently.
   ================================================================ */
function startSpelling(level) {
  // Look up progress slot for the chosen difficulty only
  const prog = getCategoryProgress(kidName, currentCategory, level);

  if (prog && !prog.completed && prog.currentIndex > 0 && prog.words && prog.words.length > 0) {
    // Resume this difficulty's saved state
    difficulty   = prog.difficulty;
    words        = prog.words;
    currentIndex = prog.currentIndex;
    score        = prog.score;
    wordAttempts = prog.wordAttempts ? prog.wordAttempts.slice() : [];
  } else {
    // Fresh start for this difficulty
    difficulty   = level;
    words        = (wordBank[currentCategory] || []).slice();
    currentIndex = 0;
    score        = 0;
    wordAttempts = [];
  }

  if (!words || words.length === 0) { alert("No words available for this category."); return; }

  saveCurrentProgress();
  updateUIHeader();
  el("answer").value          = "";
  el("feedback").textContent  = "";
  el("word-hint").textContent = "";

  showSection("game");
  if (soundEnabled) beep(880, 0.06, "sine");
  setTimeout(function(){ playWord(true); }, 150);
}

/* ================================================================
   UI HEADER
   ================================================================ */
function updateUIHeader() {
  el("category-title").textContent = currentCategory + " — " + difficulty;
  el("progress-text").textContent  = (currentIndex + 1) + " / " + words.length;
  const pct  = Math.round((currentIndex / Math.max(1, words.length)) * 100);
  const fill = el("progress-fill");
  if (fill) fill.style.width = pct + "%";
  el("score").textContent = "Score: " + score + " / " + words.length;
  el("game-character").textContent = "🔤";
}

/* ================================================================
   AUDIO FILE PLAYBACK
   ================================================================ */
let currentAudio = null;

function playAudioFile(filename) {
  if (!soundEnabled) return;
  if (currentAudio) { currentAudio.pause(); currentAudio.currentTime = 0; }
  const src = "audio/" + encodeURIComponent(filename) + ".m4a";
  currentAudio = new Audio(src);
  currentAudio.play().catch(function(){
    speak(filename.replace(/ /g, ""), { rate: 0.9, pitch: 1.5 });
  });
}

function playWord(isNew) {
  if (!words.length) return;
  const entry = words[currentIndex];
  if (difficulty === "Easy") {
    const def = definitions[entry.word.toLowerCase()] || "No hint available.";
    el("word-hint").textContent = "💡 Hint: " + def;
  } else {
    el("word-hint").textContent = "🦁 Hard mode — no hints!";
  }
  playAudioFile(entry.file);
  if (soundEnabled) beep(600, 0.06, "triangle");
  updateUIHeader();
}

/* ================================================================
   CHECK ANSWER
   ================================================================ */
function checkAnswer() {
  const raw = el("answer").value.trim();
  if (!raw) return;
  const answer  = raw.toLowerCase();
  const entry   = words[currentIndex];
  const correct = entry.word.toLowerCase();
  const feed    = el("feedback");

  if (answer === correct) {
    score++;
    feed.textContent = "✅ Great job, " + kidName + "! \"" + correct + "\" is correct.";
    feed.style.color = "var(--good)";
    animateCorrect();
    if (soundEnabled) { beep(880, 0.08, "sine"); bePlaySuccessTune(); }
    wordAttempts.push({ word: correct, userInput: answer, correct: true });
  } else {
    feed.textContent = "❌ Oops! The correct spelling was \"" + correct + "\".";
    feed.style.color = "var(--bad)";
    animateWrong();
    if (soundEnabled) beep(180, 0.12, "sawtooth");
    wordAttempts.push({ word: correct, userInput: answer, correct: false });
  }

  el("score").textContent = "Score: " + score + " / " + words.length;
  el("answer").value = "";
  saveCurrentProgress();
  setTimeout(function(){ nextWord(); }, 900);
}

/* ================================================================
   SKIP WORD
   ================================================================ */
function skipWord() {
  const entry   = words[currentIndex];
  const correct = entry.word;
  el("feedback").textContent = "⏭ Skipped. The word was \"" + correct + "\".";
  el("feedback").style.color = "var(--muted)";
  if (soundEnabled) beep(220, 0.06, "square");
  wordAttempts.push({ word: correct, userInput: "(skipped)", correct: false });
  saveCurrentProgress();
  setTimeout(function(){ nextWord(); }, 700);
}

/* ================================================================
   NEXT WORD
   ================================================================ */
function nextWord() {
  currentIndex++;
  el("word-hint").textContent  = "";
  el("feedback").textContent   = "";
  updateUIHeader();
  saveCurrentProgress();
  if (currentIndex < words.length) {
    setTimeout(function(){ playWord(true); }, 250);
  } else {
    showResult();
  }
}

/* ================================================================
   SHOW RESULT
   ================================================================ */
function showResult() {
  el("final-name").textContent = kidName;
  let message = "";
  if (score >= Math.ceil(words.length * 0.6)) {
    message = "🎉 GREAT JOB! You scored " + score + " out of " + words.length + "! 🎉";
  } else {
    message = "😅 Better luck next time. You scored " + score + " out of " + words.length + ".";
  }
  el("final-score").textContent = message;
  showSection("result");
  if (score >= Math.ceil(words.length * 0.6)) {
    speak("Great job " + kidName + ", you got " + score + " correct!");
    if (soundEnabled) bePlaySuccessTune();
  } else {
    speak("You scored " + score + " out of " + words.length + ". Better luck next time, " + kidName + ".");
  }
  savePerformance();
  markCategoryCompleted();
  renderCategoryButtons();
}

/* ================================================================
   RESTART
   ================================================================ */
function restart() {
  el("kid-name").value = "";
  kidName         = "";
  currentCategory = "";
  difficulty      = "";
  words           = [];
  currentIndex    = 0;
  score           = 0;
  wordAttempts    = [];
  renderRecentUsers();
  showSection("home");
}

/* ================================================================
   RECENT USERS
   ================================================================ */
function renderRecentUsers() {
  const users   = getAllUsers();
  const section = el("recent-users-section");
  const list    = el("recent-users-list");
  if (!users.length) { section.style.display = "none"; return; }

  section.style.display = "block";
  list.innerHTML = users.map(function(u){
    const cp = u.categoryProgress || {};
    // Count in-progress slots (any category__difficulty key that is not completed and has currentIndex > 0)
    const inProgCount = Object.keys(cp).filter(function(key){
      return cp[key] && !cp[key].completed && cp[key].currentIndex > 0;
    }).length;
    const badge = inProgCount
      ? '<span class="resume-badge">' + inProgCount + ' in progress</span>'
      : "";
    const safeName = u.name.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
    return '<button class="recent-chip" onclick="selectRecentUser(\'' + safeName + '\')">' + u.name + badge + '</button>';
  }).join("");
}

/**
 * Selecting a recent user SKIPS the intro modal entirely —
 * they have already been introduced.
 */
function selectRecentUser(name) {
  el("kid-name").value = name;
  kidName = name;
  if (!getUser(name)) saveUser({ name: name, categoryProgress: {} });
  // Skip intro — go straight to categories
  goToCategoriesDirect();
}

/* ================================================================
   SPEECH & EFFECTS
   ================================================================ */
function speak(text, opts) {
  opts = opts || {};
  if (!soundEnabled) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate  = opts.rate  || 1.05;
  utter.pitch = opts.pitch || 1.6;
  utter.lang  = opts.lang  || "en-US";
  try { speechSynthesis.cancel(); speechSynthesis.speak(utter); } catch(e){}
}

const audioCtx = (window.AudioContext || window.webkitAudioContext)
  ? new (window.AudioContext || window.webkitAudioContext)() : null;

function beep(freq, time, type) {
  freq = freq || 440; time = time || 0.06; type = type || "sine";
  if (!soundEnabled || !audioCtx) return;
  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  o.type = type; o.frequency.value = freq;
  o.connect(g); g.connect(audioCtx.destination);
  g.gain.value = 0.001;
  o.start();
  g.gain.exponentialRampToValueAtTime(0.12, audioCtx.currentTime + 0.01);
  g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + time);
  o.stop(audioCtx.currentTime + time + 0.02);
}

function bePlaySuccessTune() {
  if (!audioCtx || !soundEnabled) return;
  const now = audioCtx.currentTime;
  [880, 1047, 1318].forEach(function(f, i){
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.frequency.value = f;
    o.type = i % 2 === 0 ? "sine" : "triangle";
    o.connect(g); g.connect(audioCtx.destination);
    g.gain.value = 0.001;
    o.start(now + i * 0.08);
    g.gain.exponentialRampToValueAtTime(0.12, now + i * 0.08 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.2);
    o.stop(now + i * 0.08 + 0.22);
  });
}

/* ================================================================
   ANIMATIONS
   ================================================================ */
function animateCorrect() {
  const fb = el("feedback");
  if (!fb) return;
  fb.classList.remove("wrong"); void fb.offsetWidth;
  fb.classList.add("correct");
  setTimeout(function(){ fb.classList.remove("correct"); }, 700);
}
function animateWrong() {
  const fb = el("feedback");
  if (!fb) return;
  fb.classList.remove("correct"); void fb.offsetWidth;
  fb.classList.add("wrong");
  setTimeout(function(){ fb.classList.remove("wrong"); }, 700);
}

/* ================================================================
   PERFORMANCE HISTORY
   ================================================================ */
function savePerformance() {
  try {
    const record = {
      name: kidName, category: currentCategory, difficulty,
      score, total: words.length,
      date: new Date().toLocaleString(),
      attempts: wordAttempts
    };
    let history = JSON.parse(localStorage.getItem(STORAGE_HISTORY_KEY) || "[]");
    history.push(record);
    localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(history));
  } catch(e) { console.error("Save error", e); }
}

function loadHistory() {
  const history   = JSON.parse(localStorage.getItem(STORAGE_HISTORY_KEY) || "[]");
  const container = el("history-list");
  if (!history.length) {
    container.innerHTML = "<p>No history yet. Play a game to save results!</p>";
    showSection("history");
    return;
  }
  const rows = history.slice().reverse().map(function(r){
    let attHTML = "";
    if (r.attempts && r.attempts.length > 0) {
      attHTML = '<div style="margin-top:8px;font-size:0.85rem;background:rgba(255,255,255,0.7);padding:8px;border-radius:6px;"><strong>Words:</strong><br>';
      r.attempts.forEach(function(a){
        const icon  = a.correct ? "✅" : "❌";
        const color = a.correct ? "var(--good)" : "var(--bad)";
        attHTML += '<span style="color:' + color + '">' + icon + ' <strong>' + a.word + '</strong>: ' + a.userInput + '</span><br>';
      });
      attHTML += "</div>";
    }
    return '<div class="history-item"><strong>' + r.name + '</strong> • ' + r.category + ' (' + r.difficulty + ')<br>'
      + 'Score: <strong>' + r.score + '/' + r.total + '</strong> • <small>' + r.date + '</small>' + attHTML + '</div>';
  }).join("");
  container.innerHTML = rows;
  showSection("history");
}

function clearHistory() {
  if (!confirm("Clear all saved performance history?")) return;
  localStorage.removeItem(STORAGE_HISTORY_KEY);
  loadHistory();
}

/* ================================================================
   MISC
   ================================================================ */
function openHowTo() { showSection("howto"); }

/* ================================================================
   EVENT LISTENERS
   ================================================================ */
document.addEventListener("DOMContentLoaded", function(){
  const toggleBtn = el("toggle-sound-btn");
  if (toggleBtn) {
    toggleBtn.textContent = soundEnabled ? "🔊" : "🔈";
    toggleBtn.addEventListener("click", function(){
      soundEnabled = !soundEnabled;
      toggleBtn.textContent = soundEnabled ? "🔊" : "🔈";
    });
  }

  var viewHistBtn = el("view-history-btn");
  if (viewHistBtn) viewHistBtn.addEventListener("click", function(){ loadHistory(); });

  renderRecentUsers();

  // Debounced name save while typing
  const nameInput = el("kid-name");
  if (nameInput) {
    let debounce;
    nameInput.addEventListener("input", function(){
      clearTimeout(debounce);
      debounce = setTimeout(function(){
        const name = nameInput.value.trim();
        if (name.length >= 2) {
          // Only refresh the recent-users list — never pre-save a new name here,
          // because that would cause getUser() to find it in startGameIntro()
          // and incorrectly treat a brand-new user as a returning one.
          renderRecentUsers();
        }
      }, 700);
    });
  }
});

document.addEventListener("keydown", function(e){
  if (e.key === "Enter") {
    if (el("game") && el("game").classList.contains("active")) {
      e.preventDefault(); checkAnswer();
    } else if (el("home") && el("home").classList.contains("active")) {
      startGameIntro();
    }
  } else if (e.key === "Escape") {
    if (el("game") && el("game").classList.contains("active")) playWord();
  }
});

(function init(){
  const toggleBtn = el("toggle-sound-btn");
  if (toggleBtn) toggleBtn.textContent = soundEnabled ? "🔊" : "🔈";
  const pf = el("progress-fill");
  if (pf) pf.style.width = "0%";
})();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js")
    .then(function(){ console.log("Service Worker registered"); })
    .catch(function(err){ console.log("SW registration failed", err); });
}
