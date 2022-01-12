<template>
    <div>
        <v-row>
            <v-col cols="12" lg="12" xl="12">
                <div>
                    <div>
                        <div>
                            <h2 class="text-h4 font-weight-bold">Service</h2>

                            <h4 class="text-h6">Détail du service : {{ service.name }}.</h4>
                        </div>

                        <v-divider class="my-4"></v-divider>

                        <v-row>
                            <v-col cols="12">
                                <div>
                                    <v-card outlined>
                                        <v-card-title class="light">
                                            <v-icon class="custom primary white--text">{{ service.icon }}</v-icon>
                                            <h2 class="text-h5 ml-2">{{ service.name }}</h2>
                                        </v-card-title>

                                        <v-card-text>
                                            <div class="text-body-1 py-4" id="container-body" v-html="service.description"></div>
                                        </v-card-text>
                                    </v-card>
                                </div>
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
        service: []
    }),
    methods: {
        getServices() {
            const that = this;

            this.$http
                .get('/service/' + this.$route.params.name)
                .then(result => {
                    that.service = result.data;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        wrap() {
            debugger;
        }
    },
    mounted() {
        this.getServices();
    },
    updated() {
        // const container = document.getElementById('container-body');
        // const h3 = document.querySelectorAll('h3');


        // if (h3.length > 1) {
        //     h3.forEach(b => {
        //         const html = b.innerHTML;
        //         const newHTML = `<div>${html}</div>`;

        //         b.innerHTML = newHTML;
        //     })
        // }
    }
};
</script>