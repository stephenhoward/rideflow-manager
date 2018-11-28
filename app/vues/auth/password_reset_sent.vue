<template>
    <div class="password_reset_sent">
        <h3>{{ $t('password_reset_sent.title') }}</h3>
        <p>{{ $t('password_reset_sent.check_email') }} {{ this.email }}.</p>
        <router-link :to="{ name: 'login', params: { em: this.email }}" >{{ $t("forgot_password.login_link") }}</router-link>
    </div>
</template>

<script>
export default {
    props: ['email'],
    data: () => { return {} }
};
</script>

