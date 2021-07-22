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
                v-model="name"
                :rules="nameRules"
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
                <v-btn :disabled="!valid" color="success" @click="validate">
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
    name: "",
    pass: "",
    nameRules: [(v) => !!v || "E-mail requis"],
    passRules: [(v) => !!v || "Mot de passe requis"],
    select: null,
    checkbox: false,
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
    },
  },
};
</script>

<style></style>
