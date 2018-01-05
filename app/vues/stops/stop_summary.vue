<style lang="sass" scoped>
li {
    position: relative;
    padding: 7px 10px 7px 24px;
    span.stop-icon {
        display: inline-block;
        border-left: 2px solid #777;
        position: absolute;
        left: 10px;
        top: 0px;
        height: 100%;
        padding-top: 10px;
        span {
            display: inline-block;
            width: 12px;
            height: 12px;
            border: 2px solid #777;
            border-radius: 10px;
            background-color: white;
            margin-left: -7px;
        }
    }
    &.single {
        span.stop-icon {
            border: none;
        }
    }
    &:nth-child(1) {
        span.stop-icon {
            height: 20px;
            bottom: 0;
            top: auto;
            padding: 0;
            span {
                margin-top: -3px;
            }
        }
    }
    &:last-child {
        span.stop-icon {
            height: 20px;
        }
    }
    &.editing {
        border-top: 1px solid #aaa;
        border-bottom: 1px solid #aaa;
        margin: 0 -10px;
        padding-left: 34px;
        background-color: rgba(200,200,200,.2);
        box-shadow: inset 0px 1px 3px rgba(0,0,0,.2);
        input {
            width: 100%;
            font-size: 10pt;
        }
        span.stop-icon {
            top: 15px;
            left: 20px;
            bottom: auto;
        }
        div.button-group {
            margin-top: 6px;
            button {
                font-size: 9pt;
                padding: 2px 6px;
            }
        }
    }
}
</style>

<template>
    <li v-bind:class=" ( listlength > 1 ? '' : 'single ' ) + ( mode == 'edit' ? 'editing ' : '' ) + 'stop-summary' ">
        <span class="stop-icon" aria-hidden="true"><span></span></span>
        <input v-if="mode == 'edit'" type="text" v-model="model.name" v-bind:placeholder=" model.id ?  $t('stop_name') : $t('new_stop_name') ">
        <div class="button-group" v-if="mode == 'edit'">
            <button @click="saveStop">{{ $t('save_stop') }}</button>
            <button @click="cancelStop">{{ $t('cancel_edit') }}</button>
        </div>
        <span v-else> {{ model.name }} </span>
    </li>
</template>

<script>
    export default {
        props: ['model','listlength'],
        data: function() {
            return {
                mode: ''
            };
        },
        created : function() {
            if ( ! this.model.name ) {
                this.mode = 'edit';
            }
        },
        methods: {
            saveStop() {
                let self = this;
                if ( this.model.name ) {
                    this.model.save().then(() => {
                        this.mode = '';
                    });
                }
                else {
                    console.log( 'Cannot save stop without a name' );
                }
            },
            cancelStop() {
                this.model.revert();
                if ( ! this.model.id ) {
                    this.model.delete();
                }

            }
        },
        components: {
            'stop-editor': require('../stops/stop.vue')
        },
        i18n: {
            messages: {
                en: {
                    stop_name: 'Name of Stop',
                    new_stop_name: 'Name of New Stop',
                    save_stop: 'Save',
                    cancel_edit: 'Cancel'
                }
            }
        },
    };
</script>