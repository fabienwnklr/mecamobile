<template>
    <v-footer padless>
        <v-card class="flex primary" flat tile>
            <v-card-title class="justify-center">
                <v-btn v-for="media in socialMedia" :key="media.title" class="mx-2" dark icon :href="media.link" target="_blank">
                    <v-icon size="24px">
                        {{ media.icon }}
                    </v-icon>
                </v-btn>
            </v-card-title>

            <v-card-text class="py-2 text-center secondary white--text"
                >Mecamobile France Copyright © Tous droits réservés - <a href="#">Mentions légales</a></v-card-text
            >
        </v-card>
    </v-footer>
</template>

<script>
export default {
    data: () => ({
        socialMedia: [
            { title: 'Notre Facebook', icon: 'mdi-facebook', link: 'https://www.facebook.com/mecamobile64240/' },
            { title: 'Notre Instagram', icon: 'mdi-instagram', link: 'https://www.instagram.com/meca_mobile/' }
        ]
    })
};
</script>
