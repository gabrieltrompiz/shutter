function $(id) {
    return document.getElementById(id).value;
}

function login() {

    let body = {
        password: `${$('pw')}`
    };

    if(`${$('user').toLowerCase()}`.indexOf('@') > 0)
        body.email = `${$('user').toLowerCase()}`;

    else
        body.lowercaseUsername = `${$('user').toLowerCase()}`;

    console.log(body);

    fetch('./login', {method: 'POST', body: JSON.stringify(body)})
        .then(response => response.json()).then(data => console.log(data))

}

function logout() {
    fetch('./logout').then(response => response.json().then(data => console.log(data)))
}

function signUp() {
    let body = {
        username: 'CHABESXD',
        password: 'chavezesmarico123',
        name: 'Luis',
        lastName: 'Patrulla',
        email: 'aax_00ap@hotmail.com',
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

function forgotPassword() {
    let body = {
        email: 'aax_00ap@hotmail.com'
    };

    fetch('./restoreUser', {method: 'POST', body: JSON.stringify(body)})
        .then(response => response.json()).then(data => console.log(data))


}

function showDashboard() {

}

function editUser() {
    let body = {

    };

    fetch('./edit', {method: 'POST', body: JSON.stringify(body)})
}