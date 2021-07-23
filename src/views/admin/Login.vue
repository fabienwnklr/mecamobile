<template>
  <v-container>
    <v-row style="height: 100vh" class="align-center justify-center">
      <v-col sm="10" md="6" lg="6">
        <v-card>
          <v-card-title class="justify-center light mb-2">
            Connexion à la console d'administration
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="userName"
                :rules="userNameRules"
                label="Nom d'utilisateur"
                required
              ></v-text-field>

              <v-text-field
                v-model="pass"
                :counter="10"
                :rules="passRules"
                label="Mot de passe"
                required
                type="password"
              ></v-text-field>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :disabled="!valid" color="success" @click="login">
                  Se connecter
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    loading: false,
    userName: "",
    pass: "",
    userNameRules: [(v) => !!v || "E-mail requis"],
    passRules: [(v) => !!v || "Mot de passe requis"],
    select: null,
    checkbox: false,
  }),

  methods: {
    login() {
      const that = this;

      this.$refs.form.validate();

      if (this.valid) {
        this.loading = true;
        this.$http
          .post("/auth/login", {
            username: this.userName,
            password: this.pass,
          })
          .then((response) => {
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("jwt", JSON.stringify(response.data.token));

            that.$http.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${response.data.token}`;

            if (that.$route.params.nextUrl != null) {
              that.$router.push(this.$route.params.nextUrl);
            } else {
              that.$router.push("/");
            }
          });
      }
    },
  },
};
</script>

<style></style>
