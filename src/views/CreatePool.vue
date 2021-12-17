<template>
  <b-container>
    <!-- Headline wrapper -->
    <b-row class="my-3">
      <b-col class="text-center"><h2>Kurti klausimyną</h2></b-col>
    </b-row>

    <!-- Mandatory fields wrapper -->
    <b-row class="mt-2 mb-4">
      <b-col cols="12" md="9">
        <b-form-input v-model="name" placeholder="Pavadinimas"> </b-form-input>
      </b-col>
      <b-col cols="12" md="3" class="text-center">
        <b-form-checkbox v-model="isPublic"> Apklausa vieša </b-form-checkbox>
      </b-col>
    </b-row>
    <!-- Questions wrapper -->
    <QuestionLine
      ref="questions"
      :key="question"
      v-for="question in questions"
    />

    <!-- Button wrapper -->
    <div class="button--poll-save">
      <b-button
        pill
        variant="primary"
        size="lg"
        :disabled="submited"
        v-on:click="savePoll"
        ><b-icon icon="check" scale="1" aria-hidden="true"></b-icon
      ></b-button>
    </div>
    <div class="button--question-add">
      <b-button pill variant="secondary" size="lg" v-on:click="questions++"
        >+</b-button
      >
    </div>
  </b-container>
</template>

<script>
// Components
import QuestionLine from "../components/QuestionLine";

// Essentials
import axios from "axios";

// Defaults
export default {
  name: "CreatePool",
  components: {
    QuestionLine,
  },
  data() {
    return {
      name: null,
      isPublic: true,
      questions: 1,
      submited: false,
    };
  },
  methods: {
    savePoll() {
      let questions = [];

      this.$refs.questions.forEach((element) => {
        if (typeof element.getQuestion() != "undefined") {
          questions.push(element.getQuestion());
        }
      });

      if (questions.length > 0 && this.name) {
        this.submited = true;

        // Creating Poll
        var pollData = new FormData();
        var answerData = null;
        var pollID = null;

        pollData.append("Name", this.name);
        pollData.append("IsPublic", this.isPublic ? 1 : 0);
        pollData.append("Rating", 0);

        axios
          .post("https://dalykai.herokuapp.com/api/auth/poll", pollData, {
            withCredentials: true,
          })
          .then((response) => {
            pollID = response.data.split('"')[1];

            questions.forEach((element) => {
              answerData = new FormData();
              answerData.append("Name", element[0]);
              answerData.append("InputType", element[1]);
              answerData.append("InputValues", "");

              axios
                .post(
                  "https://dalykai.herokuapp.com/api/auth/poll/" +
                    pollID +
                    "/option",
                  answerData,
                  {
                    withCredentials: true,
                  }
                )
                .then((response) => {
                  this.$bvToast.hide();
                  this.$bvToast.toast(
                    "Jūsų klausimynas sėkmingai sukurtas, dabar galite grįžti į pagrindinį puslapį.",
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
            });
          })
          .catch((error) => {
            this.$bvToast.toast(
              "Įvyko sisteminė klaida, prašome bandyti dar kartą.",
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
.button--question-add {
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 30px;

  button {
    padding: 0.5rem 1.2rem;
  }
}

.button--poll-save {
  position: fixed;
  left: 0;
  bottom: 0;
  margin: 30px;

  button {
    padding: 8px 10px;
  }
}
</style>