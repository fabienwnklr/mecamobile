<template>
    <div>
        <div>
            <v-card>
                <v-img
                    src="../assets/camion.jpg"
                    gradient="to top, rgba(25,32,72,.7), rgba(25,32,72,.0)"
                    :height="!$vuetify.breakpoint.smAndUp ? '85vh' : '50vh'"
                >
                    <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center">
                            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                        </v-row>
                    </template>
                    <v-card-text class="fill-height d-flex align-end">
                        <v-row class="flex-column rounded">
                            <v-col cols="12" md="10" lg="8" xl="7">
                                <h1 class="text-h3 py-3 light--text text-h4">MECAMOBILE 40 Entretien, diagnostic et réparations automobile à domicile</h1>
                            </v-col>
                            <v-col class="d-flex align-center">
                                <v-btn color="accent bg-light mr-2 text-caption text-md-button" href="tel:123-456-7890"> Appeler </v-btn>
                                <v-btn color="accent bg-light text-caption text-md-button" to="contact"> Envoyer un email </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-img>
            </v-card>
        </div>

        <v-row>
            <v-col cols="12">
                <div>
                    <div class="pt-16">
                        <h2 class="text-md-h4 font-weight-bold pb-4 text-h5">Présentation de nos services</h2>

                        <v-row class="mt-2" v-if="dataLoaded">
                            <v-col cols="6" sm="6" md="4" lg="3" v-for="(service, i) in services" :key="i">
                                <v-hover v-slot:default="{ hover }" open-delay="50" close-delay="50">
                                    <div>
                                        <v-card flat :elevation="hover ? 12 : 3" hover :to="`services/${service.link}`" class="justify-center">
                                            <v-card-title class="text-h5 justify-center flex-column">
                                                <v-icon color="red" class="black rounded-circle py-2 px-2">{{ service.icon }}</v-icon>
                                                <span class="pt-2 text-body-2 text-sm-h5">{{ service.name }}</span>
                                            </v-card-title>
                                        </v-card>
                                    </div>
                                </v-hover>
                            </v-col>
                        </v-row>
                        <v-row class="mt-2" v-else>
                            <v-col cols="6" sm="6" md="4" lg="3" v-for="(service, i) in 8" :key="i">
                                <v-skeleton-loader type="avatar"></v-skeleton-loader>
                                <v-skeleton-loader width="200" type="list-item"></v-skeleton-loader>
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
    name: 'Home',
    data: () => ({
        dataLoaded: false,
        services: [
            {
                name: 'Pneus',
                to: '/services#pneus',
                icon: 'mdi-car-tire-alert'
            },
            {
                name: 'Freins',
                to: '/services#freins',
                icon: 'mdi-car-brake-alert'
            },
            {
                name: 'Révisions',
                to: '/services#revisions',
                icon: 'mdi-oil'
            },
            {
                name: 'Diagnostique',
                to: '/services#diagnostique',
                icon: 'mdi-engine'
            },
            {
                name: 'Eléctronique',
                to: '/services#electronique',
                icon: 'mdi-flash'
            },
            {
                name: 'Mécanique',
                to: '/services#mecanique',
                icon: 'mdi-engine'
            },
            {
                name: 'Rénovation optique',
                to: '/services#renovations-optique',
                icon: 'mdi-car-parking-lights'
            },
            {
                name: 'Décalaminage',
                to: '/services#decalaminage',
                icon: 'mdi-nuke'
            }
        ]
    }),
    methods: {
        getServices() {
            const that = this;

            this.$http
                .get('/service')
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

<style lang="scss">
.v-skeleton-loader__avatar,
.v-skeleton-loader.v-skeleton-loader--is-loading {
    margin: 0 auto;
}
</style>
