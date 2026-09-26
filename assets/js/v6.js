// TYPING
const phrases = ['Ingenier\u00eda.','Dise\u00f1o.','Sistemas.','MKT.','BTL.','IA.','Realidad Virtual.','Arquitectura.','Productora.'];
let pi=0,ci=0,deleting=false;
const tw=document.querySelector('.typewrite');
(function typeLoop(){
  if(!tw)return;
  const w=phrases[pi];
  tw.textContent=w.substring(0,ci)+(ci===w.length&&!deleting?'_':'');
  if(!deleting&&ci===w.length){setTimeout(()=>{deleting=true;typeLoop();},1500);return;}
  if(deleting&&ci===0){deleting=false;pi=(pi+1)%phrases.length;}
  setTimeout(typeLoop,deleting?40:ci===w.length?100:85);
  ci+=deleting?-1:1;
})();

// NAV
const nw=document.querySelector('.nav-wrap');
window.addEventListener('scroll',()=>{scrollY>20?(nw?.classList.add('scrolled')):(nw?.classList.remove('scrolled'));},{passive:true});

// MOBILE
const mt=document.querySelector('.menu-toggle');
const nlinks=document.querySelector('.nav-links');
mt?.addEventListener('click',()=>{mt.classList.toggle('open');nlinks?.classList.toggle('open');});
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>{mt?.classList.remove('open');nlinks?.classList.remove('open');}));

// ACTIVE
const cp=location.pathname.split('/').pop()||'index.html';
document.querySelectorAll('.nav-link').forEach(a=>{
  const h=a.getAttribute('href');
  if(h===cp||(cp===''&&h==='index.html'))a.classList.add('active');
});

// REVEAL
const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.1,rootMargin:'0px 0px -50px 0px'});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// COUNTERS
function animC(el){
  const t=parseFloat(el.dataset.target);
  const dur=1200;const st=performance.now();
  (function tick(now){
    const p=Math.min(1,(now-st)/dur);
    const e=1-Math.pow(1-p,3);
    const v=t*e;
    el.textContent=(Number.isInteger(t)?Math.floor(v):v.toFixed(1));
    if(p<1)requestAnimationFrame(tick);else el.textContent=t;
  })(performance.now());
}
const cio=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){animC(e.target);cio.unobserve(e.target);}});},{threshold:.4});
document.querySelectorAll('.counter').forEach(el=>cio.observe(el));

// TIMELINE
document.querySelectorAll('.tl-row').forEach(i=>i.addEventListener('click',()=>i.classList.toggle('open')));

// FORM
const form=document.querySelector('form');
form?.addEventListener('submit',async e=>{
  e.preventDefault();
  const data=Object.fromEntries(new FormData(form));
  const out=document.querySelector('.form-out');
  if(out){out.textContent='Enviando...';}
  await new Promise(r=>setTimeout(r,900));
  if(out){out.textContent=`\u2713 Mensaje recibido. Te respondo en menos de 24h.`;out.style.color='var(--cyan)';}
  form.reset();
});

// smooth anchor scroll already in CSS, but for offset:
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const id=a.getAttribute('href');
    if(id==='#'||id.length<2)return;
    const t=document.querySelector(id);
    if(t){e.preventDefault();window.scrollTo({top:t.getBoundingClientRect().top+window.scrollY-72,behavior:'smooth'});}
  });
});
