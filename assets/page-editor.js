
/* Broad page editor. Existing HTML is always the fallback. */
(async()=>{
 try{
 const page=location.pathname.split('/').pop()||'index.html';
 const slug=page.endsWith('.html')?page.slice(0,-5):'index';
 const response=await fetch('content/pages/'+slug+'.json',{cache:'no-store'});
 if(!response.ok)return;
 const {items}=await response.json();
 if(!Array.isArray(items))return;
 for(const item of items){
  if(!/^edit-\d+$/.test(item.id||''))continue;
  const el=document.querySelector('[data-site-edit="'+item.id+'"]');
  if(!el||typeof item.value!=='string')continue;
  if(item.kind==='text')el.textContent=item.value;
  else if(item.kind==='image'||item.kind==='media'){
   if(/^(assets\/|media\/|https:\/\/)/i.test(item.value))el.setAttribute('src',item.value);
  }else if(item.kind==='link'){
   if(/^(https:\/\/|mailto:|tel:|\/|[a-z0-9][a-z0-9/_#.?=&%-]*)$/i.test(item.value) && !/^javascript:/i.test(item.value))el.setAttribute('href',item.value);
  }
 }
 }catch(err){console.warn('Optional page content not loaded',err)}
})();
