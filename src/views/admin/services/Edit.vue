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
      Modification du service :
      {{ service.name }}
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
            <v-btn @click="updateService" color="success"> Enregistrer </v-btn>
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
    valid: true,
    changed: false,
    service: {},
    cloneService: null,
  }),
  methods: {
    checkModif() {
      if (this.cloneService === null) {
        this.cloneService = Object.assign({}, this.service);
      }

      if (JSON.stringify(this.cloneService) !== JSON.stringify(this.service)) {
        return "modified";
      }
      return "not modified";
    },
    getService() {
      const that = this;

      this.$http(`/service/${this.$route.params.id}`)
        .then((res) => {
          that.service = res.data;
        })
        .catch((err) => console.error(err));
    },

    updateService() {
      this.$http
        .put(`/service/${this.$route.params.id}`, this.service)
        .then((res) => {
          console.log(res);
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
