import Vue from 'vue';
import Router from 'vue-router';

const Weather = () => import('@/views/weather/Weather.vue');
const Fertilizer = () => import('@/views/fertilizer/Fertilizer.vue');
const Lysimeter = () => import('@/views/lysimeter/Lysimeter.vue');

const Search = () => import('@/views/components/Search.vue');

const Container = () => import('@/views/Container.vue');
const Login = () => import('@/views/Login.vue');

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'container',
      redirect: '/weather',
      component: Container,
      children: [
        { path: '/weather', component: Weather },
        { path: '/search', component: Search },
        { path: '/fertilizer', component: Fertilizer },
        { path: '/lysimeter', component: Lysimeter },
      ],
      beforeEnter: (to, from, next) => {
        const username = sessionStorage.getItem('username');
        const token = sessionStorage.getItem('token');
        if (!username || !token) {
          next({ path: '/login' });
        } else {
          next();
        }
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      props: route => ({ username: route.query.username, password: route.query.password }),
      beforeEnter: (to, from, next) => {
        const username = sessionStorage.getItem('username');
        const token = sessionStorage.getItem('token');
        if (username && token) {
          next({ path: '/' });
        } else {
          next();
        }
      },
    },
  ],
});

export default router;
