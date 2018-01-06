<template>
    <div class="forgot_password">
        <h3>{{ $t('forgot_password.title') }}</h3>
        <p>{{ $t('forgot_password.instructions') }}</p>
        <input type="email" v-bind:placeholder="$t('forgot_password.email')" v-model="email">
        <button v-on:click="doReset" type="button">{{ $t('forgot_password.go_button') }}</button>
        <router-link :to="{ name: 'login', params: { em: this.email }}" >{{ $t("forgot_password.login_link") }}</router-link>
    </div>
</template>

<script>

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
            let data = JSON.stringify({
                email: this.email
            });
            axios.post( '/v1/auth/reset', data, {
                    contentType : 'application/json; charset=utf-8',
            })
                .then( (response) => {
                    self.$router.push({ name:'reset_sent', params: { email: this.email } });
                })
                .catch( (error) => {
                    self.error = error.response.status;
                });
        },
    }
};
</script>