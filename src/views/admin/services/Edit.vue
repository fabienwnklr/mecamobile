<template>
  <div>
    <h1>Modification du service {{ service.name }}</h1>
  </div>
</template>

<script>
export default {
  data: () => ({
    service: {},
  }),
  methods: {
    getDetailsService() {
      this.$http(`/service/${this.$route.params.id}`)
        .then((res) => {
          this.service = res.data;
        })
        .catch((err) => console.error(err));
    },
  },
  created() {
    this.getDetailsService();
  },
};
</script>
