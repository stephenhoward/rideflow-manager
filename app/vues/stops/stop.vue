<template>
    <div>
        <h2>
        <span aria-hidden="true" class="icon la la-map-marker"></span>
            <input v-if="mode == 'edit'" type="text" v-model="model.name" v-bind:placeholder=" model.id ?  $t('stop_name') : $t('new_stop_name') ">
            <span v-else >{{ model.name }}</span>
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
        beforeDestroy() {
            if ( this.marker && ! this.marker.id ) {
                this.marker.remove();
            }
        },
        i18n: {
            messages: {
                en: {
                    new_stop_name: 'Name of New Stop',
                    stop_name: 'Name of Stop',
                }
            }
        }
    };
</script>