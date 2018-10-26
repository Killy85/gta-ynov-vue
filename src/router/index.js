import Vue from 'vue';
import FullCalendar from 'vue-full-calendar';
import Router from 'vue-router';
import Employee from '@/components/Employee';
import 'fullcalendar/dist/fullcalendar.min.css';

Vue.use(FullCalendar);
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: Employee,
    },
  ],
});
