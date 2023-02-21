/*
show services list, on click fill all the data to activate new request modal
<ui-services :vnt="vnt"></ui-services>
*/

// work with iFrame for NEW MESSAGE iframe
function findIframeByName(name) {
  return _.find(window.frames, frame => frame.name === name);
}

const uiServices = {
  name: "ui-services",
  props: ['vnt'],
  mixins: [mixinlang],
  components: {
    "ui-help": uiHelp,
  },
  data() {
    return {
      newreqform: {
        action: null,
        variableNames: [],
        variableValues: [],
        subject: '',
        comment: ''
      },
      newrequest: {
        newrequestVisible: false,
        newRequestFrameSrc: null,
        activeSvcname: null,
        activeSvcid: null,
      },
      form_data: null,
      form_data_list: [],
      newrec: {
        presvcList: [],
        usrsvcList: []
      },
      vnt_services_newrequest: null,     // to accept data from vnt-services component
        newrequestVisible: false,  // show create new request window
        newRequestFrameSrc: null,
        activeSvcname: null,
        activeSvcid: null,
        iframeObject: null,
      }
    },
    methods: {
      callforrequest: function(svcid, svcname) {
        this.newrequest.newrequestVisible = true;
        this.newrequest.activeSvcname = svcname;
        this.newrequest.activeSvcid = svcid;
        let vntid = this.vnt.activevntid;
        let uservntid = this.vnt.activeuservntid;
        let baseUrl = '/api/newrequest';
        let src = baseUrl+'?vntid='+vntid+'&uservntid='+uservntid+'&svcid='+svcid+'&jwt='+localStorage.token;
        this.newrequest.newRequestFrameSrc = src;
        // *** new version ***
        // first let's have list of presvcs
        axios
          .get(`/api/get/preservices?vntid=`+vntid+'&svcid='+svcid)
          .then(response => {
            this.newrec.presvcList = response.data.items;
            axios
              .get(`/api/get/fullpath?vntid=`+vntid+'&svcid='+svcid+'&uservntid='+uservntid)
              .then(response => {
                this.newrec.usrsvcList = response.data.items;
                this.vnt_services_newrequest = this.newrequest;
                this.newrequestVisible = this.vnt_services_newrequest.newrequestVisible;
                this.newRequestFrameSrc = this.vnt_services_newrequest.newRequestFrameSrc;
                this.activeSvcname = this.vnt_services_newrequest.activeSvcname;
                this.activeSvcid = this.vnt_services_newrequest.activeSvcid;
                // now load all the preservices forms
                axios
                  .get(`/api/form?vntid=`+vntid+'&svcid='+svcid)
                  .then(response => {
                    this.form_data = response.data.message;
                  });
                for(let i=0; this.newrec.presvcList[i]; i++) {
                  axios
                    .get(`/api/form?vntid=`+vntid+'&svcid='+this.newrec.presvcList[i]["svcid"])
                    .then(response => {
                      this.form_data_list[i] = response.data.message;
                      this.form_data_list[i]["svccode"] = this.newrec.presvcList[i]["svccode"];
                      this.form_data_list[i]["svcdescr"] = this.newrec.presvcList[i]["svcdescr"];
                      let fsrc = baseUrl+'?vntid='+vntid+'&uservntid='+uservntid+'&svcid='+this.newrec.presvcList[i]["svcid"]+'&jwt='+localStorage.token;
                      this.form_data_list[i]["newRequestFrameSrc"] = fsrc;
                    });
                }
              });
          });

        // *** orig version ***
        /*
        axios
          .get(`/api/form?vntid=`+vntid+'&svcid='+svcid)
          .then(response => {
            // newrequest2
            this.form_data = response.data.message;
            axios
              .get(`/api/get/preservices?vntid=`+vntid+'&svcid='+svcid)
              .then(response => {
                // newrequest3
                this.newrec.presvcList = response.data.items;
                axios
                  .get(`/api/get/fullpath?vntid=`+vntid+'&svcid='+svcid+'&uservntid='+uservntid)
                  .then(response => {
                    // newrequest4
                    this.newrec.usrsvcList = response.data.items;
                    // newrequest1
                    this.vnt_services_newrequest = this.newrequest;
                    this.newrequestVisible = this.vnt_services_newrequest.newrequestVisible;
                    this.newRequestFrameSrc = this.vnt_services_newrequest.newRequestFrameSrc;
                    this.activeSvcname = this.vnt_services_newrequest.activeSvcname;
                    this.activeSvcid = this.vnt_services_newrequest.activeSvcid;
                  });
              });
          });
          */
      },
      onLoadIframe(event) {
        console.log("iframe name=",event.currentTarget.name);
        const myiframe = findIframeByName(event.currentTarget.name);
        this.iframeObject = myiframe;
        console.log("iframe object=", myiframe);
        myiframe.receiveDataFromParent({
          vntid: this.vnt.activevntid,
          uservntid: this.vnt.activeuservntid,
          svcid: this.activeSvcid,
          jwt: localStorage.token,
          activelanguage: this.language.activelanguage
        });
      },
      newrequestSubmit() {
        // now we need to submit request from external iframe form or from internal autogenerated form
        if(this.form_data && !this.form_data.formfile) {
          // need to submit request with data from
          formbody_json = []
          for (x of this.form_data.variables) {
            item = {'name': x.name, 'value': x.value};
            formbody_json.push(item)
          }
          form = {
            vntid: this.vnt.activevntid,
            uservntid: this.vnt.activeuservntid,
            dst_svcid: this.activeSvcid,
            subject: this.newreqform.subject,
            comment: this.newreqform.comment,
            action: 'Request',
            operation: this.newreqform.action,
            storage: '',
            formbody_json: formbody_json
          };
          axios
            .post(`/api/post/newmessage`, form)
            .then((response) => {
              //inboxCall();
              //Event.fire('vntNeedInboxCall');
              this.form_data_list = [];
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          this.iframeObject.needToSubmitResults();
        }
      },
    },
    template: 
  `
  {% include 'ui-services.html' %}
  `
  };
  