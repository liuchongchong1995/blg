
 import Container from '@/containers';

 const assemblyRouter = {
     path: '/assembly',
     component: Container,
     redirect: 'noRedirect',
     name: '组件市场',
     meta: {
         title: '组件市场',
         icon: 'attestation',
         roles: ['1', '4']
     },
     children: [
         {
             path: 'index',
             component: () => import('@/views/assembly/index'),
             name: '组件市场',
             meta: {
                 title: '组件市场',
                 roles: ['1', '4']
             }
         }
     ]
 };
 
 export default assemblyRouter;
 