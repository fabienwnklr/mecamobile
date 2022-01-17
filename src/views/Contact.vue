<template>
    <v-row class="mt-4">
        <v-col class="d-none d-md-block" cols="12" md="4">
            <v-card>
                <v-card-title class="primary white--text"> Mécamobile </v-card-title>
                <v-card-text>
                    <v-list>
                        <v-list-item>
                            <v-list-item-icon>
                                <v-icon class="mr-2">mdi-home-map-marker</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content> 655 Rte d'Urt, 64240 Briscous </v-list-item-content>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                            <v-list-item-icon>
                                <v-icon class="mr-2">mdi-phone</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content> 07.85.72.73.51 </v-list-item-content>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                            <v-list-item-icon>
                                <v-icon class="mr-2">mdi-mail</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content> contact@mecamobile.fr </v-list-item-content>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                            <v-list-item-icon>
                                <v-icon class="mr-2">mdi-mail</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content> drh@mecamobile.fr </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-card-text>
            </v-card>
        </v-col>

        <v-col cols="12" md="8">
            <v-form ref="contactForm" v-model="valid" lazy-validation>
                <v-text-field v-model="fullName" :rules="fullNameRules" type="text" label="*Nom et prénom" outlined></v-text-field>

                <v-text-field v-model="email" :rules="emailRules" type="email" label="*E-mail" outlined></v-text-field>

                <v-text-field v-model="phoneNumber" :rules="phoneRules" type="text" label="*Numéro de téléphone" outlined></v-text-field>

                <v-textarea v-model="message" label="*Message" outlined :rules="messageRules"></v-textarea>

                <v-spacer></v-spacer>
                
                <v-btn color="primary" :loading="loading" @click="submit"> Envoyer </v-btn>
            </v-form>
            <v-snackbar bottom v-model="snackbar" :color="snackbarColor">
                {{ snackbarText }}

                <template v-slot:action="{ attrs }">
                    <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </template>
            </v-snackbar>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'Contact',
    data: () => ({
        snackbar: false,
        disabled: false,
        loading: false,
        snackbarText: '',
        snackbarColor: '',
        valid: false,
        fullName: '',
        email: '',
        phoneNumber: '',
        message: '',
        fullNameRules: [v => !!v || 'Nom et prénom requis.'],
        emailRules: [v => !!v || 'E-mail requis', v => /.+@.+\..+/.test(v) || "L'adresse mail doit être valide."],
        phoneRules: [
            v => !!v || 'Numéro de téléphone requis',
            v => ((v || '').length < 11 && (v || '').length > 9) || "Le numéro de téléphone n'est pas correct",
            v => /^\d+$/.test(v) || "Ce champ n'accèpte que des numéros.",
            v => /^\d+$/.test(v) || 'Le numéro de téléphone doit être valide'
        ],
        messageRules: [v => !!v || 'Message requis.']
    }),

    methods: {
        submit() {
            if (this.$refs.contactForm.validate()) {
                this.disabled = true;
                this.loading = true;
                this.$http
                    .post(`/contact`, {
                        name: this.fullName,
                        email: this.email,
                        phoneNumber: this.phoneNumber,
                        message: this.message
                    })
                    .then(res => {
                        console.log(res);
                        this.snackbar = true;
                        this.snackbarText = res.data.message;
                        this.disabled = false;
                        this.loading = false;
                        this.fullName = '';
                        this.email = '';
                        this.phoneNumber = '';
                        this.message = '';
                        this.$refs.contactForm.resetValidation();
                        if (res.data.error) {
                            this.snackbarColor = 'red';
                        } else {
                            this.snackbarColor = 'green';
                        }
                    })
                    .catch(err => {
                        console.error(err);
                        this.disabled = false;
                        this.loading = false;
                        this.snackbar = true;
                        this.snackbarText = err.data.message;
                        this.snackbarColor = 'red';
                    });
            }
        },
        clear() {
            this.valid = true;
            this.fullName = '';
            this.email = '';
            this.phoneNumber = '';
            this.message = '';
            this.snackbar = false;
            this.snackbarText = '';
            this.snackbarColor = '';
        }
    }
};
</script>
