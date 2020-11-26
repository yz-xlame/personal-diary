/* undone */
<template>
    <div class="clock">
        <div class="clock-panel">
            <div class="plate">
                <div
                    v-for="item in 60"
                    :key="item"
                    :class="`plate-item-${item}`"
                ></div>
            </div>
            <div class="pointer">
                <div class="pointer-item second" :style="{transform: getRotate(second)}"></div>
                <div class="pointer-item minute" :style="{transform: getRotate(minute)}"></div>
                <div class="pointer-item hourse" :style="{transform: getRotate(hourse, 12)}"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Clock',

        data() {
            return {
                second: 0,
                minute: 0,
                hourse: 0,
                timer: null,
            }
        },

        mounted() {
            this.timer = setInterval(this.getCurrentDate, 1000);
        },

        distoryed() {
            clearInterval(this.timer);
        },

        methods: {
            getCurrentDate() {
                const current = new Date();
                this.second = current.getSeconds();
                this.minute = current.getMinutes();
                this.hourse = current.getHours();
            },

            getRotate(timer=0, space=60) {
                return `rotate(${timer == 0? 360: (360 / space * timer)}deg)`;
            }
        }
    }
</script>

<style lang="scss">
    .clock {
        position: relative;
        $panelWidth: 20vw;
        $panelHeight: $panelWidth;

        .plate {
            position: relative;
            width: $panelWidth;
            height: $panelHeight;
            margin: 4rem auto;
            box-shadow: 0 0 1rem 0 rgba(0,0,0,.08);

            @for $i from 1 through 60 {
                .plate-item-#{$i} {
                    position: absolute;
                    top: 0%;
                    right: 50%;
                    width: 1px;
                    height: 1rem;
                    transform: rotate(($i - 1) * 6deg);
                    transform-origin: center $panelWidth/2;
                    background-color: #000;
                }
            }
        }

        .pointer {
            position: absolute;
            top: 50%;
            left: 50%;

            &-item {
                position: absolute;
                width: 1px;
                left: 0;
                bottom: 0;
                background-color: #000;
                transform-origin: center bottom;

                &.second {
                    height: $panelHeight * .46;
                }

                &.minute {
                    height: $panelHeight * .36;
                }

                &.hourse {
                    height: $panelHeight * .26;
                }
            }
        }
    }
</style>
