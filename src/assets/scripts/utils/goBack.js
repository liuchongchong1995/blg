function goBack() {
    this.$store.dispatch('tagsView/delVisitedView', this.$route);
    this.$router.go(-1);
}

export default goBack;