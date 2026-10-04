// Dr. Mohammad Aminul Islam — shared site script (language toggle)
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
