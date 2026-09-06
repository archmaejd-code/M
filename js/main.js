/* Portfolio behaviour. Edit project content in projects.js. */
'use strict';
const SITE = window.SITE || {};
const projects = (window.PROJECTS || []).map((p,i)=>({id:String(i+1).padStart(2,'0'),coverImage:p.coverImage||p.images?.[0]||'',...p}));
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const ROOT=document.body.dataset.root||'';
const url=p=>ROOT+p;
const projectUrl=slug=>url('projects/project.html?p='+encodeURIComponent(slug));
const escapeHTML=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function initMenu(){
 const toggle=$('.menu-toggle'),overlay=$('.nav-overlay');if(!toggle||!overlay)return;
 const set=open=>{
  document.body.classList.toggle('menu-open',open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close menu':'Open menu');toggle.textContent=open?'[ − ]':'[ + ]';overlay.setAttribute('aria-hidden',String(!open));overlay.inert=!open;
  $$('main,.site-footer').forEach(el=>el.inert=open);
  if(open)$('a',overlay)?.focus();else toggle.focus();
 };
 toggle.addEventListener('click',()=>set(!document.body.classList.contains('menu-open')));
 overlay.addEventListener('click',e=>{if(e.target===overlay)set(false);});
 $$('a',overlay).forEach(a=>a.addEventListener('click',()=>set(false)));
 document.addEventListener('keydown',e=>{
  if(!document.body.classList.contains('menu-open'))return;
  if(e.key==='Escape'){set(false);return;}
  if(e.key==='Tab'){
   const focusable=[toggle,...$$('a',overlay)],first=focusable[0],last=focusable.at(-1);
   if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
   else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
  }
 });
}
function initReveal(){
 const items=$$('.reveal:not(.is-visible)');
 if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches){items.forEach(e=>e.classList.add('is-visible'));return;}
 const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target);}}),{threshold:.05});items.forEach(e=>observer.observe(e));
}
function createStage({stage,img,caption,counter,slides,onChange,autoplay=false}){
 if(!slides.length)return;
 let index=0,revision=0,touch=null,timer=null,paused=false;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 stage.setAttribute('role','region');stage.setAttribute('aria-roledescription','carousel');stage.setAttribute('aria-label',stage.id==='home-stage'?'Selected projects':'Project photographs');stage.tabIndex=0;
 if(counter){counter.setAttribute('aria-live',autoplay?'off':'polite');counter.setAttribute('aria-atomic','true');}
 const render=()=>{
  const s=slides[index];img.src=s.src;img.alt=s.alt;img.loading='eager';
  if(caption){caption.textContent=s.title;if(caption.tagName==='A')caption.href=s.href;}
  if(counter)counter.textContent=(index+1)+'/'+slides.length;
  const link=$('.stage-link',stage);if(link)link.href=s.href;
  stage.dataset.index=String(index);if(onChange)onChange(index);
  const next=slides[(index+1)%slides.length];if(next){const pre=new Image();pre.src=next.src;}
 };
 const show=async next=>{
  const target=(next+slides.length)%slides.length;if(target===index)return;index=target;const token=++revision;
  if(!reduced){img.classList.add('is-fading');await new Promise(resolve=>setTimeout(resolve,140));}
  if(token!==revision)return;render();img.classList.remove('is-fading');
 };
 const stop=()=>{paused=true;clearInterval(timer);};
 const move=delta=>{stop();show(index+delta);};
 $('.arrow-prev',stage)?.addEventListener('click',()=>move(-1));$('.arrow-next',stage)?.addEventListener('click',()=>move(1));
 stage.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();move(e.key==='ArrowLeft'?-1:1);}});
 stage.addEventListener('touchstart',e=>{const t=e.changedTouches[0];touch={x:t.clientX,y:t.clientY};},{passive:true});
 let swiped=false;
 stage.addEventListener('touchend',e=>{if(!touch)return;const t=e.changedTouches[0],dx=t.clientX-touch.x,dy=t.clientY-touch.y;touch=null;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.3){swiped=true;move(dx<0?1:-1);}},{passive:true});
 stage.addEventListener('click',e=>{if(swiped){e.preventDefault();swiped=false;}},true);
 stage.addEventListener('focusin',stop);stage.addEventListener('mouseenter',stop);
 $$('.stage-arrow',stage).forEach(e=>e.hidden=slides.length<2);
 render();
 if(autoplay&&!reduced&&slides.length>1)timer=setInterval(()=>{if(!paused&&!document.hidden&&!document.body.classList.contains('menu-open')&&stage.getBoundingClientRect().bottom>0)show(index+1);},6500);
}
function initHome(){
 const stage=$('#home-stage');if(!stage)return;
 createStage({stage,img:$('#home-image'),caption:$('#home-title'),counter:$('#home-counter'),slides:projects.map(p=>({src:url(p.coverImage),alt:p.title+' — '+p.category+' project in '+p.location,title:p.title,href:projectUrl(p.slug)})),autoplay:true});
 const track=$('#marquee-track');if(track)track.innerHTML=projects.map(p=>'<a href="'+projectUrl(p.slug)+'"><img loading="lazy" src="'+url(p.coverImage)+'" alt="'+escapeHTML(p.title)+'"></a>').join('');
}
function initPortfolio(){
 const grid=$('#portfolio-grid');if(!grid)return;
 grid.innerHTML=projects.map(p=>'<a class="grid-item reveal" data-category="'+escapeHTML(p.category.toUpperCase())+'" href="'+projectUrl(p.slug)+'"><span class="frame"><img loading="lazy" src="'+url(p.coverImage)+'" alt="'+escapeHTML(p.title+' — '+p.category+' project in '+p.location)+'"></span><span class="grid-caption"><h2>'+escapeHTML(p.title)+'</h2><span>'+escapeHTML(p.category)+'</span></span></a>').join('');
 const filters=$$('.filter');filters.forEach(btn=>{
  btn.setAttribute('aria-pressed',String(btn.classList.contains('is-active')));
  btn.addEventListener('click',()=>{
   filters.forEach(b=>{b.classList.toggle('is-active',b===btn);b.setAttribute('aria-pressed',String(b===btn));});
   let count=0;$$('.grid-item',grid).forEach(item=>{const match=btn.dataset.filter==='ALL'||item.dataset.category===btn.dataset.filter;item.hidden=!match;if(match){count++;item.classList.add('is-visible');}});
   $('#portfolio-empty').hidden=count>0;grid.hidden=count===0;
  });
 });
}
function initProject(){
 const stage=$('#project-stage');if(!stage)return;
 const slug=new URLSearchParams(location.search).get('p')||document.body.dataset.project||projects[0]?.slug;
 const p=projects.find(p=>p.slug===slug||p.slug.toLowerCase().replace(/\s+/g,'-')===slug);
 if(!p){$('main').innerHTML='<section class="project-error"><h1 class="section-title">Project not found</h1><p>This project is not available. Explore the portfolio to find another project.</p><a class="btn-outline" href="'+url('portfolio.html')+'">View Projects</a></section>';return;}
 const i=projects.indexOf(p);document.title=p.title+' — '+(SITE.name||'MAJED ABDULLAH');
 $$('[data-field]').forEach(el=>{if(p[el.dataset.field])el.textContent=p[el.dataset.field];});
 $('meta[name="description"]')?.setAttribute('content',p.description);
 $('meta[property="og:title"]')?.setAttribute('content',document.title);
 $('meta[property="og:description"]')?.setAttribute('content',p.description);
 createStage({stage,img:$('#project-image'),counter:$('#project-counter'),slides:p.images.map((src,n)=>({src:url(src),alt:p.title+' — image '+(n+1)+' of '+p.images.length,title:p.title}))});
 const prev=projects[(i-1+projects.length)%projects.length],next=projects[(i+1)%projects.length];
 $('#nav-prev').href=projectUrl(prev.slug);$('#nav-next').href=projectUrl(next.slug);
 $('#nav-prev').setAttribute('aria-label','Previous project: '+prev.title);$('#nav-next').setAttribute('aria-label','Next project: '+next.title);
}
document.addEventListener('DOMContentLoaded',()=>{initMenu();initHome();initPortfolio();initProject();initReveal();});
