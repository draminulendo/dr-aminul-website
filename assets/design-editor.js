
(async()=>{
 try{
 const r=await fetch('content/design.json',{cache:'no-store'});if(!r.ok)return;
 const {settings:s}=await r.json();if(!s)return;
 const root=document.documentElement;
 if(/^#[a-f\d]{6}$/i.test(s.accent_color||'')){root.style.setProperty('--acc',s.accent_color);root.style.setProperty('--accent',s.accent_color)}
 const num=(key,min,max)=>{let n=Number(s[key]);return Number.isFinite(n)?Math.min(max,Math.max(min,n)):null};
 const px=(key,min,max,css)=>{let n=num(key,min,max);if(n!==null)root.style.setProperty(css,n+'px')};
 px('card_radius_px',4,36,'--cms-radius');
 px('expertise_image_height_px',40,180,'--cms-expertise-height');
 px('trust_icon_size_px',32,110,'--cms-trust-icon');
 px('card_gap_px',6,36,'--cms-gap');
 for(const [k,v] of [['desktop_expertise_columns','--cms-expertise-cols'],['desktop_trust_columns','--cms-trust-cols']]){
  const n=num(k,1,4);if(n!==null)root.style.setProperty(v,String(Math.round(n)));
 }
 for(const [key,id] of [['hide_reviews','reviews'],['hide_conference','conference'],['hide_publications','research']]){
  const node=document.getElementById(id);if(node&&s[key]===true)node.style.display='none';
 }
 }catch(e){console.warn('Optional design settings unavailable',e)}
})();
