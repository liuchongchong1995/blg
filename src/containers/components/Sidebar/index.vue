<template>
    <div class="sidebar">
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <div class="logo-box">
                <div class="hide-logo">
                    <img :src="logo" v-if="!avatar" class="user-avatar">
                    <img :src="avatar+'?imageView2/1/w/80/h/80'" v-if="avatar" class="user-avatar">
                </div>
                <div class="open-logo">
                    <img :src="logo" v-if="!avatar" class="user-avatar">
                    <img :src="avatar+'?imageView2/1/w/80/h/80'" v-if="avatar" class="user-avatar">
                    <p>{{ name }}</p>
                </div>
            </div>
            <el-menu :default-active="activeMenu" :collapse="isCollapse" :unique-opened="true" :background-color="variables.sideBarBgColor" :text-color="variables.sideBarMenuTextColor" :active-text-color="variables.sideBarMenuActiveTextColor" :collapse-transition="false" mode="vertical">
                <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" :id="route.path == '/review'?'_redPointParent':''" />
            </el-menu>
        </el-scrollbar>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex';
    import SidebarItem from './SidebarItem';
    import variables from '@/assets/scss/variables.scss';

    export default {
        name: 'Sidebar',
        components: {
            SidebarItem,
        },
        data() {
            return {
                countData: {},
                logo: require('@/assets/images/default_avatar.jpg')
            }
        },
        computed: {
            ...mapGetters([
                'sidebar',
                'roles',
                'permission_routes',
                'avatar',
                'name'
            ]),
            activeMenu() {
                const route = this.$route;
                const { meta, path } = route;

                if (meta.activeMenu) {
                    return meta.activeMenu;
                }

                return path;
            },
            variables() {
                return variables;
            },
            isCollapse() {
                return !this.sidebar.opened;
            }
        },
        created() { 
            if(this.roles[0] == 1){
                this.logo = require('@/assets/images/kx.jpg');
            }
        },
    }

</script>
<style lang="scss" scoped>
#app {
    .logo-box {
        padding: 20px 0;
        text-align: center;
        border-bottom: 1px solid #263544;
        background-color: rgb(48, 61, 80);
    }

    .openSidebar {
        .logo-box {
            img {
                width:80px;
                height:80px;
                border-radius: 50%;
                margin: 0 auto;
                color: #fff;
            }
            p{
                margin-top:20px;
                line-height: 20px;
                text-align: center;
                color: #fff;
                font-size:14px;
            }
            .hide-logo {
                display: none;
            }
        }
    }

    .hideSidebar {
        .logo-box {
            img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                margin: 0 auto;
                color: #fff;
            }

            .open-logo {
                display: none;
            }
        }
    }
}

.el-menu-item.is-active {
    background-color: rgba(255, 255, 255, 0.05) !important;
    color: red;

    span {
        color: #fff !important;
    }
}

</style>
