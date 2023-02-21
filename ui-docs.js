/*
<ui-docs document="MainMenu"></ui-docs>
if problem with activalanguage access, add
v-bind:actlang="activelanguage"
*/

/*
Vue.use(VueShowdown, {
  options: {
    emoji: true
  }
});
*/

const uiDocs = {
  name: "ui-docs",
  props: ['document', 'actlang'],
  data() {
    return {
      dialogVisible: false,
      content: 'loading help document',
      activelanguage: null,
    }
  },
  methods: {
    HelpGetCall() {
      console.log('Call for HelpGetCall');
      if(!this.activelanguage && this.actlang) {
        this.activelanguage = this.actlang;
      }
      if(this.activelanguage && this.document) {
        var self = this;
        axios
          .get(`/api/help?document=`+this.document+'&language='+this.activelanguage, { headers: { Authorization: `JWT ${localStorage.token}` } })
          .then((response) => {
            self.content = response.data.message;
          });
      } else {
        this.content = this.content+" - activelanguage is not set";
      }
    }
  },
  template: 
`
  <span>
    <VueShowdown :markdown="content"/>
  </span>
`
};
