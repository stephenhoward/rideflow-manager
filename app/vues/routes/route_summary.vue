<style lang="sass" scoped>
    h3 {
        font-size: 14pt;
        font-weight: 400;
        margin: 0;
    }
    span.meta {
        font-size: 10pt;
        color: #999;
    }
</style>

<template>
    <router-link class="route-summary" :to="'/routes/' + model.id" tag="li">
        <h3>{{ model.name }}</h3>
        <span class="meta">{{ model.stops ? model.stops.length : 0 }} {{ $tc('stops', model.stops ? model.stops.length : 0 ) }}</span>
    </router-link>
</template>

<script>
    export default {
        props: ['model'],
        data: function() {
            return {};
        },
        i18n: {
            messages: {
                en: {
                    stops: 'stop | stops'
                }
            }
        }
    };
</script>