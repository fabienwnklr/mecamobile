<template>
    <v-card>
        <v-data-table
            :search="search"
            :headers="headers"
            :items="services"
            :options="options"
            :loading="loading"
            class="elevation-1"
            :expanded="expanded"
            show-expand
            dense
        >
            <template v-slot:top>
                <!-- <v-toolbar-title>Services</v-toolbar-title> -->
                <!-- <v-divider class="mx-4" inset vertical></v-divider> -->
                <!-- <v-spacer></v-spacer> -->
                <v-card-title>
                    <h1 class="text-h6">Services</h1>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <template>
                        <v-text-field v-model="search" label="Recherche" class=""></v-text-field>
                    </template>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <!-- <v-spacer></v-spacer> -->
                    <template>
                        <v-btn color="primary" class="mb-2" :to="{ name: 'Service/Create' }"> Nouveau service </v-btn>
                    </template>
                </v-card-title>
                <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                        <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="closeDelete">Annuler</v-btn>
                            <v-btn color="red darken-1" text @click="confirmDelete"> Supprimer</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </template>
            <template v-slot:no-data>
                <v-btn color="primary" @click="getServices"> Rafraichir </v-btn>
            </template>
            <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                    <ul>
                        <li>
                            Créer par {{ item.createdBy }} le
                            {{
                                new Date(item.createdAt).toLocaleDateString('fr', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })
                            }}
                            à
                            {{ new Date(item.createdAt).toLocaleTimeString('fr') }}
                        </li>
                        <li>
                            <span v-if="item.updatedAt && item.updatedBy">
                                Dernière modification par {{ item.updatedBy }} le
                                {{
                                    new Date(item.updatedAt).toLocaleDateString('fr', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    })
                                }}
                                à
                                {{ new Date(item.updatedAt).toLocaleTimeString('fr') }}
                            </span>
                            <span v-else>Aucune modification depuis la création.</span>
                        </li>
                    </ul>
                </td>
            </template>

            <template v-slot:[`item.icon`]="{ item }">
                <span>
                    <v-icon>{{ item.icon }}</v-icon>
                </span>
            </template>
            <template v-slot:[`item.description`]="{ item }">
                <div class="text-truncate" v-html="item.description"></div>
            </template>
            <template v-slot:[`item.online`]="{ item }">
                <v-icon :color="item.online ? 'success' : 'red'"> {{ item.online ? 'mdi-check' : 'mdi-close' }}</v-icon>
            </template>

            <template v-slot:[`item.actions`]="{ item }">
                <v-icon class="mr-2" @click="editService(item.id)"> mdi-pencil </v-icon>
                <v-icon @click="deleteItem(item)"> mdi-delete </v-icon>
            </template>
        </v-data-table>
    </v-card>
</template>

<style>
 .text-truncate {
       max-width: 130px;
       max-height: 130px;
    }
</style>

<script>
export default {
    data() {
        return {
            search: '',
            dialogDelete: false,
            idToDelete: -1,
            deletedIndex: -1,
            totalServices: 0,
            services: [],
            loading: true,
            options: {},
            expanded: [],
            headers: [
                { text: 'Icon', value: 'icon', sortable: false },
                {
                    text: 'Nom du service',
                    align: 'start',
                    value: 'name'
                },
                { text: 'Description', value: 'description', cellClass: "text-truncate" },
                { text: 'Actif', value: 'online' },
                { text: 'Actions ', value: 'actions', sortable: false }
            ]
        };
    },
    watch: {
        dialog(val) {
            val || this.close();
        },
        dialogDelete(val) {
            val || this.closeDelete();
        }
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
                .then(res => {
                    console.log(res);
                    this.dialogDelete = false;
                })
                .catch(err => {
                    console.error(err);
                });
        },
        closeDelete() {
            this.dialogDelete = false;
        },
        getServices() {
            this.loading = true;
            this.$http.get('/service/admin').then(res => {
                this.services = res.data;
                this.totalServices = res.data.length;
                this.loading = false;
            });
        }
    }
};
</script>
