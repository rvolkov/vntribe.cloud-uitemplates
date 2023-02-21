/*
requests
<ui-requests :vnt="vnt"></ui-requests>
*/

const uiRequests = {
  name: "ui-requests",
  props: ['vnt'],
  mixins: [mixinlang],
  components: {
    "ui-attach": uiAttach,
    "ui-files": uiFiles,
  },
  data() {
    return {
      activeName: 'inbox',
      requestProcessVisible: false,
      requestMyRequestsProcessVisible: false,
      reqArchProcess: null,
      currentRow: null,
      req_log: [],
      reqComment: null,
      reqProcess: null,
      inboxList: [],
      myrequestsList: [],
      proceedList: [],
      inboxListlength: null,
      myrequestsListlength: null,
      proceedListlength: null,
      requestArchiveProcessVisible: false,
      //myservicelist: [],
      activereqid: null,
    }
  },
  methods: {
    handleClick(tab, event) {
            this.currentRow = null;          
            if(this.activeName == "inbox") {
              this.inboxCall();
            }
            if(this.activeName == "myrequests") {
              this.myrequestsCall();
            }
            if(this.activeName == "proceed") {
              this.proceedCall();
            }
    },
    requestProcessSubmit(rid, radio1, comment) {
            if (radio1 == '' || !radio1) return;
            rdata = {
              command: radio1,
              vntid: this.vnt.activevntid,
              uservntid: this.vnt.activeuservntid,
              reqid: rid,
              comment: comment // add later - approver comment on command
            };
            axios.post(`/api/send`, rdata)
            .then((response) => {
              this.inboxCall();  // reread inbox
            });
            this.requestProcessVisible = false;
            //requestProcessVisible = false;
            this.reqProcess = null;
            this.reqComment = '';
            return;
    },
    requestArchSubmit(rid, radio1) {
            if (radio1 == '' || !radio1) return;
            const form = {
              command: radio1,
              vntid: this.vnt.activevntid,
              //uservntid: this.activeUservntid,
              reqid: rid
            };
            axios.delete(`/api/arch/delete`, {data: form})
            .then((response) => {
              this.proceedCall();  // reread archive
            });
            //this.requestArchVisible = false;
            this.requestArchiveProcessVisible = false;
            //requestArchVisible = false;
            this.reqArchProcess = null;
            return;
    },
    handleCurrentChange(val) {
            this.currentRow = val;
            if(val) {
              this.requestProcessVisible = true;
              this.activereqid = val.reqid;
              //Event.fire('activereqidWasSet', {vntdata: val.reqid});
              axios
                .get(`/api/request/log?vntid=`+this.vnt.activevntid+'&reqid='+val.reqid)
                .then(response => (this.req_log = response.data.items));
            }
    },
    handleArchiveCurrentChange(val) {
            this.currentRow = val;
            if(val) {
              this.requestArchiveProcessVisible = true;
              this.activereqid = val.reqid;
              //Event.fire('activereqidWasSet', {vntdata: val.reqid});
              axios
                .get(`/api/request/log?vntid=`+this.vnt.activevntid+'&reqid='+val.reqid)
                .then(response => (this.req_log = response.data.items));
            }
    },
    handleMyRequestsCurrentChange(val) {
          this.currentRow = val;
          if(val) {
            this.requestMyRequestsProcessVisible = true;
            this.activereqid = val.reqid;
            //Event.fire('activereqidWasSet', {vntdata: val.reqid});
            axios
              .get(`/api/request/log?vntid=`+this.vnt.activevntid+'&reqid='+val.reqid)
              .then(response => (this.req_log = response.data.items));
          }
    },
    inboxCall() {
          axios.get(`/api/get/inbox?vntid=`+this.vnt.activevntid+'&uservntid='+this.vnt.activeuservntid)
          .then((response) => {
            this.inboxList = response.data.items;
            for(var i = 0; i < this.inboxList.length; i++) {
              this.inboxList[i].changed = new Date(this.inboxList[i].changed);
              this.inboxList[i].changed2 = parseInt(this.inboxList[i].changed.getTime() / 1000);
              this.inboxList[i].changed = this.inboxList[i].changed.toLocaleString();
            }
            if(this.inboxList.length == 0) {
              this.inboxList.length = null;
            } else {
              this.inboxListlength = this.inboxList.length;
            }
          });
    },
    myrequestsCall() {
            axios.get(`/api/get/myrequests?vntid=`+this.vnt.activevntid+'&uservntid='+this.vnt.activeuservntid)
            .then((response) => {
                this.myrequestsList = response.data.items;
                for(var i = 0; i < this.myrequestsList.length; i++) {
                  this.myrequestsList[i].changed = new Date(this.myrequestsList[i].changed);
                  this.myrequestsList[i].changed2 = parseInt(this.myrequestsList[i].changed.getTime() / 1000);
                  this.myrequestsList[i].changed = this.myrequestsList[i].changed.toLocaleString();
                }
                this.myrequestsListlength = this.myrequestsList.length;
            });
    },
    proceedCall() {
      axios.get(`/api/get/proceed?vntid=`+this.vnt.activevntid+'&uservntid='+this.vnt.activeuservntid)
      .then((response) => {
        this.proceedList = response.data.items;
        for(var i = 0; i < this.proceedList.length; i++) {
          this.proceedList[i].changed = new Date(this.proceedList[i].changed);
          this.proceedList[i].changed2 = parseInt(this.proceedList[i].changed.getTime() / 1000);
          this.proceedList[i].changed = this.proceedList[i].changed.toLocaleString();
        }
        this.proceedListlength = this.proceedList.length;
      });
    },
    isMyService(svcid) {
      for (var i=0; i<this.vnt.myservicelist.length; i++) {
        if(svcid == this.vnt.myservicelist[i].svcid) {
          return true
        }
      }
      return false
    },
  },
  mounted() {
    var loadData = function() {
      //loadIData2();
      if(this.vnt.activeuservntid) {
        if(!this.requestProcessVisible && !this.requestArchiveProcessVisible && !this.requestMyRequestsProcessVisible) {
          if(this.activeName == "inbox") {
            this.inboxCall();
          }
          if(this.activeName == "myrequests") {
            this.myrequestsCall();
          }
          if(this.activeName == "proceed") {
            this.proceedCall();
          }
        }
      }
      //Event.fire('PeriodicReadTask', {});
      setTimeout(loadData, 10000); // run every 10 seconds
    };
    if(this.vnt.activeuservntid) {
      this.inboxCall();
    }
    setTimeout(loadData,3000); // first run after 3 seconds
  },
  template: 
`
{% include 'ui-requests.html' %}
`
};
