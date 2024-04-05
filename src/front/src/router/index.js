import { createRouter, createWebHistory } from 'vue-router';

const required_levels = {};
const acces_vacataire = {};

const routes = [
  {
    path: '/',
    name: 'base',
    component: () => import('../layouts/HomeLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        required_level: 1,
        component: () => import('../views/vacataires/index.vue'),
      },
      {
        path: 'vacataire/:id',
        name: 'vacataire',
        acces_vacataire: true,
        required_level: 1,
        component: () => import('../views/vacataires/_id.vue'),
        props: route => ({
          id: route.params.id
        })
      },
      {
        path:'validations/vacataires',
        name: 'validations-vacataires',
        required_level: 2,
        component: () => import('../views/validations/vacataires/index.vue')
      },
      {
        path:'legales/cgu',
        name: 'cgu',
        required_level: 1,
        acces_vacataire: true,
        component: () => import('../views/legales/cgu/index.vue')
      },
      {
        path:'legales/mentions-legales',
        name: 'mentions-legales',
        required_level: 1,
        acces_vacataire: true,
        component: () => import('../views/legales/mentions-legales/index.vue')
      },
      {
        path:'validations/vacataires/:id',
        name: 'validations-vacataires-detail',
        required_level: 2,
        component: () => import('../views/validations/vacataires/_id.vue'),
        props: route => ({
          id: route.params.id
        })
      },
      {
        path:'validations/enseignants',
        name: 'validations-enseignants',
        required_level: 2,
        component: () => import('../views/validations/enseignants/index.vue')
      },
      {
        path: 'users',
        name: 'users',
        required_level: 2,
        component: () => import('../views/users/index.vue')
      },
      {
        path: 'users/:id',
        name: 'users-modif',
        required_level: 2,
        component: () => import('../views/users/_id.vue'),
        props: route => ({
          id: route.params.id
        })
      },
      {
        path: 'competences',
        name: 'competences',
        required_level: 1,
        component: () => import('../views/competences/index.vue')
      },
      {
        path: 'competences/create',
        name: 'competences-create',
        required_level: 2,
        component: () => import('../views/competences/create.vue')
      },
      {
        path: 'competences/modif/:id',
        name: 'competences-modif',
        required_level: 2,
        component: () => import('../views/competences/update.vue'),
        props: route => ({
          id: route.params.id
        })
      },
    ],
  },
  {
    path: '/login',
    component: () => import('../layouts/LoginLayout.vue'),
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('../views/login/index.vue'),
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('../views/register/index.vue'),
      },
    ],
    beforeEnter: (to, from, next) => {
      if (localStorage.user && localStorage.level) {
        next({name: 'vacataire', props: localStorage.userId});
        return;
      }
      next();
      return;
    },
  },
];

for (const item of routes[0]['children']) { 
  required_levels[item['name']] = item['required_level'] || 0; 
  acces_vacataire[item['name']] = item['acces_vacataire'] || false;
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {

  if ((to.name !== 'login' && to.name !== 'register') && (!localStorage.user || !localStorage.level)) {
    next({ name: 'login' });
    return;
  }

  if (localStorage.isVacataire === 'true') {
    if (acces_vacataire[to['name']] === false) {
      next({name: 'vacataire', params: {id:localStorage.userId}});
      return;
    }
  }

  if (required_levels[to['name']]) {
    if (required_levels[to['name']] > localStorage.level) {
      next({name: from['name']});
      return;
    }
  }

  next();
  return;
});

export default router;
