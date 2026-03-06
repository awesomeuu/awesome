let kidName = "";
let currentCategory = "";
let difficulty = "";
let words = [];
let currentIndex = 0;
let score = 0;
let currentHint = "";
let soundEnabled = true;
let wordAttempts = [];

// Each word entry: { word: display/answer word, file: audio filename without extension }
const wordBank = {
  "CH Words": [
    { word: "chair",          file: "CHAIR.mp4" },
    { word: "chalk",          file: "CHALK" },
    { word: "champion",       file: "CHAMPION" },
    { word: "chandelier",     file: "CHANDELIER" },
    { word: "character",      file: "CHARACTER" },
    { word: "cheek",          file: "CHEEK" },
    { word: "cheerleader",    file: "CHEERLEADER" },
    { word: "cheese",         file: "CHEESE" },
    { word: "cherry",         file: "CHERRY" },
    { word: "chicken",        file: "CHICKEN" },
    { word: "child",          file: "CHILD" },
    { word: "chocolate",      file: "CHOCOLATE" },
    { word: "choreography",   file: "CHOREOGRAPHY" },
    { word: "church",         file: "CHURCH" }
  ],
  "DR Words": [
    { word: "dracula",    file: "DRACULA" },
    { word: "dragonfly",  file: "DRAGON FLY" },
    { word: "drama",      file: "DRAMA" },
    { word: "drawer",     file: "DRAWER" },
    { word: "dream",      file: "DREAM" },
    { word: "driftwood",  file: "DRIFT WOOD" },
    { word: "drill",      file: "DRILL" },
    { word: "drink",      file: "DRINK" },
    { word: "drive",      file: "DRIVE" },
    { word: "drought",    file: "DROUGHT" },
    { word: "drummer",    file: "DRUMMER" }
  ],
  "PL Words": [
    { word: "plagiarism", file: "PLAGIARISM" },
    { word: "plank",      file: "PLANK" },
    { word: "plant",      file: "PLANT" },
    { word: "plaster",    file: "PLASTER" },
    { word: "plate",      file: "PLATE" },
    { word: "platinum",   file: "PLATINUM" },
    { word: "platoon",    file: "PLATOON" },
    { word: "play",       file: "PLAY" },
    { word: "playlist",   file: "PLAYLIST" },
    { word: "plaza",      file: "PLAZA" },
    { word: "pleasure",   file: "PLEASURE" },
    { word: "plethora",   file: "PLETHORA" },
    { word: "plum",       file: "PLUM" },
    { word: "plumber",    file: "PLUMBER" },
    { word: "plunge",     file: "PLUNGE" }
  ],
  "ST Words": [
    { word: "stadium",   file: "STADIUM" },
    { word: "statement", file: "STATEMENT" },
    { word: "step",      file: "STEP" },
    { word: "stick",     file: "STICK" },
    { word: "stone",     file: "STONE" },
    { word: "stop",      file: "STOP" },
    { word: "store",     file: "STORE" },
    { word: "storm",     file: "STORM" },
    { word: "strategy",  file: "STRATEGY" },
    { word: "street",    file: "STREET" },
    { word: "strength",  file: "STRENGTH" },
    { word: "structure", file: "STRUCTURE" },
    { word: "student",   file: "STUDENT" }
  ],
  "TR Words": [
    { word: "track",          file: "TRACK" },
    { word: "tradition",      file: "TRADITION" },
    { word: "train",          file: "TRAIN" },
    { word: "transformation", file: "TRANSFORMATION" },
    { word: "transportation", file: "TRANSPORTATION" },
    { word: "traveller",      file: "TRAVELLER" },
    { word: "tray",           file: "TRAY" },
    { word: "treasure",       file: "TREASURE" },
    { word: "tree",           file: "TREE" },
    { word: "triangle",       file: "TRIANGLE" },
    { word: "trick",          file: "TRICK" },
    { word: "trophy",         file: "TROPHY" },
    { word: "truck",          file: "TRUCK" },
    { word: "trumpet",        file: "TRUMPET" }
  ],
  "CR Words": [
    { word: "craftsman", file: "CRAFTS MAN" },
    { word: "cram",      file: "CRAM" },
    { word: "crash",     file: "CRASH" },
    { word: "crate",     file: "CRATE" },
    { word: "crater",    file: "CRATER" },
    { word: "cream",     file: "CREAM" },
    { word: "creek",     file: "CREEK" },
    { word: "crew",      file: "CREW" },
    { word: "crib",      file: "CRIB" },
    { word: "cricket",   file: "CRICKET" },
    { word: "crossroad", file: "CROSS ROAD" },
    { word: "crow",      file: "CROW" },
    { word: "crowd",     file: "CROWD" },
    { word: "crown",     file: "CROWN" }
  ],
  "FR Words": [
    { word: "fragrance",    file: "FRAGRANCE" },
    { word: "frame",        file: "FRAME" },
    { word: "frappe",       file: "FRAPPE" },
    { word: "fraternity",   file: "FRATERNITY" },
    { word: "freckle",      file: "FRECKLE" },
    { word: "freedom",      file: "FREEDOM" },
    { word: "friction",     file: "FRICTION" },
    { word: "frictionless", file: "FRICTION LESS" },
    { word: "friday",       file: "FRIDAY" },
    { word: "fridge",       file: "FRIDGE" },
    { word: "friend",       file: "FRIEND" },
    { word: "frog",         file: "FROG" },
    { word: "frontier",     file: "FRONTIER" },
    { word: "frost",        file: "FROST" },
    { word: "fruit",        file: "FRUIT" }
  ],
  "SH Words": [
    { word: "shade",     file: "SHADE" },
    { word: "shadow",    file: "SHADOW" },
    { word: "shampoo",   file: "SHAMPOO" },
    { word: "shark",     file: "SHARK" },
    { word: "sheep",     file: "SHEEP" },
    { word: "shelf",     file: "SHELF" },
    { word: "shell",     file: "SHELL" },
    { word: "sheriff",   file: "SHERIFF" },
    { word: "shirt",     file: "SHIRT" },
    { word: "shop",      file: "SHOP" },
    { word: "shovel",    file: "SHOVEL" },
    { word: "showcase",  file: "SHOWCASE" },
    { word: "shrimp",    file: "SHRIMP" },
    { word: "shuttle",   file: "SHUTTLE" }
  ],
  "TH Words": [
    { word: "theater",     file: "THEATER" },
    { word: "thermometer", file: "THERMOMETER" },
    { word: "thesis",      file: "THESIS" },
    { word: "thief",       file: "THIEF" },
    { word: "thing",       file: "THING" },
    { word: "thirsty",     file: "THIRSTY" },
    { word: "thirty",      file: "THIRTY" },
    { word: "thorn",       file: "THORN" },
    { word: "thought",     file: "THOUGHT" },
    { word: "thousands",   file: "THOUSANDS" },
    { word: "thrown",      file: "THROWN" },
    { word: "thumb",       file: "THUMB" },
    { word: "thunder",     file: "THUNDER" }
  ]
};

/* Definitions for hint display (Easy mode only) */
const definitions = {
  // CH Words
  chair: "A seat with a back for one person.",
  chalk: "A soft white stick used to write on blackboards.",
  champion: "The person who wins first place in a game.",
  chandelier: "A decorative light fixture that hangs from the ceiling.",
  character: "A person or animal in a story.",
  cheek: "The soft part of the face beside the mouth.",
  cheerleader: "A person who cheers for and supports a sports team.",
  cheese: "A yellow or white food made from milk.",
  cherry: "A small, round, red fruit with a pit.",
  chicken: "A bird that lays eggs and is also used for food.",
  child: "A young person who is not yet an adult.",
  chocolate: "A sweet brown food made from cocoa beans.",
  choreography: "The planned movements and steps in a dance performance.",

  // DR Words
  dracula: "A fictional vampire character in literature.",
  dragonfly: "A flying insect with a long body and large wings.",
  drama: "A play or movie that presents serious themes or emotions.",
  drawer: "A sliding storage compartment in a piece of furniture.",
  dream: "Images or stories experienced during sleep.",
  driftwood: "Wood that has been carried by water and washed ashore.",
  drill: "A tool used to make holes, or an activity done for practice.",
  drink: "A liquid consumed to satisfy thirst.",
  drive: "To operate and control a vehicle.",
  drought: "A prolonged period with little or no rainfall.",
  drummer: "A person who plays the drums.",

  // PL Words
  plagiarism: "Copying someone else's work and presenting it as your own.",
  plank: "A long, flat piece of wood.",
  plant: "A living organism that grows in soil.",
  plaster: "A soft mixture used for covering walls or surfaces.",
  plate: "A flat dish used for serving or eating food.",
  platinum: "A valuable, silver-colored metal.",
  platoon: "A small group of soldiers.",
  play: "To engage in an activity for enjoyment or to perform in a show.",
  playlist: "A list of selected songs.",
  plaza: "A large open public space in a city.",
  pleasure: "A feeling of enjoyment or happiness.",
  plethora: "A large or excessive amount of something.",
  plum: "A small, round fruit with a large seed.",
  plumber: "A professional who installs and repairs pipes and sinks.",
  plunge: "To jump or fall quickly into water.",

  // ST Words
  stadium: "A large venue for sports events.",
  statement: "A sentence that expresses a fact or opinion.",
  step: "To move the foot forward while walking.",
  stick: "A long, thin piece of wood.",
  stone: "A hard, solid piece of rock.",
  stop: "To cease movement or action.",
  store: "A place where goods are sold.",
  storm: "Severe weather with wind, rain, or thunder.",
  strategy: "A plan designed to achieve a goal.",
  street: "A public road in a town or city.",
  strength: "Physical power or ability.",
  structure: "The way something is built or organized.",
  student: "A person who attends school to learn.",

  // TR Words
  track: "A path used for running or racing.",
  tradition: "A custom followed regularly by a group or family.",
  train: "A connected series of vehicles that runs on tracks.",
  transformation: "A complete change in form or appearance.",
  transportation: "The system or means of moving people or goods.",
  traveller: "A person who journeys from one place to another.",
  tray: "A flat surface with raised edges for carrying items.",
  treasure: "Valuable objects such as gold or jewels.",
  tree: "A tall plant with a trunk and branches.",
  triangle: "A three-sided geometric shape.",
  trick: "A clever action meant to surprise or deceive.",
  trophy: "An award given for winning.",
  truck: "A large vehicle used for transporting heavy goods.",
  trumpet: "A brass musical instrument with a bright, powerful sound.",

  // CR Words
  craftsman: "A skilled person who makes items by hand.",
  cram: "To study intensively in a short period.",
  crash: "To collide violently with something.",
  crate: "A large container used for transporting goods.",
  crater: "A large hole formed by an explosion or impact.",
  cream: "A thick dairy product derived from milk.",
  creek: "A small stream of water.",
  crew: "A group of individuals working together.",
  crib: "A small bed designed for a baby.",
  cricket: "An insect known for its chirping sound.",
  crossroad: "An intersection where two roads meet.",
  crow: "A large black bird.",
  crowd: "A large group of people gathered together.",
  crown: "A decorative headpiece worn by a monarch.",

  // FR Words
  fragrance: "A pleasant smell.",
  frame: "A structure that surrounds and supports something, such as a picture.",
  frappe: "A cold blended beverage.",
  fraternity: "A group united by shared interests or brotherhood.",
  freckle: "A small brown spot on the skin.",
  freedom: "The state of being free to act or think as one chooses.",
  friction: "The resistance that occurs when two surfaces rub together.",
  frictionless: "Having no resistance between surfaces in contact.",
  friday: "The day following Thursday.",
  fridge: "An appliance used to keep food cold.",
  friend: "A person whom one knows and trusts.",
  frog: "An amphibian known for jumping and living near water.",
  frontier: "The outer boundary of a territory.",
  frost: "A thin layer of ice formed in cold conditions.",
  fruit: "The edible, seed-bearing part of a plant.",

  // SH Words
  shade: "An area protected from direct sunlight.",
  shadow: "A dark shape formed when light is blocked.",
  shampoo: "A cleansing product used for washing hair.",
  shark: "A large marine fish with sharp teeth.",
  sheep: "A domesticated animal raised for wool and meat.",
  shelf: "A flat surface used for holding objects.",
  shell: "The hard outer covering of certain animals.",
  sheriff: "A law enforcement officer.",
  shirt: "A garment worn on the upper body.",
  shop: "A retail establishment where goods are sold.",
  shovel: "A tool used for digging or moving materials.",
  showcase: "A glass display case for exhibiting items.",
  shrimp: "A small shellfish.",
  shuttle: "A vehicle that travels back and forth between locations.",

  // CH Words extra
  church: "A building where Christians gather to worship.",

  // TH Words
  theater: "A venue for live performances or films.",
  thermometer: "An instrument used to measure temperature.",
  thesis: "A formal academic paper presenting research or arguments.",
  thief: "A person who steals.",
  thing: "An object or item.",
  thirsty: "Feeling the need to drink liquids.",
  thirty: "The number 30.",
  thorn: "A sharp projection on a plant stem.",
  thought: "An idea or mental concept.",
  thousands: "A number amounting to one thousand or more.",
  thrown: "Propelled through the air by hand.",
  thumb: "The short, thick digit of the hand.",
  thunder: "The loud sound that follows lightning."
};

/* ---------------- Utility: element refs ---------------- */
const el = id => document.getElementById(id);
const sections = () => document.querySelectorAll("section");

/* ---------------- Show / Hide Sections ---------------- */
function showSection(id) {
  sections().forEach(s => s.classList.remove("active"));
  const sec = el(id);
  if (sec) sec.classList.add("active");
}

/* ---------------- Speech & Effects ---------------- */
function speak(text, opts = {}) {
  if (!soundEnabled) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = opts.rate || 1.05;
  utter.pitch = opts.pitch || 1.6;
  utter.lang = opts.lang || "en-US";
  try {
    speechSynthesis.cancel();
    speechSynthesis.speak(utter);
  } catch (e) {}
}

const audioCtx = (window.AudioContext || window.webkitAudioContext)
  ? new (window.AudioContext || window.webkitAudioContext)() : null;

function beep(freq = 440, time = 0.06, type = "sine") {
  if (!soundEnabled || !audioCtx) return;
  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  o.type = type;
  o.frequency.value = freq;
  o.connect(g);
  g.connect(audioCtx.destination);
  g.gain.value = 0.001;
  o.start();
  g.gain.exponentialRampToValueAtTime(0.12, audioCtx.currentTime + 0.01);
  g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + time);
  o.stop(audioCtx.currentTime + time + 0.02);
}

/* ---------------- Game Flow ---------------- */
function startGameIntro() {
  const nameInput = el("kid-name");
  kidName = nameInput.value.trim();
  if (!kidName) {
    alert("Please enter your name first!");
    return;
  }
  el("display-name").textContent = kidName;
  showSection("categories");
}

function chooseCategory(category) {
  currentCategory = category;
  el("cat-heading").textContent = `Category: ${category}`;
  showSection("difficulty");
}

function startSpelling(level) {
  difficulty = level;
  words = [...(wordBank[currentCategory] || [])];
  if (!words || words.length === 0) {
    alert("No words available for this category.");
    return;
  }
  words = words.sort(() => Math.random() - 0.5);
  currentIndex = 0;
  score = 0;
  currentHint = "";
  wordAttempts = [];
  updateUIHeader();
  el("answer").value = "";
  el("feedback").textContent = "";
  el("word-hint").textContent = "";

  showSection("game");
  if (soundEnabled) beep(880, 0.06, "sine");
  setTimeout(() => playWord(true), 150);
}

function updateUIHeader() {
  el("category-title").textContent = `${currentCategory} — ${difficulty}`;
  el("progress-text").textContent = `${currentIndex + 1} / ${words.length}`;
  const pct = Math.round((currentIndex / Math.max(1, words.length)) * 100);
  const fill = el("progress-fill");
  if (fill) fill.style.width = `${pct}%`;
  el("score").textContent = `Score: ${score} / ${words.length}`;
  el("game-character").textContent = "🔤";
}

/* ---------------- Audio file playback ---------------- */
// Audio files live in a folder called "audio/" next to the HTML file.
// Each file is named exactly as the `file` property (e.g. "CHAIR.m4a").
let currentAudio = null;

function playAudioFile(filename) {
  if (!soundEnabled) return;
  // Stop any currently playing audio
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  // Encode spaces as %20 for filenames like "DRAGON FLY"
  const src = `audio/${encodeURIComponent(filename)}.m4a`;
  currentAudio = new Audio(src);
  currentAudio.play().catch(err => {
    console.warn("Audio play failed:", src, err);
    // Fallback: use speech synthesis if audio file is missing
    speak(filename.replace(/ /g, ''), { rate: 0.9, pitch: 1.5 });
  });
}

/* ---------------- Play current word ---------------- */
function playWord(isNew = false) {
  if (!words.length) return;
  const entry = words[currentIndex];

  // Easy: show definition hint. Hard: no hint.
  if (difficulty === "Easy") {
    const def = definitions[entry.word.toLowerCase()] || "No hint available.";
    el("word-hint").textContent = `💡 Hint: ${def}`;
  } else {
    el("word-hint").textContent = "🦁 Hard mode — no hints!";
  }

  // Play the pre-recorded audio file
  playAudioFile(entry.file);
  if (soundEnabled) beep(600, 0.06, "triangle");
  updateUIHeader();
}

/* ---------------- Check answer ---------------- */
function checkAnswer() {
  const raw = el("answer").value.trim();
  if (!raw) return;
  const answer = raw.toLowerCase();
  const entry = words[currentIndex];
  const correct = entry.word.toLowerCase();
  const feed = el("feedback");

  if (answer === correct) {
    score++;
    feed.textContent = `✅ Great job, ${kidName}! "${correct}" is correct.`;
    feed.style.color = "var(--good)";
    animateCorrect();
    if (soundEnabled) { beep(880, 0.08, "sine"); bePlaySuccessTune(); }
    wordAttempts.push({ word: correct, userInput: answer, correct: true });
  } else {
    feed.textContent = `❌ Oops! The correct spelling was "${correct}".`;
    feed.style.color = "var(--bad)";
    animateWrong();
    if (soundEnabled) { beep(180, 0.12, "sawtooth"); }
    wordAttempts.push({ word: correct, userInput: answer, correct: false });
  }

  el("score").textContent = `Score: ${score} / ${words.length}`;
  el("answer").value = "";
  setTimeout(() => nextWord(), 900);
}

/* ---------------- Skip word ---------------- */
function skipWord() {
  const entry = words[currentIndex];
  const correct = entry.word;
  el("feedback").textContent = `⏭ Skipped. The word was "${correct}".`;
  el("feedback").style.color = "var(--muted)";
  if (soundEnabled) beep(220, 0.06, "square");
  wordAttempts.push({ word: correct, userInput: "(skipped)", correct: false });
  setTimeout(() => nextWord(), 700);
}

/* ---------------- Next ---------------- */
function nextWord() {
  currentIndex++;
  currentHint = "";
  el("word-hint").textContent = "";
  el("feedback").textContent = "";
  updateUIHeader();

  if (currentIndex < words.length) {
    setTimeout(() => playWord(true), 250);
  } else {
    showResult();
  }
}

/* ---------------- Show result ---------------- */
function showResult() {
  el("final-name").textContent = kidName;

  let message = "";
  if (score >= Math.ceil(words.length * 0.6)) {
    message = `🎉 GREAT JOB! You scored ${score} out of ${words.length}! 🎉`;
  } else {
    message = `😅 Better luck next time. You scored ${score} out of ${words.length}.`;
  }

  el("final-score").textContent = message;
  showSection("result");

  if (score >= Math.ceil(words.length * 0.6)) {
    speak(`Great job ${kidName}, you got ${score} correct!`);
    if (soundEnabled) bePlaySuccessTune();
  } else {
    speak(`You scored ${score} out of ${words.length}. Better luck next time, ${kidName}.`);
  }

  savePerformance();
}

/* ---------------- Restart ---------------- */
function restart() {
  el("kid-name").value = "";
  kidName = "";
  currentCategory = "";
  difficulty = "";
  words = [];
  currentIndex = 0;
  score = 0;
  currentHint = "";
  showSection("home");
}

/* ---------------- Animations ---------------- */
function animateCorrect() {
  const fb = el("feedback");
  if (!fb) return;
  fb.classList.remove("wrong");
  void fb.offsetWidth;
  fb.classList.add("correct");
  setTimeout(() => fb.classList.remove("correct"), 700);
}
function animateWrong() {
  const fb = el("feedback");
  if (!fb) return;
  fb.classList.remove("correct");
  void fb.offsetWidth;
  fb.classList.add("wrong");
  setTimeout(() => fb.classList.remove("wrong"), 700);
}

/* ---------------- Success tune ---------------- */
function bePlaySuccessTune() {
  if (!audioCtx || !soundEnabled) return;
  const now = audioCtx.currentTime;
  const freqs = [880, 1047, 1318];
  freqs.forEach((f, i) => {
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

/* ---------------- LocalStorage: Save + Load History ---------------- */
function savePerformance() {
  try {
    const record = {
      name: kidName,
      category: currentCategory,
      difficulty,
      score,
      total: words.length,
      date: new Date().toLocaleString(),
      attempts: wordAttempts
    };
    let history = JSON.parse(localStorage.getItem("spf_history") || "[]");
    history.push(record);
    localStorage.setItem("spf_history", JSON.stringify(history));
  } catch (e) {
    console.error("Save error", e);
  }
}

function loadHistory() {
  const history = JSON.parse(localStorage.getItem("spf_history") || "[]");
  const container = el("history-list");
  if (!history.length) {
    container.innerHTML = "<p>No history yet. Play a game to save results!</p>";
    showSection("history");
    return;
  }
  const rows = history.slice().reverse().map((r) => {
    let attemptsHTML = '';
    if (r.attempts && r.attempts.length > 0) {
      attemptsHTML = '<div style="margin-top:8px;font-size:0.85rem;background:rgba(255,255,255,0.7);padding:8px;border-radius:6px;">';
      attemptsHTML += '<strong>Words:</strong><br>';
      r.attempts.forEach(att => {
        const icon = att.correct ? '✅' : '❌';
        const color = att.correct ? 'var(--good)' : 'var(--bad)';
        attemptsHTML += `<span style="color:${color}">${icon} <strong>${att.word}</strong>: ${att.userInput}</span><br>`;
      });
      attemptsHTML += '</div>';
    }
    return `<div class="history-item">
      <strong>${r.name}</strong> • ${r.category} (${r.difficulty})<br>
      Score: <strong>${r.score}/${r.total}</strong> • <small>${r.date}</small>
      ${attemptsHTML}
    </div>`;
  }).join("");
  container.innerHTML = rows;
  showSection("history");
}

function clearHistory() {
  if (!confirm("Clear all saved performance history?")) return;
  localStorage.removeItem("spf_history");
  loadHistory();
}

/* ---------------- Extra UI helpers ---------------- */
function openHowTo() { showSection("howto"); }

/* ---------------- Event listeners ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggle-sound-btn");
  if (toggleBtn) {
    toggleBtn.textContent = soundEnabled ? "🔊" : "🔈";
    toggleBtn.addEventListener("click", () => {
      soundEnabled = !soundEnabled;
      toggleBtn.textContent = soundEnabled ? "🔊" : "🔈";
    });
  }

  const viewHist = document.getElementById("view-history-btn");
  if (viewHist) viewHist.addEventListener("click", () => loadHistory());
});

/* Keyboard: Enter submits, Esc replays word */
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (document.getElementById("game")?.classList.contains("active")) {
      e.preventDefault();
      checkAnswer();
    } else if (document.getElementById("home")?.classList.contains("active")) {
      startGameIntro();
    }
  } else if (e.key === "Escape") {
    if (document.getElementById("game")?.classList.contains("active")) {
      playWord();
    }
  }
});

(function init() {
  const toggleBtn = document.getElementById("toggle-sound-btn");
  if (toggleBtn) toggleBtn.textContent = soundEnabled ? "🔊" : "🔈";
  const progressFill = document.getElementById("progress-fill");
  if (progressFill) progressFill.style.width = "0%";
})();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then(() => console.log('Service Worker registered'))
    .catch(err => console.log('Service Worker registration failed'));
}
