<template>
    <v-app>
        <AppBar v-if="this.$route.path.match('admin') === null"></AppBar>

        <v-main>
            <v-container :fluid="$vuetify.breakpoint.mdAndDown">
                <router-view></router-view>
            </v-container>
        </v-main>

        <Footer v-if="this.$route.path.match('admin') === null"></Footer>
    </v-app>
</template>

<script>
export default {
    name: 'App',
    components: {
        AppBar: () => import('@/components/layout/appbar.vue'),
        Footer: () => import('@/components/layout/footer.vue')
    }
};
</script>

<style>
.custom {
    border-radius: 4px;
    display: inline-flex;
    outline: 0;
    padding: 0 16px;
    height: 36px;
}

body::-webkit-scrollbar {
  width: 10px;
}

/* Track */
body::-webkit-scrollbar-track {
  background: none;
}

/* Handle */
body::-webkit-scrollbar-thumb {
  background: var(--v-primary-base);
}

/* Handle on hover */
body::-webkit-scrollbar-thumb:hover {
  background: var(--v-primary-darken3);;
}
</style>
