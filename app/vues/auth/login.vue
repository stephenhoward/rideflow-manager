<i18n>
{
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
</i18n>

<template>
    <div class="login">
        <h3>{{ $t('login.title') }}</h3>
        <div>{{ error }}</div>
        <input type="email"    v-bind:placeholder="$t('login.email')"    v-model="email">
        <input type="password" v-bind:placeholder="$t('login.password')" v-model="password">
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
            email    : '',
            password : ''
        };

    },
    created: function() {
        this.email = this.em || '';
        console.log('created');
    },
    methods : {
        doLogin: function() {
            authorize.login(this.email,this.password)
                .done(() => {
                    this.error = '';

                })
                .fail((error) => {
                    this.error = error;
                });
        },
        doLogout: function() {
            authorize.logout();
        }
    }
}
</script>