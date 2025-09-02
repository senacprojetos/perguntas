// --- 1. IMPORTAÇÕES E INICIALIZAÇÃO DO FIREBASE ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// A configuração do seu app da Web do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA4mCaoYiQMzUvjvWIQVdVx_y021rr7cFc",
  authDomain: "senac-quiz-5fa76.firebaseapp.com",
  projectId: "senac-quiz-5fa76",
  storageBucket: "senac-quiz-5fa76.firebasestorage.app",
  messagingSenderId: "146381588599",
  appId: "1:146381588599:web:ac89522e3dcc3ae9c91e72"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// --- 2. ESTRUTURA DE DADOS DO QUIZ ---
const quizData = [
    // ... (suas 8 perguntas continuam aqui, sem alterações) ...
    {
        question: "Você está empregado?",
        feedback: {
            sim: "Você está trabalhando, parabéns! Estar empregado já é um passo importante para manter sua experiência ativa e abrir portas para novas oportunidades. Continue investindo em si mesmo para não apenas se manter no mercado, mas também crescer.",
            nao: "Você está desempregado, mas não desanime. Segundo dados do IBGE, cerca de 7,5% dos brasileiros estão desempregados (2025). Isso mostra que a competição é grande, mas também que quem se qualifica aumenta muito suas chances de voltar ao mercado. Talvez seja a hora de investir em cursos profissionalizantes para reverter essa condição."
        }
    },
    {
        question: "Atualmente você está estudando?",
        feedback: {
            sim: "Estudar é uma das maiores vantagens competitivas no mundo do trabalho. Quem estuda aumenta em até 73% as chances de conquistar melhores salários, segundo pesquisas do Ipea. Você já está no caminho certo!",
            nao: "Atenção: deixar de estudar pode ser um freio na sua carreira. Em um mundo em que as profissões mudam rapidamente, quem não estuda fica para trás. Que tal começar com algo acessível, acesse as oficinas online gratuitas do Senac em senacrs.com.br"
        }
    },
    {
        question: "Você domina o uso do computador (pacote Office)?",
        feedback: {
            sim: "O domínio do Excel, Word e PowerPoint é praticamente uma necessidade universal no mercado de trabalho. Esse conhecimento torna você mais produtivo e preparado para qualquer vaga.",
            nao: "Se você ainda não domina o uso do computador vale a pena aprender. O pacote Office é exigido em 8 de cada 10 vagas de emprego administrativo no Brasil. Hoje existem cursos que podem ser concluídos em poucas semanas."
        }
    },
    {
        question: "Já utiliza Inteligência Artificial em seu dia a dia?",
        feedback: {
            sim: "Você sabia que o uso de IA é cada vez mais valorizado pelas empresas? Segundo a PwC, até 2030, a IA pode adicionar até 15,7 trilhões de dólares à economia global. Você já está surfando essa onda!",
            nao: "Atenção, você está deixando passar uma grande oportunidade. A IA já está transformando o mercado de trabalho em todas as áreas. Aprender a usá-la não exige formação em tecnologia: qualquer pessoa pode começar com ferramentas simples para aumentar sua produtividade."
        }
    },
    {
        question: "Fez algum curso de atualização nos últimos 2 anos?",
        feedback: {
            sim: "Parabéns por ter feito um curso nos últimos 2 anos! Esse é o espírito de um profissional atualizado. Estudos mostram que quem investe regularmente em capacitação tem até 30% mais chances de progressão na carreira.",
            nao: "O conhecimento envelhece cada vez mais rapidamente. Em muitas áreas, o que você aprendeu há 5 anos pode já estar ultrapassado. Pequenos cursos podem reabrir portas para novas oportunidades."
        }
    },
    {
        question: "Possui aplicativos em celular utilizados para o seu trabalho e organização do dia a dia?",
        feedback: {
            sim: "Hoje o celular é uma ferramenta essencial na vida da gente e no trabalho. Profissionais que utilizam aplicativos para otimizar tarefas ganham em produtividade e organização.",
            nao: "Se você ainda não possui apps em seu celular utilizados para o trabalho e organização do dia a dia você pode estar perdendo tempo. Há aplicativos gratuitos que ajudam desde organização de tarefas até controle de finanças. Inserir essa prática no dia a dia também é um diferencial importante."
        }
    },
    {
        question: "Você compreende minimamente um outro idioma?",
        feedback: {
            sim: "Por fim, dentre as competências necessárias atualmente, dominar outro idioma é abrir portas para o mundo. O inglês, por exemplo, pode aumentar o salário em até 61% no Brasil, segundo a Catho.",
            nao: "Dominar um segundo idioma é, também, uma habilidade estratégica atualmente. Mesmo aprender o básico já faz diferença."
        }
    },
    {
        question: "Já tem um objetivo profissional definido?",
        feedback: {
            sim: "Você tem um objetivo profissional definido, parabéns! Ter clareza do objetivo ajuda a focar energia e esforços, transformando passos em conquistas. Isso mostra que você tem visão de futuro.",
            nao: "Sem metas claras, é fácil andar em círculos. Definir um objetivo profissional é como traçar um mapa: você pode até mudar o caminho, mas sabe para onde quer ir. Reflita sobre o que realmente deseja alcançar."
        }
    }
];

// --- 3. VARIÁVEIS DE ESTADO E REFERÊNCIAS DO DOM ---
let currentQuestionIndex = 0;
let userAnswers = [];
let simCount = 0;
let finalQuizResult = {}; // Armazena o resultado do quiz temporariamente

const progressBar = document.getElementById('progress-bar');
const questionElement = document.getElementById('question');
const answersContainer = document.getElementById('answers-container');
const quizSession = document.getElementById('quiz-session');
const resultSession = document.getElementById('result-session');
const contactSession = document.getElementById('contact-session');
const contactForm = document.getElementById('contact-form');

// --- 4. FUNÇÕES DO QUIZ ---
function showQuestion() {
    if (currentQuestionIndex < quizData.length) {
        updateProgressBar();
        const currentQuestion = quizData[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        
        answersContainer.innerHTML = '';
        ['Sim', 'Não'].forEach(answerText => {
            const button = document.createElement('button');
            button.textContent = answerText;
            button.onclick = () => handleAnswer(answerText === 'Sim');
            answersContainer.appendChild(button);
        });
    } else {
        showResult();
    }
}

function handleAnswer(answer) {
    if (answer) simCount++;
    
    const currentQuestion = quizData[currentQuestionIndex];
    userAnswers.push({
        question: currentQuestion.question,
        answer: answer ? 'Sim' : 'Não',
        feedback: currentQuestion.feedback[answer ? 'sim' : 'nao']
    });

    currentQuestionIndex++;
    showQuestion();
}

function updateProgressBar() {
    const progress = (currentQuestionIndex / quizData.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function showResult() {
    quizSession.classList.add('hidden');
    resultSession.classList.remove('hidden');
    
    setTimeout(() => {
        finalQuizResult = generateFinalFeedback();
        resultSession.innerHTML = finalQuizResult.html;
        contactSession.classList.remove('hidden'); // Mostra o formulário de contato
    }, 2000);
}

function generateFinalFeedback() {
    let combinedFeedback = userAnswers.map(ans => `<p>${ans.feedback}</p>`).join('');
    let concludingParagraph = '';
    let userProfile = '';
    const totalQuestions = quizData.length;

    if (simCount >= totalQuestions * 0.7) {
        userProfile = 'Crescimento';
        concludingParagraph = `<h3>Agora é a sua vez de crescer!</h3><p>Suas respostas indicam que você está no caminho certo...</p>`;
    } else if (simCount >= totalQuestions * 0.4) {
        userProfile = 'Inovação';
        concludingParagraph = `<h3>Agora é a sua vez de inovar!</h3><p>Suas respostas indicam que você já tem conquistas, mas precisa acelerar...</p>`;
    } else {
        userProfile = 'Mudança';
        concludingParagraph = `<h3>Agora é a sua vez de mudar!</h3><p>Suas respostas mostram que é hora de agir!...</p>`;
    }

    const resultHTML = `
        <h2>Seu perfil vocacional:</h2>
        ${combinedFeedback}
        <hr style="margin: 2rem 0;">
        ${concludingParagraph}
        <a href="https://senacrs.com.br" target="_blank" class="result-link">Conheça nossos cursos</a>
    `;
    return { html: resultHTML, profile: userProfile };
}

// --- 5. FUNÇÕES DE CONTATO E FIREBASE ---
function handleContactSubmit(event) {
    event.preventDefault(); // Impede o recarregamento da página
    const userName = document.getElementById('userName').value;
    const userEmail = document.getElementById('userEmail').value;
    const userPhone = document.getElementById('userPhone').value;

    const contactData = {
        name: userName,
        email: userEmail,
        phone: userPhone
    };

    saveQuizResultToFirebase(finalQuizResult.profile, userAnswers, contactData);
    
    contactSession.innerHTML = `<h3>Obrigado!</h3><p>Seus dados foram enviados com sucesso. Em breve entraremos em contato.</p>`;
}

function saveQuizResultToFirebase(profile, answers, contact) {
    const quizResultsRef = ref(database, 'quizResults');
    const newResultRef = push(quizResultsRef);

    set(newResultRef, {
        contactInfo: contact, // Dados do formulário de contato
        quizProfile: profile,
        simCount: simCount,
        totalQuestions: quizData.length,
        answers: answers,
        timestamp: new Date().toISOString()
    }).then(() => {
        console.log("Resultado do quiz e contato salvos com sucesso!");
    }).catch((error) => {
        console.error("Erro ao salvar dados: ", error);
    });
}

// --- 6. INICIALIZAÇÃO ---
document.addEventListener('DOMContentLoaded', () => {
    showQuestion();
    contactForm.addEventListener('submit', handleContactSubmit);
});