<template>
    <div class="password_reset">
        <h3>{{ $t('password_reset.title') }}</h3>
        <p>{{ $t('password_reset.instructions') }}</p>
        <div class="error" v-if="error">{{ error }}</div>
        <input type="password" v-bind:placeholder="$t('password_reset.new_password')" v-model="password">
        <input type="password" v-bind:placeholder="$t('password_reset.new_password_again')" v-model="password2">
        <div v-if="password2.length && password != password2">No match</div>
        <div v-else-if="password2.length && password == password2">matches</div>
        <div v-if="password.length">{{ this.strength }}</div>
        <button v-on:click="doReset" type="button">{{ $t('password_reset.go_button') }}</button>
    </div>
</template>

<script>
const authorize = require('../../lib/authorize.js');

export default {
    props    : ['token'],
    data     : () => {
        return {
            error: '',
            password: '',
            password2: '',
        };
    },
    computed: {
        strength: function() {
            if ( ! this.password.length ) {
                return '';
            }

            if ( this.password.length < 8 ) {
                return 'weak';
            }
            else {
                let chars = {};

                this.password.split('').forEach( (c) => {
                    chars[c] = 1;

                } );

                let variety = parseFloat( Object.keys(chars).length ) / parseFloat( this.password.length );

                if ( variety < .4 ) {
                    return 'weak';
                }
                if ( variety < .6 && this.password.length < 12 ) {
                    return 'meh';
                }

                return 'strong';
            }
        }
    },
    created: function() {
        let self = this;

        authorize.check_password_token( this.token )
            .catch( (error) => {
                self.error = self.$i18n.te('password_reset.error_' + error )
                    ? self.$i18n.t( 'password_reset.error_' + error )
                    : error;

                this.$router.push({ name: 'forgot_password', params: { err: this.error } });
            });
    },
    methods : {
        doReset: function() {
            let self = this;

            if ( this.password == this.password2 ) {

                authorize.set_password( this.token, this.password )
                    .then( (response) => {
                        self.$router.push({ name:'login' });
                    })
                    .catch( (error) => {
                        self.error = self.$i18n.te('password_reset.error_' + error )
                            ? self.$i18n.t( 'password_reset.error_' + error )
                            : error;
                    });
            }
        },
    }
};
</script>