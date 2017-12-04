<i18n>
{
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
</i18n>

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
</script>