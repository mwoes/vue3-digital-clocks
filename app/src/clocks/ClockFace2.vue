<template>
    <div class="clock-wrapper">
      <div class="clock-base">
        <div class="clock-dial">
          <div v-for="i in 12" :key="i" class="clock-indicator"></div>
        </div>
        <div class="clock-hour"></div>
        <div class="clock-minute"></div>
        <div class="clock-second"></div>
        <div class="clock-center"></div>
      </div>
    </div>
  </template>
  
  <script>
  import { onMounted } from 'vue';
  
  export default {
    name: 'ClockFace2',
    setup() {
      onMounted(() => {
        const now = new Date();
        const hourDeg = now.getHours() / 12 * 360 + now.getMinutes() / 60 * 30;
        const minuteDeg = now.getMinutes() / 60 * 360 + now.getSeconds() / 60 * 6;
        const secondDeg = now.getSeconds() / 60 * 360;
  
        const stylesDeg = [
          `@keyframes rotate-hour{from{transform:rotate(${hourDeg}deg);}to{transform:rotate(${hourDeg + 360}deg);}}`,
          `@keyframes rotate-minute{from{transform:rotate(${minuteDeg}deg);}to{transform:rotate(${minuteDeg + 360}deg);}}`,
          `@keyframes rotate-second{from{transform:rotate(${secondDeg}deg);}to{transform:rotate(${secondDeg + 360}deg);}}`,
        ].join('');
  
        const styleEl = document.createElement('style');
        styleEl.innerHTML = stylesDeg;
        document.head.appendChild(styleEl);
      });
  
      return {};
    },
  };
  </script>
  
  <style scoped>
  html,
  body {
    height: 100%;
    margin: 0;
    padding: 0;
    background-image: linear-gradient(#e7e7e7, #d7d7d7);
  }
  .clock-wrapper {
    position: absolute;
    top: 50%;
    right: 0;
    bottom: 50%;
    left: 0;
    width: 1253px;
    height: 1253px;
    margin: auto;
    padding: 25px;
    background-image: linear-gradient(#f7f7f7, #e0e0e0);
    border-radius: 50%;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15), 0 2px 2px rgba(0, 0, 0, 0.2);
  }
  .clock-base {
    width: 1248px;
    height: 1257px;
    background-color: #eee;
    border-radius: 50%;
    box-shadow: 0 0 5px #eee;
  }
  .clock-dial {
    position: absolute;
    z-index: 1;
    top: 60px;
    left: 60px;
    width: 1128px;
    height: 1010px;
  }
  .clock-dial .clock-indicator {
    position: absolute;
    width: 8px;
    height: 16px;
    margin: 568px 576px;
    background-color: #ddd;
  }
  .clock-indicator:nth-child(1) {
    transform: rotate(30deg) translateY(-586px);
  }
  .clock-indicator:nth-child(2) {
    transform: rotate(60deg) translateY(-586px);
  }
  .clock-indicator:nth-child(3) {
  transform: rotate(90deg) translateY(-586px);
  background-color: #aaa;
}
.clock-indicator:nth-child(4) {
  transform: rotate(120deg) translateY(-586px);
}
.clock-indicator:nth-child(5) {
  transform: rotate(150deg) translateY(-586px);
}
.clock-indicator:nth-child(6) {
  transform: rotate(180deg) translateY(-586px);
  background-color: #aaa;
}
.clock-indicator:nth-child(7) {
  transform: rotate(210deg) translateY(-586px);
}
.clock-indicator:nth-child(8) {
  transform: rotate(240deg) translateY(-586px);
}
.clock-indicator:nth-child(9) {
  transform: rotate(270deg) translateY(-586px);
  background-color: #aaa;
}
.clock-indicator:nth-child(10) {
  transform: rotate(300deg) translateY(-586px);
}
.clock-indicator:nth-child(11) {
  transform: rotate(330deg) translateY(-586px);
}
.clock-indicator:nth-child(12) {
  transform: rotate(360deg) translateY(-586px);
  background-color: #c00;
}
.clock-hour {
  position: absolute;
    z-index: 2;
    top: 443px;
    left: 638px;
    width: 16px;
    height: 260px;
    background-color: #555;
    border-radius: 4px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
    transform-origin: 8px 200px;
    transition: 0.5s;
    animation: rotate-hour 43200s linear infinite;
}
.clock-minute {
  position: absolute;
    z-index: 3;
    top: 345px;
    left: 638px;
    width: 16px;
    height: 340px;
    background-color: #555;
    border-radius: 4px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
    transform-origin: 8px 280px;
    transition: 0.5s;
    animation: rotate-minute 3600s linear infinite;
}
.clock-second {
  position: absolute;
    z-index: 4;
    top: 204px;
    left: 639px;
    width: 8px;
    height: 520px;
    background-color: #a00;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
    transform-origin: 4px 440px;
    transition: 0.5s;
    animation: rotate-second 60s linear infinite;
}
.clock-second:after {
  content: "";
    display: block;
    position: absolute;
    left: -21px;
    bottom: 56px;
    width: 32px;
    height: 32px;
    background-color: #a00;
    border: solid 8px #a00;
    border-radius: 50%;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
}

.clock-center {
    position: absolute;
    z-index: 1;
    width: 600px;
    height: 600px;
    top: 344px;
    left: 344px;
    background-image: linear-gradient(#e3e3e3, #f7f7f7);
    border-radius: 50%;
    box-shadow: inset 0 -1px 0 #fafafa, inset 0 1px 0 #e3e3e3;
}
.clock-center:after {
  content: "";
  display: block;
  width: 80px;
  height: 80px;
  margin: 260px;
  background-color: #ddd;
  border-radius: 50%;
}
</style>