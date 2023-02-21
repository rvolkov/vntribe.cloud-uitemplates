/*
support cases
    <ui-support>
    </ui-support>
*/

const uiSupport = {
  name: "ui-support",
  props: [],
  mixins: [mixinlang],
  data() {
    return {
      //activevntid: null,
      //activeuservntid: null,
      langp: null,
      support_list: null,
      //currentRow: null,
      SupportForm: {
        supportid: null,
        action: 'help',
        question: null,
        answer: null,
      },
    }
  },
  methods: {
        clear_form() {
            this.SupportForm.supportid = null;
            this.SupportForm.action = 'help';
            this.SupportForm.question = null;
            this.SupportForm.answer = null;
        },
        SupportGetCall() {
            axios
            .get(`/api/support`)
            .then((response) => {
                this.support_list = response.data.items;
            });
        },
        SupportAddCall(sform) {
            form = {
              action: sform.action,
              question: sform.question
            };
            axios
            .post(`/api/support`, form)
            .then((response) => {
                this.clear_form();
                this.SupportGetCall();
            });
        },
        SupportDelCall(sform) {
            const form = {
              supportid: sform.supportid
            };
            axios.delete(`/api/support`, {data: form})
            .then((response) => {
                //this.clear_form();
                this.SupportGetCall();
            });
            //this.clear_form();
        },
        SupportModifyCall(supportid, answer) {
            form = {
              supportid: supportid,
              answer: answer
            }
            axios
            .put(`/api/support`, form)
            .then((response) => {
                this.clear_form();
                this.SupportGetCall();
                //this.clear_form();
            });
        },
        handleCurrentChange(val) {
            //this.currentRow = val;
            this.SupportForm = val;
        },
    },
    template: 
`
{% include 'ui-support.html' %}
`
};
  