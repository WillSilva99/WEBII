import { createWebHistory, createRouter } from "vue-router";
import ListComponent from "../components/ListComponent.vue";
import Dashboard from "../components/Dashboard.vue";

const routes = [
  {
    path: "/dashboard",
    name: "home",
    component: Dashboard,
  },
  {
    path: "/",
    name: "listar",
    component: ListComponent,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;