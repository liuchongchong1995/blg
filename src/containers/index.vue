<template>
    <div :class="classObj" class="container">
        <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
        <sidebar />
        <div class="c-wrapper">
            <div class="fixed-header">
                <Navbar />
                <tags-view />
            </div>
            <main-body />
        </div>
    </div>
</template>

<script>
    import Sidebar from './components/Sidebar';
    import Navbar from './components/Navbar';
    import TagsView from './components/TagsView';
    import MainBody from './components/MainBody';
    import ResizeMixin from './mixin/ResizeHandler';
    // import { getCurrRemarkCount } from "@/assets/scripts/addredpoint";
    import { mapState } from 'vuex';
    // import { getCountAudit } from "@/assets/api/utils";

    export default {
        name: 'Container',
        components: {
            Sidebar,
            Navbar,
            TagsView,
            MainBody
        },
        mixins: [ResizeMixin],
        data(){
            return{
                countData:{} 
            }
        },
        computed: {
            ...mapState({
                sidebar: state => state.app.sidebar,
                device: state => state.app.device
            }),
            classObj() {
                return {
                    hideSidebar: !this.sidebar.opened,
                    openSidebar: this.sidebar.opened,
                    withoutAnimation: this.sidebar.withoutAnimation,
                    mobile: this.device === 'mobile'
                }
            }
        },
        watch:{
            // 隐藏之后在显示菜单的时候显示有待审核的红点
            // 'sidebar.opened'(val){
            //    if(val){
            //        getCurrRemarkCount();
            //    }
            // }
        },
        // created(){
        //     getCountAudit()
        //         .then(({ data }) => {
        //             this.countData = data;
        //         });
        // },
        methods: {
            handleClickOutside() {
                this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "~@/assets/scss/mixins/mixins.scss";
    @import "~@/assets/scss/variables.scss";

    .c-wrapper {
        position: relative;
        height: 100%;
        @include clearfix;

        &.mobile.openSidebar {
            position: fixed; top: 0;
        }
    }
    .drawer-bg {
        background: #000;
        opacity: 0.3;
        width: 100%;
        top: 0;
        height: 100%;
        position: absolute;
        z-index: 999;
    }
    .fixed-header {
        position: fixed; top: 0; right: 0;
        z-index: 9;
        width: calc(100% - #{$sideBarWidth});
        transition: width 0.28s;
    }
    .fixed-header+.main-body {
        padding-top: 90px;
        min-height: calc(100vh - 90px);
    }

    .hideSidebar .fixed-header {
        width: calc(100% - 54px)
    }
    .mobile .fixed-header {
        width: 100%;
    }
</style>