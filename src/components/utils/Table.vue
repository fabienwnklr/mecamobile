<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="desserts"
            :options.sync="options"
            :server-items-length="totalDesserts"
            :loading="loading"
            class="elevation-1"
        ></v-data-table>
    </div>
</template>

<script>
export default {
    name: 'Table',
    props: {}
};
</script>
