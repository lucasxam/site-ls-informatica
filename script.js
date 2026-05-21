/* LOADER */
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");
  if(loader){
    loader.classList.add("hidden");
  }
});

/* REVEAL */
const reveals = document.querySelectorAll(".reveal");

function revealScroll(){
  reveals.forEach((element) => {
    const windowHeight = window.innerHeight;
    const revealTop = element.getBoundingClientRect().top;

    if(revealTop < windowHeight - 100){
      element.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealScroll);
revealScroll();

/* MENU MOBILE */
const toggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

if(toggle && menu){
  toggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });
}

/* TYPING EFFECT */
const words = [
  "velocidade.",
  "performance máxima.",
  "suporte profissional.",
  "mais desempenho.",
  "soluções eficientes."
];

let wordIndex = 0;
let charIndex = 0;
const typing = document.querySelector(".typing");

function type(){
  if(!typing) return;

  if(charIndex < words[wordIndex].length){
    typing.textContent += words[wordIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, 80);
  } else {
    setTimeout(erase, 2000);
  }
}

function erase(){
  if(!typing) return;

  if(charIndex > 0){
    typing.textContent = words[wordIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, 40);
  } else {
    wordIndex++;
    if(wordIndex >= words.length){
      wordIndex = 0;
    }
    setTimeout(type, 500);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if(words.length && typing){
    setTimeout(type, 500);
  }
});

/* PARTICLES */
if(document.getElementById("particles-js")){
  particlesJS("particles-js", {
    particles:{
      number:{ value:70 },
      color:{ value:"#3b82f6" },
      shape:{ type:"circle" },
      opacity:{ value:0.5 },
      size:{ value:3 },
      line_linked:{
        enable:true,
        distance:150,
        color:"#3b82f6",
        opacity:0.4,
        width:1
      },
      move:{
        enable:true,
        speed:2
      }
    },
    interactivity:{
      detect_on:"canvas",
      events:{
        onhover:{ enable:true, mode:"grab" },
        onclick:{ enable:true, mode:"push" }
      },
      modes:{
        grab:{
          distance:140,
          line_linked:{ opacity:1 }
        },
        push:{ particles_nb:4 }
      }
    },
    retina_detect:true
  });
}