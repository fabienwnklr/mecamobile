<template>
    <div>
        <v-navigation-drawer v-if="$vuetify.breakpoint.mdAndDown" v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app color="primary">
            <v-list nav color="primary">
                <v-list-item v-for="(item, i) in barItems" :key="i" link :to="item.to" :href="item.href" :target="item.target">
                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

            <v-col cols="auto" class="text-right">
                <v-switch color="light" append-icon="mdi-theme-light-dark" hide-details v-model="$vuetify.theme.dark"></v-switch>
            </v-col>
        </v-navigation-drawer>

        <v-app-bar app class="primary" :clipped-left="$vuetify.breakpoint.lgAndUp">
            <v-container :fluid="$vuetify.breakpoint.mdAndDown" :class="{ 'px-0': !$vuetify.breakpoint.smAndUp }">
                <v-row align="center" justify="space-between" :no-gutters="!$vuetify.breakpoint.smAndUp">
                    <v-col class="d-flex align-center">
                        <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-if="!$vuetify.breakpoint.lgAndUp" />

                        <v-img @click="home" max-height="90%" max-width="100" style="cursor: pointer" src="@/assets/logo-fond-sombre.svg"></v-img>
                        <v-toolbar-title style="cursor: pointer" class="font-weight-bold text-h5" @click="home">
                            <span class="secondary--text ml-2">Mecamobile</span>
                        </v-toolbar-title>
                    </v-col>

                    <v-col v-if="$vuetify.breakpoint.lgAndUp">
                        <v-btn
                            v-for="(item, i) in barItems"
                            :key="i"
                            text
                            class="text-capitalize mx-1"
                            :to="item.to"
                            exact
                            >{{ item.title }}</v-btn
                        >
                    </v-col>

                    <v-col class="text-right" v-if="$vuetify.breakpoint.mdAndUp">
                        <v-btn
                            v-for="(item, i) in btnItems"
                            :key="i"
                            :outlined="item.outlined"
                            :to="item.to"
                            :href="item.href"
                            :target="item.target"
                            :color="item.color"
                            class="ml-3 text-capitalize"
                        >
                            <v-icon left>{{ item.icon }}</v-icon>
                            {{ item.text }}
                        </v-btn>
                    </v-col>

                    <v-col cols="auto" class="text-right" v-if="$vuetify.breakpoint.mdAndUp">
                        <v-switch color="light" append-icon="mdi-theme-light-dark" hide-details v-model="$vuetify.theme.dark"></v-switch>
                    </v-col>
                </v-row>
            </v-container>
        </v-app-bar>
    </div>
</template>

<script>
export default {
    data: () => ({
        drawer: null,
        btnItems: [
            {
                text: 'Nous contacter',
                to: '/contact',
                target: '',
                color: 'primary',
                icon: 'mdi-email-send-outline'
            }
        ],
        barItems: [
            {
                title: 'Accueil',
                to: '/'
            },
            {
                title: 'Nos services',
                to: '/services'
            },
            {
                title: 'Contact',
                to: '/contact'
            }
        ]
    }),
    methods: {
        home() {
            if (this.$route.path !== '/') {
                this.$router.push('/');
            }
        }
    }
};
</script>
