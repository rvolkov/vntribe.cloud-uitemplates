/*
set language
    <ui-language>
    </ui-language>

*/

const uiLanguage = {
    name: "ui-language",
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
        // set language
        setLang: function() {
            form = {
              lang: this.language.activelanguage
            };
            axios.post(`/api/set/lang`, form)
            .then(response => (window.location.href = "/vnt?token="+localStorage.token)); // reload page
          },
    },
  template: 
`
{% include 'ui-language.html' %}
`
};
