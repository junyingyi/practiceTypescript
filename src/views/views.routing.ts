// views
import { RouteConfig } from 'vue-router';
import demoModule from '@/views/demo/demo.routing';
import enterModule from '@/views/enter/enter.routing';

const routes: RouteConfig[] = [
  {
    name: '',
    path: '',
    redirect: 'enter/supplierEntry',
  },
  {
    name: 'demo',
    path: 'demo',
    children: demoModule,
  },
  {
    name: 'Enter',
    path: 'enter',
    children: enterModule,
  },
  {
    path: '*',
    redirect: 'home',
  },
];

export default routes;
