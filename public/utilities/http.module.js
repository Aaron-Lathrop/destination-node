'use strict';

//User HTTP Requests

//POST request
function postNewUser(userSignupInfo){
    $.ajax({
        async: true,
        crossDomain: true,
        contentType: "application/json",
        dataType: "json",
        type: "POST",
        url: "/users",
        data: JSON.stringify(userSignupInfo),
        success: function(response){
            loginUser(userSignupInfo);
        }
    });
}

//PUT request
function changePassword(passwordChange){
    const user = getUserAuthenticationFromCache();
    $.ajax({
        async: true,
        headers: {
            "Authorization": `Bearer ${user.jwtToken}`,
            "content-type": "application/json"
        },
        url: `/users/${user.userid}`,
        type: "PUT",
        data: JSON.stringify(passwordChange),
        success: function(){
            alert("Password changed successfully");
        },
        error: function (jqXHR, status, err) {
            console.error(jqXHR, status, err);
        }
    });
}



//Auth HTTP Requests

//POST request
function loginUser(usernameAndPassword){
    $.ajax({
        async: true,
        crossDomain: true,
        headers: {"content-type": "application/json"},
        type: "POST",
        url: "/auth/login",
        data: JSON.stringify(usernameAndPassword),
        success: function(response){
            saveUserAuthenticationIntoCache(response)
            displayDashboard();
            location.reload();
        },
        error: function (jqXHR, status, err) {
            console.error(jqXHR, status, err);
        }
    });
}



//Interview HTTP Requests

//GET request
function getInterviews(callback){
    const user = getUserAuthenticationFromCache();
    $.ajax({
        url: `/interviews`,
        headers: {
            "Authorization": `Bearer ${user.jwtToken}`,
            "content-type": "application/json"
        },
        async: true,
        type: "GET",
        success: function(res){
            if(res.length > 0){
                callback(res);
            } else if(res.length === 0){
                $('header').html(`
                <div class='row'>
                    <div class='col-12'>
                        <h2>Looks like you haven't taken any interiews yet.</h2>
                    </div>
                </div>
                `);
            }            
        }
    });
}

//POST request
function createInterview(){
    const user = getUserAuthenticationFromCache();
    const URL = `/interviews`;
    const data = interviewResponses;
    $.ajax({
        async: true,
        crossDomain: true,
        headers: {
            "Authorization": `Bearer ${user.jwtToken}`,
            "content-type": "application/json"
        },
        dataType: "json",
        type: "POST",
        url: URL,
        data: JSON.stringify(data),
        success: function(){
            displayResponses(data);
        },
    });
}

//PUT request
function updateInterview(index, editedResponse, interviewId){
    const user = getUserAuthenticationFromCache();
    const url = `/interviews/${interviewId}`;
    const data = {
        index,
        editedResponse
    };
    $.ajax({
        async: true,
        crossDomain: true,
        headers: {
            "Authorization": `Bearer ${user.jwtToken}`,
            "content-type": "application/json"
        },
        dataType: "json",
        type: "PUT",
        url: url,
        data: JSON.stringify(data),
        success: function(){
            alert('Response saved');
        }
    });
}

//DELETE request
function deleteInterview(){
    const user = getUserAuthenticationFromCache();
    $(".deleteInterview").click(function(e){
        if(confirm(`Deleting an interview CANNOT be undone and you'll lose this data permanently.\n\nClick OK to PERMANENTLY DELETE your intervew.`)){
            const interviewId = $(e.target).closest('div').attr('id');
            $.ajax({
                url: `/interviews/${interviewId}`,
                headers: {
                    "Authorization": `Bearer ${user.jwtToken}`,
                    "content-type": "application/json"
                },
                async: true,
                type: "DELETE",
                data: JSON.stringify({
                    username: user.username,
                    id: interviewId
                }),
                success: function(){
                    alert(`Interview has been deleted`);
                    $(`#${interviewId}`).addClass('hide');
                }
            });
        }
    });
}



//Question HTTP Requests

//GET request
function getInterviewQuestions(callback){
    $.ajax({
        async: true,
        crossDomain: true,
        url: "/questions",
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        success: function(data){
            storeQuestionsLocally(data);
        }
    });
}