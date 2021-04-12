<template>
    <div class="navbar">
        <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
        <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
        <div class="right-menu">
            <template v-if="device!=='mobile'">
                <screenfull id="screenfull" class="right-menu-item hover-effect" />
            </template>
            <div class="avatar-wrapper">
                <span style="display:block;" @click="logout">
                    退出
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import Hamburger from '@/components/Hamburger';
    import Breadcrumb from '@/components/Breadcrumb';
    import Screenfull from '@/components/Screenfull';

    export default {
        name: 'Navbar',
        components: {
            Hamburger,
            Breadcrumb,
            Screenfull
        },
        computed: {
            ...mapGetters([
                'sidebar',
                'avatar',
                'name',
                'device'
            ])
        },
        methods: {
            toggleSideBar() {
                this.$store.dispatch('app/toggleSideBar');
            },
            async logout() {
                await this.$store.dispatch('user/logout');
                this.$message.success('退出成功！');
                setTimeout(function(){
                    location.reload();
                },300)
            }
        }
    }
</script>

<style lang="scss" scoped>
.navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    border-bottom: 1px solid rgba(0,21,41,0.08);

    .hamburger-container {
        line-height: 46px;
        height: 100%;
        float: left;
        cursor: pointer;
        transition: background .3s;
        -webkit-tap-highlight-color:transparent;

        &:hover {
            background: rgba(0, 0, 0, .025)
        }
    }
    .right-menu {
        float: right;
        height: 100%;
        line-height: 50px;

        .right-menu-item {
            display: inline-block;
            padding: 0 8px;
            height: 100%;
            font-size: 18px;
            color: #5a5e66;
            vertical-align: text-bottom;

            &.hover-effect {
                cursor: pointer;
                transition: background .3s;

                &:hover {
                    background: rgba(0, 0, 0, .025)
                }
            }
        }
    }
    .avatar-wrapper {
        position: relative;
        float:right;
        margin-right: 10px;
        font-size:20px;
        cursor: pointer;
    }
}
</style>