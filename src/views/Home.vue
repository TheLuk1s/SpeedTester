<template>
  <!-- Pools -->
  <b-container class="mt-5">
    <b-row align-h="center">
      <h1 v-if="pools == null">Šiuo metu nėra nei vieno klausimyno!</h1>
      <b-col
        v-else
        v-for="pool in pools"
        :key="pool.ID"
        class="mx-auto"
        cols="12"
        md="6"
        lg="4"
      >
        <PoolCard
          class="d-flex justify-content-center"
          :ID="pool.ID"
          :Name="pool.Name"
          :Rating="
            pool.Rating
              ? parseFloat(pool.Rating).toFixed(2)
              : parseFloat(0).toFixed(2)
          "
          :IsPublic="pool.IsPublic"
          :UserRole="role"
          @removePoll="removePoll"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// Components
import PoolCard from "../components/PoolCard";

// Essentials
import axios from "axios";

export default {
  name: "Home",
  components: {
    PoolCard,
  },
  data() {
    this.getAllPools();

    return {
      pools: null,
      role: localStorage.role,
    };
  },
  methods: {
    getAllPools() {
      const pools = axios
        .get("https://dalykai.herokuapp.com/api/auth/poll")
        .then((response) => {
          if (response.status == 200) {
            this.pools = response.data;
          }
        })
        .catch((error) => {});
    },
    removePoll(ID) {
      this.pools = this.pools.filter((element) => element.ID !== ID);
    },
  },
};
</script>

<style scoped lang="scss">
.justify-content-center {
  justify-content: center;
}
</style>
