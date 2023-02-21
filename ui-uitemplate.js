/*
set UI template
    <ui-uitemplate>
    </ui-uitemplate>
*/

const uiUitemplate = {
  name: "ui-uitemplate",
  props: ['dialog', 'vnt'],
  mixins: [mixinlang],
  components: {
    "ui-help": uiHelp,
  },
  data() {
    return {
      //
    }
  },
  methods: {
    activateUITemplate() {
            form = {
              uservntid: this.vnt.activeuservntid,
              uitmplid: this.vnt.activeuitemplate,
            };
            axios
            .post(`/api/uitemplate`, form)//, { headers: { Authorization: `JWT ${localStorage.token}` } })
            .then((response) => {
              window.location.href = "/vnt?token="+localStorage.token;  // reload page
            });
        },
    },
    template: 
`
{% include 'ui-uitemplate.html' %}
`
};
