import Vue from 'vue';
import Hello from './app/Hello.vue';

import './index.scss';

export default new Vue({
  el: '#root',
  render: h => h(Hello)
});
