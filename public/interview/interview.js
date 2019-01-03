'use strict';

let questionNumber = 0;

const interviewQuestions = [];
let interviewResponses = {
    responses: []};

//etc functions

function storeQuestionsLocally(data){
    data.questions.forEach(question => interviewQuestions.push(question));
    displayQuestion(interviewQuestions);
}

function randomQuestion(questions){
    if(interviewQuestions.length > 0){
        let randomNumber = Math.floor(Math.random() * interviewQuestions.length);
        const output = questions.splice(randomNumber,1);
        return output[0];
    } 
    else {
        alert("No more questions");
    }
    
}

function addResponse(){
    interviewResponses.responses.push({
        "questionText": $('#interview').find('label').text(),
        "responseText": $('#interview').find('textarea[name="userResponse"]').val()
    });
}

//button handlers

function answerButtonHandler() {
    $('#interview').submit(function(e){
        e.preventDefault();
        const user = getUserAuthenticationFromCache();
        if(questionNumber < 9 && user.jwtToken !== null){
            addResponse();
            $(displayQuestion());
        } 
        else {
            addResponse();
            $('#mockInterview').html(`
                <section class='container row'>
                    <div class='col-12'>
                        <h3>Thank you for your time, this concludes the interview</h3>
                        <p><span class='center'>Click the review button to review your answers.</span></p>
                    </div>
                </section>
                <button id='reviewButton' class='center'>Review Your Answers</button>`);
            $(reviewButtonHandler());
        }
        let mic = $('#speechinput');
        mic.onfocus = mic.blur;
        mic.onwebkitspeechchange = function(e) {
        $('#userResponse').val() = speechinput.val();
    };
        questionNumber++;
    });
}

function reviewButtonHandler(){
    $("#reviewButton").click(function(){
        questionNumber = 0;
        createInterview();
        interviewResponses = {
            responses: []};
    });
}

function mockStartHandler() {
    $('#mockStart').click(function(){
        $('welcome').toggleClass('hide');
        $('mock').toggleClass('hide');
        $(getInterviewQuestions());
        $('#mockStart').addClass('hide');
    });
}

function reviewAllHandler() {
    $('#review-all').click(function(){

        loadScreen('review');
    });
}