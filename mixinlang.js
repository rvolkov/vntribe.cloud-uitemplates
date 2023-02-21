// data/functions about languages support
var mixinlang = {
  data: function() {
    return {
      language: {
        activelanguage: 'eng',
        langp: [],  // lang pack storage
        listlanguages: [],
      },
    }
  },
  methods: {
    // show message in correct language
    flangp: function(s) {
      //console.log('flangp call:', s, 'language.langp.length=', this.language.langp.length);
      if(this.language.langp.length>0) {
        var index = 0;
        for (index = 0; index < this.language.langp.length; ++index) {
          //console.log("flangp compare",this.langp[index].name,"and",s);
          if(this.language.langp[index].name == s) {
            //console.log("BINGO flangp compare",this.langp[index].name,"and",s,"returning",this.langp[index].value);
            return this.language.langp[index].value;
          }
        }
      }
      return s;
    },
    // fill global variables from the server API
    loadMixinlangVars: function() {
      if(this.language.langp.length == 0) {
        // load language pack
        axios.get('/api/language')
        .then((response) => {
          this.language.langp = response.data.items; // global var from mixins
          //console.log("langp=",this.langp);
        })
        .catch((error) => {
          this.immediateError("Can not load language pack", error);
        });
      }
      if(this.language.listlanguages.length == 0) {
        // load languages
        axios.get('/api/languages')
        .then(response => {
          this.language.listlanguages = response.data.items;
        })
        .catch((error) => {
          this.immediateError("Can not load list of languages", error);
        });
      }
      if(this.language.activelanguage == null) {
        axios.get('/api/get/lang')
        .then(response => {
          this.language.activelanguage = response.data.message;
        })
        .catch((error) => {
          this.immediateError("Can not load active language", error);
        });
      }
    },
  },
  mounted() {
    this.loadMixinlangVars(); // this is only place where language messages are loaded during portal load
  }
};