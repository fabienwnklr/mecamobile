<template>
    <div>
        <v-row>
            <v-col cols="12" lg="12" xl="12">
                <div>
                    <div>
                        <div>
                            <h2 class="text-h4 font-weight-bold">Services</h2>

                            <h4 class="text-h6">
                                Mécamobile se déplace à votre domicile, sur votre lieu de travail où n'importe ou ailleurs sur Brisous et 20km autour, au-delà
                                frais kilométrique de 2€ par km.
                            </h4>
                        </div>

                        <v-divider class="my-4"></v-divider>

                        <v-row v-if="dataLoaded">
                            <v-col cols="12" md="6" lg="4" v-for="(service, i) in services" :key="i">
                                <div>
                                    <v-card
                                        outlined
                                        :to="`services/${service.link}`"
                                        :min-height="$vuetify.breakpoint.smAndDown ? '' : 500"
                                        :max-height="$vuetify.breakpoint.smAndDown ? '' : 500"
                                        :title="`Afficher les détail du service : ${service.name}`"
                                        class=""
                                    >
                                        <v-toolbar elevation="6" flat height="min-content">
                                            <v-toolbar-title class="">
                                                <v-icon class="custom primary">{{ service.icon }}</v-icon>
                                                {{ service.name }}
                                            </v-toolbar-title>
                                        </v-toolbar>

                                        <v-card-text>
                                            <div class="text-body-1 py-4" v-html="service.description"></div>
                                        </v-card-text>
                                    </v-card>
                                </div>
                            </v-col>
                        </v-row>
                        <v-row v-else>
                            <v-col cols="12" md="6" lg="4" v-for="(service, i) in 8" :key="i">
                                <v-skeleton-loader
                                    v-bind="attrs"
                                    type="card-heading, list-item-two-line ,list-item-three-line, list-item-three-line, list-item-three-line "
                                ></v-skeleton-loader>
                            </v-col>
                        </v-row>
                    </div>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    name: 'Services',
    data: () => ({
        dataLoaded: false,
        services: [],
        attrs: {
            class: 'mb-6',
            boilerplate: true,
            elevation: 2
        }
    }),
    methods: {
        getServices() {
            const that = this;

            this.$http
                .get('/service/full')
                .then(result => {
                    that.services = result.data;
                    that.dataLoaded = true;
                })
                .catch(error => {
                    console.error(error);
                });
        }
    },
    mounted() {
        this.getServices();
    }
};
</script>

<style scoped>
.v-toolbar {
    flex: 0;
    padding: 0.6em;
}
.v-card {
    display: flex !important;
    flex-direction: column;
}

.v-card__text {
    flex-grow: 1;
    overflow: auto;
}
.v-card__text p::nth-last-child {
    margin-bottom: 0;
}

.v-card__text::-webkit-scrollbar {
    width: 10px;
}

/* Track */
.v-card__text::-webkit-scrollbar-track {
    background: none;
}

/* Handle */
.v-card__text::-webkit-scrollbar-thumb {
    background: var(--v-primary-base);
}

/* Handle on hover */
.v-card__text::-webkit-scrollbar-thumb:hover {
    background: var(--v-primary-darken3);
}
</style>
