<template>
    <div class="clock" ref="clockEl">
      <div>
        <div class="info date"></div>
        <div class="info day"></div>
      </div>
      <div class="dot"></div>
      <div>
        <div class="hour-hand"></div>
        <div class="minute-hand"></div>
        <div class="second-hand"></div>
      </div>
      <div>
        <span class="h3">3</span>
        <span class="h6">6</span>
        <span class="h9">9</span>
        <span class="h12">12</span>
      </div>
      <div class="diallines" ref="dialLines"></div>
    </div>
  </template>
  
  <script>
  import { onMounted, ref, onBeforeUnmount } from "vue";
  
  export default {
    setup() {
      const clockEl = ref(null);
      const dialLines = ref(null);

      let intervalId = null;
      
      const clock = () => {
        const weekday = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
  
        const d = new Date();
        const h = d.getHours();
        const m = d.getMinutes();
        const s = d.getSeconds();
        const date = d.getDate();
        const month = d.getMonth() + 1;
        const year = d.getFullYear();
  
        const hDeg = h * 30 + m * (360 / 720);
        const mDeg = m * 6 + s * (360 / 3600);
        const sDeg = s * 6;
  
        const hEl = clockEl.value.querySelector(".hour-hand");
        const mEl = clockEl.value.querySelector(".minute-hand");
        const sEl = clockEl.value.querySelector(".second-hand");
        const dateEl = clockEl.value.querySelector(".date");
        const dayEl = clockEl.value.querySelector(".day");
  
        const day = weekday[d.getDay()];
  
        hEl.style.transform = "rotate(" + hDeg + "deg)";
        mEl.style.transform = "rotate(" + mDeg + "deg)";
        sEl.style.transform = "rotate(" + sDeg + "deg)";
        dateEl.innerHTML = date + "/" + month + "/" + year;
        dayEl.innerHTML = day;
      };

      onBeforeUnmount(() => {
        clearInterval(intervalId);
        intervalId = null;
      });
  
      onMounted(() => {
  
        for (let i = 1; i < 60; i++) {
          const dialLine = document.createElement("div");
          dialLine.className = "diallines";
          dialLine.style.transform = "rotate(" + 6 * i + "deg)";
          clockEl.value.appendChild(dialLine);
        }
  
        intervalId = setInterval(clock, 100);
      });
  
      return {
        clockEl,
      };
    },
  };
  </script>

<style>
.clock {
    background: #ececec;
    width: 1280px;
    height: 1280px;
    border-radius: 50%;
    border: 0px solid #333;
    position: absolute;
    top: 18px;
    left: 0;
    box-shadow: 0 2vw 4vw -1vw rgba(0, 0, 0, 0.8);
  }
  
  .dot {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: #ccc;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    position: absolute;
    z-index: 10;
    box-shadow: 0 2px 4px -1px black;
  }
  
  .hour-hand {
    position: absolute;
    z-index: 5;
    width: 16px;
    height: 260px;
    background: #333;
    top: 355px;
    transform-origin: 50% 288px;
    left: 50%;
    margin-left: -8px;
    border-top-left-radius: 50%;
    border-top-right-radius: 50%;
  }
  
  .minute-hand {
    position: absolute;
    z-index: 6;
    width: 16px;
    height: 400px;
    background: #666;
    top: 220px;
    left: 50%;
    margin-left: -8px;
    border-top-left-radius: 50%;
    border-top-right-radius: 50%;
    transform-origin: 50% 420px;
  }
  
  .second-hand {
    position: absolute;
    z-index: 7;
    width: 8px;
    height: 480px;
    background: gold;
    top: 140px;
    left: 50%;
    margin-left: -4px;
    border-top-left-radius: 50%;
    border-top-right-radius: 50%;
    transform-origin: 50% 500px;
  }
  
  span {
    display: inline-block;
    position: absolute;
    color: #333;
    font-size: 88px;
    font-family: 'Poiret One';
    font-weight: 700;
    z-index: 4;
  }
  
  .h12 {
    top: 120px;
    left: 50%;
    margin-left: -36px;
  }
  .h3 {
    top: 560px;
    right: 120px;
  }
  .h6 {
    bottom: 90px;
    left: 49%;
    margin-left: -20px;
  }
  .h9 {
    left: 128px;
    top: 560px;
  }
  
  .diallines {
    position: absolute;
    z-index: 2;
    width: 8px;
    height: 60px;
    background: #666;
    left: 50%;
    margin-left: -4px;
    transform-origin: 50% 640px;
  }
  .diallines:nth-of-type(5n) {
    position: absolute;
    z-index: 2;
    width: 16px;
    height: 100px;
    background: #666;
    left: 50%;
    margin-left: -8px;
    transform-origin: 50% 640px;
  }
  
  .info {
  position: absolute;
  width: 480px;
  height: 80px;
  border-radius: 28px;
  background: #ccc;
  text-align: center;
  line-height: 80px;
  color: #000;
  font-size: 44px;
  top: 800px;
  left: 50%;
  margin-left: -240px;
  font-family: "Poiret One";
  font-weight: 700;
  z-index: 3;
  letter-spacing: 12px;
  margin-left: -240px;
  left: 50%;
}
.date {
    top: 320px;
}
.day {
    top: 800px;
}
</style>