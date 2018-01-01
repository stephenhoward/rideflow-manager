<style lang="sass" scoped>
ul {
    list-style-type: none;
    margin: 10px 0;
    padding: 0;    
}
</style>


<template>
    <div>
        <h2><span aria-hidden="true" class="icon la la-map"></span> 
            <input v-if="mode == 'edit'" type="text" v-model="model.name" v-bind:placeholder=" model.id ? $t('route_name') : $t('new_route_name') ">
            <span v-else >{{ model.name }}</span>
        </h2>
        <ul>
            <stop-summary v-bind:listlength="model.stops.length" v-for="stop in model.stops" :key="stop.id" :model="stop"></stop-summary>
            <li v-if="addingStop" class="adding_stop">
                {{ $t('how_to_add_stop') }}
                <button v-on:click="cancelAddStop" type="button">{{ $t("cancel_stop") }}</button>
            </li>
        </ul>

        <button v-if="mode == 'edit'" :class="( addingStop ? 'template' : '')" v-on:click="addStop" type="button" >{{ $t("add_stop") }}</button>
    </div>
</template>


<script>

    export default {
        props: [ 'model','mode' ],
        data: () => {
            return {
                addingStop: false
            };
        },
        methods: {
            type: () => { return 'Route' },
            deleteItem() {
                let self = this;

                this.model.delete().done( () => {
                    self.$router.go(-1);
                })
            },
            addStop() {
                this.addingStop = true;
                this.$map.addStopToRoute(this.model).done((marker) => {
                    console.log('got stop');
                });
            },
            cancelAddStop() {

            }
        },
        components: {
            'stop-summary': require ('../stops/stop_summary.vue')
        },
        i18n: {
            messages: {
                en: {
                    delete_me: 'Delete Route',
                    add_stop: 'Add a Stop',
                    cancel_stop: 'Cancel',
                    route_name: 'Name of Route',
                    new_route_name: 'Name of New Route',
                    how_to_add_stop: 'Click the map where you want the stop to be (you can adjust this later)'
                }
            }
        },
    }


</script>