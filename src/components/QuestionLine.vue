<template>
  <b-row class="mb-3">
    <b-col class="my-1" cols="12" md="6">
      <b-form-input v-model="question" placeholder="Klausimas"></b-form-input>
    </b-col>
    <b-col class="my-1" cols="12" md="6">
      <b-form-select v-model="questionType">
        <b-form-select-option value="1">Tekstas</b-form-select-option>
        <b-form-select-option value="4">Taip / Ne</b-form-select-option>
      </b-form-select>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "QuestionLine",
  data() {
    return {
      question: null,
      questionType: null,
    };
  },
  methods: {
    getQuestion() {
      if (this.question && this.questionType) {
        return [this.question, this.questionType];
      }
    },
  },
};
</script>

<style scoped lang="scss">
</style>