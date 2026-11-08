/* Constitution Quest — Prototype App Logic */
(function() {
  'use strict';

  const SAVE_KEY = 'cq.save.v1';
  let state = loadState();

  function defaultState() {
    return {
      xp: 0, level: 1, streak: 0, lastVisit: null,
      chapters: {}, chapterBeats: {}, chapterStars: {},
      quizBests: {}, badges: [], collectibles: [],
      readerVisits: [], activeChapter: null, activeView: 'map'
    };
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (raw) return Object.assign(defaultState(), JSON.parse(raw));
    } catch(e) {}
    return defaultState();
  }

  function saveState() {
    state.lastVisit = new Date().toISOString();
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  }

  // ── Init chapters ──
  DATA.chapters.forEach(ch => {
    if (!state.chapters[ch.id]) state.chapters[ch.id] = ch.id === 1 ? 'unlocked' : 'locked';
    if (!state.chapterBeats[ch.id]) state.chapterBeats[ch.id] = 0;
    if (!state.chapterStars[ch.id]) state.chapterStars[ch.id] = 0;
  });

  // ── XP ──
  function addXP(amount) {
    state.xp += amount;
    while (state.level * 100 <= state.xp) { state.level++; showReward('level', 'Level ' + state.level + '!'); }
    saveState();
  }

  function xpProgress() {
    const cur = (state.level - 1) * 100;
    const next = state.level * 100;
    return { pct: Math.min(100, ((state.xp - cur) / (next - cur)) * 100) };
  }

  // ── Badges & Collectibles ──
  function earnBadge(id) {
    if (state.badges.includes(id)) return;
    state.badges.push(id);
    saveState();
    const b = DATA.badges.find(x => x.id === id);
    if (b) showReward('badge', b.name, b.description);
  }

  function earnCollectible(id) {
    if (state.collectibles.includes(id)) return;
    state.collectibles.push(id);
    saveState();
    const c = [...DATA.founders, {id:'bill-of-rights',name:'Bill of Rights'}].find(x => x.id === id);
    if (c) showReward('collectible', c.name);
  }

  // ── Views ──
  const views = ['map','chapter','quiz','reader','collection','glossary'];
  function showView(id) {
    views.forEach(v => {
      const el = document.getElementById('view-' + v);
      if (el) el.classList.toggle('active', v === id);
    });
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.view === id));
    state.activeView = id;
    if (id === 'map') renderMap();
    if (id === 'reader') renderReader('preamble', 0);
    if (id === 'collection') renderCollection();
    if (id === 'glossary') renderGlossary();
  }

  function updateHeader() {
    const xp = xpProgress();
    document.getElementById('xp-fill').style.width = xp.pct + '%';
    document.getElementById('xp-label').textContent = state.xp + ' XP';
    document.getElementById('level-badge').textContent = 'Lv ' + state.level;
  }

  // ── Tab nav ──
  document.addEventListener('click', function(e) {
    const tab = e.target.closest('.tab-btn');
    if (tab) showView(tab.dataset.view);
  });

  // ── Map ──
  function renderMap() {
    const c = document.getElementById('map-container');
    c.innerHTML = '';
    DATA.chapters.forEach(ch => {
      const status = state.chapters[ch.id];
      const d = document.createElement('div');
      d.className = 'chapter-node ' + status;
      const dot = document.createElement('div');
      dot.className = 'node-dot';
      dot.innerHTML = status === 'completed'
        ? '<svg viewBox="0 0 24 24" style="width:14px;height:14px;fill:white"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>'
        : status === 'unlocked'
        ? '<svg viewBox="0 0 24 24" style="width:14px;height:14px;fill:white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>'
        : '<svg viewBox="0 0 24 24" style="width:14px;height:14px;fill:currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2z"/></svg>';
      d.appendChild(dot);
      const info = document.createElement('div');
      info.style.flex = '1';
      info.innerHTML = '<h3>' + ch.title + '</h3><div class="sub">' + ch.subtitle + '</div>';
      d.appendChild(info);
      if (status !== 'locked') {
        const btn = document.createElement('button');
        btn.className = 'play-btn';
        btn.textContent = status === 'completed' ? 'Replay' : (state.activeChapter === ch.id ? 'Continue' : 'Play');
        btn.addEventListener('click', () => startChapter(ch.id));
        d.appendChild(btn);
      }
      c.appendChild(d);
    });
    updateHeader();
  }

  // ── Chapter ──
  function startChapter(id) {
    state.activeChapter = id;
    state.chapterBeats[id] = 0;
    state.chapters[id] = 'unlocked';
    showView('chapter');
    renderBeat(id);
  }

  function renderBeat(chId) {
    const ch = DATA.chapters.find(c => c.id === chId);
    if (!ch) return;
    const beatIdx = state.chapterBeats[chId];
    const beat = ch.beats[beatIdx];
    if (!beat) return;

    document.getElementById('chapter-progress').innerHTML = ch.beats.map((_, i) =>
      '<span class="progress-dot ' + (i < beatIdx ? 'done' : (i === beatIdx ? 'current' : '')) + '"></span>'
    ).join('');

    const container = document.getElementById('chapter-content');
    container.innerHTML = '';

    if (beat.type === 'check') { renderComprehensionCheck(chId, container); return; }

    container.innerHTML =
      '<div class="beat-card' + (beat.type === 'didyouknow' ? ' dyk' : '') + '">' +
      '<div class="beat-icon">' +
      (beat.type === 'didyouknow'
        ? '<svg viewBox="0 0 24 24" style="width:22px;height:22px;fill:var(--c-gold-700)"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>'
        : '<svg viewBox="0 0 24 24" style="width:22px;height:22px;fill:var(--c-navy-700)"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>') +
      '</div>' +
      (beat.type === 'didyouknow' ? '<span class="dyk-label">Did You Know?</span>' : '') +
      '<p>' + beat.text + '</p>' +
      '<button class="btn-primary" onclick="window._cqNextBeat(' + chId + ')">Continue</button>' +
      '</div>';
  }

  window._cqNextBeat = function(chId) {
    const ch = DATA.chapters.find(c => c.id === chId);
    if (!ch) return;
    state.chapterBeats[chId]++;
    if (state.chapterBeats[chId] >= ch.beats.length) state.chapterBeats[chId] = ch.beats.length - 1;
    saveState();
    renderBeat(chId);
  };

  function renderComprehensionCheck(chId, container) {
    const questions = {
      1: [
        {q:"What problem showed the Articles of Confederation were too weak?",o:["The Boston Tea Party","Shays' Rebellion","The Revolutionary War","The Louisiana Purchase"],c:1},
        {q:"What does the Preamble begin with?",o:['"When in the course..."','"Four score and seven years ago..."','"We the People..."','"Congress shall make no law..."'],c:2},
        {q:"How many goals does the Preamble list?",o:["Three","Five","Six","Ten"],c:2}
      ],
      2: [
        {q:"Which branch MAKES laws?",o:["Executive (President)","Judicial (Courts)","Legislative (Congress)","The States"],c:2},
        {q:"How did the Great Compromise settle representation?",o:["House by population, Senate equal per state","Both houses by population","Both houses equal","One house only"],c:0},
        {q:"What power did the Supreme Court claim in Marbury v. Madison?",o:["Impeachment","Veto power","Judicial review","Taxation"],c:2}
      ],
      3: [
        {q:"What does Article V describe?",o:["Powers of the President","The amendment process","The Bill of Rights","State boundaries"],c:1},
        {q:"How many states had to ratify the Constitution?",o:["7 of 13","9 of 13","11 of 13","All 13"],c:1},
        {q:"Who wrote the Federalist Papers?",o:["Washington, Adams, Jefferson","Hamilton, Madison, Jay","Franklin, Henry, Paine","Marshall, Story, Kent"],c:1}
      ],
      4: [
        {q:"Which amendment protects freedom of speech?",o:["First","Second","Fourth","Fifth"],c:0},
        {q:"What does the Fifth Amendment protect against?",o:["Unreasonable searches","Quartering soldiers","Self-incrimination","Cruel punishment"],c:2},
        {q:"What does the Tenth Amendment say?",o:["All rights belong to the federal government","Powers not given to US belong to states/people","The Bill of Rights is optional","States cannot make laws"],c:1}
      ],
      5: [
        {q:"Which amendment abolished slavery?",o:["12th","13th","14th","15th"],c:1},
        {q:"Which amendment gave women the right to vote?",o:["15th (1870)","17th (1913)","19th (1920)","26th (1971)"],c:2},
        {q:"What does the 14th Amendment guarantee?",o:["Freedom of speech","Right to bear arms","Equal protection of the laws","Presidential term limits"],c:2}
      ]
    };
    const qs = questions[chId] || questions[1];
    let qIdx = 0, correct = 0;

    function showQ() {
      if (qIdx >= qs.length) return showResult();
      const q = qs[qIdx];
      container.innerHTML =
        '<div class="quiz-card">' +
        '<div style="font-size:0.875rem;color:var(--c-muted);margin-bottom:var(--space-2)">Question ' + (qIdx+1) + ' of ' + qs.length + '</div>' +
        '<h3>' + q.q + '</h3>' +
        q.o.map((opt,i) => '<button class="quiz-option" onclick="window._cqCheckAns(' + i + ',' + q.c + ',' + chId + ')" data-correct="' + (i===q.c) + '">' + opt + '</button>').join('') +
        '<div id="cq-feedback"></div></div>' +
        '<button class="btn-secondary mt-4" id="cq-next" style="display:none" onclick="window._cqNextQ(' + chId + ')">Next</button>';
    }

    window._cqCheckAns = function(selected, correctIdx, chId) {
      const opts = container.querySelectorAll('.quiz-option');
      opts.forEach((o,i) => { o.disabled = true; if (i===correctIdx) o.classList.add('correct'); else if (i===selected) o.classList.add('wrong'); });
      const fb = document.getElementById('cq-feedback');
      if (selected === correctIdx) { fb.innerHTML = '<div class="quiz-feedback correct">✓ Correct! Well done.</div>'; correct++; }
      else { fb.innerHTML = '<div class="quiz-feedback wrong">✗ The answer is: ' + opts[correctIdx].textContent + '</div>'; }
      document.getElementById('cq-next').style.display = 'inline-block';
    };

    window._cqNextQ = function(chId) { qIdx++; showQ(); };

    function showResult() {
      const stars = correct === qs.length ? 3 : correct >= 2 ? 2 : correct > 0 ? 1 : 0;
      state.chapterStars[chId] = Math.max(state.chapterStars[chId], stars);
      state.chapters[chId] = 'completed';
      addXP(stars * 30);
      const ch = DATA.chapters.find(c => c.id === chId);
      if (ch && ch.badge) earnBadge(ch.badge);
      if (ch && ch.collectible) earnCollectible(ch.collectible.id);
      const nextId = chId + 1;
      if (nextId <= DATA.chapters.length && state.chapters[nextId] === 'locked') state.chapters[nextId] = 'unlocked';
      if (DATA.chapters.every(c => state.chapters[c.id] === 'completed')) earnBadge('journey-complete');
      saveState();
      container.innerHTML =
        '<div class="quiz-result">' +
        '<h2>' + (stars >= 2 ? 'Great job!' : 'Nice try!') + '</h2>' +
        '<div class="stars">' + '\u2605'.repeat(stars) + '\u2606'.repeat(3-stars) + '</div>' +
        '<p>' + correct + ' of ' + qs.length + ' correct &bull; +' + (stars * 30) + ' XP</p>' +
        '<button class="btn-primary mt-4" onclick="window._cqShowView(\'map\')">Back to Map</button></div>';
      updateHeader();
    }

    showQ();
  }

  // ── Quiz Challenge ──
  function startQuiz(quizId) {
    const quiz = DATA.quizzes.find(q => q.id === quizId);
    if (!quiz) return;
    showView('quiz');
    let qIdx = 0, correct = 0;
    const container = document.getElementById('quiz-content');

    function showQ() {
      if (qIdx >= quiz.questions.length) return showResult();
      const q = quiz.questions[qIdx];
      container.innerHTML =
        '<h2 style="font-family:var(--font-display);margin-bottom:var(--space-4);color:var(--c-navy-900)">' + quiz.name + '</h2>' +
        '<div class="quiz-card"><div style="font-size:0.875rem;color:var(--c-muted);margin-bottom:var(--space-2)">Question ' + (qIdx+1) + ' of ' + quiz.questions.length + '</div>' +
        '<h3>' + q.q + '</h3>' +
        q.options.map((opt,i) => '<button class="quiz-option" onclick="window._cqQzAns(' + i + ',' + q.correct + ')">' + opt + '</button>').join('') +
        '<div id="qz-feedback"></div></div>' +
        '<button class="btn-secondary mt-4" id="qz-next" style="display:none">Next</button>';
      document.getElementById('qz-next').onclick = function() { qIdx++; showQ(); };
    }

    window._cqQzAns = function(selected, correctIdx) {
      const opts = container.querySelectorAll('.quiz-option');
      opts.forEach((o,i) => { o.disabled = true; if (i===correctIdx) o.classList.add('correct'); else if (i===selected) o.classList.add('wrong'); });
      const fb = document.getElementById('qz-feedback');
      if (selected === correctIdx) { fb.innerHTML = '<div class="quiz-feedback correct">✓ Correct!</div>'; correct++; }
      else { fb.innerHTML = '<div class="quiz-feedback wrong">✗ Answer: ' + opts[correctIdx].textContent + '</div>'; }
      document.getElementById('qz-next').style.display = 'inline-block';
    };

    function showResult() {
      const stars = correct === quiz.questions.length ? 3 : correct >= 3 ? 2 : correct > 0 ? 1 : 0;
      state.quizBests[quizId] = Math.max(state.quizBests[quizId] || 0, stars);
      if (stars === 3) earnBadge('quiz-whiz');
      addXP(stars * 20);
      saveState();
      container.innerHTML =
        '<h2 style="font-family:var(--font-display);margin-bottom:var(--space-4);color:var(--c-navy-900)">' + quiz.name + '</h2>' +
        '<div class="quiz-result"><h2>' + (stars >= 2 ? 'Excellent!' : 'Keep practicing!') + '</h2>' +
        '<div class="stars">' + '\u2605'.repeat(stars) + '\u2606'.repeat(3-stars) + '</div>' +
        '<p>' + correct + ' of ' + quiz.questions.length + ' correct &bull; +' + (stars * 20) + ' XP</p>' +
        '<button class="btn-primary mt-4" onclick="window._cqShowView(\'map\')">Back to Map</button>' +
        '<button class="btn-secondary mt-4" onclick="window._cqStartQuiz(\'' + quizId + '\')">Try Again</button></div>';
      updateHeader();
    }

    showQ();
  }

  window._cqStartQuiz = function(id) { startQuiz(id); };
  window._cqShowView = function(id) { if (id === 'quiz' || id === 'chapter') return; showView(id); };

  // ── Reader ──
  function renderReader(docType, docId) {
    const nav = document.getElementById('reader-nav');
    const content = document.getElementById('reader-content');
    if (!nav.hasChildNodes()) {
      nav.innerHTML =
        '<div class="reader-nav-group"><h3>Preamble</h3><div class="reader-nav-item" onclick="window._cqRdr(\'preamble\',0)">The Preamble</div></div>' +
        '<div class="reader-nav-group"><h3>Articles</h3>' +
        DATA.articles.map(a => '<div class="reader-nav-item" onclick="window._cqRdr(\'article\',' + a.id + ')">Article ' + rn(a.id) + '</div>').join('') + '</div>' +
        '<div class="reader-nav-group"><h3>Amendments</h3>' +
        DATA.amendments.map(a => '<div class="reader-nav-item" onclick="window._cqRdr(\'amendment\',' + a.id + ')">' + a.id + sfx(a.id) + '</div>').join('') + '</div>';
    }
    nav.querySelectorAll('.reader-nav-item').forEach(el => el.classList.remove('active'));
    let target;
    if (docType === 'preamble') target = nav.querySelector('.reader-nav-item');
    else if (docType === 'article') target = nav.querySelectorAll('.reader-nav-item')[1 + docId - 1];
    else target = nav.querySelectorAll('.reader-nav-item')[1 + DATA.articles.length + docId - 1];
    if (target) target.classList.add('active');

    let title, orig, plain, why;
    if (docType === 'preamble') {
      title = 'The Preamble'; orig = DATA.preamble.original; plain = DATA.preamble.plain; why = DATA.preamble.why;
    } else if (docType === 'article') {
      const a = DATA.articles[docId - 1]; if (!a) return;
      title = a.title; orig = '<p>' + a.keyQuote + '</p>'; plain = '<p>' + a.summary + '</p>'; why = null;
    } else {
      const a = DATA.amendments[docId - 1]; if (!a) return;
      title = a.id + sfx(a.id) + ' Amendment &mdash; ' + a.title; orig = '<p style="color:var(--c-muted);font-size:0.875rem">[Ratified ' + a.year + ']</p><p>' + a.summary + '</p>'; plain = '<p>' + a.summary + '</p>'; why = null;
      if (!state.readerVisits.includes(docId)) {
        state.readerVisits.push(docId);
        if (state.readerVisits.length >= 10) earnBadge('stamp-collector');
        if (state.readerVisits.length >= 27) earnBadge('all-27');
        saveState();
      }
    }

    content.innerHTML =
      '<h2>' + title + '</h2>' +
      '<div class="reader-toggle">' +
      '<button class="pill active" onclick="window._cqTog(\'orig\')">Original Text</button>' +
      '<button class="pill" onclick="window._cqTog(\'plain\')">What It Means</button></div>' +
      '<div id="rdr-orig" class="reader-original">' + orig + '</div>' +
      '<div id="rdr-plain" class="reader-plain" style="display:none">' + plain + (why ? '<div class="callout"><strong>Why it matters:</strong> ' + why + '</div>' : '') + '</div>';
  }

  window._cqRdr = function(t, id) { renderReader(t, id); };
  window._cqTog = function(m) {
    document.getElementById('rdr-orig').style.display = m === 'orig' ? 'block' : 'none';
    document.getElementById('rdr-plain').style.display = m === 'plain' ? 'block' : 'none';
    document.querySelectorAll('.reader-toggle .pill').forEach(p => p.classList.toggle('active', p.textContent.trim() === (m === 'orig' ? 'Original Text' : 'What It Means')));
  };

  function rn(n) { return ['','I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV','XVI','XVII','XVIII','XIX','XX','XXI','XXII','XXIII','XXIV','XXV','XXVI','XXVII'][n] || String(n); }
  function sfx(n) { if (n>=11 && n<=13) return 'th'; var r=n%10; return r===1?'st':r===2?'nd':r===3?'rd':'th'; }

  // ── Collection ──
  function renderCollection() {
    document.getElementById('coll-badges').innerHTML = DATA.badges.map(b => {
      const e = state.badges.includes(b.id);
      return '<div class="collect-card ' + (e ? 'earned' : 'missing') + '">' +
        '<div class="card-icon" style="background:' + (e ? 'var(--c-gold-500)' : 'var(--c-cream-200)') + '">' +
        '<svg viewBox="0 0 24 24" style="width:26px;height:26px;fill:white"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></div>' +
        '<div class="name">' + (e ? b.name : '???') + '</div>' +
        '<div class="hint">' + (e ? b.description : 'Complete a chapter to unlock') + '</div></div>';
    }).join('');
    document.getElementById('coll-founders').innerHTML = DATA.founders.map(f => {
      const e = state.collectibles.includes(f.id);
      return '<div class="collect-card ' + (e ? 'earned' : 'missing') + '">' +
        '<div class="card-icon" style="background:' + (e ? f.color : 'var(--c-cream-200)') + '">' +
        '<svg viewBox="0 0 24 24" style="width:26px;height:26px;fill:white"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg></div>' +
        '<div class="name">' + (e ? f.name : '???') + '</div>' +
        '<div class="hint">' + (e ? f.role : 'Complete a chapter') + '</div></div>';
    }).join('');
    document.getElementById('coll-stamps').innerHTML = (function() {
      const e = state.collectibles.includes('bill-of-rights');
      return '<div class="collect-card ' + (e ? 'earned' : 'missing') + '">' +
        '<div class="card-icon" style="background:' + (e ? 'var(--c-crimson-600)' : 'var(--c-cream-200)') + '">' +
        '<svg viewBox="0 0 24 24" style="width:26px;height:26px;fill:white"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg></div>' +
        '<div class="name">' + (e ? 'Bill of Rights' : '???') + '</div>' +
        '<div class="hint">' + (e ? 'Amendments 1-10' : 'Complete Chapter 4') + '</div></div>';
    })();
  }

  // ── Glossary ──
  function renderGlossary(filter) {
    const items = filter ? DATA.glossary.filter(g => g.term.toLowerCase().includes(filter.toLowerCase())) : DATA.glossary;
    document.getElementById('glossary-list').innerHTML = items.map(g =>
      '<div class="glossary-item"><div class="term">' + g.term + '</div><div class="def">' + g.def + '</div></div>'
    ).join('');
  }

  document.getElementById('glossary-search')?.addEventListener('input', function() { renderGlossary(this.value); });

  // ── Reward Popup ──
  function showReward(type, title, desc) {
    const icons = { badge:'<svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>', level:'<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>', collectible:'<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>' };
    const colors = { badge:'var(--c-gold-500)', level:'var(--c-navy-700)', collectible:'var(--c-crimson-600)' };
    document.getElementById('popup-icon').style.background = colors[type] || colors.badge;
    document.getElementById('popup-icon').innerHTML = icons[type] || icons.badge;
    document.getElementById('popup-title').textContent = type === 'badge' ? 'Badge Earned!' : type === 'level' ? 'Level Up!' : 'New Collectible!';
    document.getElementById('popup-desc').textContent = title || '';
    document.getElementById('popup-sub').textContent = desc || '';
    document.getElementById('popup-overlay').classList.add('active');
  }

  window._cqClosePopup = function() { document.getElementById('popup-overlay').classList.remove('active'); };

  // ── Reset ──
  window._cqReset = function() {
    if (confirm('Reset all progress? This cannot be undone.')) {
      localStorage.removeItem(SAVE_KEY);
      state = defaultState();
      DATA.chapters.forEach(ch => { state.chapters[ch.id] = ch.id === 1 ? 'unlocked' : 'locked'; state.chapterBeats[ch.id] = 0; state.chapterStars[ch.id] = 0; });
      saveState();
      showView('map');
    }
  };

  // ── Init ──
  if (state.chapters[1] === 'locked') state.chapters[1] = 'unlocked';
  showView('map');
  updateHeader();
})();
