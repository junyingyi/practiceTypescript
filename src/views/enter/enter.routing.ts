import { RouteConfig } from 'vue-router';

// views
const AttractAllot = () => import('@/views/enter/attractAllot/attractAllot.component');
const Activate = () => import('@/views/enter/activate/activate.component');
const SupplierEntry = () => import('@/views/enter/supplierEntry/supplierEntry.component');
const Manage = () => import('@/views/enter/manage/manage.component');
const Applicant = () => import('@/views/enter/applicant/applicant.component');
const Intake = () => import('@/views/enter/intake/intake.component');
const Audit = () => import('@/views/enter/audit/audit.component');
const routes: RouteConfig[] = [
  {
    name: 'AttractAllot',
    path: 'attractAllot',
    component: AttractAllot,
  },
  {
    name: 'Activate',
    path: 'activate',
    component: Activate,
  },
  {
    name: 'SupplierEntry',
    path: 'supplierEntry',
    component: SupplierEntry,
  },
  {
    name: 'Manage',
    path: 'manage',
    component: Manage,
  },
  {
    name: 'Applicant',
    path: 'applicant',
    component: Applicant,
  }, {
    name: 'Intake',
    path: 'intake',
    component: Intake,
  },
  {
    name: 'Audit',
    path: 'audit',
    component: Audit,
  },
];

export default routes;
