const demandStates=[{pct:31,text:"31% booked this week · early rates are still available"},{pct:47,text:"47% booked this week · premium suites are getting attention"},{pct:58,text:"58% booked this week · weekend demand is rising"},{pct:42,text:"42% booked this week · executive rooms are trending"},{pct:65,text:"65% booked this week · limited premium nights left"}];
const activityStates=["Guest from London just checked dates for the Signature Balcony Suite.","A returning guest joined the VIP offer list.","Airport pickup was requested for an upcoming stay.","Two guests are comparing room options right now.","Executive Studio just received another inquiry."];
const languageOptions=[
  {code:"en",label:"English"},
  {code:"fr",label:"French"},
  {code:"zh-CN",label:"Chinese"},
  {code:"de",label:"German"},
  {code:"ar",label:"Arabic"}
];
const defaultLanguage="en";
const languageStorageKey="spintex_selected_language";
let translateInitStarted=false;
let translateReadyPromise=null;
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
function bindMessageTracking(){
  if(typeof window.gtag!=="function") return;

  const roomPagePattern=/(^|\/)room-[a-z0-9-]+\.html(?:[?#].*)?$/;

  qa("a[href]").forEach(link=>{
    const href=link.getAttribute("href")||"";
    const normalizedHref=href.toLowerCase();

    if(roomPagePattern.test(normalizedHref)){
      link.addEventListener("click",()=>{
        const roomSlug=href
          .split(/[?#]/)[0]
          .split("/")
          .pop()
          .replace("room-","")
          .replace(".html","");

        gtag("event","room_page_click",{
          event_category:"room_interest",
          event_label:roomSlug,
          room_name:roomSlug,
          link_url:href,
          source_page:window.location.pathname
        });
      });
    }

    if(normalizedHref.includes("wa.me")||normalizedHref.includes("whatsapp.com")){
      link.addEventListener("click",()=>{
        gtag("event","whatsapp_click",{
          event_category:"contact",
          event_label:"whatsapp_link",
          link_url:href
        });
      });
    }

    if(normalizedHref.startsWith("mailto:")){
      link.addEventListener("click",()=>{
        const emailAddress=href.replace(/^mailto:/i,"").split("?")[0]||"unknown_email";
        gtag("event","email_click",{
          event_category:"lead_contact",
          event_label:emailAddress,
          contact_method:"email",
          email_address:emailAddress,
          link_url:href,
          source_page:window.location.pathname
        });
      });
    }
  });
}
function bindAiConcierge(){
  const host=document.createElement("div");
  host.className="ai-concierge";
  host.innerHTML=`
    <button class="ai-concierge-toggle" type="button" data-ai-toggle aria-label="Open AI concierge chat">
      <span>AI Concierge</span>
    </button>
    <section class="ai-concierge-panel" data-ai-panel aria-live="polite">
      <div class="ai-concierge-head">
        <strong>Spintex AI Concierge</strong>
        <button type="button" class="ai-concierge-min" data-ai-close aria-label="Close AI concierge">×</button>
      </div>
      <div class="ai-concierge-messages" data-ai-messages></div>
      <form class="ai-concierge-form" data-ai-form>
        <input name="message" placeholder="Ask about rooms, prices, or services" maxlength="220" required>
        <button type="submit">Send</button>
      </form>
    </section>`;
  document.body.appendChild(host);

  const messages=host.querySelector("[data-ai-messages]");
  const form=host.querySelector("[data-ai-form]");
  const input=form.querySelector("input[name='message']");
  const toggle=host.querySelector("[data-ai-toggle]");
  const close=host.querySelector("[data-ai-close]");

  const addMessage=(text,role)=>{
    const item=document.createElement("p");
    item.className=`ai-msg ${role}`;
    item.textContent=text;
    messages.appendChild(item);
    messages.scrollTop=messages.scrollHeight;
  };

  const respond=(message)=>{
    const text=message.toLowerCase();
    if(text.includes("price")||text.includes("cost")||text.includes("rate")) return "Rates usually range from $45 to $74 per night depending on room type and dates. I can guide you to the best option if you share your dates.";
    if(text.includes("airport")||text.includes("pickup")||text.includes("transfer")) return "Yes — airport pickup can be arranged by concierge. Share your arrival time and flight details in the contact page or WhatsApp.";
    if(text.includes("room")||text.includes("suite")) return "Our most requested options are Executive Studio, Signature Balcony Suite, Skyline Studio, and Platinum Suite. Would you like a quiet room or a premium-style suite?";
    if(text.includes("book")||text.includes("reserve")||text.includes("availability")) return "For the fastest confirmation, tap Book on WhatsApp. You can also send dates on the Contact page and our team will follow up quickly.";
    if(text.includes("hello")||text.includes("hi")) return "Hello! I can help with room suggestions, pricing, concierge services, and booking steps.";
    return "I can help with pricing, room selection, airport pickup, and booking guidance. Ask me anything about your stay.";
  };

  addMessage("Welcome to Spintex Suites. I’m your AI concierge — ask about rooms, rates, or services.","bot");

  toggle.addEventListener("click",()=>host.classList.toggle("open"));
  close.addEventListener("click",()=>host.classList.remove("open"));

  form.addEventListener("submit",e=>{
    e.preventDefault();
    const message=input.value.trim();
    if(!message)return;
    addMessage(message,"user");
    input.value="";
    setTimeout(()=>addMessage(respond(message),"bot"),350);
  });
}
function normalizeLanguageCode(code){
  return languageOptions.some(option=>option.code===code)?code:defaultLanguage;
}
function getSavedLanguage(){
  return normalizeLanguageCode(localStorage.getItem(languageStorageKey)||defaultLanguage);
}
function setSavedLanguage(code){
  localStorage.setItem(languageStorageKey,normalizeLanguageCode(code));
}
function applyDirectionForLanguage(code){
  const isRtl=code==="ar";
  document.documentElement.setAttribute("dir",isRtl?"rtl":"ltr");
  document.documentElement.setAttribute("lang",isRtl?"ar":"en");
  document.body.classList.toggle("is-rtl-language",isRtl);
}
function ensureTranslateContainer(){
  let container=q("#google_translate_element");
  if(container) return container;
  container=document.createElement("div");
  container.id="google_translate_element";
  container.className="visually-hidden-translate";
  container.setAttribute("aria-hidden","true");
  document.body.appendChild(container);
  return container;
}
function waitForTranslateCombo(retries=24){
  return new Promise((resolve,reject)=>{
    const findCombo=()=>{
      const combo=q(".goog-te-combo");
      if(combo){
        resolve(combo);
        return;
      }
      if(retries<=0){
        reject(new Error("Google Translate language selector did not initialize"));
        return;
      }
      retries-=1;
      setTimeout(findCombo,250);
    };
    findCombo();
  });
}
function loadTranslateScript(){
  if(translateReadyPromise) return translateReadyPromise;
  translateReadyPromise=new Promise((resolve,reject)=>{
    if(typeof window.google==="object"&&window.google?.translate?.TranslateElement){
      resolve();
      return;
    }
    const existingScript=q('script[data-google-translate-script="1"]');
    if(existingScript){
      existingScript.addEventListener("load",()=>resolve(),{once:true});
      existingScript.addEventListener("error",()=>reject(new Error("Google Translate script failed to load")), {once:true});
      return;
    }
    window.googleTranslateElementInit=()=>{
      try{
        ensureTranslateContainer();
        new window.google.translate.TranslateElement({
          pageLanguage:"en",
          includedLanguages:languageOptions.map(option=>option.code).join(","),
          autoDisplay:false
        },"google_translate_element");
        resolve();
      }catch(error){
        reject(error);
      }
    };
    const script=document.createElement("script");
    script.src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async=true;
    script.defer=true;
    script.dataset.googleTranslateScript="1";
    script.addEventListener("error",()=>reject(new Error("Google Translate script failed to load")), {once:true});
    document.head.appendChild(script);
  });
  return translateReadyPromise;
}
async function translateToLanguage(code){
  const safeCode=normalizeLanguageCode(code);
  applyDirectionForLanguage(safeCode);
  setSavedLanguage(safeCode);

  if(safeCode===defaultLanguage){
    const iframe=q("iframe.goog-te-banner-frame");
    const reset=q(".goog-te-banner-frame")||iframe;
    if(reset){
      window.location.reload();
    }
    return;
  }

  try{
    if(!translateInitStarted){
      translateInitStarted=true;
      ensureTranslateContainer();
      await loadTranslateScript();
    }else{
      await loadTranslateScript();
    }
    const combo=await waitForTranslateCombo();
    if(combo.value!==safeCode){
      combo.value=safeCode;
      combo.dispatchEvent(new Event("change"));
    }
  }catch(error){
    console.warn("Translation unavailable:",error);
    qa("[data-language-status]").forEach(el=>{
      el.textContent="Translation unavailable right now. Please try again.";
    });
  }
}
function buildLanguageSwitcherControl(idSuffix){
  const wrapper=document.createElement("div");
  wrapper.className="language-switcher";
  const isMobile=idSuffix==="mobile";
  const labelFor=isMobile?"":` for="language-switcher-${idSuffix}"`;
  const controlMarkup=isMobile
    ? `<div class="language-switcher-options" role="listbox" aria-label="Select language">
      ${languageOptions.map(option=>`<button type="button" class="language-switcher-option" data-language-option="${option.code}" role="option" aria-selected="false">${option.label}</button>`).join("")}
    </div>`
    : `<select id="language-switcher-${idSuffix}" class="language-switcher-select" aria-label="Select language">
      ${languageOptions.map(option=>`<option value="${option.code}">${option.label}</option>`).join("")}
    </select>`;
  wrapper.innerHTML=`
    <label class="language-switcher-label"${labelFor}>
      <span aria-hidden="true">🌐</span>
      <span>Language</span>
    </label>
    ${controlMarkup}
    <span class="language-switcher-status" data-language-status aria-live="polite"></span>`;
  return wrapper;
}
function syncLanguageSwitcherUi(selectedCode){
  qa(".language-switcher-select").forEach(other=>{other.value=selectedCode;});
  qa("[data-language-option]").forEach(button=>{
    const isActive=button.dataset.languageOption===selectedCode;
    button.classList.toggle("active",isActive);
    button.setAttribute("aria-selected",isActive?"true":"false");
  });
}
function bindLanguageSwitcher(){
  const nav=q(".topbar .nav");
  if(!nav) return;

  const desktopHost=document.createElement("div");
  desktopHost.className="language-switcher-host language-switcher-desktop";
  const desktopControl=buildLanguageSwitcherControl("desktop");
  desktopHost.appendChild(desktopControl);

  const navCta=q(".topbar .nav-cta");
  if(navCta){
    nav.insertBefore(desktopHost,navCta);
  }else{
    nav.appendChild(desktopHost);
  }

  const mobileHost=document.createElement("div");
  mobileHost.className="language-switcher-host language-switcher-mobile";
  const mobileControl=buildLanguageSwitcherControl("mobile");
  mobileHost.appendChild(mobileControl);
  if(navCta){
    nav.insertBefore(mobileHost,navCta);
  }else{
    nav.appendChild(mobileHost);
  }

  const savedLanguage=getSavedLanguage();
  syncLanguageSwitcherUi(savedLanguage);
  qa(".language-switcher-select").forEach(select=>{
    select.addEventListener("change",event=>{
      const selectedCode=event.target.value;
      syncLanguageSwitcherUi(selectedCode);
      translateToLanguage(selectedCode);
    });
  });
  qa("[data-language-option]").forEach(button=>{
    const applySelectedLanguage=event=>{
      event.preventDefault();
      event.stopPropagation();
      const selectedCode=button.dataset.languageOption;
      syncLanguageSwitcherUi(selectedCode);
      translateToLanguage(selectedCode);
    };
    button.addEventListener("click",applySelectedLanguage);
    button.addEventListener("touchstart",applySelectedLanguage,{passive:false});
  });
  translateToLanguage(savedLanguage);
}
function year(){qa("[data-year]").forEach(el=>el.textContent=new Date().getFullYear())}
document.addEventListener("DOMContentLoaded",()=>{bindPopup(); bindSubscribe(); bindContactForm(); bindFilter(); bindMessageTracking(); bindAiConcierge(); bindLanguageSwitcher(); year(); updateDemand(); updateActivity(); setInterval(updateDemand,5200); setInterval(updateActivity,4200);});
