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
