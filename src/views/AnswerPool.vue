<template>
  <b-container>
    <!-- Headline wrapper -->
    <b-row class="my-3">
      <b-col class="text-center"><h2>Atsakyti klausimyną</h2></b-col>
    </b-row>

    <!-- Questions wrapper -->
    <AnswerLine
      ref="answers"
      v-bind="question"
      :key="question"
      v-for="question in questions"
    />

    <!-- Complete button wrapper -->
    <b-button
      v-on:click="fillAnswers"
      :disabled="submited"
      pill
      class="completeButton"
      ><b-icon icon="check" scale="2" aria-hidden="true"></b-icon
    ></b-button>
  </b-container>
</template>

<script>
// Components
import AnswerLine from "../components/AnswerLine";

// Essentials
import axios from "axios";

// Defaults
export default {
  name: "CreatePool",
  components: {
    AnswerLine,
  },
  data() {
    this.getAllQuestions();

    return {
      questions: null,
      submited: false,
    };
  },
  methods: {
    getAllQuestions() {
      const questions = axios
        .get(
          "https://dalykai.herokuapp.com/api/auth/poll/" +
            this.$route.params.pollID +
            "/option"
        )
        .then((response) => {
          if (response.status == 200) {
            this.questions = response.data;
          }
        });
    },

    fillAnswers() {
      let answers = [];
      let pollData = new FormData();

      this.$refs.answers.forEach((element) => {
        if (typeof element.getAnswer() != "undefined" && element.getAnswer()) {
          answers.push(element.getAnswer());
        }
      });

      if (answers.length == this.questions.length) {
        pollData.append("Answers", JSON.stringify(answers));
        this.submited = true;

        axios
          .post(
            "https://dalykai.herokuapp.com/api/auth/poll/" +
              this.$route.params.pollID +
              "/answer",
            pollData
          )
          .then((response) => {
            this.$bvToast.toast(
              "Klausimynas atsakytas, dabar galite grįžti į pagrindinį puslapį.",
              {
                solid: true,
                title: "Pavyko!",
                variant: "success",
                toaster: "b-toaster-bottom-right",
              }
            );
          })
          .catch((error) => {
            this.$bvToast.toast(
              "Įvyko sisteminė klaida, prašome kreiptis į administraciją.",
              {
                solid: true,
                title: "Klaida!",
                variant: "danger",
                toaster: "b-toaster-bottom-right",
              }
            );
          });
      } else {
        this.$bvToast.toast("Prašome užpildyti visus laukus.", {
          solid: true,
          title: "Klaida!",
          variant: "danger",
          toaster: "b-toaster-bottom-right",
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.completeButton {
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 30px;
  padding: 12px 15px;
}
</style>