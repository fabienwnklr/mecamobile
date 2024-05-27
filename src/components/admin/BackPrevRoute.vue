<template>
    <div>
        <v-btn title="Retour" fab absolute left small @click="$router.go(-1)">
            <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <h2 class="mb-2" v-if="this.username">
            Connecté en tant que :
            <b>
                {{ this.username }}
            </b>
        </h2>
    </div>
</template>

<script>
export default {
    name: 'BackPrevRoute',
    data: () => ({
        username: ''
    }),
    mounted() {
        const user = localStorage.getItem('user');

        if (user) this.username = JSON.parse(user).username;
    }
};
</script>
