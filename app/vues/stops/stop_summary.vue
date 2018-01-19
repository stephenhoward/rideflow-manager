<style lang="sass">
ul.stops {

    li {
        position: relative;
        padding: 7px 10px 7px 24px;
        & > div {
            display: flex;
            flex-direction: row;
            &[draggable=true] {
                cursor: move;
            }
        }
        span.click-to-edit {
            cursor: pointer;
        }
        span.stop-icon {
            display: inline-block;
            border-left: 4px solid #777;
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
                margin-left: -8px;
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
        &.dragover {
            border-top: 2px solid #ccc;
            * {
                pointer-events: none;
            }
        }
        span.label {
            display: inline-block;
            flex: 1 1 auto;
        }
        &.editing {
            border-top: 1px solid #aaa;
            border-bottom: 1px solid #aaa;
            margin: 0 -10px;
            padding-left: 34px;
            background-color: rgba(200,200,200,.2);
            box-shadow: inset 0px 1px 3px rgba(0,0,0,.2);
            & > div {
                display: block;
            }
            input {
                width: 100%;
                font-size: 10pt;
            }
            span.stop-icon {
                border: none;
                top: 15px;
                left: 24px;
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
    &.routeRed {
        li span.stop-icon {
            border-color: #f22;
        }
    }
    &.routeGreen {
        li span.stop-icon {
            border-color: #2f2;
        }
    }
    &.routeBlue {
        li span.stop-icon {
            border-color: #22f;
        }
    }
    &.routeOrange {
        li span.stop-icon {
            border-color: #f90;
        }
    }
    &.routeYellow {
        li span.stop-icon {
            border-color: #ee0;
        }
    }
    &.routePurple {
        li span.stop-icon {
            border-color: #0cc;
        }
    }
    &.routePink {
        li span.stop-icon {
            border-color: #faa;
        }
    }
    &.routeSilver {
        li span.stop-icon {
            border-color: #ccc;
        }
    }
    &.routeGold {
        li span.stop-icon {
            border-color: #a90;
        }
    }
    &.routeGray {
        li span.stop-icon {
            border-color: #aaa;
        }
    }
    &.routeBlack {
        li span.stop-icon {
            border-color: #000;
        }
    }
}

</style>

<template>
    <drop tag="li" :class="
        ( list.length == 1 ? 'single '   : '' ) +
        ( mode == 'edit'   ? 'editing '  : '' ) +
        ( dragover == true ? 'dragover ' : '' ) +
        'stop-summary' "

        @dragenter="dragover=true"
        @dragleave="dragover=false"
        @drop="handleDrop">

        <drag :draggable="parent_mode == 'edit' && mode != 'edit' ? true : false" :transferData="{ stop: model }">
        <span class="stop-icon" aria-hidden="true"><span></span></span>
        <input v-if="mode == 'edit'" type="text" v-model="model.name" v-bind:placeholder=" model.id ?  $t('stop_name') : $t('new_stop_name') ">
        <div class="button-group" v-if="mode == 'edit'">
            <button @click="saveStop">{{ $t('save_stop') }}</button>
            <button @click="cancelStop">{{ $t('cancel_edit') }}</button>
        </div>
        <span class="label" v-else> {{ model.name }} </span>
        <span v-if="parent_mode == 'edit' && mode != 'edit'" class="click-to-edit la la-edit" @click="startEdit"></span>
        </drag>
    </drop>
</template>

<script>

    export default {
        props: ['parent_mode','model','list'],
        data: function() {
            return {
                mode: '',
                dragover: false
            };
        },
        created : function() {
            if ( ! this.model.name ) {
                this.startEdit();
            }
        },
        methods: {
            handleDrop(data) {
                if ( data.stop.id != this.model.id ) {
                    this.list.move(data.stop, this.list.indexOf(this.model) );
                }
                this.dragover = false;
            },
            startEdit() {
                this.mode = 'edit';
            },
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
                this.mode = '';

            }
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