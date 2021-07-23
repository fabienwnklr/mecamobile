<template>
  <v-app>
    <AppBarAdmin></AppBarAdmin>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
export default {
  components: {
    AppBarAdmin: () => import("@/components/admin/layout/AppBarAdmin.vue"),
  },
};
</script>
