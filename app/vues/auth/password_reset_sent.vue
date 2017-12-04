<i18n>
{
    en: {
        password_reset_sent : {
            title: 'Password Reset Sent',
            description: 'We have sent a link to reset your password to'
        }
    }
}
</i18n>

<template>
    <div class="password_reset_sent">
        <h3>{{ $t('password_reset.title') }}</h3>
        <p>{{ $t('password_reset.check_email') }} {{ model.email }}.</p>
        <router-link :to="{ name: 'login', params: { em: this.email }}" >{{ $t("forgot_password.login_link") }}</router-link>
    </div>
</template>

<script>
export default {
    props: ['email'],
    data: () => { return {} }
};
</script>

