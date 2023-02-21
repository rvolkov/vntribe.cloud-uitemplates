/*
<ui-text document="MainMenu"></ui-help>
*/


//Vue.component('VueShowdown', VueShowdown);
/*
Vue.use(VueShowdown, {
  name: 'VueShowdown',
  flavor: 'github',
  //name: 'VueShowdown',
  options: {
    emoji: true
  }
});
*/
//const app = createApp();

// the second parameter of app.use() is optional
//Vue.use(VueShowdownPlugin, {
//  // set default flavor of showdown
//  flavor: 'github',
//  // set default options of showdown (will override the flavor options)
//  options: {
//    emoji: false,
//  },
//});

//Vue.use(VueSimpleMarkdown);

const uiText = {
  name: 'ui-text',
  //mixins: [mixinlang],
  props: ['document', 'activelanguage'],
  //components: {
  //  VueShowdown,
  //},
  data() {
    return {
      content: 'loading document',
      //activelanguage: "eng",
    }
  },
  methods: {
    load_doc(doc) {
      //var self = this;
      //console.log('Call for HelpGetCall');
      //if(!this.activelanguage && this.actlang) {
      //  this.activelanguage = this.actlang;
      //}
      if(this.activelanguage && this.document) {
        //var self = this;
        axios
          .get(`/api/help?document=`+doc+'&language='+this.activelanguage, { headers: { Authorization: `JWT ${localStorage.token}` } })
          .then((response) => {
            this.content = response.data.message;
            // self.content
          });
      } else {
        //if(!this.actlang) {
        //  this.content = this.content+" - actlang is not set";
        //}
        if(!this.activelanguage) {
          this.content = this.content+" - activelanguage is not set";
        }
      }
    },
    load_doc2: function(doc, lang) {
      //this.activelanguage = navigator.language;
      lang = lang.slice(0, 3);
      if (lang == 'en-') {
        lang = "eng";
      }
      if (lang == 'ru-') {
        lang = "rus";
      }
      var self = this;
      // { headers: { Authorization: `JWT ${localStorage.token}` } }
      axios
      .get(`/api/help?document=`+doc+'&language='+lang)
      .then((response) => {
        self.content = response.data.message;
        this.content = response.data.message;
      });
    }
  },
  created() {
    this.load_doc(this.document);
  },
  template: 
`
{% include 'ui-text.html' %}
`
};
