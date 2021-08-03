<template>
  <v-app>
    <AppBar v-if="this.$route.path.match('admin') === null"></AppBar>

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>

    <!-- <Footer v-if="this.$route.path.match('admin') === null"></Footer> -->
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {
    AppBar: () => import("@/components/layout/Appbar.vue"),
    // Footer: () => import("@/components/layout/Footer.vue"),
  },
};
</script>
