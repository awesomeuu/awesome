let kidName = "";
let currentCategory = "";
let difficulty = "";
let words = [];
let currentIndex = 0;
let score = 0;
let currentHint = "";
let soundEnabled = true;
let wordAttempts = [];

const wordBank = {
  Name: {
    Easy: ["boy","girl","man","woman","baby","friend","teacher","doctor","nurse","farmer","student","driver","singer","dancer","baker"],
    Difficult: ["cook","painter","police","waiter","janitor","gardener","pilot","soldier","artist","tailor","librarian","mechanic","carpenter","butcher","cashier"]
  },
  Place: {
    Easy: ["zoo","park","farm","lake","city","town","beach","store","river","desert","garden","forest","bakery","castle","circus"],
    Difficult: ["country","school","museum","hospital","campsite","airport","library","aquarium","playground","fire station","post office","train station","police station","mountain","ocean"]
  },
  Thing: {
    Easy: ["ball","cup","book","pen","hat","bed","chair","shoe","clock","door","table","window","apple","bread","plate"],
    Difficult: ["spoon","fork","bottle","pillow","blanket","backpack","bicycle","camera","hammer","toothbrush","magazine","calculator","ruler","telescope","microscope"]
  },
  Animal: {
    Easy: ["cat","dog","pig","cow","hen","fish","fox","duck","bird","frog","goat","lion","sheep","mouse","rabbit"],
    Difficult: ["chicken","turtle","tiger","snake","horse","zebra","ostrich","monkey","carabao","giraffe","butterfly","elephant","caterpillar","cockroach","crocodile"]
  },
  Event: {
    Easy: ["gala","bash","ball","prom","expo","rally","feast","brunch","social","fete","summit","jubilee","retreat","potluck","pageant"],
    Difficult: ["concert","assembly","festival","workshop","thanksgiving","symposium","colloquium","convention","conference","exhibition","celebration","inauguration","presentation","commemoration","consecration"]
  }
};

/* ── PHONETIC DATA ── */
const phoneticData = {
  boy:{ipa:"/bɔɪ/",syllables:"boy"},girl:{ipa:"/ɡɜːrl/",syllables:"girl"},
  man:{ipa:"/mæn/",syllables:"man"},woman:{ipa:"/ˈwʊm.ən/",syllables:"wom·an"},
  baby:{ipa:"/ˈbeɪ.bi/",syllables:"ba·by"},friend:{ipa:"/frɛnd/",syllables:"friend"},
  teacher:{ipa:"/ˈtiː.tʃər/",syllables:"teach·er"},doctor:{ipa:"/ˈdɒk.tər/",syllables:"doc·tor"},
  nurse:{ipa:"/nɜːrs/",syllables:"nurse"},farmer:{ipa:"/ˈfɑːr.mər/",syllables:"farm·er"},
  student:{ipa:"/ˈstjuː.dənt/",syllables:"stu·dent"},driver:{ipa:"/ˈdraɪ.vər/",syllables:"driv·er"},
  singer:{ipa:"/ˈsɪŋ.ər/",syllables:"sing·er"},dancer:{ipa:"/ˈdæn.sər/",syllables:"danc·er"},
  baker:{ipa:"/ˈbeɪ.kər/",syllables:"bak·er"},cook:{ipa:"/kʊk/",syllables:"cook"},
  painter:{ipa:"/ˈpeɪn.tər/",syllables:"paint·er"},police:{ipa:"/pəˈliːs/",syllables:"po·lice"},
  waiter:{ipa:"/ˈweɪ.tər/",syllables:"wait·er"},janitor:{ipa:"/ˈdʒæn.ɪ.tər/",syllables:"jan·i·tor"},
  gardener:{ipa:"/ˈɡɑːr.də.nər/",syllables:"gar·den·er"},pilot:{ipa:"/ˈpaɪ.lət/",syllables:"pi·lot"},
  soldier:{ipa:"/ˈsoʊl.dʒər/",syllables:"sol·dier"},artist:{ipa:"/ˈɑːr.tɪst/",syllables:"art·ist"},
  tailor:{ipa:"/ˈteɪ.lər/",syllables:"tai·lor"},librarian:{ipa:"/laɪˈbrɛr.i.ən/",syllables:"li·brar·i·an"},
  mechanic:{ipa:"/məˈkæn.ɪk/",syllables:"me·chan·ic"},carpenter:{ipa:"/ˈkɑːr.pən.tər/",syllables:"car·pen·ter"},
  butcher:{ipa:"/ˈbʊtʃ.ər/",syllables:"butch·er"},cashier:{ipa:"/kæˈʃɪər/",syllables:"cash·ier"},
  zoo:{ipa:"/zuː/",syllables:"zoo"},park:{ipa:"/pɑːrk/",syllables:"park"},
  farm:{ipa:"/fɑːrm/",syllables:"farm"},lake:{ipa:"/leɪk/",syllables:"lake"},
  city:{ipa:"/ˈsɪt.i/",syllables:"cit·y"},town:{ipa:"/taʊn/",syllables:"town"},
  beach:{ipa:"/biːtʃ/",syllables:"beach"},store:{ipa:"/stɔːr/",syllables:"store"},
  river:{ipa:"/ˈrɪv.ər/",syllables:"riv·er"},desert:{ipa:"/ˈdɛz.ərt/",syllables:"des·ert"},
  garden:{ipa:"/ˈɡɑːr.dən/",syllables:"gar·den"},forest:{ipa:"/ˈfɒr.ɪst/",syllables:"for·est"},
  bakery:{ipa:"/ˈbeɪ.kər.i/",syllables:"bak·er·y"},castle:{ipa:"/ˈkɑːs.əl/",syllables:"cas·tle"},
  circus:{ipa:"/ˈsɜːr.kəs/",syllables:"cir·cus"},country:{ipa:"/ˈkʌn.tri/",syllables:"coun·try"},
  school:{ipa:"/skuːl/",syllables:"school"},museum:{ipa:"/mjuːˈziː.əm/",syllables:"mu·se·um"},
  hospital:{ipa:"/ˈhɒs.pɪ.təl/",syllables:"hos·pi·tal"},campsite:{ipa:"/ˈkæmp.saɪt/",syllables:"camp·site"},
  airport:{ipa:"/ˈɛər.pɔːrt/",syllables:"air·port"},library:{ipa:"/ˈlaɪ.brər.i/",syllables:"li·brar·y"},
  aquarium:{ipa:"/əˈkwɛr.i.əm/",syllables:"a·quar·i·um"},playground:{ipa:"/ˈpleɪ.ɡraʊnd/",syllables:"play·ground"},
  "fire station":{ipa:"/ˈfaɪər ˌsteɪ.ʃən/",syllables:"fire sta·tion"},
  "post office":{ipa:"/ˈpoʊst ˌɒf.ɪs/",syllables:"post of·fice"},
  "train station":{ipa:"/ˈtreɪn ˌsteɪ.ʃən/",syllables:"train sta·tion"},
  "police station":{ipa:"/pəˈliːs ˌsteɪ.ʃən/",syllables:"po·lice sta·tion"},
  mountain:{ipa:"/ˈmaʊn.tən/",syllables:"moun·tain"},ocean:{ipa:"/ˈoʊ.ʃən/",syllables:"o·cean"},
  ball:{ipa:"/bɔːl/",syllables:"ball"},cup:{ipa:"/kʌp/",syllables:"cup"},
  book:{ipa:"/bʊk/",syllables:"book"},pen:{ipa:"/pɛn/",syllables:"pen"},
  hat:{ipa:"/hæt/",syllables:"hat"},bed:{ipa:"/bɛd/",syllables:"bed"},
  chair:{ipa:"/tʃɛər/",syllables:"chair"},shoe:{ipa:"/ʃuː/",syllables:"shoe"},
  clock:{ipa:"/klɒk/",syllables:"clock"},door:{ipa:"/dɔːr/",syllables:"door"},
  table:{ipa:"/ˈteɪ.bəl/",syllables:"ta·ble"},window:{ipa:"/ˈwɪn.doʊ/",syllables:"win·dow"},
  apple:{ipa:"/ˈæp.əl/",syllables:"ap·ple"},bread:{ipa:"/brɛd/",syllables:"bread"},
  plate:{ipa:"/pleɪt/",syllables:"plate"},spoon:{ipa:"/spuːn/",syllables:"spoon"},
  fork:{ipa:"/fɔːrk/",syllables:"fork"},bottle:{ipa:"/ˈbɒt.əl/",syllables:"bot·tle"},
  pillow:{ipa:"/ˈpɪl.oʊ/",syllables:"pil·low"},blanket:{ipa:"/ˈblæŋ.kɪt/",syllables:"blan·ket"},
  backpack:{ipa:"/ˈbæk.pæk/",syllables:"back·pack"},bicycle:{ipa:"/ˈbaɪ.sɪ.kəl/",syllables:"bi·cy·cle"},
  camera:{ipa:"/ˈkæm.ər.ə/",syllables:"cam·er·a"},hammer:{ipa:"/ˈhæm.ər/",syllables:"ham·mer"},
  toothbrush:{ipa:"/ˈtuːθ.brʌʃ/",syllables:"tooth·brush"},magazine:{ipa:"/ˌmæɡ.əˈziːn/",syllables:"mag·a·zine"},
  calculator:{ipa:"/ˈkæl.kjʊ.leɪ.tər/",syllables:"cal·cu·la·tor"},ruler:{ipa:"/ˈruː.lər/",syllables:"ru·ler"},
  telescope:{ipa:"/ˈtɛl.ɪ.skoʊp/",syllables:"tel·e·scope"},microscope:{ipa:"/ˈmaɪ.krə.skoʊp/",syllables:"mi·cro·scope"},
  cat:{ipa:"/kæt/",syllables:"cat"},dog:{ipa:"/dɒɡ/",syllables:"dog"},
  pig:{ipa:"/pɪɡ/",syllables:"pig"},cow:{ipa:"/kaʊ/",syllables:"cow"},
  hen:{ipa:"/hɛn/",syllables:"hen"},fish:{ipa:"/fɪʃ/",syllables:"fish"},
  fox:{ipa:"/fɒks/",syllables:"fox"},duck:{ipa:"/dʌk/",syllables:"duck"},
  bird:{ipa:"/bɜːrd/",syllables:"bird"},frog:{ipa:"/frɒɡ/",syllables:"frog"},
  goat:{ipa:"/ɡoʊt/",syllables:"goat"},lion:{ipa:"/ˈlaɪ.ən/",syllables:"li·on"},
  sheep:{ipa:"/ʃiːp/",syllables:"sheep"},mouse:{ipa:"/maʊs/",syllables:"mouse"},
  rabbit:{ipa:"/ˈræb.ɪt/",syllables:"rab·bit"},chicken:{ipa:"/ˈtʃɪk.ɪn/",syllables:"chick·en"},
  turtle:{ipa:"/ˈtɜːr.təl/",syllables:"tur·tle"},tiger:{ipa:"/ˈtaɪ.ɡər/",syllables:"ti·ger"},
  snake:{ipa:"/sneɪk/",syllables:"snake"},horse:{ipa:"/hɔːrs/",syllables:"horse"},
  zebra:{ipa:"/ˈziː.brə/",syllables:"ze·bra"},ostrich:{ipa:"/ˈɒs.trɪtʃ/",syllables:"os·trich"},
  monkey:{ipa:"/ˈmʌŋ.ki/",syllables:"mon·key"},carabao:{ipa:"/ˌkær.əˈbaʊ/",syllables:"car·a·bao"},
  giraffe:{ipa:"/dʒɪˈræf/",syllables:"gi·raffe"},butterfly:{ipa:"/ˈbʌt.ər.flaɪ/",syllables:"but·ter·fly"},
  elephant:{ipa:"/ˈɛl.ɪ.fənt/",syllables:"el·e·phant"},caterpillar:{ipa:"/ˈkæt.ər.pɪl.ər/",syllables:"cat·er·pil·lar"},
  cockroach:{ipa:"/ˈkɒk.roʊtʃ/",syllables:"cock·roach"},crocodile:{ipa:"/ˈkrɒk.ə.daɪl/",syllables:"croc·o·dile"},
  gala:{ipa:"/ˈɡeɪ.lə/",syllables:"ga·la"},bash:{ipa:"/bæʃ/",syllables:"bash"},
  prom:{ipa:"/prɒm/",syllables:"prom"},expo:{ipa:"/ˈɛk.spoʊ/",syllables:"ex·po"},
  rally:{ipa:"/ˈræl.i/",syllables:"ral·ly"},feast:{ipa:"/fiːst/",syllables:"feast"},
  brunch:{ipa:"/brʌntʃ/",syllables:"brunch"},social:{ipa:"/ˈsoʊ.ʃəl/",syllables:"so·cial"},
  fete:{ipa:"/feɪt/",syllables:"fete"},summit:{ipa:"/ˈsʌm.ɪt/",syllables:"sum·mit"},
  jubilee:{ipa:"/ˈdʒuː.bɪ.liː/",syllables:"ju·bi·lee"},retreat:{ipa:"/rɪˈtriːt/",syllables:"re·treat"},
  potluck:{ipa:"/ˈpɒt.lʌk/",syllables:"pot·luck"},pageant:{ipa:"/ˈpædʒ.ənt/",syllables:"pag·eant"},
  concert:{ipa:"/ˈkɒn.sɜːrt/",syllables:"con·cert"},assembly:{ipa:"/əˈsɛm.bli/",syllables:"as·sem·bly"},
  festival:{ipa:"/ˈfɛs.tɪ.vəl/",syllables:"fes·ti·val"},workshop:{ipa:"/ˈwɜːrk.ʃɒp/",syllables:"work·shop"},
  thanksgiving:{ipa:"/ˌθæŋksˈɡɪv.ɪŋ/",syllables:"thanks·giv·ing"},symposium:{ipa:"/sɪmˈpoʊ.zi.əm/",syllables:"sym·po·si·um"},
  colloquium:{ipa:"/kəˈloʊ.kwi.əm/",syllables:"col·lo·qui·um"},convention:{ipa:"/kənˈvɛn.ʃən/",syllables:"con·ven·tion"},
  conference:{ipa:"/ˈkɒn.fər.əns/",syllables:"con·fer·ence"},exhibition:{ipa:"/ˌɛk.sɪˈbɪʃ.ən/",syllables:"ex·hi·bi·tion"},
  celebration:{ipa:"/ˌsɛl.ɪˈbreɪ.ʃən/",syllables:"cel·e·bra·tion"},inauguration:{ipa:"/ɪˌnɔː.ɡjʊˈreɪ.ʃən/",syllables:"in·au·gu·ra·tion"},
  presentation:{ipa:"/ˌprɛz.ənˈteɪ.ʃən/",syllables:"pres·en·ta·tion"},commemoration:{ipa:"/kəˌmɛm.əˈreɪ.ʃən/",syllables:"com·mem·o·ra·tion"},
  consecration:{ipa:"/ˌkɒn.sɪˈkreɪ.ʃən/",syllables:"con·se·cra·tion"}
};

/* ── PHONETIC AUDIO: word → letters → word ── */
function playPhoneticSequence(word) {
  if (!soundEnabled) return;
  speechSynthesis.cancel();

  const utterances = [];

  // 1. Say full word
  const u1 = new SpeechSynthesisUtterance(word);
  u1.rate = 0.80; u1.pitch = 1.5; u1.lang = "en-US";
  utterances.push(u1);

  // 2. Repeat full word
  const u3 = new SpeechSynthesisUtterance(word);
  u3.rate = 0.80; u3.pitch = 1.5; u3.lang = "en-US";
  utterances.push(u3);

  // Chain sequentially
  utterances.forEach((u, i) => {
    u.onend = () => { if (i + 1 < utterances.length) speechSynthesis.speak(utterances[i + 1]); };
  });
  speechSynthesis.speak(utterances[0]);
}

/* ── PHONETIC VISUAL DISPLAY ── */
function showPhoneticDisplay(word) {
  const key = word.toLowerCase();
  const data = phoneticData[key];

  let phoneticEl = document.getElementById("phonetic-display");
  if (!phoneticEl) {
    phoneticEl = document.createElement("div");
    phoneticEl.id = "phonetic-display";
    phoneticEl.style.cssText = "display:flex;align-items:center;gap:10px;justify-content:center;margin:8px 0 4px;flex-wrap:wrap;";
    const gameTop = document.getElementById("game-top");
    if (gameTop && gameTop.parentNode) {
      gameTop.parentNode.insertBefore(phoneticEl, gameTop.nextSibling);
    }
  }

  if (data) {
    phoneticEl.innerHTML = `
      <span style="background:linear-gradient(135deg,#dbeafe,#bfdbfe);border:2px solid #93c5fd;border-radius:10px;padding:5px 14px;font-size:1.05rem;font-weight:800;color:#1e3a8a;letter-spacing:3px;">${data.syllables}</span>
      <span style="background:linear-gradient(135deg,#fef9c3,#fde68a);border:2px solid #fbbf24;border-radius:10px;padding:5px 14px;font-size:0.9rem;font-weight:600;color:#78350f;font-family:serif;letter-spacing:1px;">${data.ipa}</span>
    `;
  } else {
    // fallback: letter tiles
    const tiles = word.split("").map(l =>
      l === " " ? `<span style="width:8px;display:inline-block"></span>` :
      `<span style="display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;background:linear-gradient(135deg,#dbeafe,#bfdbfe);border:2px solid #93c5fd;border-radius:8px;font-size:1rem;font-weight:800;color:#1e3a8a;text-transform:uppercase;">${l}</span>`
    ).join("");
    phoneticEl.innerHTML = `<div style="display:flex;gap:4px;flex-wrap:wrap;justify-content:center;">${tiles}</div>`;
  }
  phoneticEl.style.display = "flex";
}

/* ── DEFINITIONS ── */
const definitions = {
  boy:"A young male child.",girl:"A young female child.",man:"An adult male.",woman:"An adult female.",
  baby:"A very young child.",friend:"A person you like and care about.",teacher:"A person who helps students learn.",
  doctor:"A person who treats sick or injured people.",nurse:"A person who cares for patients in a hospital.",
  farmer:"A person who grows crops or raises animals.",student:"A person who studies or attends school.",
  driver:"A person who drives a vehicle.",singer:"A person who sings songs.",dancer:"A person who dances to music.",
  baker:"A person who makes bread, cakes, and pastries.",zoo:"A place where animals are kept and shown to people.",
  park:"A green outdoor area for fun and relaxation.",farm:"A place where crops are grown or animals are raised.",
  lake:"A large body of fresh water surrounded by land.",city:"A large and busy town.",
  town:"A place where people live, smaller than a city.",beach:"A sandy area beside the sea.",
  store:"A place where you can buy things.",river:"A long stream of flowing water.",
  desert:"A very dry and sandy area.",garden:"A place where plants, flowers, or vegetables are grown.",
  forest:"A large area filled with trees.",bakery:"A store that sells bread, cakes, and pastries.",
  castle:"A large and old fortress or building.",circus:"A show with clowns, acrobats, and animals.",
  ball:"A round object used for games or sports.",cup:"A small container used for drinking.",
  book:"A set of written pages bound together.",pen:"A tool used for writing with ink.",
  hat:"A piece of clothing worn on the head.",bed:"A piece of furniture used for sleeping.",
  chair:"A seat for one person.",shoe:"A covering worn on the foot.",clock:"A device that shows the time.",
  door:"A movable barrier that opens and closes an entrance.",table:"A piece of furniture with a flat top.",
  window:"An opening in a wall to let light or air in.",apple:"A round fruit that is red, green, or yellow.",
  bread:"A food made from baked dough.",plate:"A flat dish used for eating from.",
  cat:"A small furry pet that often lives indoors.",dog:"A loyal animal often kept as a pet.",
  pig:"A farm animal with a round body and short legs.",cow:"A large farm animal that gives milk.",
  hen:"A female chicken that lays eggs.",fish:"An animal that lives in water and swims.",
  fox:"A small wild animal with a bushy tail.",duck:"A water bird with a flat beak.",
  bird:"An animal with feathers that can usually fly.",frog:"An animal that lives on land and in water.",
  goat:"A farm animal with horns and a beard.",lion:"A big wild cat known as the king of the jungle.",
  sheep:"A farm animal covered with wool.",mouse:"A small rodent with a long tail.",
  rabbit:"A small animal with long ears that hops.",gala:"A special and elegant party or celebration.",
  bash:"A lively party or celebration.",prom:"A formal dance for students at end of school year.",
  expo:"A large event showing new products or ideas.",rally:"A gathering of people for a purpose.",
  feast:"A large and special meal.",brunch:"A meal eaten between breakfast and lunch.",
  social:"A friendly gathering for fun or conversation.",fete:"A festive outdoor celebration.",
  summit:"A high-level meeting of leaders.",jubilee:"A special anniversary celebration.",
  retreat:"A peaceful event for rest or reflection.",potluck:"A meal where everyone brings a dish to share.",
  pageant:"A public show or parade, often with costumes."
};

/* ── UTILITIES ── */
const el = id => document.getElementById(id);
const sections = () => document.querySelectorAll("section");

function showSection(id) {
  sections().forEach(s => s.classList.remove("active"));
  const sec = el(id);
  if (sec) sec.classList.add("active");
}

/* ── SPEECH & AUDIO ── */
function speak(text, opts = {}) {
  if (!soundEnabled) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = opts.rate || 1.05; utter.pitch = opts.pitch || 1.6; utter.lang = opts.lang || "en-US";
  try { speechSynthesis.cancel(); speechSynthesis.speak(utter); } catch(e) {}
}

const audioCtx = (window.AudioContext || window.webkitAudioContext)
  ? new (window.AudioContext || window.webkitAudioContext)() : null;

function beep(freq = 440, time = 0.06, type = "sine") {
  if (!soundEnabled || !audioCtx) return;
  const o = audioCtx.createOscillator(), g = audioCtx.createGain();
  o.type = type; o.frequency.value = freq; o.connect(g); g.connect(audioCtx.destination);
  g.gain.value = 0.001; o.start();
  g.gain.exponentialRampToValueAtTime(0.12, audioCtx.currentTime + 0.01);
  g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + time);
  o.stop(audioCtx.currentTime + time + 0.02);
}

/* ── GAME FLOW ── */
function startGameIntro() {
  kidName = el("kid-name").value.trim();
  if (!kidName) { alert("Please enter your name first!"); return; }
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
  words = [...(wordBank[currentCategory][difficulty] || [])];
  if (!words || words.length === 0) { alert("No words available."); return; }
  words = words.sort(() => Math.random() - 0.5);
  currentIndex = 0; score = 0; currentHint = ""; wordAttempts = [];
  updateUIHeader();
  el("answer").value = ""; el("feedback").textContent = ""; el("word-hint").textContent = "";
  const pd = document.getElementById("phonetic-display");
  if (pd) pd.innerHTML = "";
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
  el("game-character").textContent = ({Name:"🧒",Place:"🌍",Thing:"🎁",Event:"🎉",Animal:"🐶"})[currentCategory] || "🧠";
}

/* ── PLAY WORD ── */
function playWord(isNew = false) {
  if (!words.length) return;
  const word = words[currentIndex];
  if (difficulty === "Easy") {
    const def = definitions[word.toLowerCase()] || "No hint available.";
    el("word-hint").textContent = `Hint: ${def}`;
  } else {
    el("word-hint").textContent = "";
  }
  showPhoneticDisplay(word);
  if (soundEnabled) {
    beep(600, 0.06, "triangle");
    setTimeout(() => playPhoneticSequence(word), 80);
  }
  updateUIHeader();
}

/* ── CHECK ANSWER ── */
function checkAnswer() {
  const raw = el("answer").value.trim();
  if (!raw) return;
  const answer = raw.toLowerCase();
  const correct = words[currentIndex].toLowerCase();
  const feed = el("feedback");
  if (answer === correct) {
    score++;
    feed.textContent = `✅ Great job, ${kidName}! "${correct}" is correct.`;
    feed.style.color = "var(--good)";
    animateCorrect();
    if (soundEnabled) { beep(880, 0.08, "sine"); bePlaySuccessTune(); }
    wordAttempts.push({word:correct, userInput:answer, correct:true});
  } else {
    feed.textContent = `❌ Oops! The correct word was "${correct}".`;
    feed.style.color = "var(--bad)";
    animateWrong();
    if (soundEnabled) beep(180, 0.12, "sawtooth");
    wordAttempts.push({word:correct, userInput:answer, correct:false});
  }
  el("score").textContent = `Score: ${score} / ${words.length}`;
  el("answer").value = "";
  setTimeout(() => nextWord(), 900);
}

function skipWord() {
  const correct = words[currentIndex];
  el("feedback").textContent = `⏭ Skipped. The word was "${correct}".`;
  el("feedback").style.color = "var(--muted)";
  if (soundEnabled) beep(220, 0.06, "square");
  wordAttempts.push({word:correct, userInput:"(skipped)", correct:false});
  setTimeout(() => nextWord(), 700);
}

function nextWord() {
  currentIndex++; currentHint = "";
  el("word-hint").textContent = ""; el("feedback").textContent = "";
  const pd = document.getElementById("phonetic-display");
  if (pd) pd.innerHTML = "";
  updateUIHeader();
  if (currentIndex < words.length) { setTimeout(() => playWord(true), 250); }
  else { showResult(); }
}

function showResult() {
  el("final-name").textContent = kidName;
  const message = score >= 8
    ? `🎉 GREAT JOB! You scored ${score} out of ${words.length}! 🎉`
    : `😅 Better luck next time. You scored ${score} out of ${words.length}.`;
  el("final-score").textContent = message;
  showSection("result");
  if (score >= 8) { speak(`Great job ${kidName}, you got ${score} correct!`); if (soundEnabled) bePlaySuccessTune(); }
  else { speak(`You scored ${score} out of ${words.length}. Better luck next time, ${kidName}.`); }
  savePerformance();
}

function restart() {
  el("kid-name").value = ""; kidName = ""; currentCategory = ""; difficulty = "";
  words = []; currentIndex = 0; score = 0; currentHint = "";
  showSection("home");
}

function animateCorrect() {
  const fb = el("feedback"); if (!fb) return;
  fb.classList.remove("wrong"); void fb.offsetWidth; fb.classList.add("correct");
  setTimeout(() => fb.classList.remove("correct"), 700);
}
function animateWrong() {
  const fb = el("feedback"); if (!fb) return;
  fb.classList.remove("correct"); void fb.offsetWidth; fb.classList.add("wrong");
  setTimeout(() => fb.classList.remove("wrong"), 700);
}

function bePlaySuccessTune() {
  if (!audioCtx || !soundEnabled) return;
  const now = audioCtx.currentTime;
  [880, 1047, 1318].forEach((f, i) => {
    const o = audioCtx.createOscillator(), g = audioCtx.createGain();
    o.frequency.value = f; o.type = i % 2 === 0 ? "sine" : "triangle";
    o.connect(g); g.connect(audioCtx.destination); g.gain.value = 0.001;
    o.start(now + i * 0.08);
    g.gain.exponentialRampToValueAtTime(0.12, now + i * 0.08 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.2);
    o.stop(now + i * 0.08 + 0.22);
  });
}

function savePerformance() {
  try {
    const record = { name:kidName, category:currentCategory, difficulty, score, total:words.length, date:new Date().toLocaleString(), attempts:wordAttempts };
    let history = JSON.parse(localStorage.getItem("spf_history") || "[]");
    history.push(record);
    localStorage.setItem("spf_history", JSON.stringify(history));
  } catch(e) { console.error("Save error", e); }
}

function loadHistory() {
  const history = JSON.parse(localStorage.getItem("spf_history") || "[]");
  const container = el("history-list");
  if (!history.length) { container.innerHTML = "<p>No history yet. Play a game to save results!</p>"; showSection("history"); return; }
  const rows = history.slice().reverse().map(r => {
    let attemptsHTML = '';
    if (r.attempts && r.attempts.length > 0) {
      attemptsHTML = '<div style="margin-top:8px;font-size:0.85rem;background:rgba(255,255,255,0.7);padding:8px;border-radius:6px;"><strong>Words:</strong><br>';
      r.attempts.forEach(att => {
        const icon = att.correct ? '✅' : '❌';
        const color = att.correct ? 'var(--good)' : 'var(--bad)';
        attemptsHTML += `<span style="color:${color}">${icon} <strong>${att.word}</strong>: ${att.userInput}</span><br>`;
      });
      attemptsHTML += '</div>';
    }
    return `<div class="history-item"><strong>${r.name}</strong> • ${r.category} (${r.difficulty})<br>Score: <strong>${r.score}/${r.total}</strong> • <small>${r.date}</small>${attemptsHTML}</div>`;
  }).join("");
  container.innerHTML = rows;
  showSection("history");
}

function clearHistory() {
  if (!confirm("Clear all saved performance history?")) return;
  localStorage.removeItem("spf_history"); loadHistory();
}

function openHowTo() { showSection("howto"); }

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggle-sound-btn");
  if (toggleBtn) {
    toggleBtn.textContent = soundEnabled ? "🔊" : "🔈";
    toggleBtn.addEventListener("click", () => { soundEnabled = !soundEnabled; toggleBtn.textContent = soundEnabled ? "🔊" : "🔈"; });
  }
  const viewHist = document.getElementById("view-history-btn");
  if (viewHist) viewHist.addEventListener("click", () => loadHistory());
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (el("game") && el("game").classList.contains("active")) { e.preventDefault(); checkAnswer(); }
    else if (el("home") && el("home").classList.contains("active")) { startGameIntro(); }
  } else if (e.key === "Escape") {
    if (el("game") && el("game").classList.contains("active")) playWord();
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
