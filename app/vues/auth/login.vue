<template>
    <div class="login">
        <h3>{{ $t('login.title') }}</h3>
        <div class="error" v-if="err">{{ err }}</div>
        <div><input type="email"    v-bind:placeholder="$t('login.email')"    v-model="email"></div>
        <div><input type="password" v-bind:placeholder="$t('login.password')" v-model="password"></div>
        <button v-on:click="doLogin" type="button">{{ $t("login.login") }}</button>
        <router-link :to="{ name: 'forgot_password', params: { em: this.email }}" >{{ $t("login.forgot_password") }}</router-link>
    </div>
</template>

<script>
const authorize = require('../../lib/authorize.js');

export default {
    props    : ['error','em'],
    data     : () => {

        return {
            err      : '',
            email    : '',
            password : ''
        };
    },
    created: function() {
        this.err   = this.error || '';
        this.email = this.em || '';
    },
    methods : {
        doLogin: function() {
            authorize.login(this.email,this.password)
                .then(() => {
                    this.err = '';
                    window.app.$router.push('/');
                })
                .catch((error) => {
                    this.err = this.$i18n.te('login.error_' + error )
                        ? this.$i18n.t( 'login.error_' + error )
                        : error;
                });
        },
        doLogout: function() {
            authorize.logout();
        }
    }
}
</script>