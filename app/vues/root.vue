<style lang="sass" scoped>
    div.root {
        display: grid;
        align-self: stretch;
        justify-self: stretch;

        & > button.toggle {
            position: absolute;
            top: 15px;
            right: 15px;
            z-index: 5;
            padding: 4px 8px;
            box-shadow: 5px 5px 5px rgba(100,100,100,.5);
            color: white;
            border: none;
            background-color: #fa6;
            border-radius: 15px;
            font-size: 14pt;
            font-weight: 700;
            float: right;
            &:focus {
                outline: none;
            }
        }
        aside {
            position: absolute;
            top: 15px;
            right: 15px;
            z-index: 5;
            margin: 15px;
            padding: 10px;
            min-width: 200px;
            box-shadow: 5px 5px 5px rgba(100,100,100,.5);
            border-radius: 8px;
            border: 1px solid #ccc;
            background-color: white;
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