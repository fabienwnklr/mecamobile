<template>
    <div>
        <v-navigation-drawer clipped permanent v-model="drawerAdmin" :mini-variant="$vuetify.breakpoint.mdAndDown" app color="primary" dark>
            <v-list nav color="primary">
                <v-list-item v-for="(item, i) in navAdmin" :key="i + 100" :to="item.to">
                    <v-list-item-action>
                        <v-icon>mdi-{{ item.icon }} </v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item @click="logout">
                    <v-list-item-action>
                        <v-icon>mdi-logout</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Se déconnecter</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
export default {
    data: () => ({
        drawerAdmin: true,
        navAdmin: [
            {
                title: 'Retour au site',
                to: '/',
                icon: 'home'
            },
            {
                title: 'Tableau de bord',
                to: '/admin/dashboard',
                icon: 'view-dashboard'
            },
            {
                title: 'Créer un service',
                to: '/admin/services/create',
                icon: 'newspaper-plus'
            },
            {
                title: 'Mes services',
                to: '/admin/services/list',
                icon: 'clipboard-list-outline'
            },
            {
                title: 'Utilisateurs',
                to: '/admin/users',
                icon: 'account-group-outline'
            }
        ]
    }),
    methods: {
        home() {
            if (this.$route.path !== '/') {
                this.$router.push('/');
            }
        },
        logout() {
            localStorage.removeItem('user');
            localStorage.removeItem('jwt');
            this.$router.push('/');
        }
    }
};
</script>
