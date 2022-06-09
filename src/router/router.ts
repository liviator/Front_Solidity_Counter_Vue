import {createRouter, createWebHistory } from 'vue-router';
import home from '../App.vue';
import Whitelist from '../vues/Whitelist.vue';
import Counter from '../vues/Counter.vue';

const routes = [
    {
        path: '/',
        name:'Home',
        component:Whitelist
    },
    {
      path:'/whitelist',
      name:'Whitelist',
      component:Whitelist
    },
    {
      path:'/counter',
      name:'Counter',
      component:Counter
    }
]


const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;