import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import './assets/tailwind.css';

// permission
import routerExtra from './permission';

// plugins
import './plugins/vue-sweetalert2';
import './plugins/dayjs';
import './plugins/font-awesome';
import './plugins/vue-meta';
import './plugins/vee-validate';
import './plugins/v-calender';
import './plugins/uuid';
import './plugins/vue-month-picker';

// filters
import './filters';

// axios services
import './assets/api/index';

// animate.css
import 'animate.css';

// global components
import './components/general/general';

// directive
import vRipple from './directives/vRipple';
import clickOutside from './directives/COS';
import toFixed from './directives/toFixed';

// utils
// import toolkit from './utils/index';

routerExtra(router, store);

Vue.directive('ripple', vRipple);
Vue.directive('clickOutside', clickOutside);
Vue.directive('toFixed', toFixed);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
