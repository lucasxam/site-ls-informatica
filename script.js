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
}/* ENVIO DO FORMULÁRIO COM TRIAGEM DE IA */
const contactForm = document.querySelector(".contact-form");

if(contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Impede o envio tradicional e o recarregamento da página

    const button = contactForm.querySelector("button");
    const originalButtonText = button.textContent;
    button.textContent = "Analisando com IA...";
    button.disabled = true;

    // Captura os dados dos inputs
    const formData = {
      nome: contactForm.querySelector('input[name="nome"]').value,
      email: contactForm.querySelector('input[name="email"]').value,
      assunto: contactForm.querySelector('input[name="assunto"]').value,
      mensagem: contactForm.querySelector('textarea[name="mensagem"]').value
    };

    try {
      // SUBSTITUA PELA URL QUE A CLOUDFLARE TE DER AO PUBLICAR O WORKER
      const workerUrl = "https://ls-informatica-api.SEUSUBDOMINIO.workers.dev";

      const response = await fetch(workerUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if(result.success) {
        // Alerta profissional de sucesso (Você pode trocar por um modal customizado na tela)
        alert(`Sucesso!\n\n${result.message}\n\nPré-análise gerada: ${result.analise}`);
        contactForm.reset(); // Limpa o formulário
      } else {
        alert("Ocorreu um erro ao processar. Tente novamente ou nos chame no WhatsApp.");
      }

    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro de conexão. Verifique sua internet ou tente mais tarde.");
    } finally {
      // Restaura o botão ao estado original
      button.textContent = originalButtonText;
      button.disabled = false;
    }
  });
}
