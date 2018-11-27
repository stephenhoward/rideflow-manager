const axios   = require('axios');

let refresh_timer = null;

module.exports = {

    login :  (email,password) => {

        return new Promise( (resolve,reject) => {
            let data = JSON.stringify({
                email    : email,
                password : password
            });

            axios.post('/v1/auth/token', data, {
                contentType : 'application/json; charset=utf-8',
            }).then( (response) => {
                set_token(response.data);
                resolve(response.data);

            }).catch( (error) => {
                console.log(error);
                unset_token();
                reject( error.response.status );
            });
        });
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
    },

    reset_password: ( email ) => {

        return new Promise( ( resolve, reject ) => {
            let data = JSON.stringify({
                email: email
            });

            axios.post( '/v1/auth/reset', data, {
                    contentType : 'application/json; charset=utf-8',
            })
                .then( (response) => {
                    resolve(response.data);
                })
                .catch( (error) => {
                    console.log(error);
                    reject( error.response.status );
                });

        });
    }

};

axios.interceptors.request.use( (config) => {
    let jwt = sessionStorage.getItem('jwt');
    if ( jwt ) {
        config.headers['Authorization'] = 'Bearer ' + jwt;
    }
    return config;
});
axios.interceptors.response.use(
    (response) => { return response },
    (error)    => {

        // need to log in:
        if ( error.response && error.response.status == 401 ) {
            window.app.$router.push({ name: 'login', params: { error: error.response.status } });
        }
        return Promise.reject(error);
    }
);

if ( sessionStorage.getItem('jwt') ) {
    set_token( sessionStorage.getItem('jwt') );
}

function refresh_login(timeout) {
    let timer = timeout - Math.floor(Date.now() / 1000) - 20;

    if ( timer > 0 ) {

        refresh_timer = setTimeout( () => {
            axios.get('/v1/auth/token', {} )
                .then( (response) => {
                    set_token(response.data);
                })
                .catch( (error) => {
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

