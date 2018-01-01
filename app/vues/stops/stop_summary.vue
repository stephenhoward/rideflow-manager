<style lang="sass" scoped>
li {
    position: relative;
    padding: 7px 10px 7px 24px;
    &.editing {
        border-top: 1px solid #aaa;
        border-bottom: 1px solid #aaa;
        margin-left: -10px;
        margin-right: -10px;
        background-color: rgba(200,200,200,.2);
        padding-left: 10px;
        h2 {
            margin-top: 0;
        }
    }
    span.stop-icon {
        display: inline-block;
        border-left: 2px solid #777;
        position: absolute;
        left: 10px;
        top: 0px;
        height: 100%;
        padding-top: 10px;
        span {
            display: inline-block;
            width: 12px;
            height: 12px;
            border: 2px solid #777;
            border-radius: 10px;
            background-color: white;
            margin-left: -7px;
        }
    }
    &.single {
        span.stop-icon {
            border: none;
        }
    }
    &:nth-child(1) {
        span.stop-icon {
            height: 20px;
            bottom: 0;
            top: auto;
            padding: 0;
            span {
                margin-top: -3px;
            }
        }
    }
    &:last-child {
        span.stop-icon {
            height: 20px;
        }
    }
}
</style>

<template>
    <li v-bind:class=" ( listlength > 1 ? '' : 'single ' ) + ( model.name ? '' : 'editing ' ) + 'stop-summary' ">
        <div v-if="model.name">
        <span class="stop-icon" aria-hidden="true"><span></span></span> {{ model.name }}
        </div>
        <stop-editor v-else></stop-editor>
    </li>
</template>

<script>
    export default {
        props: ['model','listlength'],
        data: function() {
            return {};
        },
        components: {
            'stop-editor': require('../stops/stop.vue')
        }
    };
</script>