<template>
  <div id="app">
    <h1 :class="{ off: lightOff }" @click="toggleLight">
      C<span>LOCK</span>
    </h1>
    <div id="clock">
      <ul id="s" :style="{ transform: `rotateZ(${rotationSecond}deg)` }">
        <li
          v-for="(item, index) in seconds"
          :key="index"
          :class="{ active: item === currentSecond }"
          :style="{ transform: `rotateZ(${calculateRotation(index, 'seconds')}deg) translateX(560px)` }">
          {{ item }}
        </li>
      </ul>
      <ul id="m" :style="{ transform: `rotateZ(${rotationMinute}deg)` }">
        <li
          v-for="(item, index) in minutes"
          :key="index"
          :class="{ active: item === currentMinute }"
          :style="{ transform: `rotateZ(${calculateRotation(index, 'minutes')}deg) translateX(480px)` }"
        >
          {{ item }}
        </li>
      </ul>
      <ul id="h" :style="{ transform: `rotateZ(${rotationHour}deg)` }">
        <li
          v-for="(item, index) in hours"
          :key="index"
          :class="{ active: item === currentHour }"
          :style="{ transform: `rotateZ(${calculateRotation(index, 'hours')}deg) translateX(400px)` }"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  setup() {
    const seconds = Array.from({ length: 60 }, (_, i) => (i < 10 ? "0" + i : i));
    const minutes = Array.from({ length: 60 }, (_, i) => (i < 10 ? "0" + i : i));
    const hours = Array.from({ length: 24 }, (_, i) => (i < 10 ? "0" + i : i));

    const currentSecond = ref(null);
    const currentMinute = ref(null);
    const currentHour = ref(null);

    const rotationSecond = ref(0);
    const rotationMinute = ref(0);
    const rotationHour = ref(0);

    const lightOff = ref(true);

    const toggleLight = () => {
      lightOff.value = !lightOff.value;
    };

    const calculateRotation = (index, type) => {
      let deg = 0;
      if (type === "seconds" || type === "minutes") {
        deg = 6 * index;
      } else if (type === "hours") {
        deg = 15 * index;
      }
      return deg;
    };

    const padTime = (value) => {
      let digit = value < 10 ? "0" + value : value;
      return digit;
    }

    const tick = () => {
      const now = new Date();
      currentHour.value = padTime(now.getHours())
      currentMinute.value = padTime(now.getMinutes())
      currentSecond.value = padTime(now.getSeconds())

      rotationSecond.value = -6 * now.getSeconds();
      rotationMinute.value = -6 * now.getMinutes();
      rotationHour.value = -15 * now.getHours();

      setTimeout(tick, 1000);
    };

    onMounted(tick);

    return {
      seconds,
      minutes,
      hours,
      currentSecond,
      currentMinute,
      currentHour,
      lightOff,
      toggleLight,
      calculateRotation,
      rotationSecond,
      rotationMinute,
      rotationHour,
    };
  }
};
</script>
  
<style scoped>

#app {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
}
*,
*::after,
*::before {
  box-sizing: border-box;
}

body {
  margin: 0;
  width: 100vw;
  height: 100vh;
  background: radial-gradient(circle at 50% 50%, #eeeeee 0%, #333 100%);
  font-family: 'PT Mono';
}

h1 {
  margin: 0;
  font-family: 'Montserrat';
  position: absolute;
  top: 50%;
  left: 50%;
  height: 200px;
  width: 200px;
  ;
  text-align: center;
  line-height: 200px;
  font-size: 200px;
  font-weight: 400;
  color: rgba(230, 230, 230, 1);
  text-shadow: 0 0px 50px rgba(255, 255, 255, .75), 0 0px 150px rgba(255, 255, 255, 0.5), 0 0px 200px rgba(255, 255, 255, 0);
  transform: translate(-55%, -50%);
  transform-origin: 50%;
  cursor: pointer;
  z-index: 100;
  transition: all .25s;
}

h1.off {
  color: transparent;
  text-shadow: 0 1px 1px rgba(255, 255, 255, 0.35), 0 -1px 1px rgba(0, 0, 0, 0.15);
}

h1 span {
  font-size: 30px;
  display: block;
  position: absolute;
  top: 0;
  left: 120px;
}

#clock {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 98vw;
  height: 98vh;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 1
}

h1.off+#clock {
  background-image: linear-gradient(60deg, rgba(255, 255, 255, .05) 0%, rgba(255, 255, 255, 0.7) 40%, rgba(255, 255, 255, 0.5) 45%, rgba(255, 255, 255, .25) 55%, rgba(255, 255, 255, .35) 55.5%, rgba(255, 255, 255, 0.3) 60%, rgba(255, 255, 255, 0.2) 68%, rgba(255, 255, 255, 0.1) 72%, rgba(255, 255, 255, 0.25) 75%, rgba(255, 255, 255, 0) 100%), radial-gradient(circle at 50% 10%, rgba(180, 180, 180, 1) 0%, rgba(140, 140, 140, 1) 80%);
  box-shadow: inset 0 10px 10px 0px rgba(0, 0, 0, 0.35), inset 0 -3px 1px rgba(222, 220, 210, 1), 0 1px 0 1px rgba(255, 255, 255, 0.5), 0 0 0px 10px rgba(222, 98, 0, .3), 0 0 0 11px rgba(255, 255, 255, 0.5), 0 30px 50px 20px rgba(0, 0, 0, 0.5);
}

#clock::after {
  content: '';
  position: absolute;
  border: 1px solid #000;
  width: 240px;
  height: 50px;
  transform-origin: 50%;
  top: 50%;
  left: 70%;
  box-shadow: inset 0 0 20px 0px rgba(255, 255, 255, 1), 0 0 100px 1000px rgba(0, 0, 0, 0.75);
  transition: all .5s;
  transform: translate(120px, -50%)
}

#clock::before {
  content: '';
  position: absolute;
  border: 1px dashed #000;
  border-top: 0;
  border-bottom: 0;
  width: 81px;
  height: 29px;
  right: 0;
  top: 49.5%;
  margin: -5px 93px 0 0;
  animation: pulse 1s infinite;
}

h1.off+#clock::after {
  box-shadow: 0 0 100px 1000px rgba(0, 0, 0, 0), 0 0px 1px rgba(0, 0, 0, 0.25);
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.65) 0%, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0) 60%, rgba(255, 255, 255, .15) 100%);
  border: 1px solid rgba(0, 0, 0, 0);
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 4px;
}

h1.off+#clock::before {
  border: 1px dashed rgba(80, 80, 80, 1);
  border-top: 0;
  border-bottom: 0;
  opacity: 1;
  animation: none;
}

ul {
  position: absolute;
  margin: 0;
  padding: 0;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  list-style: none;
  margin: -10px 0 0 -10px;
}

#s,
#m,
#h {
  transform: rotateZ(0deg);
  transition: all .5s cubic-bezier(0.5, -0.5, 0.500, 1.5);
}

li {
  position: absolute;
  transition: all .25s;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: right;
  opacity: 0.2;
  transform-origin: 50%;
  transition: all .25s linear .25s;
  font-size: 36px;
}


li.active {
  color: #424242;
  opacity: 1;
  font-weight: 700;
  font-size: 42px;
}

@keyframes pulse {

  0%,
  50% {
    opacity: 1
  }

  51%,
  100% {
    opacity: 0
  }
}</style>
  