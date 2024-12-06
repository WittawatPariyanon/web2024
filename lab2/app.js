const { createApp } = Vue;
const { createVuetify } = Vuetify;

const vuetify = createVuetify();

createApp({
    data() {
        return {
            page: 0,
            quizzes: [
                { name: 'แบบทดสอบปรนัย', file: 'lab2.json' }
            ],
            questions: [],
            answers: [],
            score: 0
        };
    },
    methods: {
        async loadQuiz(file) {
            const res = await fetch(file);
            this.questions = await res.json();
            this.answers = Array(this.questions.length).fill(null);
            this.page = 2;
        },
        checkAnswers() {
            this.score = this.questions.reduce((score, question, index) => {
                return score + (this.answers[index] === question.answer ? 1 : 0);
            }, 0);
            this.page = 3;
        },
        resetQuiz() {
            this.page = 0;
            this.questions = [];
            this.answers = [];
            this.score = 0;
        }
    },
    computed: {
        isComplete() {
            return this.answers.every(answer => answer !== null);
        }
    }
}).use(vuetify).mount('#app');
