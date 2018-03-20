import Vue from 'vue'
import VueMq from 'vue-mq'

// follow bootstap 4 breakpoints
// https://getbootstrap.com/docs/4.0/layout/overview/#responsive-breakpoints

// Extra small devices (portrait phones, less than 576px)
// No media query since this is the default in Bootstrap

// Small devices (landscape phones, 576px and up)
// @media (min-width: 576px) { ... }

// Medium devices (tablets, 768px and up)
// @media (min-width: 768px) { ... }

// Large devices (desktops, 992px and up)
// @media (min-width: 992px) { ... }

// Extra large devices (large desktops, 1200px and up)
// @media (min-width: 1200px) { ... }

Vue.use(VueMq, {
  breakpoints: {
    xsm: 576,
    sm: 768,
    md: 992,
    lg: 1200,
    xlg: Infinity
  }
})
