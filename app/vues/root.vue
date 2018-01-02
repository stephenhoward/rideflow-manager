<style lang="sass" scoped>
    div.root {
        display: grid;
        align-self: stretch;
        justify-self: stretch;

        & > button.toggle {
            position: absolute;
            top: 10px;
            right: 10px;
            z-index: 5;
            padding: 6px;
            color: white;
            border: none;
            border: 1px solid rgba(0,0,0,0.2);
            background-clip: padding-box;
            background-color: #fa6;
            border-radius: 6px;
            font-size: 14pt;
            font-weight: 700;
            float: right;
            &:focus {
                outline: none;
            }
        }
        aside {
            position: absolute;
            top: 0px;
            right: 0px;
            z-index: 5;
            padding: 10px;
            width: 250px;
            height: 100%;
            background-clip: padding-box;
            border-left: 2px solid rgba(0,0,0,0.2);
            background-color: rgba(255,255,255,0.85);
            button.toggle {
                color: #aaa;
                box-shadow: none;
                background-color: transparent;
            }
        }
    }
</style>

<template>
    <div class="root">
        <router-view></router-view>
        <routemap></routemap>
    </div>
</template>

<script>
    export default {
        data: () => {
            return {};
        },
        components: {
            routemap: require('./map.vue')
        }
    }
</script>