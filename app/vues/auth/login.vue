<template>
    <div class="login">
        <h3>{{ $t('login.title') }}</h3>
        <div>{{ err }}</div>
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
        console.log('data');

        return {
            err      : '',
            email    : '',
            password : ''
        };

    },
    created: function() {
        this.err   = this.error || '';
        this.email = this.em || '';
        console.log('created');
    },
    methods : {
        doLogin: function() {
            authorize.login(this.email,this.password)
                .done(() => {
                    this.err = '';
                    window.app.$router.push('/');
                })
                .fail((error) => {
                    this.err = error;
                });
        },
        doLogout: function() {
            authorize.logout();
        }
    }
}
</script>