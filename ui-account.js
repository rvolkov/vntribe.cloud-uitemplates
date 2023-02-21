/*
account information
    <ui-account :vnt="vnt">
    </ui-account>

*/

//const { NONAME } = require("node:dns");

//Vue.component('ui-account', {
const uiAccount = {
  name: 'ui-account',
  props: ['dialog', 'vnt'],
  mixins: [mixinlang],
  data() {
    return {
      myAccount: {
        created: '',
        myusers: [],
        mycvnts: [],
        myovnts: [],
        thisvnttokens: 0,
        thisvntalltokens: 0,
        percent_tokens: 0
      },
      activeNames: ['0'],
    }
  },
  methods: {
    getAccount() {
      axios.get(`/api/myaccount?vntid=`+this.vnt.activevntid+'&uservntid='+this.vnt.activeuservntid)
        .then((response) => {
            var myAccountObject = response.data.message;
            this.myAccount.userid = myAccountObject.userid;
            //vnt.myAccount.available_aud = vnt.myAccountObject.available_aud;
            this.myAccount.created = myAccountObject.created;
            this.myAccount.myusers = myAccountObject.myusers;
            this.myAccount.mycvnts = myAccountObject.mycvnts;
            this.myAccount.myovnts = myAccountObject.myovnts;
            this.myAccount.thisvnttokens = myAccountObject.thisvnttokens;
            this.myAccount.thisvntalltokens = myAccountObject.thisvntalltokens;
            if(myAccountObject.thisvntalltokens == 0) {
              this.myAccount.percent_tokens = 0;
            } else {
              this.myAccount.percent_tokens = this.myAccount.thisvnttokens/(this.myAccount.thisvntalltokens/100);
            }
        });
    }
    },
    created() {
      //
    },
    template: 
`
{% include 'ui-account.html' %}
`
};
