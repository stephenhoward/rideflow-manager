<script>
    let Route   = require('../../lib/models.js').Route;
    let ListVue = require('../list.vue');

    export default {
        mixins: [ ListVue ],

        methods: {
            type: () => { return Route },
            url:  () => { return '/v1/routes' }
        },
        components: {
            'model-summary': require('./route_summary.vue'),
        },
        i18n: {
            messages: {
                en: {
                    title: 'Routes',
                    add_title: 'Create a Route',
                    nav_back: 'back'
                }
            }
        }
    }
</script>