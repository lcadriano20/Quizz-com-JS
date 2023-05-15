// Declaração de VAR 

const question = document.querySelector("#question")
const answersBox = document.querySelector("#answers-box")
const quizzContainer = document.querySelector("#quizz-container")
const scoreContainer = document.querySelector('#score-container')
const letters = ["a","b","c","d"]

let points = 0; 
let actualQuestion = 0;

// Perguntas 
const questions = [
  {
    question: "PHP foi desenvolvido para qual fim?",
    answers: [
      {
        answer: "back-end",
        correct: true
      },
      {
        answer: "front-end",
        correct: false
      },
      {
        answer: "Sistema operacional",
        correct: false
      },
      {
        answer: "Banco de dados",
        correct: false
      }
    ]
  },
  {
    question: "Qual é a linguagem de programação mais popular?",
    answers: [
      {
        answer: "JavaScript",
        correct: true
      },
      {
        answer: "Python",
        correct: false
      },
      {
        answer: "Java",
        correct: false
      },
      {
        answer: "C++",
        correct: false
      }
    ]
  },
  {
    question: "O que significa HTML?",
    answers: [
      {
        answer: "HyperText Markup Language",
        correct: true
      },
      {
        answer: "Home Tool Markup Language",
        correct: false
      },
      {
        answer: "Hyperlinks and Text Markup Language",
        correct: false
      },
      {
        answer: "Hyper Transfer Markup Language",
        correct: false
      }
    ]
  },
  {
    question: "Qual é a sintaxe correta para declarar uma variável em JavaScript?",
    answers: [
      {
        answer: "var myVar;",
        correct: true
      },
      {
        answer: "variable myVar;",
        correct: false
      },
      {
        answer: "myVar =;",
        correct: false
      },
      {
        answer: "myVar :=;",
        correct: false
      }
    ]
  },
  {
    question: "O que é um loop 'for'?",
    answers: [
      {
        answer: "Uma estrutura de controle que permite repetir um bloco de código várias vezes.",
        correct: true
      },
      {
        answer: "Uma função nativa da linguagem JavaScript.",
        correct: false
      },
      {
        answer: "Um tipo de dado em JavaScript.",
        correct: false
      },
      {
        answer: "Um método para manipular strings em JavaScript.",
        correct: false
      }
    ]
  },
  {
    question: "Qual das opções a seguir NÃO é um tipo de dado em JavaScript?",
    answers: [
      {
        answer: "int",
        correct: true
      },
      {
        answer: "string",
        correct: false
      },
      {
        answer: "boolean",
        correct: false
      },
      {
        answer: "array",
        correct: false
      }
    ]
  },
  {
    question: "O que é uma API?",
    answers: [
      {
        answer: "Application Programming Interface, um conjunto de regras e protocolos que permite a comunicação entre sistemas.",
        correct: true
      },
      {
        answer: "Automated Programming Interface, uma técnica para automação de tarefas repetitivas em programação.",
        correct: false
      },
      {
        answer: "All-Purpose Interface, uma interface genérica para múltiplas funcionalidades em programação.",
        correct: false
      },
      {
        answer: "Application Process Integration, um processo para integração de aplicativos em programação.",
        correct: false
      }
    ]
  }
]


// Substituição do quizz para a primeira pergunta 
function init() {
    // Criar a primeira pergunta 
    createQuestion(0)
    
}
// Cria uma pergunta 
function createQuestion(i) {

    // Limpar a questão anterior
    const oldButtons = answersBox.querySelectorAll("button")

    oldButtons.forEach(function(btn) {
        btn.remove()
    })

    // Alterar o texto da pergunta 
    const questionText = question.querySelector("#question-text")
    const questionNumber = question.querySelector("#question-number")

    questionText.textContent = questions[i].question
    questionNumber.textContent = i+1

    // Insere as alternativas 
    questions[i].answers.forEach(function(answer,i) {

        // Cria o template do botão do Quizz
        const answerTemplate = document.querySelector(".answer-template").cloneNode(true)

        const letterBtn  = answerTemplate.querySelector(".btn-letter")

        const answerText = answerTemplate.querySelector(".question-answer")

        letterBtn.textContent = letters[i]
        answerText.textContent = answer['answer']

        // Se a alternativa é correta ou não
        answerTemplate.setAttribute("correct-answer",answer["correct"])

        // Remover hide e template class 
        answerTemplate.classList.remove("hide")
        answerTemplate.classList.remove("answer-template")

        // Inserir a alternativa na tela 
        answersBox.appendChild(answerTemplate)

        //Inserir um evento de click no botão 
        answerTemplate.addEventListener('click', function() {
          checkAnswer(this)
        })
    });

    // Incrementar o número da questão 
    actualQuestion++;
}

// Verificando resposta do usuário 
function checkAnswer(btn) {


    // Selecionar todos os botões em baixo da div answersBox
    const buttons = answersBox.querySelectorAll("button");

    // Verifica se a resposta está correta e adiciona classe nos botões
    buttons.forEach(function(button) {
      if(button.getAttribute("correct-answer") === "true") {

        button.classList.add("correct-answer")

        // Verifica se o usuário acertou a pergunta
          if(btn === button) {
            // incremento dos pontos 
            points++
          }

      } else {

        button.classList.add("wrong-answer")
      }
    })

    // Exibir próxima pergunta 
    nextQuestion()
}
// Exibe a próxima pergunta no quizz
function nextQuestion() {
    // Timer para usuário ver as respostas 
    setTimeout(function() {
        // verifica se ainda há perguntas 
          if(actualQuestion >= questions.length) {
              showSuccessMessage()
              return;
          }
          createQuestion(actualQuestion)


    },700 )
}
// Exibe a tela final 
function showSuccessMessage() {
  hideOrShowQuizz();

  // trocar dados da tela de sucesso 

  // calcular o score 
  const score = (points / questions.length *100).toFixed(2)

  const displayScore = document.querySelector("#display-score span");

  displayScore.textContent = score.toString()

  // Alterar o número de perguntas corretas 
  const correctAnswer = document.querySelector("#correct-answers")

  correctAnswer.textContent = points

  // Alterar o total de perguntas 
  const totalQuestions = document.querySelector("#questions-qty")
  totalQuestions.textContent = questions.length
}

// Mostra ou escode o score 
function hideOrShowQuizz() {
  quizzContainer.classList.toggle("hide");
  scoreContainer.classList.toggle("hide");
} 

// Reiniciar Quizz

const restartBtn = document.querySelector("#restart")

restartBtn.addEventListener("click",function() {

  // Zerar o jogo 
  actualQuestion = 0 

  // Zerar os pontos
  points = 0 


  hideOrShowQuizz()

  // Iniciar o jogo novamente
  init()
})



// Inicialização do Quizz
init()