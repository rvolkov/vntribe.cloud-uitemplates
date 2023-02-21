/*
user present-absent switch
<ui-present>
</ui-present>
*/

const uiPresent = {
    name: "ui-present",
    props: ['showhelp', 'vnt'],
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
        changePresent: function() {
            var res = 'f';
            if(this.vnt.present) {
              res = 't';
            }
            rdata = {
              present: res,
              vntid: this.vnt.activevntid,
              uservntid: this.vnt.activeuservntid
            }
            var prevstate = this.vnt.present;
            axios.put(`/api/change/present`, rdata)
            .then((response) => {
              console.log("return from /api/change/present=", response.data.message);
              if(response.data.message == 'unable') {
                this.vnt.present = true;
                console.log("return this.present to true");
              }
            });
        },
    },
  template: 
`
{% include 'ui-present.html' %}
`
};
