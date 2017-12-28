<style lang="sass">
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    -webkit-clip-path: inset(50%);
    clip-path: inset(50%);
    border: 0;
}
.template {
    display: none;
}
html {
    margin: 0;
    padding: 0;
}
body {
    margin: 0;
    padding: 0;
    width: 100%;
    display: grid;
    height: 100%;
    min-height: 100%;
    div.login, div.forgot_password {
        padding: 20px 15px;
        max-width: 300px;
        border: 1px solid #ccc;
        border-radius: 4px;
        align-self: center;
        justify-self: center;
        display: grid;
        grid-columns-template: 1fr;
        grid-row-gap: 8px;
        h3 {
            margin: 0;
        }
        button {
            justify-self: center;
        }
        a {
            display: block;
            justify-self: right;
        }

    }
}
</style>

<template>
    <router-view></router-view>
</template>

<script>
    export default {
      name: 'app',
      data: () => {
        return {};
      }
    };
</script>