<template>
    <div class="wrapper">
    <figure :style="figureStyle">
      <div class="face top" :style="topFaceStyle">
        <p>{{ hours }}</p>
      </div>
      <div class="face front" :style="frontFaceStyle">
        <p>{{ minutes }}</p>
      </div>
      <div class="face left" :style="leftFaceStyle">
        <p>{{ seconds }}</p>
      </div>
    </figure>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, onUnmounted } from "vue";
  
  export default {
    setup() {
      const hours = ref("00");
      const minutes = ref("00");
      const seconds = ref("00");
      const scale = 755 / 210;
  
      const figureStyle = {
        transform: `scale(${scale}) rotateX(-35deg) rotateY(45deg)`,
        transformStyle: "preserve-3d",
        transition: "2s",
        width: "210px",
        height: "210px",
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: "-105px",
        marginLeft: "-105px",
      };
  
      const faceStyle = {
        width: "100%",
        height: "100%",
        position: "absolute",
        background: "#000",
        textAlign: "center",
      };
  
      const frontFaceStyle = {
        ...faceStyle,
        transform: "translateZ(105px)",
        background: "#111",
      };
  
      const leftFaceStyle = {
        ...faceStyle,
        transform: "rotateY(-90deg) translateZ(105px)",
        background: "#151515",
      };
  
      const topFaceStyle = {
        ...faceStyle,
        transform: "rotateX(90deg) translateZ(105px)",
        background: "#222",
      };
  
      let interval;
  
      onMounted(() => {
        interval = setInterval(() => {
          const now = new Date();
          hours.value = now.getHours().toString().padStart(2, "0");
          minutes.value = now.getMinutes().toString().padStart(2, "0");
          seconds.value = now.getSeconds().toString().padStart(2, "0");
        }, 1000);
      });
  
      onUnmounted(() => {
        clearInterval(interval);
      });
  
      return { hours, minutes, seconds, figureStyle, frontFaceStyle, leftFaceStyle, topFaceStyle };
    },
  };
  </script>

<style scoped>
@font-face {
  font-family: 'Digital-7';
  src: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/184191/Digital-7.eot?#iefix') format('embedded-opentype'),  
  url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/184191/Digital-7.woff') format('woff'), 
  url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/184191/Digital-7.ttf')  format('truetype'), 
  url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/184191/Digital-7.svg#Digital-7') format('svg');
  font-weight: normal;
  font-style: normal;
}

figure {
  position: absolute;
  top: 50%;
  left: 50%;
  transform-style: preserve-3d;
  transition: 2s;
}

.wrapper {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
}

.face {
  position: absolute;
  width: 100%;
  height: 100%;
  text-align: center;
}

p {
  font-size: 180px;
  font-family: 'Digital-7';
  margin-top: 20px;
  color: #2982FF;
  text-shadow: 0px 0px 5px #000;
  animation: color 10s infinite;
  line-height: 180px;
}

.front {
  background: #111;
}

.left {
  background: #151515;
}

.top {
  background: #222;
}

@keyframes color {
  0% { color: #2982ff; text-shadow: 0px 0px 5px #000; }
  50% { color: #cc4343; text-shadow: 0px 0px 5px #ff0000; }
  100% { color: #2982ff; text-shadow: 0px 0px 5px #000; }
}
</style>
