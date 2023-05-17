<template>
  <canvas ref="canvas" :width="size" :height="size"></canvas>
</template>

<script>
import { onMounted, ref, onUnmounted } from 'vue'

export default {
  setup() {
    const size = 1280;
    const canvas = ref(null);

    const degToRad = (degree) => {
      var factor = Math.PI/180;
      return degree*factor;
    }

    const renderTime = () => {
      var now = new Date();
      var today = now.toDateString();
      var time = now.toLocaleTimeString();
      var hrs = now.getHours();
      var min = now.getMinutes();
      var sec = now.getSeconds();
      var mil = now.getMilliseconds();
      var smoothsec = sec+(mil/1000);
      var smoothmin = min+(smoothsec/60);

      var ctx = canvas.value.getContext("2d");

      ctx.strokeStyle = '#00ffff';
      ctx.lineWidth = 17;
      ctx.shadowBlur= 15;
      ctx.shadowColor = '#00ffff';

      //Background
      var gradient = ctx.createRadialGradient(640, 640, 5, 640, 640, 640);
      gradient.addColorStop(0, "#03303a");
      gradient.addColorStop(1, "black");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);

      //Hours
      ctx.beginPath();
      ctx.arc(640, 640, 600, degToRad(270), degToRad((hrs*30)-90));
      ctx.stroke();

      //Minutes
      ctx.beginPath();
      ctx.arc(640, 640, 510, degToRad(270), degToRad((smoothmin*6)-90));
      ctx.stroke();

      //Seconds
      ctx.beginPath();
      ctx.arc(640, 640, 420, degToRad(270), degToRad((smoothsec*6)-90));
      ctx.stroke();

      //Date
      ctx.font = "50px Helvetica";
      ctx.fillStyle = 'rgba(00, 255, 255, 1)'
      ctx.fillText(today, 400, 640);

      //Time
      ctx.font = "50px Helvetica Bold";
      ctx.fillStyle = 'rgba(00, 255, 255, 1)';
      ctx.fillText(time+":"+mil, 400, 750);
    }

    let interval;

    onMounted(() => {
      interval = setInterval(renderTime, 40);
    });

    onUnmounted(() => {
      clearInterval(interval);
    });

    return { canvas, size };
  },
}
</script>

<style scoped>
body {
  background-color: black;
}
</style>
