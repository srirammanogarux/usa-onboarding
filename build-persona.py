#!/usr/bin/env python3
"""Build the installable persona demo (office professional / job interview) from the
working prototype. Re-run after any prototype change:  python3 build-persona.py"""
import os, re, shutil, subprocess, sys
from PIL import Image, ImageDraw

SRC = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.abspath(os.path.join(SRC, '..', 'interview-demo'))

# ---------- copy assets ----------
os.makedirs(OUT, exist_ok=True)
for f in ['content.js', 'tokens.css']:
    shutil.copy2(os.path.join(SRC, f), OUT)
for d in ['fonts', 'images', 'videos', 'video']:
    s, t = os.path.join(SRC, d), os.path.join(OUT, d)
    if os.path.isdir(s):
        shutil.rmtree(t, ignore_errors=True)
        shutil.copytree(s, t)

html = open(os.path.join(SRC, 'index.html')).read()

# ---------- strip the design-review rail ----------
i = html.find('<!-- ===== dev navigator')
j = html.rfind('</script>', i)
assert i > 0 and j > i, 'dev rail markers not found'
html = html[:i] + html[j + len('</script>'):]

# ---------- PWA head ----------
html = html.replace(
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
    '<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no">\n'
    '<meta name="theme-color" content="#0D0B16">\n'
    '<meta name="apple-mobile-web-app-capable" content="yes">\n'
    '<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">\n'
    '<meta name="apple-mobile-web-app-title" content="Stimuler">\n'
    '<link rel="manifest" href="manifest.json">\n'
    '<link rel="apple-touch-icon" href="icon-192.png">')
html = html.replace('<title>Stimuler · Onboarding</title>', '<title>Stimuler</title>')

# ---------- full-bleed shell + sound toggle ----------
html = html.replace('</head>', '''<style>
/* ===== installed-app shell: no page chrome, no bezel, real device edges ===== */
html,body{background:#0D0B16;}
body{padding:0;display:block;overflow:hidden;}
.phone{width:100%;max-width:none;aspect-ratio:auto;height:100dvh;display:block;}
.bezel{border:none;border-radius:0;padding:0;box-shadow:none;background:#0D0B16;height:100%;}
.app{border-radius:0;}
.statusbar,.home-ind{display:none!important;}
.screen{padding-top:calc(58px + env(safe-area-inset-top));padding-bottom:calc(30px + env(safe-area-inset-bottom));}
.fs{padding-top:calc(64px + env(safe-area-inset-top));padding-bottom:calc(28px + env(safe-area-inset-bottom));}
.fs.has-sarah{padding-top:calc(212px + env(safe-area-inset-top));}
#hero,#plan{padding-top:0;padding-bottom:0;}
.plan-scroll{padding-top:calc(76px + env(safe-area-inset-top));}
.plan-cta{padding-bottom:calc(22px + env(safe-area-inset-bottom));}
.sarah-band{top:env(safe-area-inset-top);}
#sndBtn{position:absolute;top:calc(12px + env(safe-area-inset-top));right:14px;z-index:80;width:36px;height:36px;border-radius:50%;
  background:rgba(9,7,18,.62);border:1px solid rgba(255,255,255,.28);display:grid;place-items:center;color:#EDECF4;
  box-shadow:0 4px 14px rgba(0,0,0,.45);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);}
#sndBtn svg{width:16px;height:16px;}
#sndBtn.off{color:var(--text-low);}
</style>
</head>''')

# ---------- sound engine + wiring ----------
html = html.replace('<div class="app" id="app">', '''<div class="app" id="app">
  <button id="sndBtn" aria-label="Toggle sound">
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 9.3v5.4h3.6L12.3 19V5L7.6 9.3H4z"/><path class="w1" d="M15.2 9.2a4.4 4.4 0 0 1 0 5.6" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><path class="w2" d="M17.9 6.7a8.2 8.2 0 0 1 0 10.6" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>
  </button>''')

html = html.replace('</body>', '''
<audio id="silentKeepalive" loop playsinline preload="auto"
  src="data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA="></audio>
<script>
/* ============ sound (subtle, synthesized, iPhone-safe) ============ */
const Snd=(()=>{
  let ctx=null,muted=false,unlocked=false;
  const get=()=>{
    if(!ctx){try{ctx=new (window.AudioContext||window.webkitAudioContext)();}catch(_){return null;}}
    if(ctx.state==='suspended')ctx.resume();
    return ctx;
  };
  function note(f,{to=null,dur=.18,type='sine',vol=.08,at=0,glide=.6}={}){
    if(muted)return;
    const c=get();if(!c)return;
    const t0=c.currentTime+at;
    const o=c.createOscillator(),g=c.createGain();
    o.type=type;o.frequency.setValueAtTime(f,t0);
    if(to)o.frequency.exponentialRampToValueAtTime(to,t0+dur*glide);
    g.gain.setValueAtTime(0,t0);
    g.gain.linearRampToValueAtTime(vol,t0+.012);
    g.gain.exponentialRampToValueAtTime(.0001,t0+dur);
    o.connect(g);g.connect(c.destination);
    o.start(t0);o.stop(t0+dur+.05);
  }
  return {
    unlock(){
      if(unlocked)return;unlocked=true;
      get();
      /* iOS: a looping silent element moves the page into a playback session so
         Web Audio is still audible with the ringer switch off */
      const k=document.getElementById('silentKeepalive');
      if(k){k.volume=0;k.play().catch(()=>{});}
    },
    tap(){note(520,{dur:.055,type:'triangle',vol:.045});},
    advance(){note(300,{to:430,dur:.2,vol:.04});},
    warm(){note(523,{dur:.22,vol:.07});note(784,{dur:.26,vol:.055,at:.09});},
    mic(){note(494,{to:659,dur:.55,vol:.06,glide:.7});},
    recStart(){note(226,{dur:.14,vol:.07,type:'sine'});},
    recStop(){note(180,{dur:.19,vol:.06,type:'sine'});},
    success(){note(659,{dur:.13,vol:.075});note(880,{dur:.2,vol:.07,at:.1});},
    celebrate(){[659,880,1175].forEach((f,i)=>note(f,{dur:.24,vol:.075,at:i*.085}));},
    sign(){note(392,{dur:.5,vol:.09});note(587,{dur:.55,vol:.07,at:.06});note(784,{dur:.6,vol:.05,at:.12});},
    reveal(){[1175,1568,2093].forEach((f,i)=>note(f,{dur:.3,vol:.035,at:i*.06}));},
    toggle(){muted=!muted;return muted;}
  };
})();

/* first touch anywhere unlocks audio (iOS requirement) */
['pointerdown','touchstart'].forEach(ev=>
  document.addEventListener(ev,()=>Snd.unlock(),{once:true,passive:true}));

/* mute control */
(()=>{
  const b=document.getElementById('sndBtn');
  b.addEventListener('click',e=>{
    e.stopPropagation();
    const m=Snd.toggle();
    b.classList.toggle('off',m);
    b.querySelector('.w1').style.opacity=m?'.25':'1';
    b.querySelector('.w2').style.opacity=m?'0':'1';
    if(!m)Snd.tap();
  });
})();

/* ---- wiring: taps, screens and the moments that matter ---- */
document.getElementById('app').addEventListener('click',e=>{
  if(e.target.closest('#sndBtn'))return;
  if(e.target.closest('.opt,.chip,.pricecard,.iod-btn'))Snd.tap();
  else if(e.target.closest('.btn,.pc-btn,.pr-btn,.micbtn,.skip'))Snd.advance();
},true);

const SND_ON_ENTER={ackname:'warm',ack:'celebrate',micask:'mic',listen:'recStart',
  score:'celebrate',hintscore:'warm',plan:'reveal',paywall:'reveal',qsummary:'warm'};
const _goSnd=go;
go=function(id){
  _goSnd(id);
  const k=SND_ON_ENTER[id];
  if(k&&Snd[k])setTimeout(()=>Snd[k](),k==='mic'?420:180);
};

/* celebration + success moments already funnel through these */
const _conf=confetti;
confetti=function(n,mode){_conf(n,mode);Snd.celebrate();};
const _stop=stopListen;
stopListen=function(){Snd.recStop();_stop();};
const _wordDone=hsWordDone;
hsWordDone=function(){Snd.success();_wordDone();};

/* the persona: office professional aiming at a job interview.
   real taps overwrite these; they only guarantee the demo never renders empty. */
Object.assign(answers,{qocc:'office',qgoal:'career',fam:'interview',
  jtbdLabel:'Ace a job interview',qskill:'fluency',qlevel:'B1',minutes:15,qtime:'month'});

/* offline shell */
if('serviceWorker' in navigator)
  window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
</script>
</body>''')

# the built-in mic chime is replaced by the sound engine's softer one
html = html.replace('if(!reduced){clearTimeout(micToneT);micToneT=setTimeout(micTone,500);}', '')

open(os.path.join(OUT, 'index.html'), 'w').write(html)

# ---------- manifest ----------
open(os.path.join(OUT, 'manifest.json'), 'w').write('''{
  "name": "Stimuler",
  "short_name": "Stimuler",
  "start_url": "./",
  "scope": "./",
  "display": "standalone",
  "orientation": "portrait",
  "background_color": "#0D0B16",
  "theme_color": "#0D0B16",
  "icons": [
    {"src": "icon-192.png", "sizes": "192x192", "type": "image/png"},
    {"src": "icon-512.png", "sizes": "512x512", "type": "image/png"},
    {"src": "icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable"}
  ]
}''')

# ---------- service worker ----------
open(os.path.join(OUT, 'sw.js'), 'w').write('''const V='stimuler-demo-v1';
const SHELL=['./','index.html','content.js','tokens.css','manifest.json'];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(
    caches.match(e.request).then(hit=>hit||fetch(e.request).then(res=>{
      const copy=res.clone();
      caches.open(V).then(c=>c.put(e.request,copy)).catch(()=>{});
      return res;
    }).catch(()=>hit))
  );
});''')

# ---------- icons (Sarah on the brand navy) ----------
av = Image.open(os.path.join(SRC, 'images', 'sarah_av.webp')).convert('RGB')
for size in (192, 512):
    pad = int(size * 0.14)
    icon = Image.new('RGB', (size, size), '#141127')
    d = ImageDraw.Draw(icon)
    d.ellipse([pad // 2, pad // 2, size - pad // 2, size - pad // 2], fill='#1E1A38')
    face = av.resize((size - pad * 2, size - pad * 2), Image.LANCZOS)
    mask = Image.new('L', face.size, 0)
    ImageDraw.Draw(mask).ellipse([0, 0, face.size[0], face.size[1]], fill=255)
    icon.paste(face, (pad, pad), mask)
    icon.save(os.path.join(OUT, f'icon-{size}.png'))

print('built ->', OUT)
