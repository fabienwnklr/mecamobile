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
            Création du service : {{ service.name }}
        </h1>

        <v-form v-model="valid" lazy-validation ref="createService" class="mt-5">
            <v-container class="pa-0">
                <v-row class="justify-content-between">
                    <v-col cols="12">
                        <IconHelper text="Pour choisir une icône, suivez"></IconHelper>
                    </v-col>
                    <v-col cols="12">
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
                            <v-col cols="6">
                                <v-text-field :rules="rules" outlined v-model="service.name" label="Nom du service" required></v-text-field>
                            </v-col>
                            <v-col cols="auto">
                                <v-switch v-model="service.online" :label="`${service.online ? 'En ligne' : 'Hors ligne'}`" color="success"></v-switch>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12">
                        <tiptap-vuetify ref="editorService" v-model="service.description" :extensions="extensions" />
                    </v-col>

                    <v-col class="justify-content-end">
                        <v-btn @click="createService" :disabled="!valid" color="success"> Enregistrer </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
        <v-snackbar top v-model="snackbar" :color="snackbarColor">
            {{ snackbarText }}

            <template v-slot:action="{ attrs }">
                <v-btn color="white" text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script>
import {
    TiptapVuetify,
    Heading,
    Bold,
    Italic,
    Strike,
    Underline,
    Code,
    Paragraph,
    BulletList,
    OrderedList,
    ListItem,
    Link,
    Blockquote,
    HardBreak,
    HorizontalRule,
    History
} from 'tiptap-vuetify';
export default {
    name: 'Edit',
    components: {
        TiptapVuetify,
        IconHelper: () => import('@/components/admin/IconHelper.vue')
    },
    data: () => ({
        snackbar: false,
        snackbarText: '',
        snackbarColor: '',
        valid: false,
        service: {
            icon: '',
            online: true,
            name: '',
            description: ''
        },
        rules: [v => !!v || 'Champ requis.'],
        extensions: [
            History,
            Blockquote,
            Link,
            Underline,
            Strike,
            Italic,
            ListItem,
            BulletList,
            OrderedList,
            [
                Heading,
                {
                    options: {
                        levels: [1, 2, 3]
                    }
                }
            ],
            Bold,
            Code,
            HorizontalRule,
            Paragraph,
            HardBreak
        ]
    }),
    methods: {
        createService() {
            this.valid = this.$refs.createService.validate();

            if (!this.valid) return;

            if (['', '\n'].includes(this.$refs.createEditor.quill.getText())) {
                this.snackbar = true;
                this.snackbarText = 'Une déscription est requise.';
                this.snackbarColor = 'red';
                return;
            }

            const that = this;

            this.service.creator = JSON.parse(localStorage.getItem('user')).username;

            this.$http
                .post(`/service`, this.service)
                .then(res => {
                    console.log(res);
                    that.snackbar = true;
                    that.snackbarText = res.data.message;
                    that.snackbarColor = 'success';
                    this.clear();
                    this.$refs.createService.resetValidation();
                })
                .catch(err => {
                    console.error(err);
                });
        },

        clear() {
            this.service = {
                icon: '',
                online: true,
                name: '',
                description: ''
            };
        }
    }
};
</script>
