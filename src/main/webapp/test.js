function $(id) {
    return document.getElementById(id).value;
}

function login() {  //Login

    let body = {
        password: `${$('pw')}`
    };

    if(`${$('user').toLowerCase()}`.indexOf('@') > 0)
        body.email = `${$('user').toLowerCase()}`;

    else
        body.lowercaseUsername = `${$('user').toLowerCase()}`;

    console.log(body);

    fetch('./session', {method: 'POST', body: JSON.stringify(body)})
        .then(response => response.json()).then(data => console.log(data))

}

function logout() {  //Logout
    fetch('./session').then(response => response.json().then(data => console.log(data)))
}

function signUp() {  //SignUp
    let body = {
        username: 'admin',
        password: 'admin',
        name: 'Luiso',
        lastName: 'Petralleta',
        email: 'chabesbibe@hotmail.com',
        birthday: new Date(1999, 10, 26),
        creationTime: Date.now(),
        avatar: '/avatar.jpg',
        typeId: 1,
        sex: true,
        enabled: true
    };
    body.lowercaseUsername = body.username.toLowerCase();

    fetch('./register', { method: 'POST', body: JSON.stringify(body) })
        .then(response => response.json()).then(data => console.log(data))
}

function forgotPassword() {  //Not implemented
    let body = {
        email: 'aax_00ap@hotmail.com'
    };

    fetch('./restoreUser', {method: 'POST', body: JSON.stringify(body)})
        .then(response => response.json()).then(data => console.log(data))


}

function showDashboard() {  //Dashboard
    fetch("./register").then(response => response.json()).then(data => console.log(data));
}

function editUser() {  //Edit
    let body = {

    };

    fetch('./edit', {method: 'POST', body: JSON.stringify(body)})
}