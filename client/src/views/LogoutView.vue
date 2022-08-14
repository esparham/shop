<script>
export default {
  name: 'LogoutView',
  mounted() {
    localStorage.removeItem('token');
    this.$store.dispatch('logout');
    this.$router.push('/');
  }
}
</script>