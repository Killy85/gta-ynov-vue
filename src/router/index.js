import Vue from 'vue';
import FullCalendar from 'vue-full-calendar';
import Router from 'vue-router';
import Login from '@/components/Login';
import 'fullcalendar/dist/fullcalendar.min.css';

Vue.use(FullCalendar);
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/components/Employee'),
    },
    {
      path: '/manager',
      name: 'Manager View',
      component: () => import('@/components/Manager'),
    },
    {
      path: '/error',
      name: 'Not available yet',
      component: () => import('@/components/UnderConstruction'),
    },
  ],
});
