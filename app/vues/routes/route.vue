<style lang="sass" scoped>
ul {
    list-style-type: none;
    margin: 10px 0;
    padding: 0; 
}
p.adding_stop {
    padding: 4px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #eee;
    font-weight: 300;
    line-height: 1.3;
    width: 100%;
    overflow: hidden;
    button {
        color: #f70;
        font-size: 10pt;
        border: none;
        background: none;
        display: block;
        float: right;
        margin-top: 10px;
    }
}

button.add_stop {
    color: #f70;
    font-size: 10pt;
    border: none;
    background: none;
    display: block;
    padding: 8px;
    margin: 20px 0;
    width: 100%;

}
</style>


<template>
    <div class="route">
        <h2><span aria-hidden="true" class="icon la la-map"></span> 
            <input v-if="mode == 'edit'" type="text" v-model="model.name" v-bind:placeholder=" model.id ? $t('route_name') : $t('new_route_name') ">
            <span v-else >{{ model.name }}</span>
        </h2>
        <select v-if="mode == 'edit'" v-model="model.color">
            <option value="">Select a Color</option>
            <option v-for="color in colors" :value="color">{{ color }}</option>
        </select>

        <ul :class=" 'stops' + ( model.color ? ' route' + model.color : '' ) ">
            <stop-summary :parent_mode="mode" :list="model.stops" v-for="stop in model.stops.array" :key="stop.id" :model="stop"></stop-summary>
            <stop-summary v-if="new_stop" :listlength="1" :model="new_stop"></stop-summary>
        </ul>

        <p v-if="addingStop" class="adding_stop">
            {{ $t('how_to_add_stop') }}
            <button v-on:click="cancelAddStop" type="button">{{ $t("cancel_stop") }}</button>
        </p>

        <button :class="'add_stop' + ( addingStop ? ' hidden' : '')" v-if="mode == 'edit' || ! model.stops || model.stops.length == 0" v-on:click="addStop" type="button" >{{ $t("add_stop") }}</button>
    </div>
</template>


<script>

    export default {
        props: [ 'model','mode' ],
        data: () => {
            return {
                new_stop: null,
                addingStop: false,
                colors: ['Red','Green','Blue','Orange','Yellow','Purple','Pink','Silver','Gold','Gray','Black']
            };
        },
        methods: {
            type: () => { return 'Route' },
            deleteItem() {
                let self = this;

                this.model.delete().then( () => {
                    self.$router.go(-1);
                })
            },
            addStop() {
                let self = this;
                self.addingStop = true;
                self.$map.addStop(this.model).then((stop) => {

                    if ( stop.id ) {
                        self.model.stops.push( stop );
                        self.model.save('stops');
                    }
                    else {
                        self.new_stop = stop;
                        stop.once('model-saved', () => {
                            if ( stop.id ) {
                                self.model.stops.push( stop );
                                self.model.save('stops');
                                self.new_stop = '';
                            }
                        });
                    }
                    self.addingStop = false;
                })
                .catch( () => {
                    // TODO
                });
            },
            cancelAddStop() {
                this.addingStop = false;
                self.new_stop = '';
                this.$map.cancelAddStop();

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