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
      <v-form ref="contactForm">
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
          label="Numéro de téléphone"
          outlined
        ></v-text-field>
        <v-text-field
          v-model="adress"
          type="text"
          label="Adresse (rue)"
          outlined
        ></v-text-field>
        <v-text-field v-model="city" type="text" label="Ville" outlined></v-text-field>
        <v-text-field
          v-model="zip"
          type="text"
          label="Code postale"
          outlined
        ></v-text-field>
        <v-text-field v-model="brand" type="text" label="*Marque" outlined></v-text-field>
        <v-text-field v-model="model" type="text" label="*Modèle" outlined></v-text-field>
        <v-text-field
          v-model="model"
          type="text"
          label="*Immatriculation"
          outlined
        ></v-text-field>
        <v-textarea v-model="message" label="*Message" outlined></v-textarea>

        <v-btn color="primary" class="text-right" @click="submit"> Envoyer </v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Contact",
  data: () => ({
    invalid: false,
    fullName: "",
    email: "",
    phoneNumber: "",
    adress: "",
    city: "",
    zip: "",
    brand: "",
    model: "",
    message: "",
    select: null,
    checkbox: null,
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
  }),

  methods: {
    submit() {
      this.$refs.contactForm.validate();
    },
    clear() {
      this.name = "";
      this.phoneNumber = "";
      this.email = "";
      this.select = null;
      this.checkbox = null;
      this.$refs.reset();
    },
  },
};
</script>
