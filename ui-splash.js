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

const uiSplash = {
  name: "ui-splash",
  props: ['document'],
  //components: {
  //  VueShowdown,
  //},
  data() {
    return {
    content: 'loading document',
    activelanguage: "eng",
    splashVisible: false
    }
  },
  methods: {
    load_doc: function(doc, lang) {
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
  template: 
`
{% include 'ui-splash.html' %}
`
};
