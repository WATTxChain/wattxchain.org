// WATTxSecret — Client-side AES-256-GCM encrypted self-destructing messages
// No server, no tracking. Everything happens in the browser.

(function () {
  'use strict';

  // --- Lightning Bolt Animation ---
  // 2 bolts side-by-side (left slightly above right), flash 3x every 5s
  // from 13 random positions around the logo
  (function lightning() {
    var boltL = document.querySelector('.bolt-l');
    var boltR = document.querySelector('.bolt-r');
    if (!boltL || !boltR) return;

    // 13 anchor angles evenly spaced around the circle
    var POSITIONS = 13;
    var anchors = [];
    for (var i = 0; i < POSITIONS; i++) {
      anchors.push((i / POSITIONS) * Math.PI * 2);
    }

    var cx = 60, cy = 60; // SVG viewBox center
    var innerR = 22;       // just outside the logo
    var outerR = 50;       // edge of the SVG

    function rand(a, b) { return a + Math.random() * (b - a); }

    // Generate a jagged lightning bolt path from inner radius to outer radius
    function makeBolt(angle, offsetAngle, offsetY) {
      var pts = [];
      var steps = Math.floor(rand(4, 7));
      for (var i = 0; i <= steps; i++) {
        var t = i / steps;
        var r = innerR + (outerR - innerR) * t;
        // Jitter increases toward the tip
        var jA = angle + offsetAngle + rand(-0.15, 0.15) * (1 + t);
        var jR = r + rand(-4, 4);
        var x = cx + Math.cos(jA) * jR;
        var y = cy + Math.sin(jA) * jR + offsetY;
        pts.push(x.toFixed(1) + ',' + y.toFixed(1));
      }
      return pts.join(' ');
    }

    function flashPair() {
      // Pick a random anchor position
      var angle = anchors[Math.floor(Math.random() * anchors.length)];

      // Left bolt: slightly above (negative offset), small angle offset left
      boltL.setAttribute('points', makeBolt(angle, -0.08, -1.5));
      // Right bolt: slightly below, small angle offset right
      boltR.setAttribute('points', makeBolt(angle, 0.08, 1.5));

      // Randomize color per flash
      var colors = ['#E8D44D', '#F5E97D', '#FFFBE6', '#FFD700'];
      var c = colors[Math.floor(Math.random() * colors.length)];
      boltL.style.stroke = c;
      boltR.style.stroke = c;
      boltL.style.strokeWidth = rand(1.5, 2.5).toFixed(1);
      boltR.style.strokeWidth = rand(1.5, 2.5).toFixed(1);

      // Trigger flash animation
      boltL.classList.remove('flash');
      boltR.classList.remove('flash');
      void boltL.offsetWidth; // reflow
      boltL.classList.add('flash');
      boltR.classList.add('flash');
    }

    // 3 rapid flashes then pause, repeat every 5s
    function burstCycle() {
      // Flash 1
      flashPair();
      // Flash 2 — new random position
      setTimeout(function () { flashPair(); }, 180);
      // Flash 3 — new random position
      setTimeout(function () { flashPair(); }, 360);
      // Next burst in 5s
      setTimeout(burstCycle, 5000);
    }

    // Start after a small initial delay
    setTimeout(burstCycle, 800);
  })();

  // --- DOM References ---
  const encryptView = document.getElementById('encryptView');
  const decryptView = document.getElementById('decryptView');
  const messageInput = document.getElementById('messageInput');
  const charCount = document.getElementById('charCount');
  const expirySlider = document.getElementById('expirySlider');
  const expiryValue = document.getElementById('expiryValue');
  const viewsSlider = document.getElementById('viewsSlider');
  const viewsValue = document.getElementById('viewsValue');
  const encryptBtn = document.getElementById('encryptBtn');
  const clearBtn = document.getElementById('clearBtn');
  const templateSelect = document.getElementById('templateSelect');
  const resultDiv = document.getElementById('result');
  const secretLinkInput = document.getElementById('secretLink');
  const copyBtn = document.getElementById('copyBtn');
  const copyFeedback = document.getElementById('copyFeedback');
  const expiryInfo = document.getElementById('expiryInfo');
  const httpsWarning = document.getElementById('httpsWarning');

  // Decrypt view elements
  const decryptLoading = document.getElementById('decryptLoading');
  const decryptSuccess = document.getElementById('decryptSuccess');
  const decryptError = document.getElementById('decryptError');
  const messageDisplay = document.getElementById('messageDisplay');
  const messageMeta = document.getElementById('messageMeta');
  const errorTitle = document.getElementById('errorTitle');
  const errorMessage = document.getElementById('errorMessage');
  const newSecretBtn = document.getElementById('newSecretBtn');
  const newSecretErrorBtn = document.getElementById('newSecretErrorBtn');

  // --- Templates ---
  const templates = {
    credentials: 'Username: \nPassword: \nURL: \nNotes: ',
    creditcard: 'Card Number: \nExpiry: \nCVV: \nName: \nBilling Address: '
  };

  // --- Base64url Encoding ---
  function base64urlEncode(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  function base64urlDecode(str) {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4 !== 0) {
      base64 += '=';
    }
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  }

  // --- Crypto Functions ---
  async function generateKey() {
    return crypto.subtle.generateKey(
      { name: 'AES-GCM', length: 256 },
      true, // extractable
      ['encrypt', 'decrypt']
    );
  }

  async function exportKey(key) {
    const raw = await crypto.subtle.exportKey('raw', key);
    return base64urlEncode(raw);
  }

  async function importKey(base64Key) {
    const raw = base64urlDecode(base64Key);
    return crypto.subtle.importKey(
      'raw',
      raw,
      { name: 'AES-GCM', length: 256 },
      false,
      ['decrypt']
    );
  }

  async function encrypt(message, key) {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encoded = new TextEncoder().encode(message);
    const ciphertext = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      encoded
    );
    // Prepend IV to ciphertext
    const combined = new Uint8Array(iv.length + ciphertext.byteLength);
    combined.set(iv);
    combined.set(new Uint8Array(ciphertext), iv.length);
    return base64urlEncode(combined.buffer);
  }

  async function decrypt(key, data) {
    const combined = base64urlDecode(data);
    const iv = combined.slice(0, 12);
    const ciphertext = combined.slice(12);
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      ciphertext
    );
    return new TextDecoder().decode(decrypted);
  }

  // --- URL Fragment Handling ---
  function buildLink(keyBase64, dataBase64, expiryTimestamp, views) {
    const base = window.location.href.split('#')[0];
    return base + '#k=' + keyBase64 + '&d=' + dataBase64 + '&e=' + expiryTimestamp + '&v=' + views;
  }

  function parseFragment(hash) {
    if (!hash || hash.length < 2) return null;
    const fragment = hash.substring(1);
    const params = {};
    fragment.split('&').forEach(function (part) {
      const eq = part.indexOf('=');
      if (eq > 0) {
        params[part.substring(0, eq)] = part.substring(eq + 1);
      }
    });
    if (!params.k || !params.d || !params.e) return null;
    return {
      key: params.k,
      data: params.d,
      expiry: parseInt(params.e, 10),
      views: parseInt(params.v || '1', 10)
    };
  }

  // --- UI Helpers ---
  function updateCharCounter() {
    const len = messageInput.value.length;
    charCount.textContent = len;
    encryptBtn.disabled = len === 0;

    const counter = charCount.parentElement;
    counter.classList.remove('near-limit', 'at-limit');
    if (len >= 2000) {
      counter.classList.add('at-limit');
    } else if (len >= 1800) {
      counter.classList.add('near-limit');
    }
  }

  function updateSliderDisplay(slider, display, suffix) {
    const val = slider.value;
    display.textContent = val + ' ' + suffix + (val !== '1' ? 's' : '');
  }

  function applyTemplate(name) {
    if (templates[name]) {
      messageInput.value = templates[name];
      updateCharCounter();
      messageInput.focus();
    }
  }

  function showResult(link, expiryDate) {
    secretLinkInput.value = link;
    expiryInfo.textContent = 'Expires: ' + expiryDate.toLocaleDateString(undefined, {
      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
    resultDiv.classList.remove('hidden');
    secretLinkInput.focus();
    secretLinkInput.select();
  }

  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (e) {
      // Fallback for older browsers
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      let ok = false;
      try { ok = document.execCommand('copy'); } catch (_) { /* ignore */ }
      document.body.removeChild(ta);
      return ok;
    }
  }

  function goToEncryptView() {
    window.location.hash = '';
    window.location.reload();
  }

  function showDecryptError(title, message) {
    decryptLoading.classList.add('hidden');
    decryptSuccess.classList.add('hidden');
    decryptError.classList.remove('hidden');
    errorTitle.textContent = title;
    errorMessage.textContent = message;
  }

  function showDecryptedMessage(plaintext, expiry, views) {
    decryptLoading.classList.add('hidden');
    decryptError.classList.add('hidden');
    decryptSuccess.classList.remove('hidden');

    messageDisplay.textContent = plaintext;

    const expiryDate = new Date(expiry);
    const viewsText = views + ' view' + (views !== 1 ? 's' : '');
    messageMeta.textContent = 'Expires: ' + expiryDate.toLocaleDateString(undefined, {
      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    }) + ' \u00B7 ' + viewsText + ' allowed';
  }

  // --- HTTPS Check ---
  function checkHttps() {
    const isSecure = location.protocol === 'https:' ||
                     location.hostname === 'localhost' ||
                     location.hostname === '127.0.0.1' ||
                     location.protocol === 'file:';
    if (!isSecure) {
      httpsWarning.classList.remove('hidden');
    }
  }

  // --- Encrypt Flow ---
  async function handleEncrypt() {
    const message = messageInput.value.trim();
    if (!message) return;

    encryptBtn.disabled = true;
    encryptBtn.innerHTML = '<span class="btn-icon">&#9203;</span> Encrypting...';

    try {
      const key = await generateKey();
      const keyBase64 = await exportKey(key);
      const dataBase64 = await encrypt(message, key);

      const days = parseInt(expirySlider.value, 10);
      const expiryTimestamp = Date.now() + days * 24 * 60 * 60 * 1000;
      const views = parseInt(viewsSlider.value, 10);

      const link = buildLink(keyBase64, dataBase64, expiryTimestamp, views);

      // Check URL length
      if (link.length > 8000) {
        alert('Message is too long to encode in a URL. Please shorten your message.');
        return;
      }

      const expiryDate = new Date(expiryTimestamp);
      showResult(link, expiryDate);
    } catch (err) {
      alert('Encryption failed: ' + err.message);
    } finally {
      encryptBtn.disabled = false;
      encryptBtn.innerHTML = '<span class="btn-icon">&#128274;</span> Encrypt Message';
      updateCharCounter();
    }
  }

  // --- Decrypt Flow ---
  async function handleDecrypt(params) {
    encryptView.classList.add('hidden');
    decryptView.classList.remove('hidden');

    // Brief loading state
    decryptLoading.classList.remove('hidden');
    decryptSuccess.classList.add('hidden');
    decryptError.classList.add('hidden');

    // Small delay for UX
    await new Promise(function (r) { setTimeout(r, 600); });

    // Check expiry
    if (params.expiry && Date.now() > params.expiry) {
      showDecryptError('Message Expired', 'This secret message has expired and can no longer be viewed.');
      return;
    }

    try {
      const key = await importKey(params.key);
      const plaintext = await decrypt(key, params.data);
      showDecryptedMessage(plaintext, params.expiry, params.views);
    } catch (err) {
      showDecryptError('Decryption Failed', 'Invalid or corrupted link. The message could not be decrypted.');
    }
  }

  // --- Init ---
  function init() {
    checkHttps();

    // Bind "Create New Secret" buttons (used in decrypt view)
    newSecretBtn.addEventListener('click', goToEncryptView);
    newSecretErrorBtn.addEventListener('click', goToEncryptView);

    // Check if we have a URL fragment to decrypt
    const params = parseFragment(window.location.hash);
    if (params) {
      handleDecrypt(params);
      return;
    }

    // Set up encrypt view
    messageInput.addEventListener('input', updateCharCounter);

    expirySlider.addEventListener('input', function () {
      updateSliderDisplay(expirySlider, expiryValue, 'Day');
    });

    viewsSlider.addEventListener('input', function () {
      updateSliderDisplay(viewsSlider, viewsValue, 'View');
    });

    encryptBtn.addEventListener('click', handleEncrypt);

    clearBtn.addEventListener('click', function () {
      messageInput.value = '';
      templateSelect.value = '';
      resultDiv.classList.add('hidden');
      copyFeedback.classList.add('hidden');
      updateCharCounter();
      messageInput.focus();
    });

    templateSelect.addEventListener('change', function () {
      if (this.value) {
        applyTemplate(this.value);
      }
    });

    copyBtn.addEventListener('click', async function () {
      const ok = await copyToClipboard(secretLinkInput.value);
      if (ok) {
        copyFeedback.classList.remove('hidden');
        copyBtn.textContent = 'Copied!';
        setTimeout(function () {
          copyFeedback.classList.add('hidden');
          copyBtn.textContent = 'Copy Link';
        }, 2000);
      }
    });

    // Initialize displays
    updateCharCounter();
    updateSliderDisplay(expirySlider, expiryValue, 'Day');
    updateSliderDisplay(viewsSlider, viewsValue, 'View');
  }

  // Run
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
