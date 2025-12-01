/* ==============================
   FULL game script (Option C)
   — full features + 1-sentence definition hints (Easy only)
   ============================== */

/* ---------------- Globals (kept from your current script) ---------------- */
let kidName = "";
let currentCategory = "";
let difficulty = "";
let words = [];
let currentIndex = 0;
let score = 0;
let currentHint = "";
let soundEnabled = true;
let wordAttempts = []; // Stores {word, userInput, correct} for each attempt

/* ---------------- Word Bank (unchanged) ---------------- */
const wordBank = {
  Name: {
    Easy: [
      "boy","girl","man","woman","baby","friend","teacher","doctor","nurse","farmer",
      "student","driver","singer","dancer","baker"
    ],
    Difficult: [
      "cook","painter","police","waiter","janitor","gardener","pilot","soldier","artist",
      "tailor","librarian","mechanic","carpenter","butcher","cashier"
    ]
  },
  Place: {
    Easy: [
      "zoo","park","farm","lake","city","town","beach","store","river","desert",
      "garden","forest","bakery","castle","circus"
    ],
    Difficult: [
      "country","school","museum","hospital","campsite","airport","library","aquarium",
      "playground","fire station","post office","train station","police station",
      "mountain","ocean"
    ]
  },
  Thing: {
    Easy: [
      "ball","cup","book","pen","hat","bed","chair","shoe","clock","door",
      "table","window","apple","bread","plate"
    ],
    Difficult: [
      "spoon","fork","bottle","pillow","blanket","backpack","bicycle","camera",
      "hammer","toothbrush","magazine","calculator","ruler","telescope","microscope"
    ]
  },
  Animal: {
    Easy: [
      "cat","dog","pig","cow","hen","fish","fox","duck","bird","frog",
      "goat","lion","sheep","mouse","rabbit"
    ],
    Difficult: [
      "chicken","turtle","tiger","snake","horse","zebra","ostrich","monkey","carabao",
      "giraffe","butterfly","elephant","caterpillar","cockroach","crocodile"
    ]
  },
  Event: {
    Easy: [
      "gala","bash","ball","prom","expo","rally","feast","brunch","social","fete",
      "summit","jubilee","retreat","potluck","pageant"
    ],
    Difficult: [
      "concert","assembly","festival","workshop","thanksgiving","symposium","colloquium",
      "convention","conference","exhibition","celebration","inauguration","presentation",
      "commemoration","consecration"
    ]
  }
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

/* ---------------- Definitions (1-sentence hints - EASY ONLY) ---------------- */
const definitions = {
  // NAME – EASY
  boy: "A young male child.",
  girl: "A young female child.",
  man: "An adult male.",
  woman: "An adult female.",
  baby: "A very young child.",
  friend: "A person you like and care about.",
  teacher: "A person who helps students learn.",
  doctor: "A person who treats sick or injured people.",
  nurse: "A person who cares for patients in a hospital.",
  farmer: "A person who grows crops or raises animals.",
  student: "A person who studies or attends school.",
  driver: "A person who drives a vehicle.",
  singer: "A person who sings songs.",
  dancer: "A person who dances to music.",
  baker: "A person who makes bread, cakes, and pastries.",

  // PLACE – EASY
  zoo: "A place where animals are kept and shown to people.",
  park: "A green outdoor area for fun and relaxation.",
  farm: "A place where crops are grown or animals are raised.",
  lake: "A large body of fresh water surrounded by land.",
  city: "A large and busy town.",
  town: "A place where people live, smaller than a city.",
  beach: "A sandy area beside the sea.",
  store: "A place where you can buy things.",
  river: "A long stream of flowing water.",
  desert: "A very dry and sandy area.",
  garden: "A place where plants, flowers, or vegetables are grown.",
  forest: "A large area filled with trees.",
  bakery: "A store that sells bread, cakes, and pastries.",
  castle: "A large and old fortress or building.",
  circus: "A show with clowns, acrobats, and animals.",

  // THING – EASY
  ball: "A round object used for games or sports.",
  cup: "A small container used for drinking.",
  book: "A set of written pages bound together.",
  pen: "A tool used for writing with ink.",
  hat: "A piece of clothing worn on the head.",
  bed: "A piece of furniture used for sleeping.",
  chair: "A seat for one person.",
  shoe: "A covering worn on the foot.",
  clock: "A device that shows the time.",
  door: "A movable barrier that opens and closes an entrance.",
  table: "A piece of furniture with a flat top.",
  window: "An opening in a wall to let light or air in.",
  apple: "A round fruit that is red, green, or yellow.",
  bread: "A food made from baked dough.",
  plate: "A flat dish used for eating from.",

  // ANIMAL – EASY
  cat: "A small furry pet that often lives indoors.",
  dog: "A loyal animal often kept as a pet.",
  pig: "A farm animal with a round body and short legs.",
  cow: "A large farm animal that gives milk.",
  hen: "A female chicken that lays eggs.",
  fish: "An animal that lives in water and swims.",
  fox: "A small wild animal with a bushy tail.",
  duck: "A water bird with a flat beak.",
  bird: "An animal with feathers that can usually fly.",
  frog: "An animal that lives on land and in water.",
  goat: "A farm animal with horns and a beard.",
  lion: "A big wild cat known as the king of the jungle.",
  sheep: "A farm animal covered with wool.",
  mouse: "A small rodent with a long tail.",
  rabbit: "A small animal with long ears that hops.",

  // EVENT – EASY
  gala: "A special and elegant party or celebration.",
  bash: "A lively party or celebration.",
  ball: "A formal dance party.",
  prom: "A formal dance for students at the end of school year.",
  expo: "A large event showing new products or ideas.",
  rally: "A gathering of people for a purpose.",
  feast: "A large and special meal.",
  brunch: "A meal eaten between breakfast and lunch.",
  social: "A friendly gathering for fun or conversation.",
  fete: "A festive outdoor celebration.",
  summit: "A high-level meeting of leaders.",
  jubilee: "A special anniversary celebration.",
  retreat: "A peaceful event for rest or reflection.",
  potluck: "A meal where everyone brings a dish to share.",
  pageant: "A public show or parade, often with costumes."
};

/* ---------------- Speech & Effects ---------------- */
function speak(text, opts = {}) {
  if (!soundEnabled) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = opts.rate || 1.05;
  utter.pitch = opts.pitch || 1.6; // kid-like
  utter.lang = opts.lang || "en-US";
  try {
    speechSynthesis.cancel();
    speechSynthesis.speak(utter);
  } catch (e) {
    // ignore
  }
}

const audioCtx = (window.AudioContext || window.webkitAudioContext) ? new (window.AudioContext || window.webkitAudioContext)() : null;
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
  // prepare words
  words = [...(wordBank[currentCategory][difficulty] || [])];
  if (!words || words.length === 0) {
    alert("No words available for this category/level.");
    return;
  }
  // shuffle
  words = words.sort(() => Math.random() - 0.5);
  currentIndex = 0;
  score = 0;
  currentHint = "";
  wordAttempts = []; // Reset word attempts for new game
  updateUIHeader();
  el("answer").value = "";
  el("feedback").textContent = "";
  el("word-hint").textContent = "";
  
  showSection("game");
  // small cue
  if (soundEnabled) beep(880, 0.06, "sine");
  setTimeout(()=> playWord(true), 150);
}

function updateUIHeader(){
  el("category-title").textContent = `${currentCategory} — ${difficulty}`;
  el("progress-text").textContent = `${currentIndex+1} / ${words.length}`;
  const pct = Math.round((currentIndex / Math.max(1, words.length)) * 100);
  const fill = el("progress-fill");
  if (fill) fill.style.width = `${pct}%`;
  el("score").textContent = `Score: ${score} / ${words.length}`;
  el("game-character").textContent = pickCharacterForCategory(currentCategory);
}

function pickCharacterForCategory(cat){
  const map = { Name:"🧒", Place:"🌍", Thing:"🎁", Event:"🎉", Animal:"🐶" };
  return map[cat] || "🧠";
}

/* ---------------- Play current word (uses definitions as hint for Easy only) ---------------- */
function playWord(isNew=false) {
  if (!words.length) return;
  const word = words[currentIndex];

  // Show single-sentence definition as hint (only for Easy difficulty)
  if (difficulty === "Easy") {
    const def = definitions[word.toLowerCase()] || "No hint available.";
    el("word-hint").textContent = `Hint: ${def}`;
  } else {
    el("word-hint").textContent = "";
  }

  // speak the word
  speak(word, { rate: 0.95, pitch: 1.6 });
  if (soundEnabled) beep(600, 0.06, "triangle");

  // update progress header (in case called directly)
  updateUIHeader();
}

/* ---------------- Check answer ---------------- */
function checkAnswer() {
  const raw = el("answer").value.trim();
  if (!raw) return;
  const answer = raw.toLowerCase();
  const correct = words[currentIndex].toLowerCase();
  const feed = el("feedback");

  if (answer === correct) {
    // correct
    score++;
    feed.textContent = `✅ Great job, ${kidName}! "${correct}" is correct.`;
    feed.style.color = "var(--good)" || "green";
    animateCorrect();
    if (soundEnabled) { beep(880, 0.08, "sine"); bePlaySuccessTune(); }
    // Track correct attempt
    wordAttempts.push({word: correct, userInput: answer, correct: true});
  } else {
    // wrong
    feed.textContent = `❌ Oops! The correct word was "${correct}".`;
    feed.style.color = "var(--bad)" || "red";
    animateWrong();
    if (soundEnabled) { beep(180, 0.12, "sawtooth"); }
    // Track wrong attempt
    wordAttempts.push({word: correct, userInput: answer, correct: false});
  }

  // update UI and move on
  el("score").textContent = `Score: ${score} / ${words.length}`;
  el("answer").value = "";
  // small delay before next
  setTimeout(()=> nextWord(), 900);
}

/* ---------------- Skip word ---------------- */
function skipWord(){
  const correct = words[currentIndex];
  el("feedback").textContent = `⏭ Skipped. The word was "${correct}".`;
  el("feedback").style.color = "var(--muted)" || "#666";
  if (soundEnabled) beep(220, 0.06, "square");
  // Track skipped word as wrong with empty input
  wordAttempts.push({word: correct, userInput: "(skipped)", correct: false});
  setTimeout(()=> nextWord(), 700);
}

/* ---------------- Next ---------------- */
function nextWord(){
  currentIndex++;
  currentHint = "";
  el("word-hint").textContent = "";
  el("feedback").textContent = "";
  updateUIHeader();

  if (currentIndex < words.length) {
    setTimeout(()=> playWord(true), 250);
  } else {
    showResult();
  }
}

/* ---------------- Show result and save performance ---------------- */
function showResult(){
  el("final-name").textContent = kidName;

  let message = "";
  if (score >= 8) {
    message = `🎉 GREAT JOB! You scored ${score} out of ${words.length}! 🎉`;
  } else {
    message = `😅 Better luck next time. You scored ${score} out of ${words.length}.`;
  }

  el("final-score").textContent = message;
  showSection("result");

  // Speak only if the score is 8 or above
  if (score >= 8) {
    speak(`Great job ${kidName}, you got ${score} correct!`);
    if (soundEnabled) bePlaySuccessTune();
  } else {
    speak(`You scored ${score} out of ${words.length}. Better luck next time, ${kidName}.`);
  }

  savePerformance();
}


/* ---------------- Restart ---------------- */
function restart(){
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
function animateCorrect(){
  const fb = el("feedback");
  if (!fb) return;
  fb.classList.remove("wrong");
  void fb.offsetWidth;
  fb.classList.add("correct");
  setTimeout(()=> fb.classList.remove("correct"), 700);
}
function animateWrong(){
  const fb = el("feedback");
  if (!fb) return;
  fb.classList.remove("correct");
  void fb.offsetWidth;
  fb.classList.add("wrong");
  setTimeout(()=> fb.classList.remove("wrong"), 700);
}

/* ---------------- Success tune ---------------- */
function bePlaySuccessTune(){
  if (!audioCtx || !soundEnabled) return;
  const now = audioCtx.currentTime;
  const freqs = [880, 1047, 1318];
  freqs.forEach((f,i)=>{
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.frequency.value = f;
    o.type = i % 2 === 0 ? "sine" : "triangle";
    o.connect(g); g.connect(audioCtx.destination);
    g.gain.value = 0.001;
    o.start(now + i*0.08);
    g.gain.exponentialRampToValueAtTime(0.12, now + i*0.08 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, now + i*0.08 + 0.2);
    o.stop(now + i*0.08 + 0.22);
  });
}

/* ---------------- LocalStorage: Save + Load History ---------------- */
function savePerformance(){
  try {
    const record = {
      name: kidName,
      category: currentCategory,
      difficulty,
      score,
      total: words.length,
      date: new Date().toLocaleString(),
      attempts: wordAttempts // Include all word attempts
    };
    let history = JSON.parse(localStorage.getItem("spf_history") || "[]");
    history.push(record);
    localStorage.setItem("spf_history", JSON.stringify(history));
  } catch(e){
    console.error("Save error", e);
  }
}

function loadHistory(){
  const history = JSON.parse(localStorage.getItem("spf_history") || "[]");
  const container = el("history-list");
  if (!history.length) {
    container.innerHTML = "<p>No history yet. Play a game to save results!</p>";
    showSection("history");
    return;
  }
  const rows = history.slice().reverse().map((r,idx)=> {
    // Build word attempts details
    let attemptsHTML = '';
    if (r.attempts && r.attempts.length > 0) {
      attemptsHTML = '<div style="margin-top:8px; font-size:0.85rem; background:rgba(255,255,255,0.7); padding:8px; border-radius:6px;">';
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

function clearHistory(){
  if (!confirm("Clear all saved performance history?")) return;
  localStorage.removeItem("spf_history");
  loadHistory();
}

/* ---------------- Extra UI helpers ---------------- */
function openHowTo(){ showSection("howto"); }

/* ---------------- Event listeners (safe init) ---------------- */
function safeGet(id) {
  const elNode = document.getElementById(id);
  if (!elNode) {
    console.warn("Missing element:", id);
  }
  return elNode;
}

/* Hook up buttons if present (no crash if DOM not fully loaded yet) */
document.addEventListener("DOMContentLoaded", ()=> {
  const toggleBtn = safeGet("toggle-sound-btn");
  if (toggleBtn) {
    toggleBtn.textContent = soundEnabled ? "🔊" : "🔈";
    toggleBtn.addEventListener("click", ()=>{
      soundEnabled = !soundEnabled;
      toggleBtn.textContent = soundEnabled ? "🔊" : "🔈";
    });
  }

  const viewHist = safeGet("view-history-btn");
  if (viewHist) viewHist.addEventListener("click", ()=> loadHistory());

  const checkBtn = safeGet("check-btn");
  if (checkBtn) checkBtn.addEventListener("click", ()=> checkAnswer());

  const repeatBtn = safeGet("repeat-btn");
  if (repeatBtn) repeatBtn.addEventListener("click", ()=> playWord());

  const skipBtn = safeGet("skip-btn");
  if (skipBtn) skipBtn.addEventListener("click", ()=> skipWord());

  const restartBtn = safeGet("restart-btn");
  if (restartBtn) restartBtn.addEventListener("click", ()=> restart());

  const startBtn = safeGet("start-btn");
  if (startBtn) startBtn.addEventListener("click", ()=> startGameIntro());
});

/* Keyboard: Enter submits answer, Esc repeats word */
document.addEventListener("keydown", (e)=>{
  if (e.key === "Enter") {
    if (document.getElementById("game") && document.getElementById("game").classList.contains("active")) {
      e.preventDefault();
      checkAnswer();
    } else if (document.getElementById("home") && document.getElementById("home").classList.contains("active")) {
      startGameIntro();
    }
  } else if (e.key === "Escape") {
    if (document.getElementById("game") && document.getElementById("game").classList.contains("active")) {
      playWord();
    }
  }
});

/* init small UI defaults if elements exist */
(function init(){
  const toggleBtn = document.getElementById("toggle-sound-btn");
  if (toggleBtn) toggleBtn.textContent = soundEnabled ? "🔊" : "🔈";
  const progressFill = document.getElementById("progress-fill");
  if (progressFill) progressFill.style.width = "0%";
})();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then(reg => console.log('Service Worker registered'))
    .catch(err => console.log('Service Worker registration failed'));
}