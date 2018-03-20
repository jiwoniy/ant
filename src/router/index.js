import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/Home'
import Projects from '@/page/Projects'
import Contact from '@/page/Contact'
import Services from '@/page/Services'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/projects',
      name: 'Projects',
      component: Projects
    },
    {
      path: '/services',
      name: 'Services',
      component: Services
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    }
  ]
})
