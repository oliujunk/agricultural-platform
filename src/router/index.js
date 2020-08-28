import Vue from 'vue';
import Router from 'vue-router';

const Weather = () => import('@/views/weather/Weather.vue');
const Fertilizer = () => import('@/views/fertilizer/Fertilizer.vue');
const Lysimeter = () => import('@/views/lysimeter/Lysimeter.vue');
const Video = () => import('@/views/video/Video.vue');
const GIS = () => import('@/views/GIS/GIS.vue');

const Container = () => import('@/views/Container.vue');
const Login = () => import('@/views/Login.vue');
const Home = () => import('@/views/home/Home.vue');

const Weather1 = () => import('@/views/weather/Weather.vue');
const Weather2 = () => import('@/views/weather/Weather.vue');
const Weather3 = () => import('@/views/weather/Weather.vue');
const Weather4 = () => import('@/views/weather/Weather.vue');
const Weather5 = () => import('@/views/weather/Weather.vue');
const Weather6 = () => import('@/views/weather/Weather.vue');
const Weather7 = () => import('@/views/weather/Weather.vue');
const Weather8 = () => import('@/views/weather/Weather.vue');
const Weather9 = () => import('@/views/weather/Weather.vue');
const Weather10 = () => import('@/views/weather/Weather.vue');
const Weather11 = () => import('@/views/weather/Weather.vue');
const Weather12 = () => import('@/views/weather/Weather.vue');

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'container',
      redirect: '/home',
      component: Container,
      children: [
        { path: '/weather', component: Weather },
        { path: '/fertilizer', component: Fertilizer },
        { path: '/lysimeter', component: Lysimeter },
        { path: '/video', component: Video },
        { path: '/GIS', component: GIS },
        { path: '/weather1', component: Weather1 },
        { path: '/weather2', component: Weather2 },
        { path: '/weather3', component: Weather3 },
        { path: '/weather4', component: Weather4 },
        { path: '/weather5', component: Weather5 },
        { path: '/weather6', component: Weather6 },
        { path: '/weather7', component: Weather7 },
        { path: '/weather8', component: Weather8 },
        { path: '/weather9', component: Weather9 },
        { path: '/weather10', component: Weather10 },
        { path: '/weather11', component: Weather11 },
        { path: '/weather12', component: Weather12 },
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
      path: '/home',
      name: 'home',
      component: Home,
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
          next({ path: '/home' });
        } else {
          next();
        }
      },
    },
  ],
});

export default router;
