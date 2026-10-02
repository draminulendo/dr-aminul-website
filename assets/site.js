// Dr. Mohammad Aminul Islam — shared site script (language toggle + scroll reveal)
(function(){
  var b = document.getElementById('lt');
  function setLang(l){
    document.documentElement.lang = l;
    if(b) b.textContent = (l === 'bn') ? 'English' : 'বাংলা';
    try { localStorage.setItem('dr-aminul-lang', l); } catch(e){}
  }
  if (b) {
    b.onclick = function(){ setLang(document.documentElement.lang === 'bn' ? 'en' : 'bn'); };
  }
  try {
    var saved = localStorage.getItem('dr-aminul-lang');
    if (saved === 'bn' || saved === 'en') setLang(saved);
  } catch(e){}
})();

(function(){
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { els.forEach(function(e){ e.classList.add('in'); }); return; }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){ if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  els.forEach(function(e){ io.observe(e); });
})();
