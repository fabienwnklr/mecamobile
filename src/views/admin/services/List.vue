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
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Services</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm(editedItem)"
                  >OK</v-btn
                >
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

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon class="mr-2" @click="editItem(item.id)"> mdi-pencil </v-icon>
        <v-icon @click="deleteItem(item.id)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogDelete: false,
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
        this.getDataFromApi();
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
    this.getDataFromApi();
  },
  methods: {
    editItem(id) {
      this.$router.push(`/admin/services/edit/${id}`);
    },
    deleteItem(item) {
      console.log(item);
      this.dialogDelete = true;
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    getDataFromApi() {
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
