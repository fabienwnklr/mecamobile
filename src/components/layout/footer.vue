<template>
    <v-footer padless>
        <v-card class="flex primary" flat tile>
            <v-card-title class="justify-center">
                <v-btn v-for="icon in icons" :key="icon" class="mx-4" dark icon>
                    <v-icon size="24px">
                        {{ icon }}
                    </v-icon>
                </v-btn>
            </v-card-title>

            <v-card-text class="py-2 text-center secondary white--text"
                >BestOil Team France Copyright © Tous droits réservés - Mentions légales - Politique de confidentialité</v-card-text
            >
        </v-card>
    </v-footer>
</template>

<script>
export default {
    data: () => ({
        icons: ['mdi-facebook', 'mdi-twitter', 'mdi-linkedin', 'mdi-instagram']
    })
};
</script>
