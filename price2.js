(function(){
var root=document.getElementById('sspr2');if(!root)return;
var SCRIPT=document.currentScript&&document.currentScript.src;
var BASE=SCRIPT?SCRIPT.replace(/[^\/]*$/,''):'https://ashimoto0729.github.io/sumasuma-map/';
var CSV_URL=root.getAttribute('data-csv')||(BASE+'prices.csv');
if(root.getAttribute('data-offset'))root.style.setProperty('--sb',root.getAttribute('data-offset'));
var CAMPAIGN=true,OFF=4400,CAMP_NOTE='オープン記念キャンペーン（2027/1/4〜3/31）';
var CATS=['iPhone','iPad','Apple Watch','Android','ゲーム機'];
var IC={'iPhone':'<rect x="14" y="4" width="20" height="40" rx="4"/><line x1="21" y1="39" x2="27" y2="39"/>','iPad':'<rect x="8" y="6" width="32" height="38" rx="4"/><line x1="21" y1="39" x2="27" y2="39"/>','Apple Watch':'<rect x="13" y="13" width="22" height="22" rx="6"/><path d="M18 13l2-8h8l2 8M18 35l2 8h8l2-8"/>','Android':'<rect x="14" y="4" width="20" height="40" rx="3"/><line x1="14" y1="10" x2="34" y2="10"/><line x1="14" y1="37" x2="34" y2="37"/>','ゲーム機':'<rect x="9" y="16" width="30" height="16" rx="8"/><path d="M16 21v6M13 24h6"/><circle cx="30" cy="22.5" r="1.3"/><circle cx="33.5" cy="25.5" r="1.3"/>'};
/* 出張エリア：[市区町村, 料金区分, 距離] 料金区分→V */
var AREA=[["宇治市",0,"宇治市内"],["城陽市",1,"〜7km"],["京都市伏見区",1,"〜7km"],["久御山町",1,"〜7km"],["宇治田原町",1,"〜7km"],["八幡市",2,"7〜9km"],["京田辺市",2,"7〜9km"],["京都市山科区",3,"9〜11km"],["長岡京市",3,"9〜11km"],["大山崎町",3,"9〜11km"],["井手町",3,"9〜11km"],["京都市東山区",4,"11〜14km"],["京都市下京区",4,"11〜14km"],["京都市南区",4,"11〜14km"],["向日市",4,"11〜14km"],["和束町",4,"11〜14km"],["精華町",4,"11〜14km"],["京都市上京区",5,"14〜17km"],["京都市中京区",5,"14〜17km"],["京都市西京区",5,"14〜17km"],["木津川市",5,"14〜17km"],["京都市右京区",7,"14km〜"],["京都市北区",6,"17km〜"],["京都市左京区",6,"17km〜"],["亀岡市",6,"17km〜"],["南丹市",6,"17km〜"],["京丹波町",6,"17km〜"],["笠置町",6,"17km〜"],["南山城村",6,"17km〜"],["福知山市",6,"17km〜"],["舞鶴市",6,"17km〜"],["綾部市",6,"17km〜"],["宮津市",6,"17km〜"],["京丹後市",6,"17km〜"],["伊根町",6,"17km〜"],["与謝野町",6,"17km〜"]];
var V=[0,1100,1700,2200,3300,4400,-1,4400];
var CSS="#sspr2{--o:#F78D01;--od:#D87B00;--pe:#FFE5C1;--cr:#FFFBF6;--ink:#333;--mu:#7A6B5A;--line:#E9E1D6;--red:#E53935;font-family:'Noto Sans JP','Hiragino Sans','Hiragino Kaku Gothic ProN','Yu Gothic',sans-serif;color:var(--ink);max-width:1100px;margin:0 auto}"+
"#sspr2 *{box-sizing:border-box}"+
"#sspr2 .hd{text-align:center;margin:0 0 28px}#sspr2 .ttl{font-family:'M PLUS 1p','Hiragino Sans',sans-serif;font-weight:900;font-size:26px;letter-spacing:.06em;margin:0 0 6px}#sspr2 .lead{font-size:14px;color:var(--mu);margin:0;letter-spacing:.04em}"+
"#sspr2 .wrap{display:grid;grid-template-columns:minmax(0,1fr) 340px;gap:28px;align-items:start}"+
"#sspr2 .steps{display:flex;flex-direction:column;gap:16px}"+
"#sspr2 .st{background:transparent;padding:6px 0 18px;animation:sspr2in .35s ease both}"+
"#sspr2 .st[hidden]{display:none}@keyframes sspr2in{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}"+
"#sspr2 .sh{display:flex;align-items:center;gap:12px;margin:0 0 16px}"+
"#sspr2 .no{font-family:'Barlow',sans-serif;font-weight:800;font-size:12px;letter-spacing:.08em;color:#fff;background:var(--o);border-radius:4px;padding:3px 8px;line-height:1.2}"+
"#sspr2 .st.done .no{background:var(--od)}"+
"#sspr2 .sh b{font-family:'M PLUS 1p','Hiragino Sans',sans-serif;font-weight:900;font-size:18px;letter-spacing:.04em}"+
"#sspr2 .sh .val{margin-left:auto;font-size:13px;font-weight:700;color:var(--od);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:45%}"+
"#sspr2 .cats{display:grid;grid-template-columns:repeat(5,1fr);gap:10px}"+
"#sspr2 .cats button{appearance:none;display:flex;flex-direction:column;align-items:center;gap:10px;background:#fff;border:1.5px solid var(--line);border-radius:10px;padding:18px 6px 14px;font-family:inherit;font-size:14px;font-weight:700;color:var(--ink);cursor:pointer;transition:border-color .15s,background .15s}"+
"#sspr2 .cats button svg{width:36px;height:36px;fill:none;stroke:var(--o);stroke-width:2;stroke-linecap:round;stroke-linejoin:round}"+
"#sspr2 .cats button:hover{border-color:var(--pe)}"+
"#sspr2 .cats button.on{background:var(--cr);border-color:var(--o);color:var(--od)}"+
"#sspr2 .flt{position:relative;margin:0 0 12px}#sspr2 .flt input{width:100%;border:1.5px solid var(--line);border-radius:10px;padding:10px 12px 10px 36px;font-family:inherit;font-size:14px;color:var(--ink);background:#fff}#sspr2 .flt input:focus{outline:none;border-color:var(--o)}#sspr2 .flt svg{position:absolute;left:12px;top:50%;width:16px;height:16px;transform:translateY(-50%);fill:none;stroke:#b3a693;stroke-width:2}"+
"#sspr2 .models{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;max-height:590px;overflow:auto;padding:2px}#sspr2 .models.wide{grid-template-columns:repeat(2,1fr)}"+
"#sspr2 .models button{appearance:none;border:1.5px solid var(--line);background:#fff;border-radius:8px;padding:10px 8px;font-family:inherit;font-size:13px;font-weight:700;color:var(--ink);cursor:pointer;text-align:center;line-height:1.35}"+
"#sspr2 .models button:hover{border-color:var(--o)}#sspr2 .models button.on{background:var(--o);border-color:var(--o);color:#fff}"+
"#sspr2 .none{font-size:13px;color:var(--mu);grid-column:1/-1;margin:6px 0}"+
"#sspr2 .reps{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}"+
"#sspr2 .rep{background:#fff;display:flex;align-items:center;gap:10px;border:1.5px solid var(--line);border-radius:8px;padding:12px 14px;cursor:pointer;font-size:14px;transition:border-color .15s,background .15s}"+
"#sspr2 .rep:hover{border-color:var(--pe)}#sspr2 .rep.on{border-color:var(--o);background:#FFF6EA}"+
"#sspr2 .rep input{appearance:none;-webkit-appearance:none;width:18px;height:18px;border:1.5px solid #c9bfb2;border-radius:4px;margin:0;flex:none;position:relative;cursor:pointer;background:#fff}"+
"#sspr2 .rep input:checked{background:var(--o);border-color:var(--o)}#sspr2 .rep input:checked::after{content:'';position:absolute;left:5px;top:1.5px;width:5px;height:9px;border-right:2px solid #fff;border-bottom:2px solid #fff;transform:rotate(45deg)}"+
"#sspr2 .rep .n{flex:1;font-weight:700}#sspr2 .rep .p{font-family:'Barlow',sans-serif;font-weight:700;font-size:16px;color:#555;white-space:nowrap}#sspr2 .rep .p.ask{font-family:inherit;font-size:12px;color:var(--mu)}"+
"#sspr2 .area{display:flex;gap:16px;align-items:center}"+
"#sspr2 select{appearance:none;-webkit-appearance:none;flex:0 0 300px;border:1.5px solid var(--line);border-radius:10px;padding:12px 36px 12px 14px;font-family:inherit;font-size:15px;font-weight:700;color:var(--ink);background:#fff url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' fill='none' stroke='%23333' stroke-width='1.6'/%3E%3C/svg%3E\") no-repeat right 14px center;cursor:pointer}#sspr2 select:focus{outline:none;border-color:var(--o)}"+
"#sspr2 .fee{flex:1;display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;min-height:30px}#sspr2 .fee .km{font-size:12px;color:var(--mu);font-weight:700}#sspr2 .fee s{font-family:'Barlow',sans-serif;font-weight:700;font-size:16px;color:#9a8f82}#sspr2 .fee .ar{color:var(--mu);font-size:12px}#sspr2 .fee em{font-style:normal;font-family:'Barlow',sans-serif;font-weight:800;font-size:24px;color:var(--red)}#sspr2 .fee em small{font-family:'Noto Sans JP',sans-serif;font-size:12px;margin-left:1px}#sspr2 .fee .askf{font-weight:700;color:var(--od);font-size:15px}"+
"#sspr2 .camp b{font-weight:700;margin-left:.5em}#sspr2 .camp{display:inline-block;margin:12px 0 0;font-size:12px;font-weight:700;color:var(--red);background:#FDECEC;border-radius:4px;padding:4px 8px}#sspr2 .alink{display:inline-block;margin:12px 0 0 10px;font-size:12px;color:var(--od);font-weight:700;text-decoration:none}#sspr2 .alink:hover{text-decoration:underline}"+
"#sspr2 .side{position:relative;will-change:transform;transition:transform .12s ease-out}"+
"#sspr2 .memo{background:#fff;border-radius:10px;padding:20px 22px 18px;border-top:4px solid var(--o)}"+
"#sspr2 .mh{display:flex;justify-content:space-between;align-items:baseline;margin:0 0 10px}#sspr2 .mh b{font-family:'M PLUS 1p','Hiragino Sans',sans-serif;font-weight:900;font-size:16px;letter-spacing:.1em}#sspr2 .mh span{font-size:12px;color:var(--mu);font-weight:700;max-width:62%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}"+
"#sspr2 .items{border-top:1px dashed var(--line);padding:6px 0;min-height:120px;max-height:300px;overflow:auto}"+
"#sspr2 .gl{font-size:11px;font-weight:700;color:var(--mu);margin:8px 0 2px;letter-spacing:.06em}"+
"#sspr2 .it{display:flex;align-items:baseline;gap:6px;font-size:13px;padding:4px 0}#sspr2 .it i{flex:1;border-bottom:1px dotted #cfc5b8;transform:translateY(-3px)}#sspr2 .it em{font-style:normal;font-family:'Barlow',sans-serif;font-weight:700;font-size:15px;white-space:nowrap}#sspr2 .it em s{color:#9a8f82;font-size:13px;margin-right:4px}#sspr2 .it em.r{color:var(--red)}#sspr2 .it em.ask{font-family:inherit;font-size:12px;color:var(--od)}"+
"#sspr2 .wait{font-size:13px;color:#a99;margin:14px 0}"+
"#sspr2 .sum{border-top:3px double var(--line);padding:12px 0 2px;display:flex;align-items:baseline;justify-content:space-between}#sspr2 .sum .sl{font-size:12px;font-weight:700}"+
"#sspr2 .tv{font-family:'Barlow',sans-serif;font-weight:800;font-size:40px;line-height:1;color:var(--red)}#sspr2 .tv small{font-family:'Noto Sans JP',sans-serif;font-size:13px;margin-left:2px}#sspr2 .tv.ask{font-family:inherit;font-size:20px;color:var(--od)}"+
"#sspr2 .nt{font-size:11px;color:var(--mu);margin:8px 0 14px;line-height:1.6}"+
"#sspr2 .btns{display:flex;gap:8px}#sspr2 .btns a{flex:1;display:block;text-align:center;color:#fff;text-decoration:none;border-radius:10px;padding:13px 6px;font-family:'M PLUS 1p','Hiragino Sans',sans-serif;font-weight:700;font-size:14px;letter-spacing:.04em}#sspr2 a.ln{background:#06C755}#sspr2 a.tel{background:var(--o)}#sspr2 .btns a:hover{opacity:.9}"+
"#sspr2 .rst{display:block;margin:12px auto 0;appearance:none;border:none;background:none;font-family:inherit;font-size:12px;color:var(--mu);cursor:pointer;text-decoration:underline}"+"#sspr2 .bar{display:none}#sspr2 .chg,#sspr2 .nx,#sspr2 .ser{display:none}"+"@media (max-width:649px){#sspr2 .hd{margin:0 0 18px}#sspr2 .ttl{font-size:22px}#sspr2 .lead{font-size:12px}#sspr2 .wrap{grid-template-columns:1fr;gap:14px}#sspr2 .steps{gap:12px}#sspr2 .st{padding:4px 0 14px}#sspr2 .sh{margin:0 0 12px;gap:10px}#sspr2 .sh b{font-size:16px}#sspr2 .sh .val{font-size:12px}#sspr2 .cats{grid-template-columns:repeat(6,1fr);gap:8px}#sspr2 .cats button{grid-column:span 2;padding:14px 2px 12px;gap:8px;font-size:13px;white-space:nowrap}#sspr2 .cats button:nth-child(4){grid-column:2/span 2}#sspr2 .cats button svg{width:30px;height:30px}#sspr2 .flt input{font-size:16px}#sspr2 .models,#sspr2 .models.wide{grid-template-columns:repeat(2,1fr);max-height:378px}#sspr2 .models button{font-size:13px;padding:11px 4px}#sspr2 .reps{grid-template-columns:1fr}#sspr2 .st{transition:none}#sspr2 .st.col{background:#fff;border:1.5px solid var(--line);border-radius:10px;padding:12px 14px;cursor:pointer;animation:none}#sspr2 .st.col .bd{display:none}#sspr2 .st.col .sh{margin:0}#sspr2 .st.col .sh b{font-size:14px}#sspr2 .st.col .val{font-size:14px;color:var(--ink);max-width:42%}#sspr2 .st.col .chg{display:inline-block;flex:none;font-size:12px;font-weight:700;color:var(--od);border:1px solid var(--pe);border-radius:20px;padding:3px 10px;margin-left:2px}#sspr2 .ser{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:0 0 12px}#sspr2 .ser button{appearance:none;border:1.5px solid var(--line);background:#fff;border-radius:20px;padding:8px 2px;font-family:inherit;font-size:12px;font-weight:700;color:var(--ink);cursor:pointer;white-space:nowrap}#sspr2 .ser button.on{background:var(--ink);border-color:var(--ink);color:#fff}#sspr2 .models.grp{max-height:none}#sspr2 .models.grp .none{text-align:center}#sspr2 .nx{display:block;width:100%;margin:12px 0 0;appearance:none;border:none;background:var(--o);color:#fff;border-radius:10px;padding:14px;font-family:'M PLUS 1p','Hiragino Sans',sans-serif;font-weight:700;font-size:15px;cursor:pointer}#sspr2 .nx[hidden]{display:none}#sspr2 .rep{padding:13px 12px}#sspr2 .area{flex-direction:column;align-items:stretch;gap:12px}#sspr2 select{flex:none;width:100%;font-size:16px}#sspr2 .fee{justify-content:flex-end}#sspr2 .camp{display:block;margin:12px 0 0}#sspr2 .alink{margin:10px 0 0}#sspr2 .side{position:static;transform:none!important}#sspr2.empty .side{display:none}#sspr2 .fee:empty{display:none}#sspr2 .camp b{display:block;margin:2px 0 0}#sspr2 .memo{padding:18px 16px 16px}#sspr2 .items{max-height:none;min-height:0}#sspr2 .tv{font-size:36px}#sspr2 .bar{position:absolute;left:-4px;right:-4px;top:0;z-index:5;display:flex;align-items:center;gap:10px;margin:0;background:#fff;border-radius:10px;box-shadow:0 -2px 12px rgba(0,0,0,.08);padding:10px 12px 10px 16px;transition:opacity .2s,transform .12s ease-out}#sspr2 .bar[hidden]{display:none}#sspr2 .bar .bl{font-size:11px;font-weight:700;color:var(--mu);line-height:1.3}#sspr2 .bar .bv{font-family:'Barlow',sans-serif;font-weight:800;font-size:24px;color:var(--red);line-height:1}#sspr2 .bar .bv small{font-family:'Noto Sans JP',sans-serif;font-size:11px;margin-left:1px}#sspr2 .bar .bv.ask{font-family:inherit;font-size:15px;color:var(--od)}#sspr2 .bar button{margin-left:auto;appearance:none;border:none;background:var(--o);color:#fff;border-radius:8px;padding:10px 14px;font-family:'M PLUS 1p','Hiragino Sans',sans-serif;font-weight:700;font-size:13px;cursor:pointer;white-space:nowrap}}";
if(!document.getElementById('sspr2-font')){var lk=document.createElement('link');lk.id='sspr2-font';lk.rel='stylesheet';lk.href='https://fonts.googleapis.com/css2?family=Barlow:wght@700;800&family=M+PLUS+1p:wght@700;900&family=Noto+Sans+JP:wght@400;500;700&display=swap';document.head.appendChild(lk)}
var st=document.createElement('style');st.textContent=CSS;document.head.appendChild(st);
var D={},O={},S={c:'',m:'',r:[],a:'',o:'s1',g:''};
var GR={'iPhone':[['17シリーズ',/iPhone (17|Air)/],['16シリーズ',/iPhone 16/],['15シリーズ',/iPhone 15/],['14シリーズ',/iPhone 14/],['13シリーズ',/iPhone 13/],['12シリーズ',/iPhone 12/],['11シリーズ',/iPhone 11/],['X・XS・XR',/iPhone X/],['SEシリーズ',/SE/],['8以前',/./]],'iPad':[['iPad',/^iPad (\d+|A\d+)$/],['iPad mini',/mini/],['iPad Air',/Air/],['iPad Pro',/Pro/]],'Apple Watch':[['Series 9〜11',/Series (9|10|11) /],['Ultra',/Ultra/],['SE',/SE/],['Series 4〜8',/Series [4-8] /],['Series 1〜3',/Series [1-3] /]]};
function mob(){return window.innerWidth<650}
function grpOf(m){var g=GR[S.c];if(!g)return '';for(var i=0;i<g.length;i++)if(g[i][1].test(m))return g[i][0];return ''}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function yen(n){return n.toLocaleString('ja-JP')}
function fmt(v){var n=parseInt(v,10);return n?yen(n)+'円'+(/〜$/.test(v)?'〜':''):''}
function $(i){return root.querySelector('#'+i)}
root.innerHTML='<div class="hd"><p class="ttl">修理料金シミュレーター</p><p class="lead">上から順に選ぶと、出張費込みのお見積りがすぐにわかります</p></div>'+
'<div class="wrap"><div class="steps">'+
'<section class="st" id="s1"><div class="sh"><span class="no">STEP 1</span><b>機種の種類</b><span class="val" id="v1"></span><span class="chg">変更</span></div><div class="bd"><div class="cats" id="cats"></div></div></section>'+
'<section class="st" id="s2" hidden><div class="sh"><span class="no">STEP 2</span><b>機種を選ぶ</b><span class="val" id="v2"></span><span class="chg">変更</span></div><div class="bd"><div class="ser" id="ser"></div><div class="flt" id="fw"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg><input id="q" type="search" placeholder="機種名で絞り込み（例：15 Pro）"></div><div class="models" id="models"></div></div></section>'+
'<section class="st" id="s3" hidden><div class="sh"><span class="no">STEP 3</span><b>修理内容</b><span class="val" id="v3"></span><span class="chg">変更</span></div><div class="bd"><div class="reps" id="reps"></div><button type="button" class="nx" id="nx3" hidden>出張先の地域へ進む ›</button></div></section>'+
'<section class="st" id="s4" hidden><div class="sh"><span class="no">STEP 4</span><b>出張先の地域</b><span class="val" id="v4"></span><span class="chg">変更</span></div><div class="bd"><div class="area"><select id="ar"></select><div class="fee" id="fee"></div></div>'+(CAMPAIGN?'<span class="camp">'+CAMP_NOTE+'<b>出張費 最大4,400円引き</b></span>':'')+'<a class="alink" href="https://www.sumasuma.com/service/onsite-service" target="_top">出張費の地図を見る ›</a></div></section>'+
'</div><aside class="side"><div class="memo"><div class="mh"><b>お見積り</b><span id="d"></span></div><div class="items" id="l"></div><div class="sum"><span class="sl">合計（税込）</span><span class="tv" id="t">―</span></div><p class="nt" id="nt">表示金額は目安です。端末の状態により変わる場合があります。</p><div class="btns"><a class="ln" href="https://lin.ee/sUhSQys" target="_blank" rel="noopener">LINEで相談</a><a class="tel" href="tel:05017930004" target="_top">今すぐ電話</a></div><button type="button" class="rst" id="rst">最初からやり直す</button></div></aside></div><div class="bar" id="bar" hidden><div><div class="bl">お見積り合計</div><div class="bv" id="bv"></div></div><button type="button" id="bgo">内訳を見る ↓</button></div>';
var ah='<option value="">市区町村を選んでください</option>';AREA.forEach(function(a,i){ah+='<option value="'+i+'">'+a[0]+'</option>'});$('ar').innerHTML=ah;
function show(id,on){var e=$(id);if(on&&e.hidden){e.hidden=false}else if(!on)e.hidden=true}
function done(id,v){$(id).classList.toggle('done',!!v)}
function drawCats(){var h='';CATS.forEach(function(k){if(!O[k])return;h+='<button type="button" data-k="'+esc(k)+'"'+(S.c===k?' class="on"':'')+'><svg viewBox="0 0 48 48">'+(IC[k]||'')+'</svg>'+esc(k)+'</button>'});$('cats').innerHTML=h;
root.querySelectorAll('#cats button').forEach(function(b){b.onclick=function(){var k=b.getAttribute('data-k');if(S.c===k)return;S.c=k;S.m=O[k].length===1?O[k][0]:'';S.r=[];S.g='';$('q').value='';S.o=S.m?'s3':'s2';drawCats();drawModels();drawReps();upd();go(S.o)}})}
function drawModels(){var q=$('q').value.replace(/\s+/g,'').toLowerCase(),list=O[S.c]||[],h='',useG=mob()&&GR[S.c]&&list.length>12,sh='';
if(useG){if(!S.g&&S.m)S.g=grpOf(S.m);GR[S.c].forEach(function(g){if(!list.some(function(m){return grpOf(m)===g[0]}))return;sh+='<button type="button" data-g="'+esc(g[0])+'"'+(S.g===g[0]?' class="on"':'')+'>'+esc(g[0])+'</button>'})}
$('ser').innerHTML=sh;$('ser').style.display=useG?'':'none';
root.querySelectorAll('#ser button').forEach(function(b){b.onclick=function(){S.g=b.getAttribute('data-g');drawModels();var mm=$('models');if(mm.scrollTop)mm.scrollTop=0}});
list.slice().reverse().forEach(function(m){if(useG&&grpOf(m)!==S.g)return;if(!useG&&q&&m.replace(/\s+/g,'').toLowerCase().indexOf(q)<0)return;h+='<button type="button" data-m="'+esc(m)+'"'+(S.m===m?' class="on"':'')+'>'+esc(m)+'</button>'});
$('models').classList.toggle('wide',S.c==='iPad'||S.c==='Apple Watch');$('models').innerHTML=h||(useG?'<p class="none">シリーズを選ぶと機種が表示されます</p>':'<p class="none">該当する機種がありません。LINEでお気軽にご相談ください。</p>');$('models').classList.toggle('grp',!!useG);$('fw').style.display=(list.length>12&&!useG)?'':'none';
root.querySelectorAll('#models button').forEach(function(b){b.onclick=function(){S.m=b.getAttribute('data-m');S.r=[];S.o='s3';drawModels();drawReps();upd();go('s3')}})}
function drawReps(){var box=$('reps');if(!S.m){box.innerHTML='';return}box.innerHTML='';
D[S.c][S.m].forEach(function(x){var on=S.r.indexOf(x[0])>=0,l=document.createElement('label'),p=fmt(x[1]);l.className='rep'+(on?' on':'');
l.innerHTML='<input type="checkbox"'+(on?' checked':'')+'><span class="n">'+esc(x[0])+'</span><span class="p'+(p?'':' ask')+'">'+(p||'お問い合わせ')+'</span>';
l.querySelector('input').onchange=function(){var i=S.r.indexOf(x[0]);if(i>=0)S.r.splice(i,1);else S.r.push(x[0]);l.classList.toggle('on');upd();if(S.r.length&&!mob())go('s4')};box.appendChild(l)})}
function go(id){var e=$(id),first=e.hidden;e.hidden=false;if(mob()){layout();setTimeout(function(){jump($('s1'))},60);return}if(first){var r=e.getBoundingClientRect();if(r.top>window.innerHeight-120)window.scrollBy({top:r.top-window.innerHeight*0.35,behavior:'smooth'})}}
function jump(e){var a=document.createElement('div');a.style.cssText='position:absolute;left:0;width:1px;height:1px;top:'+Math.max(0,e.getBoundingClientRect().top-root.getBoundingClientRect().top-70)+'px';root.appendChild(a);try{a.scrollIntoView({behavior:'smooth',block:'start'})}catch(x){a.scrollIntoView(true)}setTimeout(function(){a.remove()},1500)}
function layout(){var m=mob();['s1','s2','s3','s4'].forEach(function(id){var e=$(id),d=e.classList.contains('done');e.classList.toggle('col',m&&d&&S.o!==id)});$('nx3').hidden=!(m&&S.r.length);$('bgo').textContent=(S.o==='s3'&&S.a==='')?'出張先へ進む ›':'内訳を見る ↓'}
function feeOf(){if(S.a==='')return null;var a=AREA[S.a],v=V[a[1]];return{a:a,v:v,pay:v<0?-1:(CAMPAIGN?Math.max(0,v-OFF):v)}}
function upd(){
show('s2',!!S.c&&O[S.c].length>1);show('s3',!!S.m);show('s4',S.r.length>0||!$('s4').hidden&&!!S.m);
if(!S.m){show('s3',false);show('s4',false)}
$('v1').textContent=S.c;$('v2').textContent=S.m;$('v3').textContent=S.r.length?S.r.length+'件選択':'';
done('s1',S.c);done('s2',S.m);done('s3',S.r.length);
var f=feeOf();$('v4').textContent=f?f.a[0]:'';done('s4',f);layout();
var fe=$('fee');if(!f)fe.innerHTML='';else if(f.v<0)fe.innerHTML='<span class="km">'+f.a[2]+'（遠方エリア）</span><span class="askf">出張費はお問い合わせください</span>';
else fe.innerHTML='<span class="km">'+f.a[2]+'</span>'+(CAMPAIGN&&f.v>0?'<s>'+yen(f.v)+'円</s><span class="ar">▶</span>':'')+'<em>'+yen(f.pay)+'<small>円</small></em>';
var l=$('l'),t=$('t'),sum=0,ask=0,from=0,h='';$('d').textContent=S.m;
if(!S.m||!S.r.length){l.innerHTML='<p class="wait">修理内容を選ぶと、ここに金額が入ります</p>';t.className='tv';t.textContent='―';$('bar').hidden=true;root.classList.add('empty');return}
h+='<p class="gl">修理</p>';D[S.c][S.m].forEach(function(x){if(S.r.indexOf(x[0])<0)return;var p=fmt(x[1]);h+='<div class="it"><span>'+esc(x[0])+'</span><i></i><em'+(p?'':' class="ask"')+'>'+(p||'お問い合わせ')+'</em></div>';var n=parseInt(x[1],10);if(!n)ask=1;else{sum+=n;if(/〜$/.test(x[1]))from=1}});
h+='<p class="gl">出張費</p>';
if(!f)h+='<div class="it"><span>地域を選ぶと加算されます</span><i></i><em class="ask">―</em></div>';
else if(f.v<0){h+='<div class="it"><span>'+esc(f.a[0])+'</span><i></i><em class="ask">お問い合わせ</em></div>';ask=1}
else{h+='<div class="it"><span>'+esc(f.a[0])+'</span><i></i><em'+(CAMPAIGN&&f.v>0?' class="r"><s>'+yen(f.v)+'円</s>':'>')+yen(f.pay)+'円</em></div>';sum+=f.pay}
l.innerHTML=h;
if(ask){t.className='tv ask';t.textContent='お問い合わせ'}else{t.className='tv';t.innerHTML=yen(sum)+'<small>円'+(from?'〜':'')+'</small>'}
var bv=$('bv');bv.className=t.className.replace('tv','bv');bv.innerHTML=t.innerHTML;$('bar').hidden=false;root.classList.remove('empty');
$('nt').textContent=(f?'':'＋出張費（STEP4で地域を選ぶと加算）。')+'表示金額は目安です。端末の状態により変わる場合があります。'}
$('q').oninput=drawModels;
var TOP=+(root.getAttribute('data-top')||96),SB=root.hasAttribute('data-offset')?(parseInt(root.getAttribute('data-offset'),10)||0):50,side=root.querySelector('.side'),wrapEl=root.querySelector('.wrap'),bar=root.querySelector('.bar'),VT=0,VB=0;
root.style.position='relative';var sn=document.createElement('div');sn.style.cssText='position:absolute;left:0;top:0;width:1px;height:0;pointer-events:none;visibility:hidden';root.appendChild(sn);
function place(){var mob=window.innerWidth<650,wt=wrapEl.offsetTop;
if(!mob){var y=Math.max(0,Math.min(VT+TOP-wt,wrapEl.offsetHeight-side.offsetHeight));side.style.transform=y>0?'translateY('+Math.round(y)+'px)':''}else side.style.transform='';
if(mob&&!bar.hidden){var bh=bar.offsetHeight,memo=root.querySelector('.memo'),mt=memo.getBoundingClientRect().top-root.getBoundingClientRect().top,by=Math.min(VB-bh-10-SB,root.offsetHeight-bh);var hide=VB-SB>mt+120||by<wt;bar.style.transform='translateY('+Math.round(by)+'px)';bar.style.opacity=hide?0:1;bar.style.pointerEvents=hide?'none':''}}
var STRIP=40,vis={},io=null,built=0;
function recalc(){var t=1e9,b=-1;for(var k in vis){if(vis[k][0]<t)t=vis[k][0];if(vis[k][1]>b)b=vis[k][1]}if(b<0){VT=0;VB=0}else{VT=t;VB=b}place()}
function build(){var h=root.offsetHeight,n=Math.ceil(h/STRIP)+1;if(n===built)return;built=n;if(io)io.disconnect();sn.innerHTML='';vis={};
var th=[];for(var k=0;k<=STRIP;k++)th.push(k/STRIP);
io=new IntersectionObserver(function(es){es.forEach(function(e){var i=+e.target.getAttribute('data-i'),b=e.boundingClientRect,r=e.intersectionRect;if(e.isIntersecting&&r.height>0)vis[i]=[i*STRIP+(r.top-b.top),i*STRIP+(r.bottom-b.top)];else delete vis[i]});recalc()},{threshold:th});
for(var k=0;k<n;k++){var d=document.createElement('div');d.setAttribute('data-i',k);d.style.cssText='position:absolute;left:0;width:1px;top:'+(k*STRIP)+'px;height:'+STRIP+'px';sn.appendChild(d);io.observe(d)}}
if('IntersectionObserver' in window){build();setInterval(build,500)}
window.addEventListener('resize',place);setInterval(place,400);

$('bgo').onclick=function(){if(S.o==='s3'&&S.a===''){$('nx3').click();return}root.querySelector('.memo').scrollIntoView({behavior:'smooth',block:'center'})};
$('ar').onchange=function(){S.a=this.value;if(mob()&&S.a!==''){S.o='';upd();setTimeout(function(){jump($('s1'))},80)}else upd()};
$('nx3').onclick=function(){S.o='s4';upd();go('s4')};
['s1','s2','s3','s4'].forEach(function(id){$(id).querySelector('.sh').onclick=function(){if(!$(id).classList.contains('col'))return;S.o=id;layout();jump($('s1'))}});
var wasM=mob();window.addEventListener('resize',function(){if(mob()!==wasM){wasM=mob();if(S.c)drawModels();layout()}});
$('rst').onclick=function(){S={c:'',m:'',r:[],a:'',o:'s1',g:''};$('ar').value='';$('q').value='';drawCats();drawModels();drawReps();upd();root.scrollIntoView({behavior:'smooth'})};
fetch(CSV_URL).then(function(r){return r.text()}).then(function(txt){
txt.replace(/\r/g,'').split('\n').slice(1).forEach(function(l){if(!l)return;var a=l.split(',');if(a.length<4)return;if(!D[a[0]]){D[a[0]]={};O[a[0]]=[]}if(!D[a[0]][a[1]]){D[a[0]][a[1]]=[];O[a[0]].push(a[1])}D[a[0]][a[1]].push([a[2],a[3]])});
drawCats();upd()}).catch(function(){root.querySelector('#cats').innerHTML='<p class="none">料金データを読み込めませんでした。</p>'});
})();
