<template>
    <div
        :class="[
            'drop-down',
            {
                'slot-left': $slots['left-icon'],
                'slot-right': $slots['right-icon']
            }
        ]"
    >
        <!-- left slot icon -->
        <template v-if="$slots['left-icon']">
            <div class="drop-down__icon drop-down__icon-left">
                <slot name="left-icon"></slot>
            </div>
        </template>
        <!-- input -->
        <input
            type="text"
            v-model="newValue"
            :autofocus="isAutoFocus"
            :autocomplete="isAutoComplete"
            :maxlength="maxLength"
            :minlength="minLength"
            :disabled="isDisabled"
            :placeholder="placeholder"
            class="drop-down__input"
        >
        <!-- options -->
        <div
            v-if="fetchQuery"
            v-show="isDisplayOptions"
            class="drop-down__options"
        >
            <ul class="drop-down__options-list">
                <li
                    v-for="(option, index) in options"
                    :key="index"
                    class="drop-down__options-list-item"
                    @click="clickOption(index)"
                >
                    {{ option.value }}
                </li>
            </ul>
        </div>
        <!-- right slot icon -->
        <template v-if="$slots['right-icon']">
            <div class="drop-down__icon drop-down__icon-right">
                <slot name="right-icon"></slot>
            </div>
        </template>
    </div>
</template>

<script>
    export default {
        name: 'DropDown',

        model: {
            prop: 'value',
            event: 'change'
        },

        props: {
            isAutoFocus: {
                type: Boolean,
                default: false
            },
            isAutoComplete: {
                type: Boolean,
                default: false
            },
            isDisabled: {
                type: Boolean,
                default: false
            },
            maxLength: {
                type: Number,
                default: 80
            },
            minLength: {
                type: Number,
                default: 0
            },
            value: {
                type: String,
                default: ''
            },
            placeholder: {
                type: String,
                default: ''
            },
            fetchQuery: {
                type: Function,
                default: null
            }
        },

        watch: {
            newValue(value) {
                this.$emit('change', value);
                this.changeValueAfter();
            }
        },

        data() {
            return {
                newValue: '',
                options: [],
                isDisplayOptions: false,
                isLockQuery: false,
            }
        },

        methods: {
            changeValueAfter() {
                if (this.fetchQuery) {
                    !this.isLockQuery && this.fetchOptions();
                }
            },

            fetchOptions() {
                this.fetchQuery(this.newValue).then(data => {
                    this.options = data;
                    this.isDisplayOptions = true;
                })
            },

            clickOption(index) {
                const selected = this.options[index];
                this.isDisplayOptions = false;
                this.isLockQuery = true;
                this.newValue = selected.value;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .drop-down {
        margin: 20px;
        position: relative;
        display: inline-block;
        width: 12rem;
        font-size: .875rem;

        /* input */
        $input-height: 2.5rem;

        &__input {
            padding: 0 1rem;
            display: inline-block;
            width: 100%;
            color: $black;
            line-height: $input-height;
            border-radius: 4px;
            background-color: $white;
            border: 1px solid $light-blue;
            outline: none;
            box-sizing: border-box;

            &:hover {
                border-color: $hover-blue;
            }

            &:focus {
                border-color: $focus-blue;
            }
        }

        &.slot-left &__input {
            padding-left: 2rem;
        }

        &.slot-right &__input {
            padding-right: 2rem;
        }

        /* options */
        &__options {
            margin: .75rem 0 .5rem;
            position: absolute;
            top: $input-height;
            left: 0;
            width: 100%;
            border: 1px solid #e4e7ed;
            border-radius: 2px;
            box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
            z-index: 10;

            &-list {
                width: 100%;
                max-height: $input-height*3.5;
                overflow-y: scroll;
                @extend %hidden-scroll-bar;

                &-item {
                    padding: 0 1rem;
                    width: 100%;
                    line-height: $input-height;
                    background-color: #fff;
                    box-sizing: border-box;

                    &:hover {
                        font-weight: bold;
                        background-color: $hover-blue;
                    }
                }
            }
        }

        /* icon */
        &__icon {
            position: absolute;
            top: 0;
            width: 2rem;
            height: 100%;
            color: $gray;
            overflow: hidden;
            text-align: center;
            pointer-events: none;
        }
    }
</style>
