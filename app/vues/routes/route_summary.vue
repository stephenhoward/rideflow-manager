<template>
    <li class="route-summary">
        <router-link :to="'/routes/' + model.id + '/edit'">{{ model.name }}</router-link>
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