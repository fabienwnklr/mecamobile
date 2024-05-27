<template>
    <v-container class="pa-0">
        <v-row style="height: 100vh" class="align-center justify-center">
            <v-col sm="10" md="6" lg="6">
                <v-card>
                    <v-card-title class="justify-center light mb-2"> Connexion à la console d'administration </v-card-title>
                    <v-card-text>
                        <v-form v-model="valid" lazy-validation ref="loginForm">
                            <v-text-field outlined v-model="userName" :rules="userNameRules" label="Nom d'utilisateur" required></v-text-field>

                            <v-text-field
                                outlined
                                v-model="pass"
                                :rules="passRules"
                                label="Mot de passe"
                                required
                                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="show ? 'text' : 'password'"
                                @click:append="show = !show"
                            ></v-text-field>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn :disabled="!valid || loading" :loading="loading" color="success" v-on:click="login" type="submit"> Se connecter </v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-snackbar bottom v-model="snackbar" :color="snackbarColor">
                {{ snackbarText }}

                <template v-slot:action="{ attrs }">
                    <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </template>
            </v-snackbar>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        valid: false,
        loading: false,
        show: false,
        userName: '',
        pass: '',
        userNameRules: [v => !!v || 'E-mail requis'],
        passRules: [v => !!v || 'Mot de passe requis'],
        select: null,
        checkbox: false,
        snackbar: false,
        snackbarText: '',
        snackbarColor: '',
    }),

    methods: {
        clear() {
            this.userName = '';
            this.pass = '';
            this.valid = false;
            this.loading = false;
            this.$refs.loginForm.resetValidation();
        },
        login() {
            const that = this;

            this.$refs.loginForm.validate();

            if (this.valid) {
                this.loading = true;
                this.$http
                    .post('/user/login', {
                        username: this.userName,
                        password: this.pass
                    })
                    .then(response => {
                        localStorage.setItem('user', JSON.stringify(response.data.user));
                        localStorage.setItem('jwt', JSON.stringify(response.data.token));

                        that.$http.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

                        if (that.$route.params.nextUrl != null) {
                            that.$router.push(this.$route.params.nextUrl);
                        } else {
                            that.$router.push('/admin/services/list');
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        this.clear();
                        this.snackbar = true;
                        this.snackbarText = error.response.data.message;
                        this.snackbarColor = 'red';
                    });
            }
        }
    }
};
</script>

<style></style>
