<template>
  <main>
    <BackPrevRoute></BackPrevRoute>
    <AppBarAdmin v-if="$route.name !== 'Login'"></AppBarAdmin>
    <router-view></router-view>
  </main>
</template>

<script>
export default {
  components: {
    AppBarAdmin: () => import("@/components/admin/layout/AppBarAdmin.vue"),
    BackPrevRoute: () => import("@/components/admin/BackPrevRoute.vue"),
  },

  methods: {
    detectUser() {
      try {
        const jwt = localStorage.getItem("jwt");
        const user =
          localStorage.getItem("user") !== null
            ? JSON.parse(localStorage.getItem("user"))
            : null;
        const _this = this;
        if (jwt !== null && user !== null) {
          this.$http(`/user/${user.id}`)
            .then(() => {
              _this.$http("/checkToken").catch((err) => {
                console.error(err);
                _this.$router.push({ name: "Login" });
                localStorage.removeItem("user");
                localStorage.removeItem("jwt");
              });
            })
            .catch((err) => {
              console.error(err);
              _this.$router.push({ name: "Login" });
              localStorage.removeItem("user");
              localStorage.removeItem("jwt");
            });
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  updated() {
    this.detectUser();
  },
};
</script>
