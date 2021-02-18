(()=>{"use strict";window.addEventListener("DOMContentLoaded",(()=>{(function(){class t{constructor(t,e,n,o,s,c,...a){this.imgURL=t,this.alt=e,this.title=n,this.classes=a,this.text=o,this.parent=document.querySelector(c),this.price=70*s}createMenu(){const t=document.createElement("div");0===this.classes.length?(this.classes="menu__item",t.classList.add(this.classes)):this.classes.forEach((e=>t.classList.add(e))),t.innerHTML=`\n            <img src=${this.imgURL} alt=${this.alt}>\n            <h3 class="menu__item-subtitle">${this.title}</h3>\n            <div class="menu__item-descr">${this.text} </div>\n            <div class="menu__item-divider"></div>\n            <div class="menu__item-price">\n                <div class="menu__item-cost">Цена:</div>\n                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>\n            </div>\n            `,this.parent.append(t)}}(async t=>{const e=await fetch("http://localhost:3000/menu");if(!e.ok)throw new Error(`status ${e.status}`);return await e.json()})().then((e=>{e.forEach((({img:e,altimg:n,title:o,descr:s,price:c})=>{new t(e,n,o,s,c,".menu .container").createMenu()}))}))})(),function(){const t=document.querySelector(".modal");function e(){t.classList.add("show"),document.body.style.overflow="hidden",clearInterval(n)}document.querySelectorAll("[data-modal]").forEach((t=>{t.addEventListener("click",(()=>{e()}))})),t.addEventListener("click",(e=>{(e.target.classList.contains("modal")||""==e.target.getAttribute("data-close"))&&(t.classList.remove("show"),document.body.style.overflow="")}));const n=setTimeout(e,5e4);window.addEventListener("scroll",(function t(){window.pageYOffset+document.documentElement.clientHeight>=document.documentElement.scrollHeight&&(e(),window.removeEventListener("scroll",t))}))}(),function(){const t=document.querySelectorAll(".tabheader__item"),e=document.querySelectorAll(".tabcontent"),n=document.querySelector(".tabheader");function o(){e.forEach((t=>{t.style.display="none"})),t.forEach((t=>{t.classList.remove("tabheader__item_active")}))}function s(n=0){e[n].style.display="block",t[n].classList.add("tabheader__item_active")}o(),s(),n.addEventListener("click",(e=>{const n=e.target;n&&n.classList.contains("tabheader__item")&&t.forEach(((t,e)=>{t==n&&(o(),s(e))}))}))}(),function(){function t(t){return t>=0&&t<10?`0${t}`:t}!function(e,n){const o=document.querySelector(".timer"),s=o.querySelector("#days"),c=o.querySelector("#hours"),a=o.querySelector("#minutes"),i=o.querySelector("#seconds"),l=setInterval(r,1e3);function r(){const e=function(t){const e=Date.parse("2021-02-11")-Date.parse(new Date);return{total:e,days:Math.floor(e/864e5),hours:Math.floor(e/1e3/60/60%24),minutes:Math.floor(e/1e3/60%60),seconds:Math.floor(e/1e3%60)}}();if(e.total<=0){clearInterval(l);for(let t in e)e[t]=0}s.textContent=t(e.days),c.textContent=t(e.hours),a.textContent=t(e.minutes),i.textContent=t(e.seconds)}r()}()}(),document.querySelectorAll("form").forEach((s=>{var c;(c=s).addEventListener("submit",(s=>{s.preventDefault();const a=document.createElement("img");a.src=t,a.style.cssText="\n                        display: block;\n                        margin: 0 auto;\n                    ",c.insertAdjacentElement("afterend",a);const i=new FormData(c),l=JSON.stringify(Object.fromEntries(i.entries()));console.log(l),(async(t,e)=>{const n=await fetch("http://localhost:3000/requests",{method:"POST",headers:{'Content-Type': 'application/json'},body:e});return await n.json()})(0,l).then((t=>{console.log(t),o(e),a.remove()})).catch((()=>{o(n)})).finally((()=>{c.reset()}))}))}));const t="img/spinner.svg",e="ok!",n="error";function o(t){const e=document.querySelector(".modal__dialog");e.classList.add("hide"),showModal();const n=document.createElement("div");n.classList.add("modal__dialog"),n.innerHTML=`\n                    <div class="modal__content">\n                        <div data-close class="modal__close">&times;</div>\n                        <div class="modal__title">${t}</div>\n                    </div>\n                `,document.querySelector(".modal").append(n),setTimeout((()=>{n.remove(),e.classList.remove("hide"),e.classList.add("show"),closeModal()}),4e3)}const s=document.querySelector("#current"),c=document.querySelector("#total"),a=document.querySelector(".offer__slider"),i=document.querySelector(".offer__slider-next"),l=document.querySelector(".offer__slider-prev"),r=document.querySelectorAll(".offer__slide"),d=document.querySelector(".offer__slider-wrapper"),u=document.querySelector(".slider-carusel"),m=window.getComputedStyle(d).width;let h=0,f=1,_=[];function v(){return f=f<10?`0${f}`:f,f}function y(){f==r.length?f=1:f++,v(),s.textContent=f,E(f)}function g(t){return+t.replace(/\D/g,"")}r.length<10?(c.textContent=`0${r.length}`,s.textContent=`0${f}`):(c.textContent=r.length,c.textContent=f),u.style.width=100*r.length+"%",u.style.display="flex",u.style.transition="transform .3s linear",r.forEach((t=>{t.style.width=m})),a.style.position="relative";const p=document.createElement("ol");p.style.cssText="\n                position: absolute;\n                right: 0;\n                bottom: 0;\n                left: 0;\n                z-index: 15;\n                display: flex;\n                justify-content: center;\n                margin-right: 15%;\n                margin-left: 15%;\n                list-style: none;\n            ",a.append(p);for(let t=0;t<r.length;t++){const e=document.createElement("li");e.setAttribute("data-to",t+1),e.style.cssText="\n                    box-sizing: content-box;\n                    flex: 0 1 auto;\n                    width: 30px;\n                    height: 6px;\n                    margin-right: 3px;\n                    margin-left: 3px;\n                    cursor: pointer;\n                    background-color: #fff;\n                    background-clip: padding-box;\n                    border-top: 10px solid transparent;\n                    border-bottom: 10px solid transparent;\n                    opacity: .5;\n                    transition: opacity .6s ease;\n                ",p.append(e),_.push(e)}function E(t=1){_.forEach((t=>t.style.opacity=.5)),_[t-1].style.opacity=1}E(),d.style.overflow="hidden",i.addEventListener("click",(()=>{h==g(m)*(r.length-1)?h=0:h+=g(m),u.style.transform=`translateX(-${h}px)`,y()})),l.addEventListener("click",(()=>{0===h?h=g(m)*(r.length-1):h-=g(m),u.style.transform=`translateX(-${h}px)`,1==f?f=r.length:f--,v(),s.textContent=f,E(f)})),_.forEach((t=>{t.addEventListener("click",(t=>{const e=t.target.getAttribute("data-to");h=g(m)*(e-1),u.style.transform=`translateX(-${h}px)`,f=e-1,y()}))}));const L=document.querySelectorAll(".calculating__choose_medium input"),x=document.querySelector(".calculating__result span"),S=document.querySelector("#male"),b=document.querySelector("#famale"),w=document.querySelectorAll(".calculating__choose_big div");function q(t,e){document.querySelector(t).addEventListener("click",(n=>{n.target.classList.contains("calculating__choose-item")&&(document.querySelectorAll(t+" div").forEach((t=>{t.classList.remove(e.replace(/\./,""))})),n.target.classList.add(e.replace(/\./,""))),C()}))}function C(){let t=0,e=0;L[0].value&&L[1].value&&L[2].value?(S.classList.contains("calculating__choose-item_active")?w.forEach((n=>{n.classList.contains("calculating__choose-item_active")&&(t=+n.getAttribute("data-active")),e=(88.36+13.4*+L[1].value+4.8*+L[0].value-5.7*+L[2].value)*t})):b.classList.contains("calculating__choose-item_active")&&w.forEach((n=>{n.classList.contains("calculating__choose-item_active")&&(t=+n.getAttribute("data-active")),e=(447.6+9.2*+L[1].value+3.1*+L[0].value-4.3*+L[2].value)*t})),x.textContent=Math.round(Math.round(e/100)+"00")):x.textContent="0"}L.forEach((t=>{t.addEventListener("input",(()=>{C()}))})),q("#gender",".calculating__choose-item_active"),q(".calculating__choose_big",".calculating__choose-item_active"),C()}))})();
//# sourceMappingURL=bundle.js.map