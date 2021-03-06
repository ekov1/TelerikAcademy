import 'jquery';
import Sammy from 'sammy';
import toastr from 'toastr';

import data from 'db/data.js';
import homeController from 'controllers/home-controller.js';
import usersController from 'controllers/users-controller.js';

var sammyApp = Sammy('#content', function () {

    this.get('#/', function (context) {
        context.redirect('#/home');
    });

    this.get('#/home', homeController.show);

    this.get('#/users', usersController.showAll);
    this.get('#/users/register', usersController.showRegisterForm);
});

$(function () {
    $('#loading-message').hide();
    $('#root').toggleClass('hidden');
    $('#container-sign-in').hide();
    $('#container-sign-out').hide();

    if (data.users.hasUser()) {
        $('#container-sign-out').show();

        var loggedUserUsername = localStorage.getItem(data.constants.LOCAL_STORAGE_USERNAME_KEY);
        var message = `Welcome, ${loggedUserUsername}`;
        $('#welcome-message').html(message);

        $('#btn-sign-out').on('click', function () {
            data.users.signOut()
                .then(function () {
                    document.location = '#/';
                    document.location.reload(true);
                });
        });
    } else {
        $('#container-sign-in').show();
        $('#welcome-message').html('');

        $('#btn-sign-in').on('click', function (e) {
            e.preventDefault();
            var user = {
                username: $('#tb-username').val(),
                password: $('#tb-password').val()
            };
            console.log('clicked sign in');
            data.users.signIn(user)
                .then(function (user) {
                    console.log('success');
                    document.location = '#/';
                    document.location.reload(true);
                }, function (errorMessage) {
                    console.log('error2');
                    // $('#container-sign-in').trigger("reset");
                    toastr.error(errorMessage);
                });
        });
    }

    sammyApp.run('#/');
});
