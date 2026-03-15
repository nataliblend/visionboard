/* ─────────────────────────────────────────────
   VISION BOARD — app.js
   Storage: localStorage, key = "vb_data"
   Schema:
   {
     boards: {
       "2025-Q1": {
         intention: "",
         cards: [ { id, title, desc, category, emoji, color, progress, image } ]
       },
       ...
     }
   }
───────────────────────────────────────────── */

const STORAGE_KEY = 'vb_data';

function QUARTER_LABELS() {
  return {
    1: { title: 'Q1', months: I18n.t('q1_long') },
    2: { title: 'Q2', months: I18n.t('q2_long') },
    3: { title: 'Q3', months: I18n.t('q3_long') },
    4: { title: 'Q4', months: I18n.t('q4_long') },
  };
}

function CATEGORIES() {
  return [
    { id: 'saude',       label: I18n.t('cat_saude'),       color: '#8fa67a' },
    { id: 'carreira',    label: I18n.t('cat_carreira'),    color: '#7a8fc2' },
    { id: 'financas',    label: I18n.t('cat_financas'),    color: '#c2aa5a' },
    { id: 'relacoes',    label: I18n.t('cat_relacoes'),    color: '#c27a7a' },
    { id: 'aprendizado', label: I18n.t('cat_aprendizado'), color: '#7ac2b8' },
    { id: 'viagem',      label: I18n.t('cat_viagem'),      color: '#c2845a' },
    { id: 'criativo',    label: I18n.t('cat_criativo'),    color: '#a47ac2' },
    { id: 'pessoal',     label: I18n.t('cat_pessoal'),     color: '#c2a07a' },
  ];
}

const EMOJIS = ['🌟','🎯','💪','🌱','🏆','❤️','✈️','📚','💡','🎨','🏡','💰','🧘','🎵','🌊','🔥','🌸','⚡','🍀','🦋','🏋️','🎓','🤝','🌍'];

const COLORS = [
  '#c2845a','#8fa67a','#7a8fc2','#c2aa5a',
  '#c27a7a','#7ac2b8','#a47ac2','#1a1714',
  '#5a8dc2','#c2905a','#6ac27a','#c2607a',
];

const App = (() => {
  let state = {
    year: new Date().getFullYear(),
    quarter: Math.ceil((new Date().getMonth() + 1) / 3),
    data: { boards: {} },
    dirty: false,
    editingCardId: null,
    currentImgData: null,
  };

  /* ── INIT ── */
  function init() {
    loadFromStorage();
    renderSidebar();
    renderBoard();
  }

  function startSession() {
    document.getElementById('splash').style.opacity = '0';
    document.getElementById('splash').style.transition = 'opacity .5s';
    setTimeout(() => {
      document.getElementById('splash').classList.add('hidden');
      document.getElementById('app').classList.remove('hidden');
      init();
    }, 500);
  }

  /* ── STORAGE ── */
  function loadFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) state.data = JSON.parse(raw);
    } catch (e) { console.warn('Failed to parse storage', e); }
  }

  function saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
  }

  function boardKey() {
    return `${state.year}-Q${state.quarter}`;
  }

  function getCurrentBoard() {
    const k = boardKey();
    if (!state.data.boards[k]) {
      state.data.boards[k] = { intention: '', cards: [] };
    }
    return state.data.boards[k];
  }

  /* ── NAVIGATION ── */
  function changeYear(delta) {
    saveBoard(true);
    state.year += delta;
    renderSidebar();
    renderBoard();
  }

  function setQuarter(q) {
    saveBoard(true);
    state.quarter = q;
    renderSidebar();
    renderBoard();
  }

  function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
    document.getElementById('sidebarOverlay').classList.toggle('open');
  }

  function closeSidebar() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebarOverlay').classList.remove('open');
  }

  /* ── DIRTY STATE ── */
  function markDirty() {
    state.dirty = true;
    const btn = document.getElementById('saveBtnText');
    if (btn && !document.getElementById('saveBtnText').innerHTML.includes('●')) {
      btn.innerHTML = 'Salvar <span class="dirty-dot"></span>';
    }
  }

  function clearDirty() {
    state.dirty = false;
    const btn = document.getElementById('saveBtnText');
    if (btn) btn.textContent = 'Salvar';
  }

  /* ── SAVE BOARD ── */
  function saveBoard(silent = false) {
    const board = getCurrentBoard();
    const intentionEl = document.getElementById('intentionInput');
    if (intentionEl) board.intention = intentionEl.value;
    saveToStorage();
    clearDirty();
    if (!silent) {
      toast(I18n.t('toast_saved'));
      renderHistory();
    }
  }

  /* ── RENDER SIDEBAR ── */
  function renderSidebar() {
    // Year
    document.getElementById('currentYear').textContent = state.year;

    // Quarter tabs
    document.querySelectorAll('.q-tab').forEach(btn => {
      const q = parseInt(btn.dataset.q);
      btn.classList.toggle('active', q === state.quarter);
    });

    renderHistory();
  }

  function renderHistory() {
    const list = document.getElementById('historyList');
    list.innerHTML = '';

    const entries = Object.entries(state.data.boards)
      .filter(([k]) => k.startsWith(state.year + '-Q'))
      .sort(([a], [b]) => a.localeCompare(b));

    if (entries.length === 0) {
      list.innerHTML = `<p style="font-size:.75rem;color:rgba(255,255,255,.3);padding:.2rem 0">${I18n.t('history_empty')}</p>`;
      return;
    }

    entries.forEach(([key, board]) => {
      const [yr, q] = key.split('-Q');
      const isCurrent = key === boardKey();
      const div = document.createElement('div');
      div.className = 'history-item' + (isCurrent ? ' current' : '');
      div.innerHTML = `
        <span class="history-item-label">Q${q} · ${yr}</span>
        <span class="history-item-count">${board.cards.length} ${board.cards.length === 1 ? I18n.t('history_card') : I18n.t('history_cards')}</span>
      `;
      div.addEventListener('click', () => {
        saveBoard(true);
        state.year = parseInt(yr);
        state.quarter = parseInt(q);
        renderSidebar();
        renderBoard();
        closeSidebar();
      });
      list.appendChild(div);
    });
  }

  /* ── RENDER BOARD ── */
  function renderBoard() {
    const board = getCurrentBoard();
    const ql = QUARTER_LABELS()[state.quarter];

    document.getElementById('boardTitle').textContent = `${ql.title} · ${state.year}`;
    document.getElementById('boardSubtitle').textContent = ql.months;
    document.getElementById('intentionInput').value = board.intention || '';

    const grid = document.getElementById('boardGrid');
    grid.innerHTML = '';

    board.cards.forEach(card => grid.appendChild(buildCard(card)));
    clearDirty();
  }

  function buildCard(card) {
    const cat = CATEGORIES().find(c => c.id === card.category) || CATEGORIES()[7];
    const accentColor = card.color || cat.color;

    const div = document.createElement('div');
    div.className = 'vision-card';
    div.dataset.id = card.id;

    let mediaHtml = '';
    if (card.image) {
      mediaHtml = `<img class="card-image" src="${card.image}" alt="" onerror="this.style.display='none'" loading="lazy"/>`;
    } else {
      const emoji = card.emoji || '✨';
      mediaHtml = `<div class="card-image-placeholder" style="background:${accentColor}18">${emoji}</div>`;
    }

    div.innerHTML = `
      <div class="card-accent-bar" style="background:${accentColor}"></div>
      ${mediaHtml}
      <div class="card-body">
        <span class="card-category" style="color:${accentColor}">${cat.label}</span>
        <p class="card-title">${escHtml(card.title || 'Sem título')}</p>
        ${card.desc ? `<p class="card-desc">${escHtml(card.desc)}</p>` : ''}
      </div>
      <div class="card-footer">
        <div class="progress-track">
          <div class="progress-fill" style="width:${card.progress || 0}%;background:${accentColor}"></div>
        </div>
        <span class="progress-pct">${card.progress || 0}%</span>
      </div>
    `;

    div.addEventListener('click', () => openModal(card.id));
    return div;
  }

  /* ── ADD CARD ── */
  function addCard() {
    const board = getCurrentBoard();
    const newCard = {
      id: 'c_' + Date.now(),
      title: '',
      desc: '',
      category: 'pessoal',
      emoji: '✨',
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      progress: 0,
      image: '',
    };
    board.cards.push(newCard);
    saveToStorage();
    renderBoard();
    openModal(newCard.id);
  }

  /* ── MODAL ── */
  function openModal(cardId) {
    const board = getCurrentBoard();
    const card = board.cards.find(c => c.id === cardId);
    if (!card) return;

    state.editingCardId = cardId;
    state.currentImgData = card.image || null;

    // Populate
    document.getElementById('cardTitle').value = card.title || '';
    document.getElementById('cardDesc').value = card.desc || '';
    document.getElementById('cardImgUrl').value = (card.image && !card.image.startsWith('data:')) ? card.image : '';
    document.getElementById('cardProgress').value = card.progress || 0;
    document.getElementById('progressDisplay').textContent = (card.progress || 0) + '%';

    // Category
    buildCategoryPills(card.category);

    // Emoji
    buildEmojiGrid(card.emoji);

    // Colors
    buildColorSwatches(card.color);

    // Image preview
    updateImgPreview(card.image);

    document.getElementById('cardModal').classList.remove('hidden');
    document.getElementById('cardTitle').focus();
  }

  function closeModal(e) {
    if (e && e.target !== document.getElementById('cardModal')) return;
    document.getElementById('cardModal').classList.add('hidden');
    state.editingCardId = null;
    state.currentImgData = null;
  }

  function saveCard() {
    const board = getCurrentBoard();
    const card = board.cards.find(c => c.id === state.editingCardId);
    if (!card) return;

    card.title    = document.getElementById('cardTitle').value.trim();
    card.desc     = document.getElementById('cardDesc').value.trim();
    card.progress = parseInt(document.getElementById('cardProgress').value);
    card.image    = state.currentImgData || '';

    const activePill = document.querySelector('.cat-pill.active');
    if (activePill) card.category = activePill.dataset.id;

    const activeEmoji = document.querySelector('.emoji-btn.active');
    if (activeEmoji) card.emoji = activeEmoji.dataset.emoji;

    const activeSwatch = document.querySelector('.swatch.active');
    if (activeSwatch) card.color = activeSwatch.dataset.color;

    saveToStorage();
    renderBoard();
    document.getElementById('cardModal').classList.add('hidden');
    state.editingCardId = null;
    toast(I18n.t('toast_card_saved'));
  }

  function deleteCard() {
    if (!confirm(I18n.t('confirm_delete_card'))) return;
    const board = getCurrentBoard();
    board.cards = board.cards.filter(c => c.id !== state.editingCardId);
    saveToStorage();
    renderBoard();
    document.getElementById('cardModal').classList.add('hidden');
    state.editingCardId = null;
    toast(I18n.t('toast_card_deleted'));
  }

  function clearBoard() {
    if (!confirm(I18n.t('confirm_clear_board'))) return;
    const board = getCurrentBoard();
    board.cards = [];
    saveToStorage();
    renderBoard();
    toast(I18n.t('toast_board_cleared'));
  }

  /* ── MODAL BUILDERS ── */
  function buildCategoryPills(activeCat) {
    const container = document.getElementById('categoryPills');
    container.innerHTML = '';
    CATEGORIES().forEach(cat => {
      const btn = document.createElement('button');
      btn.className = 'cat-pill' + (cat.id === activeCat ? ' active' : '');
      btn.dataset.id = cat.id;
      btn.textContent = cat.label;
      btn.addEventListener('click', () => {
        document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
      });
      container.appendChild(btn);
    });
  }

  function buildEmojiGrid(activeEmoji) {
    const grid = document.getElementById('emojiGrid');
    grid.innerHTML = '';
    EMOJIS.forEach(em => {
      const btn = document.createElement('button');
      btn.className = 'emoji-btn' + (em === activeEmoji ? ' active' : '');
      btn.dataset.emoji = em;
      btn.textContent = em;
      btn.addEventListener('click', () => {
        document.querySelectorAll('.emoji-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
      grid.appendChild(btn);
    });
  }

  function buildColorSwatches(activeColor) {
    const container = document.getElementById('colorSwatches');
    container.innerHTML = '';
    COLORS.forEach(col => {
      const btn = document.createElement('button');
      btn.className = 'swatch' + (col === activeColor ? ' active' : '');
      btn.dataset.color = col;
      btn.style.background = col;
      btn.title = col;
      btn.addEventListener('click', () => {
        document.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
        btn.classList.add('active');
      });
      container.appendChild(btn);
    });
  }

  /* ── IMAGE HANDLING ── */
  function previewImg() {
    const url = document.getElementById('cardImgUrl').value.trim();
    state.currentImgData = url || null;
    updateImgPreview(url);
  }

  function handleImgUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      state.currentImgData = ev.target.result;
      document.getElementById('cardImgUrl').value = '';
      updateImgPreview(ev.target.result);
    };
    reader.readAsDataURL(file);
  }

  function updateImgPreview(src) {
    const preview = document.getElementById('imgPreview');
    if (src) {
      preview.classList.remove('hidden');
      preview.innerHTML = `<img src="${src}" alt="preview" onerror="this.parentElement.classList.add('hidden')" />`;
    } else {
      preview.classList.add('hidden');
      preview.innerHTML = '';
    }
  }

  function updateProgressDisplay() {
    const val = document.getElementById('cardProgress').value;
    document.getElementById('progressDisplay').textContent = val + '%';
  }

  /* ── IMPORT / EXPORT ── */
  function exportData() {
    const blob = new Blob([JSON.stringify(state.data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'visionboard_backup.json'; a.click();
    URL.revokeObjectURL(url);
    toast(I18n.t('toast_exported'));
  }

  function importData(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const parsed = JSON.parse(ev.target.result);
        if (!parsed.boards) throw new Error('Formato inválido');
        // Merge — imported boards override existing
        Object.assign(state.data.boards, parsed.boards);
        saveToStorage();
        renderSidebar();
        renderBoard();
        toast(I18n.t('toast_imported'));
      } catch (err) {
        alert(I18n.t('import_invalid') + err.message);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  /* ── TOAST ── */
  let toastTimer;
  function toast(msg) {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.remove('hidden');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.add('hidden'), 2200);
  }

  /* ── HELPERS ── */
  function escHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // Re-render everything when language changes
  function onLangChange() {
    renderSidebar();
    renderBoard();
    I18n.applyToDOM();
  }

  // Auto-save every 60 seconds if dirty
  setInterval(() => { if (state.dirty) saveBoard(true); }, 60000);

  return {
    startSession,
    changeYear,
    setQuarter,
    toggleSidebar,
    closeSidebar,
    markDirty,
    saveBoard: () => saveBoard(false),
    addCard,
    openModal,
    closeModal: (e) => closeModal(e),
    saveCard,
    deleteCard,
    clearBoard,
    previewImg,
    handleImgUpload,
    updateProgressDisplay,
    exportData,
    importData,
    onLangChange,
  };
})();
