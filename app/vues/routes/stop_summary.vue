<template>
    <li class="stop-summary">
        {{ model.name }}
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