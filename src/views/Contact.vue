<template>
  <v-row class="mt-4">
    <v-col cols="12" md="4">
      <v-card>
        <v-card-title class="light3"> Nom de l'entreprise </v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item>
              <v-list-item-icon>
                <v-icon class="mr-2">mdi-home-map-marker</v-icon>
              </v-list-item-icon>
              <v-list-item-content>Adresse </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-icon>
                <v-icon class="mr-2">mdi-phone</v-icon>
              </v-list-item-icon>
              <v-list-item-content> Tél </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-icon>
                <v-icon class="mr-2">mdi-mail</v-icon>
              </v-list-item-icon>
              <v-list-item-content> mail client </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-icon>
                <v-icon class="mr-2">mdi-mail</v-icon>
              </v-list-item-icon>
              <v-list-item-content> mail pro </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" md="8">
      <v-form ref="contactForm" v-model="valid" lazy-validation>
        <v-text-field
          v-model="fullName"
          :rules="fullNameRules"
          type="text"
          label="*Nom et prénom"
          outlined
        ></v-text-field>

        <v-text-field
          v-model="email"
          :rules="emailRules"
          type="email"
          label="*E-mail"
          outlined
        ></v-text-field>

        <v-text-field
          v-model="phoneNumber"
          :rules="phoneRules"
          type="text"
          label="*Numéro de téléphone"
          outlined
        ></v-text-field>

        <v-textarea
          v-model="message"
          label="*Message"
          outlined
          :rules="messageRules"
        ></v-textarea>

        <v-btn color="primary" class="text-right" @click="submit"> Envoyer </v-btn>
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
  name: "Contact",
  data: () => ({
    snackbar: false,
    snackbarText: "",
    snackbarColor: "",
    valid: true,
    fullName: "",
    email: "",
    phoneNumber: "",
    message: "",
    fullNameRules: [(v) => !!v || "Nom et prénom requis."],
    emailRules: [
      (v) => !!v || "E-mail requis",
      (v) => /.+@.+\..+/.test(v) || "L'adresse mail doit être valide.",
    ],
    phoneRules: [
      (v) => !!v || "Numéro de téléphone requis",
      (v) =>
        ((v || "").length < 11 && (v || "").length > 9) ||
        "Le numéro de téléphone n'est pas correct",
      (v) => /^\d+$/.test(v) || "Ce champ n'accèpte que des numéros.",
      (v) => /^\d+$/.test(v) || "Le numéro de téléphone doit être valide",
    ],
    messageRules: [(v) => !!v || "Message requis."],
  }),

  methods: {
    submit() {
      if (this.$refs.contactForm.validate()) {
        this.$http
          .post(`/contact`, {
            name: this.fullName,
            email: this.email,
            phoneNumber: this.phoneNumber,
            message: this.message,
          })
          .then((res) => {
            console.log(res);
            this.snackbar = true;
            this.snackbarText = res.data.message;
            if (res.data.error) {
              this.snackbarColor = "red";
            } else {
              this.snackbarColor = "green";
            }
          })
          .catch((err) => {
            console.error(err);
            this.snackbar = true;
            this.snackbarText = err.data.message;
            this.snackbarColor = "red";
          });
      }
    },
    clear() {
      this.valid = true;
      this.fullName = "";
      this.email = "";
      this.phoneNumber = "";
      this.message = "";
      this.snackbar = false;
      this.snackbarText = "";
      this.snackbarColor = "";
    },
  },
};
</script>
