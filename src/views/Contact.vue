<template>
  <v-form @submit.prevent="submit" ref="contactForm">
    <v-text-field v-model="name" :counter="10" label="Name" :rules="rules"></v-text-field>

    <v-text-field v-model="phoneNumber" :counter="7" label="Phone Number"></v-text-field>
    <v-text-field v-model="email" label="E-mail"></v-text-field>
    <v-select
      v-model="select"
      :items="items"
      label="Select"
      data-vv-name="select"
    ></v-select>
    <v-checkbox v-model="checkbox" value="1" label="Option" type="checkbox"></v-checkbox>

    <v-btn class="mr-4" type="submit" :disabled="invalid"> submit </v-btn>
  </v-form>
</template>

<script>
export default {
  name: "Contact",
  data: () => ({
    invalid: false,
    name: "",
    phoneNumber: "",
    email: "",
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: null,
    rules: [(v) => !!v || "Champ requis."],
  }),

  methods: {
    submit() {
      this.$refs.contactForm.validate();
    },
    clear() {
      this.name = "";
      this.phoneNumber = "";
      this.email = "";
      this.select = null;
      this.checkbox = null;
      this.$refs.reset();
    },
  },
};
</script>
