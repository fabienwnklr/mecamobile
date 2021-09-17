<template>
    <div class="NotFound">
        <v-container>
            <v-row>
                <v-col class="">
                    <v-card color="transparent" flat>
                        <div class="display-3 mt-5 mb-4">Page introuvable.</div>
                        <div class="grey--text lighten-5">La page à laquelle vous essayez d'accéder n'existe pas ou n'existe plus.</div>
                        <div class="paragraph-text mt-2">
                            <br />
                            <br />
                            <v-btn color="primary" to="/"> Retour à la page d'accueil </v-btn>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<style>
.paragraph-text {
    font-size: 18px;
}
</style>
