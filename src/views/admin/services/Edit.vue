<template>
  <div>
    <h1>
      <v-slide-x-reverse-transition mode="out-in">
        <v-icon
          :key="`icon-${service.online}`"
          :title="service.online ? 'Service en ligne' : 'Service hors ligne'"
          :color="service.online ? 'success' : 'warning'"
          x-large
          >mdi-{{
            service.online ? "access-point-check" : "access-point-network-off"
          }}</v-icon
        >
      </v-slide-x-reverse-transition>
      Modification du service :
      {{ service.name }}
    </h1>

    <v-form v-model="valid" lazy-validation ref="editService" class="mt-5">
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
                  outlined
                  v-model="service.name"
                  label="Nom du service"
                  required
                  :rules="rules"
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
            <quill-editor ref="editEditor" v-model="service.description"></quill-editor>
          </v-col>

          <v-col class="justify-content-end">
            <v-btn @click="updateService" color="success"> Enregistrer </v-btn>
          </v-col>
        </v-row>
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
    changed: false,
    service: {},
    cloneService: null,
    rules: [(v) => !!v || "Champ requis."],
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
        .then((res) => {
          that.service = res.data;
          if (this.cloneService === null) {
            this.cloneService = Object.assign({}, this.service);
          }
        })
        .catch((err) => console.error(err));
    },
    updateService() {
      this.valid = this.$refs.editService.validate();

      if (!this.isModified() || !this.valid) return;

      if (["", "\n"].includes(this.$refs.editEditor.quill.getText())) {
        this.snackbar = true;
        this.snackbarText = "Une déscription est requise.";
        this.snackbarColor = "red";
        return;
      }

      const that = this;

      this.$http
        .put(`/service/${this.$route.params.id}`, this.service)
        .then((res) => {
          console.log(res);
          that.snackbar = true;
          that.snackbarText = res.data.message;
          that.snackbarColor = "success";
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  created() {
    this.getService();
  },
};
</script>
