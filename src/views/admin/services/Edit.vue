<template>
    <div>
        <h1>
            <v-slide-x-reverse-transition mode="out-in">
                <v-icon
                    :key="`icon-${service.online}`"
                    :title="service.online ? 'Service en ligne' : 'Service hors ligne'"
                    :color="service.online ? 'success' : 'warning'"
                    x-large
                    >mdi-{{ service.online ? 'access-point-check' : 'access-point-network-off' }}</v-icon
                >
            </v-slide-x-reverse-transition>
            Modification du service :
            {{ service.name }}
        </h1>

        <v-form v-model="valid" lazy-validation ref="editService" class="mt-5">
            <v-container class="pa-0">
                <v-row class="justify-content-between">
                    <v-col cols="12">
                        <IconHelper text="Pour modifier une icône, suivez"></IconHelper>
                    </v-col>

                    <v-container>
                        <v-row>
                            <v-col cols="10" sm="11" md="6" lg="2">
                                <v-text-field
                                    :prepend-inner-icon="service.icon.search('mdi-') === -1 ? 'mdi-' + service.icon : service.icon"
                                    :rules="rules"
                                    outlined
                                    v-model="service.icon"
                                    label="Icône"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="10" md="10" lg="8">
                                <v-text-field outlined v-model="service.name" label="Nom du service" required :rules="rules"></v-text-field>
                            </v-col>
                            <v-col cols="auto">
                                <v-switch v-model="service.online" :label="`${service.online ? 'En ligne' : 'Hors ligne'}`" color="success"></v-switch>
                            </v-col>
                        </v-row>
                    </v-container>

                    <v-col cols="12">
                        <c-editor ref="editor" :data="service.description" />
                    </v-col>
                </v-row>

                <v-col class="justify-content-end">
                    <v-btn @click="updateService" color="success"> Enregistrer </v-btn>
                </v-col>
            </v-container>
        </v-form>

        <v-snackbar top v-model="snackbar" :color="snackbarColor">
            {{ snackbarText }}

            <template v-slot:action="{ attrs }">
                <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script>
import CEditor from '@/components/admin/Editor';

export default {
    name: 'Edit',
    components: {
        CEditor,
        IconHelper: () => import('@/components/admin/IconHelper.vue')
    },
    data: () => ({
        dialog: false,
        snackbar: false,
        snackbarText: '',
        snackbarColor: '',
        valid: false,
        changed: false,
        service: {
            online: true,
            icon: 'home'
        },
        cloneService: null,
        rules: [v => !!v || 'Champ requis.']
    }),
    methods: {
        isModified() {
            if (JSON.stringify(this.cloneService) !== JSON.stringify(this.service)) {
                return true;
            }
            return false;
        },
        getService() {
            const that = this;

            this.$http(`/service/${this.$route.params.id}`)
                .then(res => {
                    that.service = res.data;
                    if (that.cloneService === null) {
                        that.cloneService = Object.assign({}, that.service);
                    }
                })
                .catch(err => console.error(err));
        },
        updateService() {
            this.valid = this.$refs.editService.validate();

            if (['', '\n'].includes(this.$refs.editor.$refs.CEditor.editor.getContent())) {
                this.snackbar = true;
                this.snackbarText = 'Une déscription est requise.';
                this.snackbarColor = 'red';
                return;
            }

            this.service.description = this.$refs.editor.$refs.CEditor.editor.getContent();
            this.service.updatedBy = JSON.parse(localStorage.getItem('user')).username;

            const that = this;

            this.$http
                .put(`/service/${this.$route.params.id}`, this.service)
                .then(res => {
                    that.snackbar = true;
                    that.snackbarText = res.data.message;
                    that.snackbarColor = 'success';
                })
                .catch(err => {
                    console.error(err);
                });
        }
    },
    created() {
        this.getService();
    }
};
</script>
