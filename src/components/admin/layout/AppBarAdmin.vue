<template>
  <div>
    <v-navigation-drawer v-model="drawer" app color="primary" dark>
      <v-list nav color="primary">
        <v-list-item
          v-for="(item, i) in btnItems"
          :key="i + 100"
          link
          :to="item.to"
          :href="item.href"
          :target="item.target"
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-for="(item, i) in barItems"
          :key="i"
          link
          :to="item.to"
          :href="item.href"
          :target="item.target"
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    btnItems: [
      {
        text: "Retour au site",
        to: "/",
        target: "",
        color: "primary",
        icon: "mdi-arrow-left",
      },
    ],
    barItems: [
      {
        title: "Tableau de bord",
        to: "/admin/dashboard",
      },
      {
        title: "Créer un service",
        to: "/admin/services/create",
      },
      {
        title: "Mes services",
        to: "/admin/services/list",
      },
    ],
  }),
  methods: {
    home() {
      if (this.$route.path !== "/") {
        this.$router.push("/");
      }
    },
  },
};
</script>
