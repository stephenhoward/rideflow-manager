<template>
    <li class="vehicle-summary">
        <router-link :to="'/vehicles/' + model.id + '/edit'">{{ model.name }}</router-link>
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