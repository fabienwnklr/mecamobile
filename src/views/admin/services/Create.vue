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

    <v-form v-model="valid" lazy-validation ref="editService" class="mt-5">
      <v-container class="pa-0">
        <v-row class="justify-content-between">
          <v-col cols="12">
            <v-row>
              <v-col cols="2">
                <v-text-field solo v-model="service.icon" label="icon"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  solo
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
            <quill-editor v-model="service.description"></quill-editor>
          </v-col>

          <v-col class="justify-content-end">
            <v-btn @click="createService" color="success"> Enregistrer </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
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
    valid: false,
    service: {
      icon: "",
      online: true,
      name: "",
      description: "",
    },
  }),
  methods: {
    createService() {
      this.$http
        .post(`/service`, this.service)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>
