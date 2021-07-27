<template>
  <div>
    <h1>
      <v-icon
        :title="service.online ? 'Service en ligne' : 'Service hors ligne'"
        :color="service.online ? 'success' : 'warning'"
        large
        >mdi-{{
          service.online ? "access-point-check" : "access-point-network-off"
        }}</v-icon
      >
      Création du service : {{ service.name }}
    </h1>

    <v-form v-model="valid" lazy-validation ref="createService" class="mt-5">
      <v-container class="pa-0">
        <v-row class="justify-content-between">
          <v-col cols="12">
            <v-row>
              <v-col cols="2">
                <v-text-field
                  :rules="rules"
                  outlined
                  v-model="service.icon"
                  label="icon"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  :rules="rules"
                  outlined
                  v-model="service.name"
                  label="Nom du service"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="2" class="">
                <v-checkbox
                  v-model="service.online"
                  color="primary"
                  :label="`${service.online ? 'Visible' : 'Non visible'}`"
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12">
            <quill-editor
              class="editor"
              ref="createEditor"
              v-model="service.description"
            ></quill-editor>
          </v-col>

          <v-col class="justify-content-end">
            <v-btn @click="createService" :disabled="!valid" color="success">
              Enregistrer
            </v-btn>
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
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";

export default {
  name: "Edit",
  components: {
    quillEditor,
  },
  data: () => ({
    snackbar: false,
    snackbarText: "",
    snackbarColor: "",
    valid: false,
    service: {
      icon: "",
      online: true,
      name: "",
      description: "",
    },
    rules: [(v) => !!v || "Champ requis."],
  }),
  methods: {
    createService() {
      this.valid = this.$refs.createService.validate();

      if (!this.valid) return;

      if (["", "\n"].includes(this.$refs.createEditor.quill.getText())) {
        this.snackbar = true;
        this.snackbarText = "Une déscription est requise.";
        this.snackbarColor = "red";
        return;
      }

      const that = this;

      this.service.creator = JSON.parse(localStorage.getItem("user")).username;

      this.$http
        .post(`/service`, this.service)
        .then((res) => {
          console.log(res);
          that.snackbar = true;
          that.snackbarText = res.data.message;
          that.snackbarColor = "success";
          this.clear();
          this.$refs.createService.resetValidation();
        })
        .catch((err) => {
          console.error(err);
        });
    },

    clear() {
      this.service = {
        icon: "",
        online: true,
        name: "",
        description: "",
      };
    },
  },
};
</script>
