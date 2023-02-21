/*
<ui-help document="MainMenu" :actlang="language.activelanguage"></ui-help>
if problem with activelanguage access, add
v-bind:actlang="activelanguage"
*/

const uiHelp = {
  name: "ui-help",
  props: ['document', 'actlang'],
  data() {
    return {
      dialogVisible: false,
      content: 'loading help document',
    }
  },
  methods: {
    HelpGetCall() {
      var self = this;
      if(this.actlang && this.document) {
        axios
          .get(`/api/help?document=`+this.document+'&language='+this.actlang, { headers: { Authorization: `JWT ${localStorage.token}` } })
          .then((response) => {
            self.content = response.data.message;
          });
      } else {
        if(!this.actlang) {
          this.content = this.content+" - actlang is not set";
        }
      }
    }
  },
  template: 
`
{% include 'ui-help.html' %}
`
};
