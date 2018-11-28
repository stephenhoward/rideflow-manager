<template>
    <div class="forgot_password">
        <h3>{{ $t('forgot_password.title') }}</h3>
        <p>{{ $t('forgot_password.instructions') }}</p>
        <div class="error" v-if="error">{{ error }}</div>
        <input type="email" v-bind:placeholder="$t('forgot_password.email')" v-model="email">
        <button v-on:click="doReset" type="button">{{ $t('forgot_password.go_button') }}</button>
        <router-link :to="{ name: 'login', params: { em: this.email }}" >{{ $t("forgot_password.login_link") }}</router-link>
    </div>
</template>

<script>
const authorize = require('../../lib/authorize.js');

export default {
    props    : ['em'],
    data     : () => {
        return {
            error: '',
            email: ''
        };
    },
    created: function() {
        this.email = this.em || '';
    },
    methods : {
        doReset: function() {
            let self = this;

            authorize.reset_password( this.email )
                .then( (response) => {
                    self.$router.push({ name:'reset_sent', params: { email: this.email } });
                })
                .catch( (error) => {
                    self.error = self.$i18n.te('forgot_password.error_' + error )
                        ? self.$i18n.t( 'forgot_password.error_' + error )
                        : error;
                });
        },
    }
};
</script>