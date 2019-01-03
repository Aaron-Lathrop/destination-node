'use strict';

function getUserAuthenticationFromCache() {
    const jwtToken = localStorage.getItem('jwtToken');
    const userid = localStorage.getItem('userid');
    const username = localStorage.getItem('username');
    const firstName = localStorage.getItem('firstName');

    if(jwtToken) {
        return {
            jwtToken,
            userid,
            username,
            firstName
        };
    } else {
        return undefined;
    }
}

function saveUserAuthenticationIntoCache(response) {
    localStorage.setItem('jwtToken', response.jwtToken);
    localStorage.setItem('userid', response.user.id);
    localStorage.setItem('username', response.user.username);
    localStorage.setItem('firstName', response.user.firstName);
}

function deleteUserAuthenticationFromCache() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userid');
    localStorage.removeItem('username');
    localStorage.removeItem('firstName');
}