require('./util.js');

let refresh_timer = null;

module.exports = {

    login :  (email,password) => {

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
    },

    logout: () => {
        unset_token();
    },

    has_token: () => {
        let token =  sessionStorage.getItem('jw_token');

        if ( token ) {
            token = JSON.parse(token);
            if ( token.exp > Math.floor(Date.now() / 1000) ) {
                return true;
            }
        }
        return false;
    }
};

$(function() {

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

