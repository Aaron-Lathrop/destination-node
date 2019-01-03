'use strict';

function handleNav(){
    $('li').unbind().click(function(event){
        let go = event.target.id
        loadScreen(go);
    });
}

function loadScreen(screen){
    let html;
        if(screen === 'home'){
            $('header').removeClass('hide');
            html = loadHome();
        } else if(screen === 'practice'){
            $('header').addClass('hide');
            html = loadPractice();
        } else if(screen === 'register'){
            $('header').addClass('hide');
            html = loadRegister();
        } else if(screen === 'signin'){
            $('header').addClass('hide');
            html = loadSignIn();
        } else if (screen === 'account'){
            $('header').addClass('hide');
            html = loadAccount();
        } else if(screen === 'logout'){
            $('header').addClass('hide');
            deleteUserAuthenticationFromCache();
            html = loadLogout();
            location.reload();
        } 
        $('main').html(html);
        if(screen ==='review'){
            $('header').addClass('hide');
            loadReview();
        }
        $(document).ready($(onPageLoad()));
}

function getStartedHandler(){
    $('#get-started').click(function(){
        loadScreen('signin');
    });
}

function loadHome(){
    // $('header').html(`<h1><span class="js-username-dash"></span></h1>
    // <h2>Practice makes perfect. <br>Feel more confident.</h2>`);
    return `
    <section class="row">
        <div class="container col-12">
                <h2>Getting Started with Interview Prep</h2> 
                <p>The Practice section let's you take a 10 question interview consisting of common questions you'll likely encounter during an actual interview.</p> 
                <p>Want to look over the questions you've already answered? Head over the Review section to view and edit past interviews.</p>
                <p>Click on Account to change your password.</p> 
                <p>We know that the job search and interviewing is stressful. Interview Prep is here to help you practice and feel more confident. Don't worry, you are going to be fine.</p>
        </div>
    </section>`;
}

function loadPractice(){
    return `
    <h1>Mock Interview</h1>
    <div id="mockInterview" class='center-text' role="alert" aria-live="polite">
        <div class='container limitWidth'>
            <p>You're about to start a 10 question mock interview.</p> 
            <p>Questions will be delivered in a random order and your responses will be saved for later review.</p>
            <p>This is Rupert, he'll be your interviewer for the day. Good luck!</p>
            <img id="interviewAvatar" class="center" src="/Interview_avatar.png">
        </div>
        <button id='mockStart' class='center'>Start Interview</button>
    </div>`;
}

function loadRegister(){
    return `
    <div class="row">
        <div class="col-12 center-text">
            <p>Try a demo of this interview app!</p>
            <p>Username: demo</p>
            <p>Password: demo123456</p>
        </div>
    </div>

        <div class="row">
            <div class="col-12">
                <form id="signup" name="signup" class="center">
                    <fieldset>
                        <legend>SIGN UP</legend>
                        <label for="firstName">First Name*</label>
                        <input type='text' name='firstName' placeholder="First Name" required>
                        <label for="lastName">Last Name*</label>
                        <input type="text" name='lastName' placeholder="Last Name" required>
                        <label for="username">Username*</label>
                        <input type="text" name='username' placeholder="Username" required>
                        <label for="password">Password*</label>
                        <input type="password" name='password' placeholder="Password" required>
                        <button id='signupButton' class='center' type="submit">SIGN UP</button>
                        <p>*Already have an account? <span class='js-show-login-signup'>Log in</span></p>
                    </fieldset>
                </form>
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <form id="login" name="login" class="hide center">
                    <fieldset>
                        <legend>LOG IN</legend>
                        <label for="login-username">Username*</label>
                        <input type="text" name='login-username' placeholder="Username">
                        <label for="login-password">Password*</label>
                        <input type="password" name='login-password' placeholder="Password">
                        <button id='loginButton' class='center' type="submit">LOG IN</button>
                        <p>*Don't have an account? <span class='js-show-login-signup'>Sign up</span></p>
                    </fieldset>
                </form>
            </div>
        </div>`;
}

function loadSignIn(){
    return `
    <div class="row">
        <div class="col-12 center-text">
            <p>Try a demo of this interview app!</p>
            <p>Username: demo</p>
            <p>Password: demo123456</p>
        </div>
    </div>
        <div class="row">
            <div class="col-12">
                <form id="login" name="login" class="center">
                    <fieldset>
                        <legend>LOG IN</legend>
                        <label for="login-username">Username*</label>
                        <input type="text" name='login-username' placeholder="Username">
                        <label for="login-password">Password*</label>
                        <input type="password" name='login-password' placeholder="Password">
                        <button id='loginButton' class='center' type="submit">LOG IN</button>
                        <p>*Don't have an account? <span class='js-show-login-signup'>Sign up</span></p>
                    </fieldset>
                </form>
            </div>
        </div>

        <div class="row">
            <div class="col-12">
            <form id="signup" name="signup" class="hide center">
            <fieldset>
                <legend>SIGN UP</legend>
                <label for="firstName">First Name*</label>
                <input type='text' name='firstName' placeholder="First Name">
                <label for="lastName">Last Name</label>
                <input type="text" name='lastName' placeholder="Last Name" required>
                <label for="username">Username*</label>
                <input type="text" name='username' placeholder="Username" required>
                <label for="password">Password*</label>
                <input type="password" name='password' placeholder="Password" required>
                <button id='signupButton' class='center' type="submit">SIGN UP</button>
                <p>*Already have an account? <span class='js-show-login-signup'>Log in</span></p>
            </fieldset>
        </form>
            </div>
        </div>`;
}

function loadLogout(){
    $('html').css("background-image", "url(https://images.unsplash.com/photo-1518110516893-31ce851decb0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b8757e7de4ecb8fb79654a5a2e9cc25d&auto=format&fit=crop&w=750&q=80)");
    return `
    <section class='row'>
        <div class="container col-12">
            <h1>Logging out</h1>
        </div>
    </section>`;
}

function loadAccount(){
    return `
    <div class="row">
        <div class="col-12">
            <form id="change-password" name="change-password" class="center">
                <fieldset>
                    <legend>Change Password</legend>
                    <label for="currentPassword">Current Password</label>
                    <input type="password" name='currentPassword' placeholder="password">
                    <label for="newPassword">New Password*</label>
                    <input type="password" name='newPassword' placeholder="new password">
                    <label for="confirmPassword">Re-enter Password*</label>
                    <input type="password" name='confirmPassword' placeholder="re-enter password">
                    <button class='center' type="submit">Change Password</button>
                </fieldset>
            </form>
        </div>
    </div>
    `;
}

function loadReview(){
    $('main').html(`
    <h1>Review</h1>
    <section id="mockInterview" class='center-text' class="row">
            <div class="container limitWidth">
                <p>It looks like you haven't completed any interviews yet. Once you complete an interview, you can come back here to review the questions and answers or delete any interviews you no longer wish to keep.</p>
                <p>You can start an interview by clicking the button below or by clicking "Practice" above.</p>
            </div>
    </section>
    <button id='mockStart' class="center">Start Interview</button>`);
    getAndDisplayInterviewCards();
}

//Interview display functions

function displayQuestion(){
    $('#mockInterview').html(`
        <form id='interview' name='interview' autocomplete='off'>
            <div class="row">
                <img id="interviewAvatar" class="center" src="/Interview_avatar.png">
            </div>
            <div class="row">
                <label class='interviewQuestion col-12'><span>${randomQuestion(interviewQuestions).questionText}</span></label>
            </div>
            <div class="row">
                <textarea class="col-12" id='userResponse' rows='10' cols='75' wrap='hard' placeholder='Type your response...' name='userResponse' autofocus required></textarea>
            </div>
            <div class="row">
                <button id='answerButton' class="center" type='submit' value='Answer'>Answer</button>
            </div>
        </form>`);
    answerButtonHandler();
}

function getAndDisplayQuestions(){
    getInterviewQuestions(displayQuestion);
}

function displayResponses(data, interviewId) {
    $('main').html(`<h1>Here are your responses</h1><br>
    <button id='review-all' class='center'>Review All</button><section id="display-responses" class="row"></section>`)
    for (let i=0; i < data.responses.length; i++){
        $('#display-responses').append(
            `<div id='${interviewId}' class="response-container col-12">
                <p><strong><span id='questionText${i}'> ${data.responses[i].questionText}</span></strong></p>
                <p><span id='responseText${i}'> ${data.responses[i].responseText}</span></p>
                <button id=${i} class="edit center">Edit</button>
             </div>
             `
             
        );
    }
    $(reviewAllHandler);
}