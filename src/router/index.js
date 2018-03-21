import Vue from 'vue'
import Router from 'vue-router'

import store from '@/store'
// import Home from '@/page/Home'
// import Projects from '@/page/Projects'
// import Contact from '@/page/Contact'
// import Services from '@/page/Services'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/page/Home')
    },
    {
      path: '/projects',
      name: 'Projects',
      component: () => import('@/page/Projects')
    },
    {
      path: '/services',
      name: 'Services',
      component: () => import('@/page/Services')
    },
    {
      path: '/contact',
      name: 'Contact',
      component: () => import('@/page/Contact')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/page/Login')
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/*',
      redirect: '/home'
    }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log(to.name)
  // console.log(from.name)
  // console.log(next)
  // console.log(store.state.auth.authenticated)
  if (to.name !== 'Login' && !store.state.auth.authenticated) {
    next({ name: 'Login' })
  } else if (store.state.auth.authenticated && to.name === 'Login') {
    next({
      name: 'Home'
    })
  } else {
    next()
  }
})

Vue.router = router

export default router
