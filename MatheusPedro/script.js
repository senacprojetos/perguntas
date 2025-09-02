// Pega todos os botões de opção
const optionButtons = document.querySelectorAll(".option-btn");
const submitBtn = document.getElementById("submit-btn");
const restartBtn = document.getElementById("restart-btn");
const finalResult = document.getElementById("final-result");
const resultParagraph = document.getElementById("result-paragraph");

// Objeto para salvar respostas
let answers = {};

// Textos de feedback por pergunta
const respostas = {
    1: {
        sim: "Você está trabalhando, parabéns! Estar empregado já é um passo importante para manter sua experiência ativa e abrir portas para novas oportunidades. Continue investindo em si mesmo para não apenas se manter no mercado, mas também crescer.",
        nao: "Você está desempregado, mas não desanime. Segundo dados do IBGE, cerca de 7,5% dos brasileiros estão desempregados (2025). Isso mostra que a competição é grande, mas também que quem se qualifica aumenta muito suas chances de voltar ao mercado. Talvez seja a hora de investir em cursos profissionalizantes para reverter essa condição."
    },
    2: {
        sim: "Estudar é uma das maiores vantagens competitivas no mundo do trabalho. Quem estuda aumenta em até 73% as chances de conquistar melhores salários, segundo pesquisas do Ipea. Você já está no caminho certo!",
        nao: "Atenção: deixar de estudar pode ser um freio na sua carreira. Em um mundo em que as profissões mudam rapidamente, quem não estuda fica para trás. Que tal começar com algo acessível, acesse as oficinas online gratuitas do Senac em senacrs.com.br"
    },
    3: {
        sim: "O domínio do Excel, Word e PowerPoint é praticamente uma necessidade universal no mercado de trabalho. Esse conhecimento torna você mais produtivo e preparado para qualquer vaga.",
        nao: "Se você ainda não domina o uso do computador vale a pena aprender. O pacote Office é exigido em 8 de cada 10 vagas de emprego administrativo no Brasil. Hoje existem cursos que podem ser concluídos em poucas semanas."
    },
    4: {
        sim: "Você sabia que o uso de IA é cada vez mais valorizado pelas empresas? Segundo a PwC, até 2030, a IA pode adicionar até 15,7 trilhões de dólares à economia global. Você já está surfando essa onda!",
        nao: "Atenção, você está deixando passar uma grande oportunidade. A IA já está transformando o mercado de trabalho em todas as áreas. Aprender a usá-la não exige formação em tecnologia: qualquer pessoa pode começar com ferramentas simples para aumentar sua produtividade."
    },
    5: {
        sim: "Parabéns por ter feito um curso nos últimos 2 anos! Esse é o espírito de um profissional atualizado. Estudos mostram que quem investe regularmente em capacitação tem até 30% mais chances de progressão na carreira.",
        nao: "O conhecimento envelhece cada vez mais rapidamente. Em muitas áreas, o que você aprendeu há 5 anos pode já estar ultrapassado. Pequenos cursos podem reabrir portas para novas oportunidades."
    },
    6: {
        sim: "Hoje o celular é uma ferramenta essencial na vida da gente e no trabalho. Profissionais que utilizam aplicativos para otimizar tarefas ganham em produtividade e organização.",
        nao: "Se você ainda não possui apps em seu celular utilizados para o trabalho e organização do dia a dia você pode estar perdendo tempo. Há aplicativos gratuitos que ajudam desde organização de tarefas até controle de finanças. Inserir essa prática no dia a dia também é um diferencial importante."
    },
    7: {
        sim: "Por fim, dentre as competências necessárias atualmente, dominar outro idioma é abrir portas para o mundo. O inglês, por exemplo, pode aumentar o salário em até 61% no Brasil, segundo a Catho.",
        nao: "Dominar um segundo idioma é, também, uma habilidade estratégica atualmente. Mesmo aprender o básico já faz diferença."
    },
    8: {
        sim: "Você tem um objetivo profissional definido, parabéns! Ter clareza do objetivo ajuda a focar energia e esforços, transformando passos em conquistas. Isso mostra que você tem visão de futuro.",
        nao: "Sem metas claras, é fácil andar em círculos. Definir um objetivo profissional é como traçar um mapa: você pode até mudar o caminho, mas sabe para onde quer ir. Reflita sobre o que realmente deseja alcançar."
    }
};

// Marcar botão selecionado e mostrar resposta
optionButtons.forEach(button => {
    button.addEventListener("click", () => {
        const question = button.dataset.question;
        const value = button.dataset.value;

        // Remove seleção anterior da mesma pergunta
        document.querySelectorAll(`.option-btn[data-question="${question}"]`)
            .forEach(btn => btn.classList.remove("selected"));

        // Marca o clicado
        button.classList.add("selected");

        // Salva a resposta
        answers[question] = value;

        // Mostra o texto da resposta correspondente
        const resultDiv = document.querySelector(`.result-text[data-result="${question}"]`);
        resultDiv.textContent = respostas[question][value];
    });
});

// Quando clicar em "Ver Resultado"
submitBtn.addEventListener("click", () => {
    const totalQuestions = document.querySelectorAll(".question-card").length;
    if (Object.keys(answers).length < totalQuestions) {
        alert("⚠️ Responda todas as perguntas antes de ver o resultado!");
        return;
    }

    const sims = Object.values(answers).filter(a => a === "sim").length;

    let feedback = "";
    if (sims <= 3) {
        feedback = "Agora é a sua vez de mudar! Suas respostas mostram que é hora de agir! Não encare como crítica, mas como ponto de partida. Comece por algo simples: um curso online, aprender a usar uma IA ou aplicativos no celular. Cada pequeno passo abre novas oportunidades e o Senac está aqui para te ajudar.";
    } else if (sims <= 6) {
        feedback = "Agora é a sua vez de inovar! Suas respostas indicam que você já tem conquistas, mas precisa acelerar a qualificação para não perder espaço. Um plano de estudos e a adoção de novas ferramentas tecnológicas podem fazer a diferença. Conte com o Senac para acelerar essa jornada de crescimento!";
    } else {
        feedback = "Agora é a sua vez de crescer! Suas respostas indicam que você está no caminho certo, já construiu uma boa base e deve continuar se atualizando. O próximo passo pode ser buscar especializações e ampliar seu networking. Conte com o Senac para seguir nessa jornada de crescimento!";
    }

    resultParagraph.textContent = feedback;
    finalResult.classList.remove("hidden");

    submitBtn.classList.add("hidden");
    restartBtn.classList.remove("hidden");
});

// Reiniciar o quiz
restartBtn.addEventListener("click", () => {
    answers = {};
    optionButtons.forEach(btn => btn.classList.remove("selected"));
    document.querySelectorAll(".result-text").forEach(div => div.textContent = "");

    finalResult.classList.add("hidden");
    submitBtn.classList.remove("hidden");
    restartBtn.classList.add("hidden");
});
