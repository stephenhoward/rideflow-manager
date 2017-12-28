<style lang="sass" scoped>
li {
    position: relative;
    padding: 7px 10px 7px 24px;
    span.stop-icon {
        display: inline-block;
        border-left: 2px solid black;
        position: absolute;
        left: 10px;
        top: 0px;
        height: 100%;
        padding-top: 8px;
        span {
            display: inline-block;
            width: 12px;
            height: 12px;
            border: 2px solid black;
            border-radius: 10px;
            background-color: white;
            margin-left: -7px;
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
    <li class="stop-summary">
        <span class="stop-icon" aria-hidden="true"><span></span></span> {{ model.name }} Test Text Goes Here
    </li>
</template>

<script>
    export default {
        props: ['model'],
        data: function() {
            return {};
        }
    };
</script>