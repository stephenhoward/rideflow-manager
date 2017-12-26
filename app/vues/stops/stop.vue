<template>
    <div class="vehicle">
        <a href="#" v-on:click="goBack">&lt; {{ $t("nav_back") }}</a>
        <h3>{{ model.name }}</h3>
        <button v-on:click="editItem" type="button" >{{ $t("edit_me") }}</button>
        <button v-on:click="deleteItem" type="button" >{{ $t("delete_me") }}</button>
    </div>
</template>

<script>
    let ModelVueMixin = require('../../lib/vue_mixins.js').ModelVueMixin;

    export default {
        mixins: [ ModelVueMixin ],
        methods: {
            type: () => { return 'Stop' },
            editItem() {
                this.$router.push('/stops/' + this.model.id + '/edit' );
            },
            goBack() {
                this.$router.go(-1);
            },
            deleteItem() {
                let self = this;

                this.model.delete().done( () => {
                    self.$router.go(-1);
                })
            }
        },
        i18n: {
            messages: {
                en: {
                    edit_me: 'Edit Stop',
                    delete_me: 'Delete Stop',
                    nav_back: 'back'
                }
            }
        }
    };
</script>