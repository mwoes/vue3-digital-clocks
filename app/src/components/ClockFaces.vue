<template>
    <div>
        <transition
        name="rotate"
        enter-active-class="ease enter"
        leave-active-class="ease leave"
      >
        <component
            :is="`ClockFace${state.faceIndex + 1}`"
            v-if="state.faceIndex >= 0 && state.faceIndex < 18"
        ></component>
      </transition>
    </div>
  </template>
  
  <script>
import { inject, reactive, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useGlobalStore } from '@/stores/global';
  
  // Import your ClockFace components here
  import ClockFace1 from '../clocks/ClockFace1.vue';
  import ClockFace2 from '../clocks/ClockFace2.vue';
  import ClockFace3 from '../clocks/ClockFace3.vue';
  import ClockFace4 from '../clocks/ClockFace4.vue';
  import ClockFace5 from '../clocks/ClockFace5.vue';
  import ClockFace6 from '../clocks/ClockFace6.vue';
  // ...
  
  export default {
    setup() {
    const socket = inject('socket')
    const store = useGlobalStore();
    const state = reactive({
      faceIndex: store.faceIndex,
    })
    const route = useRoute();
    console.log(route.query);
    if(route.query?.clockId) {
      state.faceIndex = parseInt(route.query.clockId,10);
    } else {
      console.log(`No fixed clock-face selected, rotating faces enabled`)
    }

    const switchClockFace = (value) => {
        state.faceIndex = (store.faceIndex + 1) % 6;
        store.$patch({ faceIndex: state.faceIndex });
        console.log(`CHANGED CLOCK TO: ${state.faceIndex}`)
    };

    socket.on('pwa', (data) => {
      if (data.topic == "init-cb") {
        console.log(`VALID CONFIG RECEIVED: ${data.payload}`)
        if (typeof data.payload == 'object') store.$patch({ config: data.payload }); else console.log(`config is not an object`)
      }
      if (data.topic == "changeClock" && !route.query?.clockId) {
        switchClockFace();
      }
    })
    return {
      switchClockFace,
      state
    }
    },
    components: {
      // Register your ClockFace components here
      ClockFace1,
      ClockFace2,
      ClockFace3,
      ClockFace4,
      ClockFace5,
      ClockFace6
      // ...
    },
  };
  </script>

  <style scoped>

.rotate-enter-from {
  opacity: 0;
  transform-origin: center;
  transform: rotate(-45deg);
}

.rotate-leave-to {
  opacity: 0;
  transform-origin: center;
  transform: rotate(45deg);
}

.rotate-enter-active,
.rotate-leave-active {
  position: absolute;
  top: 50%;
  left: 50%;
  will-change: opacity, transform;
}

.ease.enter {
  transition: opacity 1s, transform 1s cubic-bezier(0.785, 0.135, 0.15, 0.86);
  transition-delay: 1s;
}

.ease.leave {
  transition: opacity 1s, transform 1s cubic-bezier(0.785, 0.135, 0.15, 0.86);
}
</style>
  