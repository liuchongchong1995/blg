import router from '@/router';
import store from '@/store';
import { Message } from 'element-ui';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; 
import getPageTitle from '@/assets/scripts/utils/getPageTitle';


NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ['/500', '/404'];

router.beforeEach(async(to, from, next) => {
    NProgress.start();

    // 设置页面标题
    document.title = getPageTitle(to.meta.title);
 
    // 验证是否登陆
    if(whiteList.indexOf(to.path) !== -1) {
        next();
    }else{
        let hasRoles = store.getters.roles && store.getters.roles.length > 0;

        if (hasRoles) {
            next();
        } else {
            try {
                let { roles } = await store.dispatch('user/getInfo');

                let accessRoutes = await store.dispatch('permission/generateRoutes', roles);

                router.addRoutes(accessRoutes)
                next({ ...to, replace: true });
            } catch (error) { 

                Message.error(error || 'Has Error');
                next(`/`);
                NProgress.done();
            }
        }
        
    }
});

router.afterEach(() => {
    NProgress.done()
});