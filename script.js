const output = document.getElementById('output');
const input = document.getElementById('command-input');
const body = document.body;

// Web Audio API para efeitos sonoros sem arquivos externos
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playBeep(freq = 440, type = 'sine', duration = 0.1) {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

// Estrutura das Fases e Enigmas
const puzzles = [
  {
    answer: "livro",
    success: "Acesso concedido. Registro de áudio desbloqueado.",
    nextPrompt: "ENIGMA 02: 'Quanto mais de mim você tira, maior eu fico. O que eu sou?'"
  },
  {
    answer: "buraco",
    success: "Sinal vital detectado próximo à sua localização...",
    nextPrompt: "ENIGMA 03: 'Eu posso sussurrar no seu ouvido sem ter boca. O que sou?'"
  },
  {
    answer: "vento",
    success: "CONEXÃO TOTALMENTE ESTABELECIDA. ELE SABE QUE VOCÊ ESTÁ AQUI.",
    nextPrompt: "FIM DA SESSÃO. Olhe para trás."
  }
];

let currentStep = 0;

input.addEventListener('keydown', (e) => {
  // Som de tecla ao digitar
  playBeep(800, 'square', 0.03);

  if (e.key === 'Enter') {
    const userVal = input.value.trim().toLowerCase();
    if (!userVal) return;

    printLine(`> ${userVal}`, 'user-msg');
    input.value = '';

    checkAnswer(userVal);
  }
});

function printLine(text, className = '') {
  const p = document.createElement('p');
  p.textContent = text;
  if (className) p.classList.add(className);
  output.appendChild(p);
  output.scrollTop = output.scrollHeight;
}

function checkAnswer(val) {
  if (currentStep >= puzzles.length) {
    printLine("O terminal está inativo.", "system-msg");
    return;
  }

  const currentPuzzle = puzzles[currentStep];

  if (val === currentPuzzle.answer) {
    // Resposta Correta
    playBeep(600, 'sine', 0.15);
    setTimeout(() => playBeep(900, 'sine', 0.2), 150);
    
    printLine(currentPuzzle.success, 'success-msg');
    currentStep++;

    if (currentStep < puzzles.length) {
      setTimeout(() => {
        printLine(puzzles[currentStep].nextPrompt, 'puzzle-msg');
      }, 1000);
    } else {
      setTimeout(() => {
        body.style.backgroundColor = "#1a0000";
        printLine("SISTEMA CORROMPIDO.", 'error-msg');
      }, 1500);
    }
  } else {
    // Resposta Errada (Efeito Glitch + Som grave)
    playBeep(120, 'sawtooth', 0.3);
    body.classList.add('glitch');
    setTimeout(() => body.classList.remove('glitch'), 400);

    printLine("RESPOSTA INCORRETA. Tente novamente.", 'error-msg');
  }
}

