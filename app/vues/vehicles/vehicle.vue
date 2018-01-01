<template>
    <div>
        <h2>
            <span aria-hidden="true" class="la la-bus"></span>
            <input v-if="mode=='edit'" type="text" v-model="model.name" v-bind:placeholder=" model.id ? $t('vehicle_name') : $t('new_vehicle_name') ">
            <span v-else> {{ model.name }}</span>
        </h2>
    </div>
</template>

<script>

    export default {
        props: [ 'model','mode'],
        data: () => {
            return {

            };
        },
        i18n: {
            messages: {
                en: {
                    vehicle_name: 'Vehicle Name',
                    new_vehicle_name: 'New Vehicle Name',
                }
            }
        }
    };
</script>