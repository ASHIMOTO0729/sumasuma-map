(function () {
  var root = document.getElementById('sspr');
  if (!root) return;

  /* ===== 設定 ===== */
  var SCRIPT = document.currentScript && document.currentScript.src;
  var BASE = SCRIPT ? SCRIPT.replace(/[^\/]*$/, '') : 'https://ashimoto0729.github.io/sumasuma-map/';
  var CSV_URL = root.getAttribute('data-csv') || (BASE + 'prices.csv');
  var LINE_URL = 'https://lin.ee/sUhSQys';
  var RESERVE_URL = 'https://www.sumasuma.com/support/contact';
  var ONSITE_URL = 'https://www.sumasuma.com/service/onsite-service';
  var CATS = ['iPhone', 'iPad', 'Apple Watch', 'Android', 'ゲーム機'];

  if (!document.getElementById('ssmap-font')) {
    var lk = document.createElement('link');
    lk.id = 'ssmap-font'; lk.rel = 'stylesheet';
    lk.href = 'https://fonts.googleapis.com/css2?family=Barlow:wght@700;800&display=swap';
    document.head.appendChild(lk);
  }

  var G = "'Hiragino Sans','Hiragino Kaku Gothic ProN','Noto Sans JP','Yu Gothic','Meiryo',sans-serif";
  var D = "'Barlow','DIN Alternate','Bahnschrift',sans-serif";
  var css = [
    '#sspr{--o:#EE8A2B;--o2:#FCD9B3;--od:#D87B00;--ink:#333;font-family:' + G + ';color:var(--ink);width:100%;box-sizing:border-box;display:flex;gap:0;align-items:stretch;-webkit-tap-highlight-color:transparent}',
    '#sspr *{box-sizing:border-box}',
    '#sspr .pick{flex:0 0 55%;width:55%;padding:16px 16px 16px 0;min-width:0}',
    '#sspr .res{flex:0 0 45%;width:45%;padding:16px 16px 16px 12px;min-width:0}',
    '#sspr .st{font-size:13px;font-weight:800;color:var(--od);margin:0 0 8px;display:flex;align-items:center;gap:8px}',
    '#sspr .st b{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;background:var(--o);color:#fff;font-size:12px;font-family:' + D + '}',
    '#sspr .blk{margin-bottom:18px}',
    '#sspr .chips{display:flex;flex-wrap:wrap;gap:8px}',
    '#sspr .chip{appearance:none;border:2px solid var(--o);background:#fff;color:var(--od);border-radius:100px;padding:8px 14px;font:800 13px/1.2 ' + G + ';cursor:pointer;transition:background .15s,color .15s,transform .15s}',
    '#sspr .chip:hover{background:#FFF3E3}',
    '#sspr .chip.on{background:var(--o);color:#fff}',
    '#sspr .sel{position:relative}',
    '#sspr select{appearance:none;-webkit-appearance:none;width:100%;border:2px solid var(--o);border-radius:12px;background:#fff;padding:12px 40px 12px 14px;font:700 15px/1.3 ' + G + ';color:var(--ink);cursor:pointer}',
    '#sspr select:disabled{border-color:#ddd;color:#aaa;cursor:not-allowed}',
    '#sspr .sel::after{content:"";position:absolute;right:16px;top:50%;width:9px;height:9px;border-right:2.5px solid var(--o);border-bottom:2.5px solid var(--o);transform:translateY(-70%) rotate(45deg);pointer-events:none}',
    '#sspr .reps{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px}',
    '#sspr .rep{appearance:none;text-align:left;border:2px solid #eee;background:#fff;border-radius:12px;padding:9px 12px;cursor:pointer;font-family:' + G + ';color:var(--ink);transition:border-color .15s,background .15s;display:flex;flex-direction:column;gap:2px;position:relative}',
    '#sspr .rep:hover{border-color:var(--o2)}',
    '#sspr .rep.on{border-color:var(--o);background:#FFF6EC}',
    '#sspr .rep .rn{font-size:13px;font-weight:800;padding-right:20px}',
    '#sspr .rep .rp{font-size:12px;color:#888;font-weight:700}',
    '#sspr .rep .ck{position:absolute;right:10px;top:10px;width:16px;height:16px;border-radius:50%;border:2px solid #ddd}',
    '#sspr .rep.on .ck{border-color:var(--o);background:var(--o)}',
    '#sspr .rep.on .ck::after{content:"";position:absolute;left:3.5px;top:1px;width:4px;height:7px;border-right:2px solid #fff;border-bottom:2px solid #fff;transform:rotate(45deg)}',
    '#sspr .empty{font-size:13px;color:#999;padding:10px 0}',
    '#sspr .card{position:relative;container-type:inline-size;background:#fff;border:2.5px solid var(--o);border-radius:16px;padding:20px 22px;box-shadow:0 6px 18px rgba(238,138,43,.06);display:flex;flex-direction:column;height:100%;min-height:340px}',
    '#sspr .dev{font-size:clamp(17px,6.5cqw,24px);font-weight:800;margin:0 0 2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '#sspr .lb{font-size:11px;color:#888;margin:0 0 10px}',
    '#sspr .list{flex:1 1 auto;min-height:72px;overflow:auto;border-top:1px dashed #eee;border-bottom:1px dashed #eee;padding:6px 0;margin:0 0 10px}',
    '#sspr .li{display:flex;justify-content:space-between;gap:8px;font-size:13px;padding:4px 0}',
    '#sspr .li span:last-child{font-family:' + D + ';font-weight:700;font-size:15px;white-space:nowrap}',
    '#sspr .hint{font-size:13px;color:#999;line-height:1.7;margin:0;padding:6px 0}',
    '#sspr .tot{display:flex;align-items:baseline;justify-content:space-between;gap:8px;margin:0}',
    '#sspr .tot .tl{font-size:12px;font-weight:800;color:#666;white-space:nowrap}',
    '#sspr .tot .tv{font-family:' + D + ';font-weight:800;color:#E53935;font-size:clamp(34px,15cqw,60px);line-height:1;white-space:nowrap;display:inline-block}',
    '#sspr .tot .tv small{font-family:' + G + ';font-weight:800;font-size:.38em;margin-left:3px}',
    '#sspr .tot .tv.ask{font-family:' + G + ';font-size:clamp(20px,8cqw,30px);color:var(--o)}',
    '#sspr .tv.pop{animation:ssprPop .5s cubic-bezier(.2,1.6,.4,1) both}',
    '@keyframes ssprPop{0%{opacity:0;transform:scale(.5) translateY(8px)}100%{opacity:1;transform:none}}',
    '#sspr .nt{font-size:11px;color:#777;line-height:1.6;margin:8px 0 12px}',
    '#sspr .nt a{color:var(--od);font-weight:700}',
    '#sspr .btns{display:flex;gap:8px}',
    '#sspr .btn{flex:1;display:flex;align-items:center;justify-content:center;gap:6px;border-radius:100px;padding:11px 8px;font:800 13px/1 ' + G + ';color:#fff;text-decoration:none;transition:filter .15s,transform .15s}',
    '#sspr .btn:hover{filter:brightness(.95);transform:scale(1.03)}',
    '#sspr .btn.line{background:#06C755}',
    '#sspr .btn.rsv{background:var(--o)}',
    '#sspr .err{font-size:13px;color:#c00;padding:12px}',
    '@media (prefers-reduced-motion:reduce){#sspr .tv.pop{animation:none}}',
    '@media (max-width:649px){#sspr{flex-direction:column}#sspr .pick,#sspr .res{width:100%;flex:none;padding:8px 4px}#sspr .card{min-height:0;padding:16px 18px}#sspr .reps{grid-template-columns:repeat(2,1fr)}}'
  ].join('\n');

  root.innerHTML = '<style>' + css + '</style>' +
    '<div class="pick">' +
      '<div class="blk"><p class="st"><b>1</b>機種の種類</p><div class="chips" id="sspr-cat"></div></div>' +
      '<div class="blk"><p class="st"><b>2</b>機種</p><div class="sel"><select id="sspr-model" aria-label="機種" disabled><option>読み込み中…</option></select></div></div>' +
      '<div class="blk"><p class="st"><b>3</b>修理内容（複数選べます）</p><div class="reps" id="sspr-reps"><p class="empty">機種を選ぶと修理内容が表示されます</p></div></div>' +
    '</div>' +
    '<div class="res"><div class="card" aria-live="polite">' +
      '<p class="dev" id="sspr-dev">修理料金の目安</p><p class="lb">料金はすべて税込です</p>' +
      '<div class="list" id="sspr-list"><p class="hint">機種と修理内容を選ぶと、料金が自動で表示されます</p></div>' +
      '<div class="tot"><span class="tl">合計（税込）</span><span class="tv" id="sspr-tot">―</span></div>' +
      '<p class="nt">別途出張費がかかります（宇治市内は無料）。<a href="' + ONSITE_URL + '" target="_top">出張費はこちら</a></p>' +
      '<div class="btns"><a class="btn line" href="' + LINE_URL + '" target="_blank" rel="noopener">LINEで相談</a><a class="btn rsv" href="' + RESERVE_URL + '" target="_top">ネット予約</a></div>' +
    '</div></div>';

  var $ = function (id) { return document.getElementById(id); };
  var data = {}, order = {}, state = { cat: 'iPhone', model: '', reps: [] };

  function parseCSV(t) {
    var rows = [], row = [], f = '', q = false;
    t = t.replace(/^﻿/, '');
    for (var i = 0; i < t.length; i++) {
      var c = t[i];
      if (q) { if (c === '"') { if (t[i + 1] === '"') { f += '"'; i++; } else q = false; } else f += c; }
      else if (c === '"') q = true;
      else if (c === ',') { row.push(f); f = ''; }
      else if (c === '\n' || c === '\r') { if (c === '\r' && t[i + 1] === '\n') i++; row.push(f); rows.push(row); row = []; f = ''; }
      else f += c;
    }
    if (f !== '' || row.length) { row.push(f); rows.push(row); }
    return rows;
  }
  function val(s) {
    s = String(s).trim();
    var from = /[〜~]$/.test(s);
    var n = parseInt(s.replace(/[^\d]/g, ''), 10);
    if (isNaN(n) || n === 0) return { ask: true };
    return { n: n, from: from };
  }
  function yen(n) { return n.toLocaleString('ja-JP'); }
  function fmt(v) { return v.ask ? 'お問い合わせ' : yen(v.n) + '円' + (v.from ? '〜' : ''); }
  function esc(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

  function drawCats() {
    var box = $('sspr-cat'); box.innerHTML = '';
    CATS.forEach(function (c) {
      if (!order[c]) return;
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'chip' + (c === state.cat ? ' on' : ''); b.textContent = c;
      b.addEventListener('click', function () { state.cat = c; state.model = ''; state.reps = []; drawCats(); drawModels(); drawReps(); drawResult(true); });
      box.appendChild(b);
    });
  }
  function drawModels() {
    var s = $('sspr-model'); s.disabled = false;
    var models = order[state.cat] || [];
    var html = '<option value="">機種を選んでください</option>';
    models.slice().reverse().forEach(function (m) { html += '<option value="' + esc(m) + '"' + (m === state.model ? ' selected' : '') + '>' + esc(m) + '</option>'; });
    s.innerHTML = html;
    if (models.length === 1) { state.model = models[0]; s.value = models[0]; }
  }
  function drawReps() {
    var box = $('sspr-reps');
    if (!state.model) { box.innerHTML = '<p class="empty">機種を選ぶと修理内容が表示されます</p>'; return; }
    var list = data[state.cat][state.model];
    box.innerHTML = '';
    list.forEach(function (r) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'rep' + (state.reps.indexOf(r.name) >= 0 ? ' on' : '');
      b.setAttribute('aria-pressed', state.reps.indexOf(r.name) >= 0 ? 'true' : 'false');
      b.innerHTML = '<span class="ck"></span><span class="rn">' + esc(r.name) + '</span><span class="rp">' + esc(fmt(r.v)) + '</span>';
      b.addEventListener('click', function () {
        var i = state.reps.indexOf(r.name);
        if (i >= 0) state.reps.splice(i, 1); else state.reps.push(r.name);
        drawReps(); drawResult(true);
      });
      box.appendChild(b);
    });
  }
  function drawResult(anim) {
    $('sspr-dev').textContent = state.model || '修理料金の目安';
    var listEl = $('sspr-list'), tot = $('sspr-tot');
    if (!state.model || !state.reps.length) {
      listEl.innerHTML = '<p class="hint">' + (state.model ? '修理内容を選ぶと、料金が自動で表示されます' : '機種と修理内容を選ぶと、料金が自動で表示されます') + '</p>';
      tot.className = 'tv'; tot.textContent = '―'; return;
    }
    var all = data[state.cat][state.model], sum = 0, ask = false, from = false, h = '';
    all.forEach(function (r) {
      if (state.reps.indexOf(r.name) < 0) return;
      h += '<div class="li"><span>' + esc(r.name) + '</span><span>' + esc(fmt(r.v)) + '</span></div>';
      if (r.v.ask) ask = true; else { sum += r.v.n; if (r.v.from) from = true; }
    });
    listEl.innerHTML = h;
    if (ask) { tot.className = 'tv ask'; tot.textContent = 'お問い合わせ'; }
    else { tot.className = 'tv'; tot.innerHTML = yen(sum) + '<small>円' + (from ? '〜' : '') + '</small>'; }
    if (anim) { void tot.offsetWidth; tot.classList.add('pop'); }
  }

  $('sspr-model').addEventListener('change', function () { state.model = this.value; state.reps = []; drawReps(); drawResult(true); });

  fetch(CSV_URL + (CSV_URL.indexOf('?') < 0 ? '?' : '&') + 'v=' + Date.now())
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
    .then(function (t) {
      var rows = parseCSV(t), head = rows.shift();
      rows.forEach(function (r) {
        if (r.length < 4 || !r[0] || !r[1] || !r[2]) return;
        var c = r[0].trim(), m = r[1].trim(), n = r[2].trim();
        if (!data[c]) { data[c] = {}; order[c] = []; }
        if (!data[c][m]) { data[c][m] = []; order[c].push(m); }
        data[c][m].push({ name: n, v: val(r[3]) });
      });
      CATS.forEach(function (c) { if (data[c] && CATS.indexOf(c) < 0) CATS.push(c); });
      Object.keys(data).forEach(function (c) { if (CATS.indexOf(c) < 0) CATS.push(c); });
      if (!order[state.cat]) state.cat = Object.keys(order)[0];
      drawCats(); drawModels(); drawReps(); drawResult(false);
    })
    .catch(function () { root.innerHTML = '<p class="err">料金データを読み込めませんでした。時間をおいて再度お試しください。</p>'; });
})();
