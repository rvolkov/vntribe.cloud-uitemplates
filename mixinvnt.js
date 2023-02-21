// data/functions for basic vnt data
var mixinvnt = {
  data: function() {
    return {
      authorization_header: null,
      vnt: {
        activevntid: null,
        activeuservntid: "",
        activenickvnt: "",
        vntname: "",
        nickname: "",
        present: false,
        vntlist: [],
        vntname: "",
        uitemplateslist: [],
        activeuitemplate: null,
        grouplist: [],
        myservicelist: [],
        servicelistl1: [],
      }
    }
  },
  methods: {
    loadMixinVntVars: function() {
      if(this.vnt.vntlist.length == 0) {
        //console.log("mixinvnt mounted call");
        axios.get(`/api/vnts`)
        .then((response) => {
          this.vnt.vntlist = response.data.items;
          if(this.vnt.activevntid == null) {
            // now read active vnt for user
            axios.get(`/api/activeuservntid`)
            .then((response) => {
              r = response.data.message;
              if(r.vntid == 0) {
                this.vnt.activenickvnt = ''+this.vnt.vntlist[0].nickname+'@'+this.vntlist[0].vntname;
              } else {
                this.vnt.activevntid = r.vntid;
                this.vnt.activeuservntid = r.uservntid;
                this.vnt.activenickvnt = ''+r.nickname+'@'+r.vntname;
                this.vnt.vntname = r.vntname;
                this.vnt.nickname = r.nickname;
                if(r.present == 't') {
                  this.vnt.present = true;
                } else {
                  this.vnt.present = false;
                }
              }
              this.serviceCall();
              axios.get(`/api/uitemplates?vntid=`+this.vnt.activevntid)
              .then(response => {
                this.vnt.uitemplateslist = response.data.items;
                axios.get(`/api/activeuitemplate?uservntid=`+this.vnt.activeuservntid)
                .then(response => (this.vnt.activeuitemplate = response.data.message));
              })
              .catch((error) => {
                this.immediateError("Can not load uitemplates", error);
              });
              axios.get(`/api/groups?vntid=`+this.vnt.activevntid+'&uservntid='+this.vnt.activeuservntid)
              .then(response => (this.vnt.grouplist = response.data.items))
              .catch((error) => {
                this.immediateError("Can not load user groups", error);
              });
              axios.get(`/api/get/myservices?vntid=`+this.vnt.activevntid+'&uservntid='+this.vnt.activeuservntid)
              .then(response => (this.vnt.myservicelist = response.data.items))
              .catch((error) => {
                this.immediateError("Can not load user services", error);
              });
            })
            .catch((error) => {
              this.immediateError("Can not load activevntid", error);
            });
          }
        })
        .catch((error) => {
          this.immediateError("Can not load vnt list", error);
        });
      }
    },
    // rebuild active vars, read services and groups again, prepare something for IFrame
    groupCall: function() {
      var vntitem = null;
      for (var i=0; i<this.vnt.vntlist.length; i++) {
        if(this.vnt.activenickvnt == ''+this.vnt.vntlist[i].nickname+'@'+this.vnt.vntlist[i].vntname ) {
          vntitem = this.vnt.vntlist[i];
          this.vnt.activevntid = vntitem.vntid;
          this.vnt.activeuservntid = vntitem.uservntid;
          break;
        }
      }
      //console.log("this.activeUservntid=", this.activeUservntid, this.activeNickVnt);
      if(vntitem) {
        if(vntitem.present == 't') {
          this.vnt.present = true;
        } else {
          this.vnt.present = false;
        }
      }
      this.authorization_header = { Authorization: `JWT ${localStorage.token}` };
    },
    serviceCall: function() {
      axios.get(`/api/get/services?vntid=`+this.vnt.activevntid+'&uservntid='+this.vnt.activeuservntid)
      .then((response) => {
        var sl = response.data.items;
        // fill level 1
        var slout = [];
        for (var i=0; i<sl.length; i++) {
          var newent1 = true;
            for (var j=0; j<slout.length; j++) {
              if (sl[i].level1 == slout[j].level1) {
                // no need to add to l1
                newent1 = false;
                break;
              }
            }
            if(newent1) {
              l = null;
              if (sl[i].level2) {
              l = {
                level1: sl[i].level1,
                level2: [],
                index: sl[i].svcid+'i1',
                key: sl[i].svcid+'k1'
              };
            } else {
              l = {
                level1: sl[i].level1,
                svcdescr: sl[i].svcdescr,
                svcid: sl[i].svcid,
                supporters: sl[i].supporters,
                index: sl[i].svcid+'i1',
                key: sl[i].svcid+'k1'
              };
            }
            slout.push(l);
          }
        }
        // fill level 2
        for (var i=0; i<sl.length; i++) {
          for (var j=0; j<slout.length; j++) {
            if (sl[i].level1 == slout[j].level1) {
              // need to add to l2
              l = {
                level2: sl[i].level2,
                svcdescr: sl[i].svcdescr,
                svcid: sl[i].svcid,
                supporters: sl[i].supporters,
                index: sl[i].svcid+'i2',
                key: sl[i].svcid+'k2'
              };
              slout[j].level2.push(l);
            }
          }
        }
        this.vnt.servicelistl1 = slout;
      });
    },
  },
  mounted() {
  //  //console.log("mixinvnt mounted call");
    this.loadMixinVntVars();
  }
};