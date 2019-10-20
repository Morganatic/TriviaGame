$(document).ready(function () {

    // event listeners
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click', '.option', trivia.guessChecker);

})

var trivia = {
    // trivia properties
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId: '',
    // questions options and answers data
    questions: {
        q1: 'What is the visible border of a black hole called?',
        q2: 'What is the theorectical highest temperature achievable called?',
        q3: "What is Dr. Who's time machine called?",
        q4: 'What new meat option did Chipotle start serving in August of 2019?',
        q5: "Who plays Captain Marvel as of 2019?",
        q6: 'Which Infinity Stone did Doctor Strange surrender to Thanos?',
        q7: "What is the sum of all positive integers?"
    },
    options: {
        q1: ['Event Border', 'Event Horizon', 'Border Line', 'Black Border'],
        q2: ['Planck Max', 'Planck Temperature', 'Big Crunch', 'Paramount Nova'],
        q3: ['Tardis', 'Dalorian', 'Vortex Manipulator', 'Warp Drive'],
        q4: ['Ground Beef', 'Shredded Chicken', 'Carne Asada', 'Bulgolgi'],
        q5: ['Zoe Saldana', 'Kate Beckinsale', 'Sea Shamooka', 'Brie Larson'],
        q6: ['POwer Stone', 'Time Stone', 'Reality Stone', 'Space Stone'],
        q7: ['Infinity', 'Undefined', 'Null Set', '-(1/12)']
    },
    answers: {
        q1: 'Event Horizon',
        q2: 'Planck Temperature',
        q3: 'Tardis',
        q4: 'Carne Asada',
        q5: 'Brie Larson',
        q6: 'Time Stone',
        q7: '-(1/12)'
    },
    // trivia methods
    // method to initialize game
    startGame: function () {
        // restarting game results
        trivia.currentSet = 0;
        trivia.correct = 0;
        trivia.incorrect = 0;
        trivia.unanswered = 0;
        clearInterval(trivia.timerId);

        // show game section
        $('#game').show();

        //  empty last results
        $('#results').html('');

        // show timer
        $('#timer').text(trivia.timer);

        // remove start button
        $('#start').hide();

        $('#remaining-time').show();

        // ask first question
        trivia.nextQuestion();

    },
    // method to loop through and display questions and options 
    nextQuestion: function () {

        // set timer to 20 seconds each question
        trivia.timer = 10;
        $('#timer').removeClass('last-seconds');
        $('#timer').text(trivia.timer);

        // to prevent timer speed up
        if (!trivia.timerOn) {
            trivia.timerId = setInterval(trivia.timerRunning, 1000);
        }

        // gets all the questions then indexes the current questions
        var questionContent = Object.values(trivia.questions)[trivia.currentSet];
        $('#question').text(questionContent);

        // an array of all the user options for the current question
        var questionOptions = Object.values(trivia.options)[trivia.currentSet];

        // creates all the trivia guess options in the html
        $.each(questionOptions, function (index, key) {
            $('#options').append($('<button class="option btn btn-info btn-lg">' + key + '</button>'));
        })

    },
    // method to decrement counter and count unanswered if timer runs out
    timerRunning: function () {
        // if timer still has time left and there are still questions left to ask
        if (trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length) {
            $('#timer').text(trivia.timer);
            trivia.timer--;
            if (trivia.timer === 4) {
                $('#timer').addClass('last-seconds');
            }
        }
        // the time has run out and increment unanswered, run result
        else if (trivia.timer === -1) {
            trivia.unanswered++;
            trivia.result = false;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1100);
            $('#results').html('<h3>Out of time! The answer was ' + Object.values(trivia.answers)[trivia.currentSet] + '</h3>');
        }
        // if all the questions have been shown end the game, show results
        else if (trivia.currentSet === Object.keys(trivia.questions).length) {

            // adds results of game (correct, incorrect, unanswered) to the page
            $('#results')
                .html('<h3>Thank you for playing!</h3>' +
                    '<p>Correct: ' + trivia.correct + '</p>' +
                    '<p>Incorrect: ' + trivia.incorrect + '</p>' +
                    '<p>Unaswered: ' + trivia.unanswered + '</p>' +
                    '<p>Please play again!</p>');

            // hide game sction
            $('#game').hide();

            // show start button to begin a new game
            $('#start').show();
        }

