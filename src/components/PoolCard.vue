<template>
  <div>
    <b-card
      :title="Name"
      img-src="https://picsum.photos/600/300/?image=25"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem"
      class="mb-2"
    >
      <b-card-text>
        <b-form-rating
          class="rating-outline-none"
          v-model="Rating"
          readonly
        ></b-form-rating>
      </b-card-text>

      <div class="buttonWrapper">
        <b-button
          :disabled="IsPublic != 1 && !Token"
          :href="'#/answerPool/' + ID"
          variant="primary"
          >Pildyti</b-button
        >

        <b-button
          v-if="UserRole == 2"
          v-on:click="removePoll"
          variant="secondary"
        >
          <b-icon icon="trash-fill"></b-icon>
        </b-button>
      </div>
    </b-card>
  </div>
</template>

<script>
// Essentials
import axios from "axios";

// Defaults
export default {
  name: "PoolCard",
  props: {
    ID: {
      type: Number,
      required: true,
    },
    IsPublic: {
      type: Number,
    },
    Name: {
      type: String,
      required: true,
    },
    Rating: {
      type: Number,
    },
    UserRole: {
      type: Number,
    },
  },
  data() {
    return {
      Token: localStorage.token ? true : false,
    };
  },
  methods: {
    removePoll() {
      axios
        .delete("https://dalykai.herokuapp.com/api/auth/poll/" + this.ID, {
          headers: {
            Authorization: "Bearer " + localStorage.token,
          },
        })
        .then((response) => {
          this.$emit("removePoll", this.ID);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped lang="scss">
.buttonWrapper {
  display: flex;
  justify-content: space-between;
}
.rating-outline-none {
  &:focus {
    border-color: #CED4DA;
    box-shadow: none;
  }
}
</style>