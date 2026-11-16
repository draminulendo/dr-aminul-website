
/* Content edited through Pages CMS. Existing HTML remains as a fallback. */
(() => {
  const enbn = (node, value) => {
    if (!node || !value) return;
    for (const lang of ['en','bn']) {
      const target=node.querySelector('.'+lang);
      if(target && typeof value[lang]==='string') target.textContent=value[lang];
    }
  };
  const setText=(node,value)=>{if(node && typeof value==='string')node.textContent=value};
  const fetchContent=async name=>{
    const response=await fetch('content/'+name+'.json',{cache:'no-cache'});
    if(!response.ok)throw Error('Cannot load '+name);
    return (await response.json())[name];
  };
  const setLinks=(container,links)=>{
    if(!container || !Array.isArray(links))return;
    container.replaceChildren();
    for(const link of links){
      if(!link || !link.label || !link.url)continue;
      const href=String(link.url).trim();
      if(!/^(https:\/\/|mailto:|tel:)/i.test(href))continue;
      const a=document.createElement('a');a.className='call';a.href=href;
      if(href.startsWith('https://')){a.target='_blank';a.rel='noopener noreferrer'}
      a.textContent=link.label;container.appendChild(a);
    }
  };
  async function updateChambers(){
    const entries=await fetchContent('chambers');
    if(!Array.isArray(entries))return;
    const grid=document.querySelector('#book > .grid');
    if(!grid)return;
    grid.replaceChildren();
    for(const item of entries){
      const c=document.createElement('div');c.className='card ch';
      const tag=document.createElement('span');tag.className='tag';
      tag.innerHTML='<span class="en"></span><span class="bn"></span>';enbn(tag,item.area);
      const h=document.createElement('h3');setText(h,item.name);
      const p=document.createElement('p');p.textContent='📍 '+(item.address||'');
      const hours=document.createElement('p');hours.innerHTML='🕒 <span class="en"></span><span class="bn"></span>';enbn(hours,item.hours);
      const links=document.createElement('div');links.className='calls';setLinks(links,item.links);
      c.append(tag,h,p,hours,links);grid.appendChild(c);
    }
  }
  async function updateExpertise(){
    const entries=await fetchContent('expertise');
    if(!Array.isArray(entries))return;
    for(const item of entries){
      if(!/^[a-z0-9-]+$/.test(item.id||''))continue;
      const c=document.getElementById(item.id);
      if(!c || !c.classList.contains('expertise-card'))continue;
      enbn(c.querySelector('h3'),item.title);enbn(c.querySelector('p'),item.description);
      const image=c.querySelector('img');
      if(image && /^assets\/[a-z0-9/_-]+\.(svg|png|jpe?g|webp)$/i.test(item.image||''))image.src=item.image;
      const link=c.querySelector('.expertise-link');
      if(link && /^[a-z0-9-]+\.html$/.test(item.page||''))link.href=item.page;
    }
  }
  async function updateTrust(){
    const entries=await fetchContent('trust');
    if(!Array.isArray(entries))return;
    const grid=document.querySelector('#trust .trust-grid-new');
    if(!grid)return;
    grid.replaceChildren();
    entries.slice(0,6).forEach((item,i)=>{
      const c=document.createElement('article');c.className='trust-card trust-card-new trust-tone-'+(i+1);
      const icon=document.createElement('div');icon.className='trust-icon-new';icon.setAttribute('aria-hidden','true');setText(icon,item.icon);
      const num=document.createElement('span');num.className='trust-count-new';num.textContent=String(i+1).padStart(2,'0');
      const h=document.createElement('h3');h.innerHTML='<span class="en"></span><span class="bn"></span>';enbn(h,item.title);
      const p=document.createElement('p');p.innerHTML='<span class="en"></span><span class="bn"></span>';enbn(p,item.description);
      c.append(icon,num,h,p);grid.appendChild(c);
    });
  }
  async function updateFaq(){
    const entries=await fetchContent('faq');
    if(!Array.isArray(entries))return;
    const list=document.querySelector('#faq .faq-list');if(!list)return;
    list.replaceChildren();
    entries.forEach((item,i)=>{
      const details=document.createElement('details');details.className='faq-item';
      const summary=document.createElement('summary');
      const number=document.createElement('span');number.className='faq-index';number.textContent=String(i+1).padStart(2,'0');
      const question=document.createElement('span');question.className='faq-question';question.innerHTML='<span class="en"></span><span class="bn"></span>';enbn(question,item.question);
      const chevron=document.createElement('span');chevron.className='faq-chevron';chevron.setAttribute('aria-hidden','true');chevron.textContent='⌄';
      summary.append(number,question,chevron);
      const answer=document.createElement('div');answer.className='faq-answer';
      const p=document.createElement('p');p.innerHTML='<span class="en"></span><span class="bn"></span>';enbn(p,item.answer);
      answer.appendChild(p);details.append(summary,answer);list.appendChild(details);
    });
  }
  Promise.allSettled([updateChambers(),updateExpertise(),updateTrust(),updateFaq()])
    .then(results=>results.forEach((result,i)=>{if(result.status==='rejected')console.warn('CMS content unavailable:',i,result.reason)}));
})();
