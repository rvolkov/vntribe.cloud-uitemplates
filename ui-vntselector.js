/*
  show list of user's VNTs, allow to switch between VNTs
  <ui-vntselector :vnt="vnt"></ui-vntselector>
*/

const uiVntselector = {
  name: "ui-vntselector",
  props: ['showhelp', 'vnt'],  // , 'vnt'
  mixins: [mixinlang],
  components: {
    "ui-help": uiHelp,
  },
  data() {
    return {
      activenickvnt_old: null,
    }
  },
  methods: {
        setactiveaccount: function() {
            var vntitem = null;
            for (var i=0; i<this.vnt.vntlist.length; i++) {
              if(this.vnt.activenickvnt == ''+this.vnt.vntlist[i].nickname+'@'+this.vnt.vntlist[i].vntname ) {
                vntitem = this.vnt.vntlist[i];
                activeVntid = vntitem.vntid;
                activeUservntid = vntitem.uservntid;
                // write selection to the server
                form = {
                    uservntid: activeUservntid
                };
                axios
                .post(`/api/activeuservntid`, form)//, { headers: { Authorization: `JWT ${localStorage.token}` } })
                .then((response) => {
                  window.location.href = "/vnt?token="+localStorage.token; // reload page
                  //window.location.href = "/vnt";  // reload page
                });
                break;
              }
            }
        },
  },
  template: 
`
{% include 'ui-vntselector.html' %}
`
};
  