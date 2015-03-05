Ext.define('SenchaProj.controller.Login', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            loginView: 'loginview',
            mainMenuView: 'mainmenuview'
        },
        control: {
            loginView: {
                signInCommand: 'onSignInCommand'
            },
            mainMenuView: {
                onSignOffCommand: 'onSignOffCommand'
            }
        }
    },

    // Session token

    sessionToken: null,

    // Transitions
    getSlideLeftTransition: function () {
        return { type: 'slide', direction: 'left' };
    },

    getSlideRightTransition: function () {
        return { type: 'slide', direction: 'right' };
    },

    onSignInCommand: function (view, username, password) {

        console.log('Username: ' + username + '\n' + 'Password: ' + password);

        var me = this,
            loginView = me.getLoginView();

        if (username.length === 0 || password.length === 0) {

            loginView.showSignInFailedMessage('Please enter your username and password.');
            return;
        }

        loginView.setMasked({
            xtype: 'loadmask',
            message: 'Signing In...'
        });

        Ext.Ajax.request({
            url: './services/login.ashx',
            method: 'post',
            params: {
                user: username,
                pwd: password
            },
            success: function (response) {

                var loginResponse = Ext.JSON.decode(response.responseText);

                if (loginResponse.success === "true") {
                    // The server will send a token that can be used throughout the app to confirm that the user is authenticated.
                    me.sessionToken = loginResponse.sessionToken;
                    me.signInSuccess();     //Just simulating success.
                } else {
                    me.signInFailure(loginResponse.message);
                }
            },
            failure: function (response) {
            		Ext.Msg.alert("Log In Fail!!");
                me.sessionToken = null;
                me.signInFailure('Login failed. Please try again later.');
            }
        });
    },

    signInSuccess: function () {
        console.log('Signed in.');
        var loginView = this.getLoginView();
        mainMenuView = this.getMainMenuView();
        loginView.setMasked(false);

        Ext.Viewport.animateActiveItem(mainMenuView, this.getSlideLeftTransition());
    },

    signInFailure: function (message) {
        var loginView = this.getLoginView();
        loginView.showSignInFailedMessage(message);
        loginView.setMasked(false);
    },

    onSignOffCommand: function () {

        var me = this;

        Ext.Ajax.request({
            url: './services/logoff.ashx',
            method: 'post',
            params: {
                sessionToken: me.sessionToken
            },
            success: function (response) {

                // TODO: You need to handle this condition.
            },
            failure: function (response) {

                // TODO: You need to handle this condition.
            }
        });

        Ext.Viewport.animateActiveItem(this.getLoginView(), this.getSlideRightTransition());
    }
});