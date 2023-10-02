let userScore = 0
    let i = 0
    let timer;
    let timeLeft = 20;
    let gameEnded = false

    var mySong = new Audio("sound_background.mp3")
    var mySong2 = new Audio("sound_right.mp3")
    var mySong3 = new Audio("sound_wrong.mp3")

    let optA, optB, optC, optD;
    let correctAnswer;

    const inputQuestion = [
      {
        question: 'Free surface of a liquid behaves like a sheet and tends to contract to the smallest possible area due to the',
        optionA: 'Force of adhesion',
        optionB: 'Force of friction',
        optionC: 'Centrifugal force',
        optionD: 'Force of cohesion',
        answer: 'D'
      },
      {
        question: 'GNLF stands for',
        optionA: 'Gorkha National Liberation Front',
        optionB: 'Gross National Liberation Form',
        optionC: 'Both option A and B',
        optionD: 'None of the above',
        answer: 'A'
      },
      {
        question: 'What is the chemical symbol for gold?',
        optionA: 'Au',
        optionB: 'Ag',
        optionC: 'Hg',
        optionD: 'Fe',
        answer: 'A'
      },
      {
        question: 'Which gas does plants absorb from the atmosphere during photosynthesis?',
        optionA: 'Oxygen',
        optionB: 'Carbon Dioxide',
        optionC: 'Nitrogen',
        optionD: 'Hydrogen',
        answer: 'B'
      },
      {
        question: 'What is the largest mammal on Earth?',
        optionA: 'Elephant',
        optionB: 'Giraffe',
        optionC: 'Blue Whales',
        optionD: 'Lion',
        answer: 'C'
      },
      {
        question: 'What is largest planet in our solar system?',
        optionA: 'Earth',
        optionB: 'Saturn',
        optionC: 'Jupiter',
        optionD: 'Mars',
        answer: 'C'
      },
      {
        question: 'For safety, the fuse wire used in the mains for household supply of electricity must be made of metal having',
        optionA: 'Low melting point',
        optionB: 'High resistance',
        optionC: 'High melting point',
        optionD: 'Low specific heat',
        answer: 'A'
      },
      {
        question: 'During World War I Germany was defeated in the Battle of Verdun on the western front and Romania declared war on the eastern front in the year',
        optionA: '1914 AD',
        optionB: '1915 AD',
        optionC: '1916 AD',
        optionD: '1917 AD',
        answer: 'C'
      },
      {
        question: 'When is Nigeria independence day?',
        optionA: 'October 1',
        optionB: 'May 31',
        optionC: 'December 10',
        optionD: 'April 11',
        answer: 'A'
      },
      {
        question: 'Durand Cup is associated with the game of',
        optionA: 'Cricket',
        optionB: 'Football',
        optionC: 'Hockey',
        optionD: 'Volleyball',
        answer: 'B'
      },
      {
        question: 'What are the primary colors used in subtractive color mixing?',
        optionA: 'Red, green, and blue',
        optionB: 'Cyan, magenta, and yellow',
        optionC: 'Yellow, magenta, and black',
        optionD: 'Red, blue, and yellow',
        answer: 'B'
      },
      {
        question: '20th August is celebrated as',
        optionA: 'Earth Day',
        optionB: 'Sadbhavana Divas',
        optionC: 'No Tobacco Day',
        optionD: 'None of these',
        answer: 'B'
      },
      {
        question: 'When is the World Population Day observed?',
        optionA: 'May 31',
        optionB: 'October 4',
        optionC: 'December 10',
        optionD: 'July 11',
        answer: 'D'
      },
      {
        question: 'Who is Manchester United current captain?',
        optionA: 'Luke Shaw',
        optionB: 'Bruno Fernades',
        optionC: 'Marcus Rashford',
        optionD: 'Raheal Varane',
        answer: 'B'
      },
      {
        question: 'Which of the following are types of renewable energy sources?',
        optionA: 'Oil and coal',
        optionB: 'Wind and solar',
        optionC: 'Natural gas and nuclear',
        optionD: 'Hydrogen and diesel',
        answer: 'B'
      },
      {
        question: 'Which planet is known as the "Morning Star" or "Evening Star"?',
        optionA: 'Mars',
        optionB: 'Venus',
        optionC: 'Mercury',
        optionD: 'Neptune',
        answer: 'B'
      },
      {
        question: 'What is the capital of France?',
        optionA: 'London',
        optionB: 'Berlin',
        optionC: 'Paris',
        optionD: 'Madrid',
        answer: 'C'
      },
      {
        question: 'Which planet is known as the Red Planet?',
        optionA: 'Venus',
        optionB: 'Mars',
        optionC: 'Jupiter',
        optionD: 'Saturn',
        answer: 'B'
      },
      {
        question: 'What are three types of lasers?',
        optionA: 'Gas, metal vapor, rock',
        optionB: 'Pointer, diode CD',
        optionC: 'Diode, inverted, pointer',
        optionD: 'Gas, solid state, diode',
        answer: 'D'
      },
      {
        question: 'Compact discs, (according to the original CD specifications) hold how many minutes of music?',
        optionA: '74 mins',
        optionB: '56 mins',
        optionC: '60 mins',
        optionD: '90 mins',
        answer: 'A'
      },
    ]
    function shuffleQuestions() {
      for (let i = inputQuestion.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [inputQuestion[i], inputQuestion[j]] = [inputQuestion[j], inputQuestion[i]];
      }
    }
    function getNextQuestion() {
      if (i < inputQuestion.length) {
        return inputQuestion[i++];
      } else {
        return null;
      }
    }

    function updateTimer() {
      if (timeLeft > 0) {
        document.getElementById("disp").innerHTML = `<div class="text-success" style="font-size: 50px;">$${userScore}</div> Time Left: ${timeLeft} seconds`;
        timeLeft--;
      } else {
        mySong.pause();
        mySong3.play();
        if (!gameEnded) {
          alert(`Time's up! Game Over. Your score is $${userScore}`);
          location.reload();
          loadQuestion();
        }
      }
    }

    function loadQuestion() {
      const nextQuestion = getNextQuestion();

      if (nextQuestion) {
        timeLeft = 20;
        clearInterval(timer);
        timer = setInterval(updateTimer, 1000);
        updateTimer();

        optA = nextQuestion.optionA;
        optB = nextQuestion.optionB;
        optC = nextQuestion.optionC;
        optD = nextQuestion.optionD;
        correctAnswer = nextQuestion.answer;
        const questionText = nextQuestion.question;

        document.getElementById("mainQuestion").textContent = questionText;
        document.getElementById("optA").textContent = optA;
        document.getElementById("optB").textContent = optB;
        document.getElementById("optC").textContent = optC;
        document.getElementById("optD").textContent = optD;

        mySong.play();
        document.getElementById("disp").style.display = "block";
        document.getElementById("label").style.display = "block";

        document.getElementById("optA").classList.remove("btn-success", "btn-danger");
        document.getElementById("optB").classList.remove("btn-success", "btn-danger");
        document.getElementById("optC").classList.remove("btn-success", "btn-danger");
        document.getElementById("optD").classList.remove("btn-success", "btn-danger");
        gameEnded = false;
      } else {
        clearInterval(timer);
        gameEnded = true;
        document.getElementById("mainQuestion").textContent = `Congratulations! You have completed the Quiz!. Your score is $${userScore}`;
        document.getElementById("optA").style.display = "none";
        document.getElementById("optB").style.display = "none";
        document.getElementById("optC").style.display = "none";
        document.getElementById("optD").style.display = "none";
        document.getElementById("disp").style.display = "none";
        document.getElementById("label").style.display = "none";
      }
    }

    function checkAnswer(selectedOption) {
      clearInterval(timer);

      if (!gameEnded) {
        if (selectedOption === correctAnswer) {
          mySong2.play();
          mySong.pause();
          userScore += 100;
          document.getElementById("disp").innerHTML = `<div class="text-success" style="font-size: 50px;">$${userScore}</div>`;
          document.getElementById(`opt${selectedOption}`).classList.add("btn-success");
          setTimeout(() => {
            document.getElementById(`opt${selectedOption}`).classList.remove("btn-success");
            loadQuestion()
          }, 300);
        } else {
          mySong3.play();
          mySong.pause();
          document.getElementById(`opt${selectedOption}`).classList.add("btn-danger");
          gameEnded = true;
          setTimeout(() => {
            alert(`Wrong answer! Game Over. Your score is $${userScore}`);
            location.reload()
            loadQuestion()
          }, 400);
        }
      }
    }

    shuffleQuestions();
    loadQuestion();