/*
<ui-vntdel></ui-vntdel>
*/

const uiVntdel = {
  name: "ui-vntdel",
  props: ['dialog', 'vnt'],
  mixins: [mixinlang],
  components: {
    "ui-help": uiHelp,
  },
  data() {
    return {
      deletevntVisible: false,
      ownedvntList: [],
      vntforDelete: null,
    }
  },
    methods: {
        activateDeleteVnt() {
            this.deletevntVisible = true;
            axios.get(`/api/get/ownedvnts`)
            .then(response => (this.ownedvntList = response.data.items));
        },
        deletevntSubmit() {
            this.deletevntVisible = false;
            var vntid = this.vntforDelete;
            if(vntid == '') {
              return;
            }
            form = {
              vntid: vntid
            }
            axios.post(`/api/deletevnt`, form)
            .then((response) => {
              //vnt_newinstall.logoutput = "User and VNT were created, return to login page";
              console.log(response);
              //Event.fire('vntNeedRereadvnt');
            })
            .catch((error) => {
              //vnt_newinstall.logoutput = "User or VNT was not created";
              console.log(error);
            });
        },
    },
    template: 
`
{% include 'ui-vntdel.html' %}
`
};
