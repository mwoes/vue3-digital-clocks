import { createRouter, createWebHistory } from "vue-router";
import App from '../App.vue'

const router = createRouter({
  history: createWebHistory('/kiosk/app/'),
  base: '/kiosk/app/',
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../components/ClockFaces.vue"),
    },
    {
      path: "/clock1",
      name: "clock1",
      component: () => import("../clocks/ClockFace1.vue"),
    },
    {
      path: "/clock2",
      name: "clock2",
      component: () => import("../clocks/ClockFace2.vue"),
    },
    {
      path: "/clock3",
      name: "clock3",
      component: () => import("../clocks/ClockFace3.vue"),
    },
    {
      path: "/clock4",
      name: "clock4",
      component: () => import("../clocks/ClockFace4.vue"),
    },
    {
      path: "/clock5",
      name: "clock5",
      component: () => import("../clocks/ClockFace5.vue"),
    },
    {
      path: "/clock6",
      name: "clock6",
      component: () => import("../clocks/ClockFace6.vue"),
    },
  ],
});

export default router;
