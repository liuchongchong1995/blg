import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Container from '@/containers'; 

/**
 * 无权限页面
 */
export const constantRoutes = [
    {
        path: '/redirect',
        component: Container,
        hidden: true,
        name: 'redirect',
        children: [
          {
            path: '/redirect/:path(.*)',
            component: () => import('@/views/redirect/index')
          }
        ]
    },
    {
        path: '/404',
        component: () => import('@/views/error/404'),
        hidden: true,
        name: '404',
        meta: {
            title: '404 - 页面找不到'
        }
    },
    {
        path: '/401',
        component: () => import('@/views/error/401'),
        hidden: true,
        name: '401',
        meta: {
            title: '401 - 没有访问权限'
        }
    },
    {
        path: '/500',
        component: () => import('@/views/error/500'),
        hidden: true,
        name: '500',
        meta: {
            title: '500 - 网站错误'
        }
    }
];

/**
 * 有权限页面
 */
export const asyncRoutes = [
    {
        path: '/',
        component: Container,
        redirect: '/dashboard',
        children: [
          {
                path: 'dashboard',
                component: () => import('@/views/dashboard/index'),
                name: 'Dashboard',
                meta: {
                    title: '首页',
                    // icon: 'dashboard',
                    affix: true
                }
          }
        ]
    },  
    // 404 page must be placed at the end !!!
    {
        path: '*',
        redirect: '/404',
        hidden: true
    }
];

const createRouter = () => new VueRouter({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
});

const router = createRouter();

export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher; // reset router
}

export default router;
