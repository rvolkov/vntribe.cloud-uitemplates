/*
<ui-vntcreate></ui-vntcreate>
*/

const uiVntcreate = {
  name: "ui-vntcreate",
  props: ['dialog', 'vnt'],
  mixins: [mixinlang],
  components: {
    "ui-help": uiHelp,
  },
  data() {
    return {
      createvntform: {
        vnt: '',
        descr: '',
        nickname: '',
        vntexample_selected: 'none',
        templateFileList: [],
        tokens: 1000,
      },
      vntexamples_list: [],
      createvntVisible: false,
      authorization_header: null,       // header for use in upload template
    }
  },
  methods: {
    activateCreateVnt() {
      this.createvntVisible = true;
      axios
      .get(`/api/vntexamples?vntid=`+this.vnt.activevntid)
      .then(response => (this.vntexamples_list = response.data.items));
    },
        // handle change in vnt template file list
        handleChangeFileList(file, fileList) {
            this.createvntform.templateFileList = fileList.slice(-3);
        },
        // VNT manage
        createvntSubmit() {
            this.createvntVisible = false;
            var form = this.createvntform;
            if(form.vnt == '' || form.descr=='' || form.nickname=='') {
              return;
            }
            console.log("form.templateFileList=", form.templateFileList);
            axios.post(`/api/newvnt`, form)
            .then((response) => {
              //vnt_newinstall.logoutput = "User and VNT were created, return to login page";
              if(response.data.message == "VNT_NAME_IN_USE") {
                this.$message.error('VNT name is already in use');
              }
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
{% include 'ui-vntcreate.html' %}
`
};
