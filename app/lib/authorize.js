/* include util.js */

$(function() {

let refresh_timer = null;

window.LoginVue = {
    template : ht('div.login'),
    props    : ['error','em'],
    data     : () => {

        return {
            email    : '',
            password : ''
        };

    },
    created: function() {
        this.email = this.em || '';
    },
    methods : {
        doLogin: function() {
            login(this.email,this.password)
                .done(() => {
                    this.error = '';

                })
                .fail((error) => {
                    this.error = error;
                });
        },
        doLogout: function() {
            logout();
        }
    },
    i18n: {
        messages: {
            en: {            
                login: {
                  title: 'Please Login',
                  email: 'Email',
                  password: 'Password',
                  login: 'login',
                  forgot_password: 'forgot your password?'
                }
            }
        }
    }
};

window.PasswordForgotVue = {
    template : ht('div.forgot_password'),
    props    : ['em'],
    data     : () => {
        return {
            error: '',
            email: ''
        };
    },
    i18n: {
        messages: {
            en: {            
                forgot_password: {
                    title: 'Forgot your password?',
                    instructions: 'No problem. Enter your email address and we will email you a password reset link.',
                    email: 'your email address',
                    go_button: 'send password reset',
                    login_link: 'back to login'
                }
            }
        }
    },
    created: function() {
        this.email = this.em || '';
    },
    methods : {
        doReset: function() {
            var self = this;
            $.ajax({
                    url         : '/v1/auth/reset',
                    type        : 'POST',
                    contentType : 'application/json; charset=utf-8',
                    data: JSON.stringify({
                        email    : this.email
                    })
                }).done( (data) => {
                    self.$router.push({ name:'reset_sent', params: { email: this.email } });
                }).fail( (xhr) => {
                    var json = JSON.parse(xhr.responseText);
                    self.error = xhr.status;
                });
        },
    }
};

window.PasswordResetSentVue = {
    template: ht('div.password_reset_sent'),
    props: ['email'],
    data: () => { return {} }
};

function login (email,password) {

    var defer = $.Deferred();

    $.ajax({
        url         : '/v1/auth/token',
        type        : 'POST',
        contentType : 'application/json; charset=utf-8',
        data: JSON.stringify({
            email    : email,
            password : password
        })
    }).done( (data) => {
        set_token(data);
        defer.resolve(data);

    }).fail( (xhr) => {
        var json = JSON.parse(xhr.responseText);
        unset_token();
        defer.reject( xhr.status );
    });

    return defer.promise();
}

function refresh_login(timeout) {
    let timer = timeout - Math.floor(Date.now() / 1000) - 20;

    if ( timer > 0 ) {

        refresh_timer = setTimeout( () => {
            $.ajax({
                url  : '/v1/auth/token',
                type : 'GET',
            }).done( (data) => {
                set_token(data);
            }).fail( (xhr) => {
                var json = JSON.parse(data);
                unset_token();
            });
        }, timer * 1000 );
    }
    else {
        unset_token();
    }
}

function logout() {
    unset_token();
}

function set_token(data) {
    sessionStorage.setItem('jwt',data);

    let jw_token = JSON.parse(
        atob( data.split('.')[1].replace('-','+').replace('_','/') )
    );
    sessionStorage.setItem('jw_token', JSON.stringify(jw_token) );
    refresh_login( jw_token.exp );

}
function unset_token() {
        sessionStorage.removeItem('jwt');
        sessionStorage.removeItem('jw_token');
        if ( refresh_timer ) {
            clearTimeout(refresh_timer);
        }
}

$.ajaxSetup({
    beforeSend: (xhr) => {
        let jwt = sessionStorage.getItem('jwt');
        if ( jwt ) {
            xhr.setRequestHeader( 'Authorization', 'Bearer ' + jwt );
        }
    },
    statusCode: {
        401: (xhr,err,error_text) => {
            console.log('need to log in');
            console.log(error_text);
            window.app.$router.push({ name: 'login', params: { error: xhr.status } });
        }
    }
});

if ( sessionStorage.getItem('jwt') ) {
    set_token( sessionStorage.getItem('jwt') );
}

});

function has_token() {
    let token =  sessionStorage.getItem('jw_token');

    if ( token ) {
        token = JSON.parse(token);
        if ( token.exp > Math.floor(Date.now() / 1000) ) {
            return true;
        }
    }
    return false;
}
