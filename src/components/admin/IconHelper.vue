<template>
  <div>
    <v-alert border="left" color="indigo" dark>
      Pour changer d'icône suivez
      <v-btn class="ml-2" tile @click="dialog = true" outlined small
        >ces instructions</v-btn
      >
    </v-alert>

    <v-dialog
      v-model="dialog"
      scrollable
      :max-width="$vuetify.breakpoint.mdAndUp ? '50%' : 'auto'"
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2 mb-3"
          >Changement d'icône</v-card-title
        >

        <v-card-text>
          <p class="text-h6 my-3">
            Tout d'abord rendez-vous sur la page suivante :
            <a href="https://materialdesignicons.com/" target="_blank"
              >https://materialdesignicons.com/</a
            >
          </p>

          <p class="text-h6 my-3">Rechercher votre icône (en anglais...) :</p>
          <v-img class="mb-5" src="@/assets/mtd-icons-search.png"></v-img>

          <v-divider></v-divider>

          <p class="text-h6 my-3">Puis récupéré le nom de l'icône :</p>
          <v-img class="mb-3" src="@/assets/mtd-icons-copy.png"></v-img>

          <v-divider></v-divider>

          <p class="text-h6 my-3">Puis enfin renseignez le nom de l'icône :</p>
          <v-img class="mb-3" src="@/assets/mtd-icons-save.png"></v-img>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">Fermer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "IconHelper",
  data: () => ({
    dialog: false,
  }),
};
</script>
