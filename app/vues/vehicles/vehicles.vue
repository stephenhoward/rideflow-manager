<script>
    let Vehicle = require('../../lib/models.js').Vehicle;
    let ListVue = require('../list.vue');

    export default {
        extends: ListVue,

        methods: {
            type: () => { return 'Vehicle' },
        },
        components: {
            'model-summary': require('./vehicle_summary.vue')
        },
        i18n: {
            messages: {
                en: {
                    title: 'Vehicles',
                    add_title: 'Add a Vehicle',
                    nav_back: 'back'
                }
            }
        }
    }

</script>