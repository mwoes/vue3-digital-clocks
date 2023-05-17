<template>
  <div class="wrapper">
    <div class="clock">
      <div class="clock-circles">
        <div class="clock-circles__item" v-for="i in 3" :key="i"></div>
        <div class="clock-circles__item">
          <div class="wave" v-for="i in 5" :key="i"></div>
        </div>
      </div>
      <div class="clock-indicators">
        <div class="clock-indicators__item" v-for="i in 8" :key="i"></div>
      </div>
      <div class="clock-times" :class="{ animate: animate }" :style="`--hour: ${hour}; --minute: ${minute}; --second: ${second};`">
        <div class="clock-times__second"></div>
        <div class="clock-times__minute"></div>
        <div class="clock-times__hour"></div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';

let hour = ref(0);
let minute = ref(0);
let second = ref(0);
let animate = ref(false);

let intervalId;

onMounted(() => {
  updateClock();
  intervalId = setInterval(updateClock, 1000);
  setTimeout(() => {
    animate.value = true;
  }, 0);
});

function updateClock() {
  const now = new Date();
  second.value = now.getSeconds() * 6; // 6 degrees per second
  minute.value = (now.getMinutes() + now.getSeconds() / 60) * 6; // 6 degrees per minute
  hour.value = ((now.getHours() % 12) + now.getMinutes() / 60) * 30; // 30 degrees per hour
}

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>



  
<style scoped lang="scss">
* {
  box-sizing: border-box;
}

.wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3fbff;
}

.clock {
  width: 1280px;
  height: 1280px;
  border-radius: 50%;
  position: relative;

  &-circles {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    position: relative;
    font-size: 1280px;
    // box-shadow: 0px 20px 40px 0px rgba(72, 30, 202, 0.3);

    &__item {
      width: 1280px;
      height: 1280px;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 1em;
      height: 1em;
      font-size: 100%;

      &:nth-child(1) {
        background-image: linear-gradient(to bottom,
            #00c0ff,
            #ffcf00,
            #fc4f4f,
            #0e22c3);
        box-shadow: 0px 30px 40px 0px rgba(72, 30, 202, 0.2);
      }

      &:nth-child(2) {
        background-image: linear-gradient(to bottom, #027fff, #491bc9);
        font-size: 95%;
        box-shadow: 0px 10px 20px 0px rgba(42, 17, 121, 0.5);
      }

      &:nth-child(3) {
        font-size: 80%;
        box-shadow: inset 0px 20px 40px rgba(0, 0, 0, 0.1),
          inset 0px 0px 40px rgba(37, 13, 105, 0.55), 0px 5px 0px #5430ff,
          0px -1px 0px 3px rgba(14, 29, 169, 0.35);
      }

      &:nth-child(4) {
        background: #3349c9;
        font-size: 145px;
        box-shadow: inset 0px 0px 10px 0px rgba(0, 0, 0, 0.2),
          inset 0px 0px 20px 1px rgba(54, 21, 148, 0.3);

        .wave {
          position: absolute;
          width: 1em;
          height: 1em;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          border: 1px solid #fff;
          font-size: 100%;

          &:nth-child(1) {
            opacity: 0;
          }

          &:nth-child(2) {
            font-size: 210%;
            opacity: 0.1;
          }

          &:nth-child(3) {
            font-size: 320%;
            opacity: 0.1;
          }

          &:nth-child(4) {
            font-size: 430%;
            opacity: 0.1;
          }

          &:nth-child(5) {
            font-size: 600%;
            opacity: 0.3;
            border-color: #321e9a;
          }
        }
      }
    }
  }
}

.clock-indicators {
  position: absolute;
  width: 80%;
  height: 80%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) rotate(-45deg);
  border-radius: 50%;

  &__item {
    position: absolute;
    left: calc(50% - 2px);
    width: 2px;
    // background: #f4eed7;
    -webkit-transform-origin: bottom center;
    transform-origin: bottom center;
    z-index: 2;
    border-radius: 1px;
    // border-top: 7px solid #fff;
    background: none;
    height: 500px;
    top: 10px;
    opacity: 0.5;

    &:after {
      content: "";
      position: absolute;
      width: 5px;
      height: 22px;
      background: #fff;
      left: 0;
      top: 0;
      border-radius: 10px;
    }

    &:nth-child(1),
    &:nth-child(3),
    &:nth-child(5),
    &:nth-child(7) {
      opacity: 1;
      // border-top: 12px solid #f4eed7;
      width: 8px;

      &:after {
        height: 42px;
        width: 6px;
      }
    }

    @for $i from 1 through 60 {
      &:nth-of-type(#{$i}) {
        transform: rotateZ(calc(45deg * #{$i}));
      }
    }
  }
}

.clock-times {
  position: absolute;
  width: 70%;
  height: 70%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;

  &__second,
  &__minute,
  &__hour {
    position: absolute;
    left: calc(50% - 1px);
    width: 2px;
    background: #f4eed7;
    transform-origin: bottom center;
    top: 5px;
    z-index: 2;
    border-radius: 1px;
    transition: none;
    transform: rotateZ(0deg);
  }

  &__second {
    height: 435px;
    margin-top: 10px;
    animation: time 60s steps(60) infinite;
    transform: rotateZ(var(--second)deg);
    z-index: 3;
    background-image: linear-gradient(to top, #e45753 0%, #ca09e8 100%);
    width: 3px;
    border-radius: 50px;
  }

  &__minute {
    height: 425px;
    margin-top: 20px;
    opacity: 0.75;
    // transform: rotateZ(220deg);
    animation: time 3600s steps(60) infinite;
    transform: rotateZ(var(--minute)deg);
  }

  &__hour {
    height: 415px;
    margin-top: 30px;
    // transform: rotateZ(280deg);
    width: 5px;
    border-radius: 50px;
    box-shadow: 3px 1px 6px -1px rgba(10, 21, 53, 0.45);
    animation: time 43200s steps(12) infinite;
    transform: rotateZ(var(--hour)deg);
  }

  &.animate {
    &__second,
    &__minute,
    &__hour {
      transition: transform 0.5s linear;
    }
  }
}

@keyframes time {
  to {
    transform: rotateZ(360deg);
  }
}
</style>
  