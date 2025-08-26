/* Estado e dados */
const QUESTIONS = [
  {
    pergunta: 'Onde foi o nosso primeiro Date?',
    alternativas: ['Kiwi', '14 de julho', 'Picadinho'],
    correta: 0,
    imagem: './assets/images/primeiro-date.jpg'
  },
  {
    pergunta: 'O cantor que sou fã número 1',
    alternativas: ['Cristiano Araujo', 'Gustavo Mioto', 'Luan Santana'],
    correta: 1,
    imagem: './assets/images/cantor-favorito.jpg'
  },
  {
    pergunta: 'Um arrependimento meu',
    alternativas: ['Não ser vegano', 'Ter esquecido o escondidinho', 'Tomar o pré treino'],
    correta: 1,
    imagem: './assets/images/arrependimento.jpg'
  },
  {
    pergunta: 'Qual o jogo que mais jogo?',
    alternativas: ['PB', 'PUBG', 'Free Fire'],
    correta: 1,
    imagem: './assets/images/jogo-favorito.jpg'
  },
  {
    pergunta: 'Qual é a minha profissão?',
    alternativas: ['Programador', 'Desenvolvedor', 'Garoto de Programa'],
    correta: 2,
    imagem: './assets/images/profissao.jpg'
  },
  {
    pergunta: 'Quem é o pai do Naruto?',
    alternativas: ['Jiraya', 'Minato', 'Sasuke'],
    correta: 1,
    imagem: './assets/images/naruto.jpg'
  },
  {
    pergunta: 'Qual a música que eu mais gosto do Luan Santana?',
    alternativas: ['Chuva de arroz', 'Tudo que você quiser', 'Te Vivo'],
    correta: 1,
    imagem: './assets/images/luan-santana.jpg'
  },
  {
    pergunta: 'De quem eu tenho medo?',
    alternativas: ['Morango do Amor', 'Véio do Rio', 'Pi Diri'],
    correta: 2,
    imagem: './assets/images/medo.jpg'
  }
];

let currentQuestionIndex = 0;
let hasAnsweredCorrectly = false;

/* Seletores */
const screens = {
  start: document.getElementById('start-screen'),
  instructions: document.getElementById('instructions-screen'),
  quiz: document.getElementById('quiz-screen'),
  post1: document.getElementById('post1-screen'),
  post2: document.getElementById('post2-screen'),
  final: document.getElementById('final-screen'),
  celebration: document.getElementById('celebration-screen')
};

const startBtn = document.getElementById('start-btn');
const instructionsBtn = document.getElementById('instructions-btn');
const bgAudio = document.getElementById('bg-audio');
const audioToggle = document.getElementById('audio-toggle');
const progressText = document.getElementById('progress-text');
const progressBar = document.getElementById('progress-bar');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');

const toPost2Btn = document.getElementById('to-post2-btn');
const toFinalBtn = document.getElementById('to-final-btn');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const heartsContainer = document.getElementById('hearts-container');

/* Navegação de telas */
function showScreen(target) {
  Object.values(screens).forEach(section => section.hidden = true);
  screens[target].hidden = false;
}

/* Renderização do Quiz */
function renderQuestion() {
  const total = QUESTIONS.length;
  const q = QUESTIONS[currentQuestionIndex];
  hasAnsweredCorrectly = false;

  progressText.textContent = `Pergunta ${currentQuestionIndex + 1} de ${total}`;
  const percent = ((currentQuestionIndex) / total) * 100;
  progressBar.style.width = `${percent}%`;

  // Exibe a imagem da pergunta
  const questionImage = document.getElementById('question-image');
  if (questionImage) {
    if (q.imagem) {
      questionImage.src = q.imagem;
      questionImage.alt = `Imagem para: ${q.pergunta}`;
      questionImage.style.display = 'block';
      
      // Trata erro de carregamento da imagem
      questionImage.onerror = function() {
        this.style.display = 'none';
      };
    } else {
      questionImage.style.display = 'none';
    }
  }

  questionText.textContent = q.pergunta;
  optionsContainer.innerHTML = '';
  nextBtn.hidden = true;

  q.alternativas.forEach((texto, idx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.type = 'button';
    btn.textContent = texto;
    btn.addEventListener('click', () => handleOptionClick(btn, idx === q.correta));
    optionsContainer.appendChild(btn);
  });
}

function handleOptionClick(button, isCorrect) {
  if (button.disabled) return;

  if (isCorrect) {
    button.classList.add('option--correct');
    hasAnsweredCorrectly = true;
    nextBtn.hidden = false;
    // Desabilita todas as opções após acertar
    disableAllOptions();
  } else {
    button.classList.add('option--wrong');
    button.disabled = true;
  }
}

function disableAllOptions() {
  const optionButtons = optionsContainer.querySelectorAll('button');
  optionButtons.forEach(b => b.disabled = true);
}

function goToNext() {
  if (!hasAnsweredCorrectly) return;
  const lastIndex = QUESTIONS.length - 1;
  if (currentQuestionIndex < lastIndex) {
    currentQuestionIndex += 1;
    renderQuestion();
  } else {
    // Completou as 8 perguntas
    progressBar.style.width = '100%';
    showScreen('post1');
  }
}

/* Fluxo final */
function goToFinal() {
  showScreen('final');
  positionNoButtonRandomly();
}

/* Botão "Não" que foge */
function positionNoButtonRandomly() {
  const container = document.querySelector('.final-actions');
  const rect = container.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const padding = 4;
  const maxX = rect.width - btnRect.width - padding;
  const maxY = rect.height - btnRect.height - padding;
  const x = Math.max(0, Math.random() * maxX);
  const y = Math.max(0, Math.random() * maxY);

  noBtn.style.position = 'absolute';
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

function makeNoButtonEvasive() {
  let move = () => positionNoButtonRandomly();
  noBtn.addEventListener('mouseenter', move);
  noBtn.addEventListener('click', (e) => { e.preventDefault(); move(); });
  noBtn.addEventListener('touchstart', (e) => { e.preventDefault(); move(); }, { passive: false });
}

/* Corações na celebração */
function spawnHeart() {
  const heart = document.createElement('div');
  heart.className = 'heart';
  // Cores suaves variando
  const colors = ['#ff5f8f', '#ff7aa3', '#f472b6', '#fb7185'];
  heart.style.color = colors[Math.floor(Math.random() * colors.length)];

  const x = Math.random() * window.innerWidth;
  const y = window.innerHeight - 40;
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;

  heartsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 2400);
}

function startCelebration() {
  showScreen('celebration');
  const burst = 24;
  for (let i = 0; i < burst; i += 1) {
    setTimeout(spawnHeart, i * 60);
  }
  const interval = setInterval(spawnHeart, 140);
  setTimeout(() => clearInterval(interval), 3500);
}

/* Eventos principais */
startBtn.addEventListener('click', () => {
  showScreen('instructions');
  // Toca música ao iniciar
  if (bgAudio) {
    bgAudio.volume = 0.7;
    bgAudio.play().then(() => {
      showAudioToggle();
      updateAudioToggleLabel();
    }).catch(() => {
      // Caso o navegador bloqueie, tentamos novamente após uma interação extra
      document.body.addEventListener('pointerdown', tryPlayOnce, { once: true });
      showAudioToggle();
      updateAudioToggleLabel();
    });
  }
});

instructionsBtn.addEventListener('click', () => {
  currentQuestionIndex = 0;
  showScreen('quiz');
  renderQuestion();
});

nextBtn.addEventListener('click', goToNext);

toPost2Btn.addEventListener('click', () => showScreen('post2'));
toFinalBtn.addEventListener('click', () => showScreen('final'));

yesBtn.addEventListener('click', () => {
  startCelebration();
});

makeNoButtonEvasive();

function tryPlayOnce() {
  bgAudio && bgAudio.play().catch(() => {});
}

/* Toggle de áudio */
function showAudioToggle() {
  if (audioToggle) audioToggle.hidden = false;
}

function updateAudioToggleLabel() {
  if (!audioToggle || !bgAudio) return;
  if (bgAudio.paused) {
    audioToggle.textContent = 'Tocar música 🔊';
  } else {
    audioToggle.textContent = 'Mutar música 🔇';
  }
}

audioToggle && audioToggle.addEventListener('click', () => {
  if (!bgAudio) return;
  if (bgAudio.paused) {
    bgAudio.play().catch(() => {});
  } else {
    bgAudio.pause();
  }
  updateAudioToggleLabel();
});

