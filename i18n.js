/* ─────────────────────────────────────────────
   VISIONBOARD — i18n.js
   Idiomas: pt-BR, en
   Salvo em localStorage: "vb_lang"
───────────────────────────────────────────── */

const I18n = (() => {
  const STORAGE_KEY = 'vb_lang';

  const TRANSLATIONS = {
    'pt-BR': {
      // Splash
      splash_badge:       '✦ Planejamento Intencional',
      splash_sub:         'Manifeste seus objetivos,\ntrimestre a trimestre.',
      splash_btn:         'Criar meu board',
      splash_note:        'Tudo salvo no seu navegador. Privado e seu.',

      // Sidebar
      sidebar_period:     'Período',
      sidebar_history:    'Histórico',
      sidebar_export:     '⬇ Exportar JSON',
      sidebar_import:     '⬆ Importar',
      history_empty:      'Nenhum board salvo ainda.',
      history_card:       'cartão',
      history_cards:      'cartões',

      // Quarter months
      q1_months: 'Jan–Mar',
      q2_months: 'Abr–Jun',
      q3_months: 'Jul–Set',
      q4_months: 'Out–Dez',
      q1_long: 'Janeiro — Março',
      q2_long: 'Abril — Junho',
      q3_long: 'Julho — Setembro',
      q4_long: 'Outubro — Dezembro',

      // Top bar
      topbar_theme:       'Tema',
      topbar_clear:       'Limpar board',
      topbar_save:        'Salvar',

      // Intention bar
      intention_placeholder: 'Intenção do trimestre: escreva sua palavra ou frase guia…',

      // Add card
      add_card:           'Adicionar cartão',

      // Card modal
      modal_edit_title:   'Editar cartão',
      modal_category:     'Categoria',
      modal_card_title:   'Título',
      modal_title_ph:     'Ex: Viajar para Portugal',
      modal_desc:         'Descrição / afirmação',
      modal_desc_ph:      'Como você vai se sentir quando realizar isso?',
      modal_image:        'Imagem',
      modal_img_ph:       'Cole uma URL de imagem…',
      modal_upload:       '📁 Upload',
      modal_or:           'ou',
      modal_emoji:        'Emoji',
      modal_color:        'Cor',
      modal_progress:     'Progresso',
      modal_delete:       'Excluir',
      modal_save:         'Salvar',

      // Theme modal
      theme_title:        '🎨 Tema',
      theme_mode:         'Modo',
      theme_light:        '☀️ Claro',
      theme_dark:         '🌙 Escuro',
      theme_palette:      'Paleta',
      theme_preview_cat:  '🎯 Meta',
      theme_preview_title:'Minha visão',
      theme_preview_desc: 'Uma frase de inspiração para o trimestre.',
      theme_preview_cat2: '✨ Pessoal',
      theme_preview_title2:'Crescimento',
      theme_cancel:       'Cancelar',
      theme_apply:        'Aplicar tema',

      // Lang modal
      lang_title:         '🌐 Idioma',
      lang_cancel:        'Cancelar',
      lang_apply:         'Aplicar',

      // Toasts
      toast_saved:        'Board salvo! ✦',
      toast_card_saved:   'Cartão salvo ✦',
      toast_card_deleted: 'Cartão excluído.',
      toast_board_cleared:'Board limpo.',
      toast_exported:     'Dados exportados!',
      toast_imported:     'Dados importados com sucesso ✦',
      toast_theme:        'Tema aplicado ✦',
      toast_lang:         'Idioma alterado ✦',

      // Confirms
      confirm_delete_card:  'Excluir este cartão?',
      confirm_clear_board:  'Limpar todos os cartões deste trimestre?',
      import_invalid:       'Arquivo inválido: ',

      // Categories
      cat_saude:       '🌿 Saúde',
      cat_carreira:    '💼 Carreira',
      cat_financas:    '💰 Finanças',
      cat_relacoes:    '❤️ Relações',
      cat_aprendizado: '📚 Aprender',
      cat_viagem:      '✈️ Viagem',
      cat_criativo:    '🎨 Criativo',
      cat_pessoal:     '✨ Pessoal',
    },

    'en': {
      // Splash
      splash_badge:       '✦ Intentional Planning',
      splash_sub:         'Manifest your goals,\none quarter at a time.',
      splash_btn:         'Create my board',
      splash_note:        'Everything saved in your browser. Private and yours.',

      // Sidebar
      sidebar_period:     'Period',
      sidebar_history:    'History',
      sidebar_export:     '⬇ Export JSON',
      sidebar_import:     '⬆ Import',
      history_empty:      'No boards saved yet.',
      history_card:       'card',
      history_cards:      'cards',

      // Quarter months
      q1_months: 'Jan–Mar',
      q2_months: 'Apr–Jun',
      q3_months: 'Jul–Sep',
      q4_months: 'Oct–Dec',
      q1_long: 'January — March',
      q2_long: 'April — June',
      q3_long: 'July — September',
      q4_long: 'October — December',

      // Top bar
      topbar_theme:       'Theme',
      topbar_clear:       'Clear board',
      topbar_save:        'Save',

      // Intention bar
      intention_placeholder: 'Quarter intention: write your guiding word or phrase…',

      // Add card
      add_card:           'Add card',

      // Card modal
      modal_edit_title:   'Edit card',
      modal_category:     'Category',
      modal_card_title:   'Title',
      modal_title_ph:     'E.g.: Travel to Japan',
      modal_desc:         'Description / affirmation',
      modal_desc_ph:      'How will you feel when you achieve this?',
      modal_image:        'Image',
      modal_img_ph:       'Paste an image URL…',
      modal_upload:       '📁 Upload',
      modal_or:           'or',
      modal_emoji:        'Emoji',
      modal_color:        'Color',
      modal_progress:     'Progress',
      modal_delete:       'Delete',
      modal_save:         'Save',

      // Theme modal
      theme_title:        '🎨 Theme',
      theme_mode:         'Mode',
      theme_light:        '☀️ Light',
      theme_dark:         '🌙 Dark',
      theme_palette:      'Palette',
      theme_preview_cat:  '🎯 Goal',
      theme_preview_title:'My vision',
      theme_preview_desc: 'An inspiring phrase for the quarter.',
      theme_preview_cat2: '✨ Personal',
      theme_preview_title2:'Growth',
      theme_cancel:       'Cancel',
      theme_apply:        'Apply theme',

      // Lang modal
      lang_title:         '🌐 Language',
      lang_cancel:        'Cancel',
      lang_apply:         'Apply',

      // Toasts
      toast_saved:        'Board saved! ✦',
      toast_card_saved:   'Card saved ✦',
      toast_card_deleted: 'Card deleted.',
      toast_board_cleared:'Board cleared.',
      toast_exported:     'Data exported!',
      toast_imported:     'Data imported successfully ✦',
      toast_theme:        'Theme applied ✦',
      toast_lang:         'Language changed ✦',

      // Confirms
      confirm_delete_card:  'Delete this card?',
      confirm_clear_board:  'Clear all cards from this quarter?',
      import_invalid:       'Invalid file: ',

      // Categories
      cat_saude:       '🌿 Health',
      cat_carreira:    '💼 Career',
      cat_financas:    '💰 Finances',
      cat_relacoes:    '❤️ Relationships',
      cat_aprendizado: '📚 Learning',
      cat_viagem:      '✈️ Travel',
      cat_criativo:    '🎨 Creative',
      cat_pessoal:     '✨ Personal',
    },
  };

  let currentLang = 'pt-BR';

  function loadFromStorage() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && TRANSLATIONS[saved]) currentLang = saved;
    } catch (e) {}
  }

  function saveToStorage(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  function t(key) {
    return (TRANSLATIONS[currentLang] || TRANSLATIONS['pt-BR'])[key] || key;
  }

  function getLang() { return currentLang; }

  function setLang(lang) {
    if (!TRANSLATIONS[lang]) return;
    currentLang = lang;
    saveToStorage(lang);
    applyToDOM();
  }

  // ── Apply all data-i18n attributes ────────────
  function applyToDOM() {
    // data-i18n="key" → textContent
    document.querySelectorAll('[data-i18n]').forEach(el => {
      el.textContent = t(el.dataset.i18n);
    });
    // data-i18n-ph="key" → placeholder
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      el.placeholder = t(el.dataset.i18nPh);
    });
    // data-i18n-title="key" → title attribute
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      el.title = t(el.dataset.i18nTitle);
    });
    // html lang
    document.documentElement.lang = currentLang;
  }

  // ── Language picker modal ─────────────────────
  const LANGS = [
    { code: 'pt-BR', label: 'Português (Brasil)', flag: '🇧🇷' },
    { code: 'en',    label: 'English',             flag: '🇺🇸' },
  ];

  let pendingLang = currentLang;

  function openModal() {
    pendingLang = currentLang;
    renderModal();
    document.getElementById('langModal').classList.remove('hidden');
  }

  function closeModal(e) {
    if (e && e.target !== document.getElementById('langModal')) return;
    document.getElementById('langModal').classList.add('hidden');
  }

  function applyAndClose() {
    setLang(pendingLang);
    document.getElementById('langModal').classList.add('hidden');
    // notify other modules to re-render
    if (window.App && App.onLangChange) App.onLangChange();
    if (window.Theme && Theme.onLangChange) Theme.onLangChange();
    showToast(t('toast_lang'));
  }

  function renderModal() {
    // Update modal title & buttons via i18n keys (already in DOM via data-i18n)
    applyToDOM();

    const list = document.getElementById('langList');
    list.innerHTML = LANGS.map(l => `
      <button class="lang-option ${l.code === pendingLang ? 'active' : ''}" data-code="${l.code}">
        <span class="lang-flag">${l.flag}</span>
        <span class="lang-label">${l.label}</span>
        ${l.code === pendingLang ? '<span class="lang-check">✓</span>' : ''}
      </button>
    `).join('');

    list.querySelectorAll('.lang-option').forEach(btn => {
      btn.addEventListener('click', () => {
        pendingLang = btn.dataset.code;
        renderModal();
      });
    });
  }

  function showToast(msg) {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.remove('hidden');
    setTimeout(() => el.classList.add('hidden'), 2200);
  }

  // Init
  function init() {
    loadFromStorage();
    applyToDOM();
  }

  return { init, t, getLang, setLang, applyToDOM, openModal, closeModal, applyAndClose };
})();

document.addEventListener('DOMContentLoaded', () => I18n.init());
