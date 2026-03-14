
const demandStates=[{pct:31,text:"31% booked this week · early rates are still available"},{pct:47,text:"47% booked this week · premium suites are getting attention"},{pct:58,text:"58% booked this week · weekend demand is rising"},{pct:42,text:"42% booked this week · executive rooms are trending"},{pct:65,text:"65% booked this week · limited premium nights left"}];
const activityStates=["Guest from London just checked dates for the Signature Balcony Suite.","A returning guest joined the VIP offer list.","Airport pickup was requested for an upcoming stay.","Two guests are comparing room options right now.","Executive Studio just received another inquiry."];
function q(s){return document.querySelector(s)} function qa(s){return Array.from(document.querySelectorAll(s))}
function updateDemand(){const bar=q("[data-demand-bar]"),label=q("[data-demand-label]"); if(!bar||!label)return; const item=demandStates[Math.floor(Math.random()*demandStates.length)]; bar.style.width=item.pct+"%"; label.textContent=item.text;}
function updateActivity(){const el=q("[data-activity]"); if(el) el.textContent=activityStates[Math.floor(Math.random()*activityStates.length)];}
function showPopup(){const p=q("[data-popup]"); if(p&&!localStorage.getItem("spintex_popup_seen")){p.classList.add("show"); localStorage.setItem("spintex_popup_seen","1");}}
function closePopup(){const p=q("[data-popup]"); if(p)p.classList.remove("show");}
function bindPopup(){const x=q("[data-close-popup]"); if(x)x.addEventListener("click", closePopup); setTimeout(showPopup,1400);}
function bindSubscribe(){qa("[data-subscribe-form]").forEach(form=>{form.addEventListener("submit",e=>{e.preventDefault(); const note=form.querySelector("[data-note]"); if(note)note.textContent="Thanks — your VIP interest is captured. Connect your email form later when you’re ready."; form.reset(); closePopup();});});}
function bindContactForm(){
  const form=q("[data-contact-form]");
  if(!form)return;
  const note=form.querySelector("[data-contact-note]");
  form.addEventListener("submit",async e=>{
    e.preventDefault();
    if(note)note.textContent="Sending your message...";
    const payload={
      name:form.name.value.trim(),
      email:form.email.value.trim(),
      phone:form.phone.value.trim(),
      message:form.message.value.trim()
    };
    try{
      const res=await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
      const data=await res.json().catch(()=>({}));
      if(!res.ok) throw new Error(data.error||"We could not send your message. Please try again.");
      if(note)note.textContent="Message sent successfully. We will contact you shortly.";
      form.reset();
    }catch(err){
      if(note)note.textContent=err.message||"Message failed. Please call or WhatsApp us directly.";
    }
  });
}
function bindFilter(){const tabs=qa("[data-filter]"),cards=qa("[data-room]"); tabs.forEach(tab=>{tab.addEventListener("click",()=>{tabs.forEach(t=>t.classList.remove("active")); tab.classList.add("active"); const key=tab.dataset.filter; cards.forEach(card=>{const tags=(card.dataset.tags||"").split(","); card.style.display=(key==="all"||tags.includes(key))?"":"none";});});});}
function year(){qa("[data-year]").forEach(el=>el.textContent=new Date().getFullYear())}
document.addEventListener("DOMContentLoaded",()=>{bindPopup(); bindSubscribe(); bindContactForm(); bindFilter(); year(); updateDemand(); updateActivity(); setInterval(updateDemand,5200); setInterval(updateActivity,4200);});
