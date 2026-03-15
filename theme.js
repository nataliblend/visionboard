/* ─────────────────────────────────────────────
   VISIONBOARD — theme.js
   Temas prontos + toggle claro/escuro
   Salvo em localStorage: "vb_theme"
───────────────────────────────────────────── */

const Theme = (() => {
  const STORAGE_KEY = 'vb_theme';

  // ── Paletas ──────────────────────────────────
  // Cada tema tem variante "light" e "dark"
  const PRESETS = [
    {
      id: 'terracota',
      name: 'Terracota',
      emoji: '🏺',
      light: {
        '--cream':     '#f7f3ee',
        '--cream2':    '#ede8e0',
        '--parchment': '#e0d8cc',
        '--ink':       '#1a1714',
        '--ink2':      '#3d3730',
        '--muted':     '#7a6f66',
        '--accent':    '#c2845a',
        '--accent2':   '#8fa67a',
        '--accent3':   '#7a8fc2',
        '--white':     '#ffffff',
        '--shadow':    'rgba(26,23,20,.10)',
      },
      dark: {
        '--cream':     '#1c1714',
        '--cream2':    '#251e19',
        '--parchment': '#2e2520',
        '--ink':       '#f0ebe4',
        '--ink2':      '#c8bfb5',
        '--muted':     '#8a7f76',
        '--accent':    '#d4956a',
        '--accent2':   '#9ab885',
        '--accent3':   '#8aa0d4',
        '--white':     '#2e2520',
        '--shadow':    'rgba(0,0,0,.30)',
      },
    },
    {
      id: 'aurora',
      name: 'Aurora',
      emoji: '🌌',
      light: {
        '--cream':     '#f0f4f8',
        '--cream2':    '#e2eaf2',
        '--parchment': '#ccd9e8',
        '--ink':       '#1a2433',
        '--ink2':      '#2e4055',
        '--muted':     '#6680a0',
        '--accent':    '#5a8fc2',
        '--accent2':   '#7ac2b0',
        '--accent3':   '#a47ac2',
        '--white':     '#ffffff',
        '--shadow':    'rgba(26,36,51,.10)',
      },
      dark: {
        '--cream':     '#0f1620',
        '--cream2':    '#162030',
        '--parchment': '#1e2d42',
        '--ink':       '#d8e8f8',
        '--ink2':      '#9ab8d8',
        '--muted':     '#5a7898',
        '--accent':    '#70a8e0',
        '--accent2':   '#70c8b8',
        '--accent3':   '#b890e0',
        '--white':     '#1e2d42',
        '--shadow':    'rgba(0,0,0,.35)',
      },
    },
    {
      id: 'floresta',
      name: 'Floresta',
      emoji: '🌿',
      light: {
        '--cream':     '#f0f5f0',
        '--cream2':    '#e0ece0',
        '--parchment': '#ccdacc',
        '--ink':       '#1a2a1a',
        '--ink2':      '#2e4a2e',
        '--muted':     '#607060',
        '--accent':    '#5a9c5a',
        '--accent2':   '#c2a55a',
        '--accent3':   '#5a9cc2',
        '--white':     '#ffffff',
        '--shadow':    'rgba(26,42,26,.10)',
      },
      dark: {
        '--cream':     '#101a10',
        '--cream2':    '#182418',
        '--parchment': '#1e301e',
        '--ink':       '#d8f0d8',
        '--ink2':      '#90c090',
        '--muted':     '#507050',
        '--accent':    '#70c070',
        '--accent2':   '#d4b870',
        '--accent3':   '#70a8c0',
        '--white':     '#1e301e',
        '--shadow':    'rgba(0,0,0,.35)',
      },
    },
    {
      id: 'rosé',
      name: 'Rosé',
      emoji: '🌸',
      light: {
        '--cream':     '#fdf5f5',
        '--cream2':    '#f5e8e8',
        '--parchment': '#ead5d5',
        '--ink':       '#2a1818',
        '--ink2':      '#4a2828',
        '--muted':     '#9a6060',
        '--accent':    '#c27a8a',
        '--accent2':   '#c2a07a',
        '--accent3':   '#7a8fc2',
        '--white':     '#ffffff',
        '--shadow':    'rgba(42,24,24,.10)',
      },
      dark: {
        '--cream':     '#1e1010',
        '--cream2':    '#281818',
        '--parchment': '#342020',
        '--ink':       '#f8e8e8',
        '--ink2':      '#d0a0a0',
        '--muted':     '#906868',
        '--accent':    '#e09098',
        '--accent2':   '#d4b888',
        '--accent3':   '#8898d8',
        '--white':     '#342020',
        '--shadow':    'rgba(0,0,0,.35)',
      },
    },
    {
      id: 'violeta',
      name: 'Violeta',
      emoji: '🔮',
      light: {
        '--cream':     '#f5f0fa',
        '--cream2':    '#ece0f5',
        '--parchment': '#dcccea',
        '--ink':       '#1e1430',
        '--ink2':      '#3a2858',
        '--muted':     '#7a60a0',
        '--accent':    '#9060c8',
        '--accent2':   '#c87a90',
        '--accent3':   '#60a8c8',
        '--white':     '#ffffff',
        '--shadow':    'rgba(30,20,48,.10)',
      },
      dark: {
        '--cream':     '#120c1e',
        '--cream2':    '#1c1430',
        '--parchment': '#261c3e',
        '--ink':       '#e8d8f8',
        '--ink2':      '#a890d0',
        '--muted':     '#706090',
        '--accent':    '#b080e0',
        '--accent2':   '#e090a8',
        '--accent3':   '#70b8e0',
        '--white':     '#261c3e',
        '--shadow':    'rgba(0,0,0,.40)',
      },
    },
    {
      id: 'areia',
      name: 'Areia',
      emoji: '🏖',
      light: {
        '--cream':     '#faf6ee',
        '--cream2':    '#f2ebdf',
        '--parchment': '#e8dece',
        '--ink':       '#2a2010',
        '--ink2':      '#4a3820',
        '--muted':     '#8a7050',
        '--accent':    '#c2a05a',
        '--accent2':   '#c27a5a',
        '--accent3':   '#5a90c2',
        '--white':     '#ffffff',
        '--shadow':    'rgba(42,32,16,.10)',
      },
      dark: {
        '--cream':     '#1a1608',
        '--cream2':    '#241e0e',
        '--parchment': '#302814',
        '--ink':       '#f4eed8',
        '--ink2':      '#c8b888',
        '--muted':     '#8a7848',
        '--accent':    '#d8b870',
        '--accent2':   '#d49070',
        '--accent3':   '#70a8d8',
        '--white':     '#302814',
        '--shadow':    'rgba(0,0,0,.35)',
      },
    },
    {
      id: 'obsidiana',
      name: 'Obsidiana',
      emoji: '🖤',
      light: {
        '--cream':     '#f4f4f4',
        '--cream2':    '#e8e8e8',
        '--parchment': '#d8d8d8',
        '--ink':       '#141414',
        '--ink2':      '#282828',
        '--muted':     '#686868',
        '--accent':    '#404040',
        '--accent2':   '#909090',
        '--accent3':   '#606060',
        '--white':     '#ffffff',
        '--shadow':    'rgba(0,0,0,.12)',
      },
      dark: {
        '--cream':     '#0a0a0a',
        '--cream2':    '#141414',
        '--parchment': '#1e1e1e',
        '--ink':       '#f0f0f0',
        '--ink2':      '#b0b0b0',
        '--muted':     '#686868',
        '--accent':    '#e0e0e0',
        '--accent2':   '#a0a0a0',
        '--accent3':   '#808080',
        '--white':     '#1e1e1e',
        '--shadow':    'rgba(0,0,0,.50)',
      },
    },
    {
      id: 'oceano',
      name: 'Oceano',
      emoji: '🌊',
      light: {
        '--cream':     '#eef5f8',
        '--cream2':    '#daeaf0',
        '--parchment': '#c2dce8',
        '--ink':       '#0e2030',
        '--ink2':      '#183048',
        '--muted':     '#4a7090',
        '--accent':    '#2a90b8',
        '--accent2':   '#5ac8b0',
        '--accent3':   '#7098c8',
        '--white':     '#ffffff',
        '--shadow':    'rgba(14,32,48,.10)',
      },
      dark: {
        '--cream':     '#071018',
        '--cream2':    '#0e1c28',
        '--parchment': '#142838',
        '--ink':       '#d0e8f8',
        '--ink2':      '#80b8d8',
        '--muted':     '#406080',
        '--accent':    '#40b0e0',
        '--accent2':   '#60d8c0',
        '--accent3':   '#7890d8',
        '--white':     '#142838',
        '--shadow':    'rgba(0,0,0,.40)',
      },
    },
  ];

  // ── Internal state ────────────────────────────
  let current = { preset: 'terracota', mode: 'light' };
  let pending = { ...current };

  // ── Load & apply from storage ─────────────────
  function loadFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) current = JSON.parse(raw);
    } catch (e) {}
    applyTheme(current.preset, current.mode);
  }

  function saveToStorage(preset, mode) {
    current = { preset, mode };
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(current)); } catch (e) {}
  }

  // ── Apply CSS vars to :root ───────────────────
  function applyTheme(presetId, mode) {
    const preset = PRESETS.find(p => p.id === presetId) || PRESETS[0];
    const vars = preset[mode] || preset.light;
    const root = document.documentElement;
    Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));

    // Keep sidebar always dark regardless of mode
    // (sidebar uses its own rgba overlays on --ink)
  }

  // ── Open modal ────────────────────────────────
  function openModal() {
    pending = { ...current };
    renderModal();
    document.getElementById('themeModal').classList.remove('hidden');
  }

  function closeModal(e) {
    if (e && e.target !== document.getElementById('themeModal')) return;
    // Revert live preview to current
    applyTheme(current.preset, current.mode);
    document.getElementById('themeModal').classList.add('hidden');
  }

  function applyAndClose() {
    applyTheme(pending.preset, pending.mode);
    saveToStorage(pending.preset, pending.mode);
    document.getElementById('themeModal').classList.add('hidden');
    showToast(typeof I18n !== 'undefined' ? I18n.t('toast_theme') : 'Tema aplicado ✦');
  }

  function showToast(msg) {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.remove('hidden');
    setTimeout(() => el.classList.add('hidden'), 2200);
  }

  // ── Render modal contents ─────────────────────
  function renderModal() {
    renderModeToggle();
    renderPresets();
    updatePreview();
  }

  function renderModeToggle() {
    const toggle = document.getElementById('themeModeToggle');
    toggle.querySelectorAll('.mode-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === pending.mode);
      btn.onclick = () => {
        pending.mode = btn.dataset.mode;
        renderModeToggle();
        applyTheme(pending.preset, pending.mode); // live preview
        updatePreview();
      };
    });
  }

  function renderPresets() {
    const container = document.getElementById('themePresets');
    container.innerHTML = PRESETS.map(p => {
      const vars = p[pending.mode] || p.light;
      const isActive = p.id === pending.preset;
      return `<button
        class="theme-preset-btn ${isActive ? 'active' : ''}"
        data-id="${p.id}"
        title="${p.name}"
        style="
          background:${vars['--cream']};
          border-color:${isActive ? vars['--accent'] : vars['--parchment']};
          box-shadow:${isActive ? '0 0 0 2px ' + vars['--accent'] : 'none'};
        "
      >
        <span class="preset-swatch" style="background:${vars['--accent']}"></span>
        <span class="preset-swatch" style="background:${vars['--accent2']}"></span>
        <span class="preset-swatch" style="background:${vars['--accent3']}"></span>
        <span class="preset-emoji">${p.emoji}</span>
        <span class="preset-name" style="color:${vars['--ink']}">${p.name}</span>
      </button>`;
    }).join('');

    container.querySelectorAll('.theme-preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        pending.preset = btn.dataset.id;
        applyTheme(pending.preset, pending.mode); // live preview
        renderPresets();
        updatePreview();
      });
    });
  }

  function updatePreview() {
    const preset = PRESETS.find(p => p.id === pending.preset) || PRESETS[0];
    const vars = preset[pending.mode] || preset.light;

    const preview = document.getElementById('themePreview');
    if (!preview) return;

    preview.style.background = vars['--cream2'];
    preview.style.borderColor = vars['--parchment'];

    preview.querySelectorAll('.preview-card').forEach(card => {
      card.style.background = vars['--white'] || vars['--cream'];
      card.style.borderColor = vars['--parchment'];
    });
    preview.querySelectorAll('.preview-bar').forEach(bar => {
      bar.style.background = vars['--accent'];
    });
    preview.querySelectorAll('.preview-title').forEach(el => {
      el.style.color = vars['--ink'];
    });
    preview.querySelectorAll('.preview-desc, .preview-pct').forEach(el => {
      el.style.color = vars['--muted'];
    });
    preview.querySelectorAll('.preview-cat').forEach(el => {
      el.style.color = vars['--accent'];
    });
    preview.querySelectorAll('.preview-track').forEach(el => {
      el.style.background = vars['--cream2'];
    });
    preview.querySelectorAll('.preview-fill').forEach(el => {
      el.style.background = vars['--accent'];
    });
  }

  // Re-render modal labels when language changes
  function onLangChange() {
    // mode buttons are data-i18n'd, applyToDOM handles them
    // re-render presets in case preview text changed
    if (!document.getElementById('themeModal').classList.contains('hidden')) {
      renderModal();
    }
  }

  // ── Public API ────────────────────────────────
  return { loadFromStorage, openModal, closeModal, applyAndClose, onLangChange };
})();

// Auto-apply on load
document.addEventListener('DOMContentLoaded', () => Theme.loadFromStorage());
