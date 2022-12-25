import { store } from '@/store';
import Vue from 'vue';
import App from './App.vue';
import {
  Button,
  List,
  Card,
  Avatar,
  Icon,
  Collapse,
  Modal,
  Table,
  Input,
  Form,
  Popover,
  Select,
  DatePicker,
} from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';


Vue.use(Button);
Vue.use(List);
Vue.use(Card);
Vue.use(Avatar);
Vue.use(Icon);
Vue.use(Collapse);
Vue.use(Modal);
Vue.use(Table);
Vue.use(Input);
Vue.use(Form);
Vue.use(Popover);
Vue.use(Select);
Vue.use(DatePicker);

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  store: store,
  render: (h) => h(App),
})
