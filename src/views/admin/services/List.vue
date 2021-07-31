<template>
  <div class="mt-4">
    <v-data-table
      :headers="headers"
      :items="services"
      :options.sync="options"
      :server-items-length="totalServices"
      :loading="loading"
      class="elevation-1"
      :expanded.sync="expanded"
      show-expand
      dense
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Services</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <template>
            <v-btn color="primary" class="mb-2" :to="{ name: 'Service/Create' }">
              Nouveau service
            </v-btn>
          </template>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Annuler</v-btn>
                <v-btn color="red darken-1" text @click="confirmDelete"> Supprimer</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <ul>
            <li>
              Créer par {{ item.createdBy }} le
              {{ new Date(item.createdAt).toLocaleString() }}
            </li>
            <li>
              <span v-if="item.updatedAt && item.updatedBy">
                Dernière modification par {{ item.updatedBy }} le
                {{ new Date(item.updatedAt).toLocaleString() }}
              </span>
              <span v-else>Aucune modification depuis la création.</span>
            </li>
          </ul>
        </td>
      </template>

      <template v-slot:[`item.description`]="{ item }">
        <span v-html="item.description"></span>
      </template>
      <template v-slot:[`item.online`]="{ item }">
        <v-icon :color="item.online ? 'success' : 'red'">
          {{ item.online ? "mdi-check" : "mdi-close" }}</v-icon
        >
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon class="mr-2" @click="editService(item.id)"> mdi-pencil </v-icon>
        <v-icon @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogDelete: false,
      idToDelete: -1,
      deletedIndex: -1,
      totalServices: 0,
      services: [],
      loading: true,
      options: {},
      expanded: [],
      headers: [
        {
          text: "Identifiant",
          align: "start",
          value: "id",
        },
        { text: "Icon", value: "icon", sortable: false },
        {
          text: "Nom du service",
          align: "start",
          value: "name",
        },
        { text: "Description", value: "description" },
        { text: "Actif", value: "online" },
        { text: "Actions ", value: "actions", sortable: false },
      ],
    };
  },
  watch: {
    options: {
      handler() {
        this.getServices();
      },
      deep: true,
    },
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  mounted() {
    this.getServices();
  },
  methods: {
    editService(id) {
      this.$router.push(`/admin/services/edit/${id}`);
    },
    deleteItem(service) {
      this.deletedIndex = this.services.indexOf(service);
      this.idToDelete = service.id;
      this.dialogDelete = true;
    },
    confirmDelete() {
      if (this.idToDelete === -1) return;

      this.services.splice(this.deletedIndex, 1);

      this.$http
        .delete(`/service/${this.idToDelete}`)
        .then((res) => {
          console.log(res);
          this.dialogDelete = false;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    getServices() {
      this.loading = true;
      this.$http.get("/service/admin").then((res) => {
        this.services = res.data;
        this.totalServices = res.data.length;
        this.loading = false;
      });
    },
  },
};
</script>
