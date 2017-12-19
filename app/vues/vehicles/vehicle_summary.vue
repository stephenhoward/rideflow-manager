<template>
    <li class="vehicle-summary">
        <router-link :to="'/vehicles/' + model.id ">{{ model.name }}</router-link>
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