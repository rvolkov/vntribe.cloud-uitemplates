/*
services filter
<ui-arules :vnt="vnt"></ui-arules>
*/
const uiArules = {
    name: "ui-arules",
    props: ['dialog', 'vnt'],
    mixins: [mixinlang],
    data() {
      return {
        autoRules: [],
        autoRuleId: 0,
        autoRulesForm: {
          autoruleid: 0,
          srcsvc: '',
          dstsvc: '',
          srcuser: '',
          dstuser: '',
          description: '',
          active: ''
        },
      }
    },
    methods: {
      changeAutoRuleId(aruleid) {
        //console.log("change called, aruleid=", aruleid);
        for(var i = 0; i < this.autoRules.length; i++) {
          if(this.autoRules[i].autoruleid == aruleid) {
            this.autoRulesForm = this.autoRules[i];
            break;
          }
        }
      },
        autoRulesGetCall() {
            axios.get(`/api/autorule?vntid=`+this.vnt.activevntid+'&uservntid='+this.vnt.activeuservntid)
            .then((response) => {
              this.autoRules = response.data.items;
            });
        },
        autoRulesAddCall(srcsvc, dstsvc, srcuser, dstuser, d, active) {
            form = {
              vntid: this.vnt.activevntid,
              uservntid: this.vnt.activeuservntid,
              srcsvc: srcsvc,
              dstsvc: dstsvc,
              srcuser: srcuser,
              dstuser: dstuser,
              active: active,
              description: d
            }
            axios.post(`/api/autorule`, form)
            .then((response) => {
              this.autoRules = response.data.items;
            });
        },
        autoRulesDelCall(autoruleid) {
            const form = {
              vntid: this.vnt.activevntid,
              uservntid: this.vnt.activeuservntid,
              autoruleid: autoruleid
            };
            axios.delete(`/api/autorule`, {data: form})
            .then((response) => {
              this.autoRules = response.data.items;
            });
        },
        autoRulesModifyCall(autoruleid, srcsvc, dstsvc, srcuser, dstuser, d, active) {
            form = {
              vntid: this.vnt.activevntid,
              uservntid: this.vnt.activeuservntid,
              autoruleid: autoruleid,
              srcsvc: srcsvc,
              dstsvc: dstsvc,
              srcuser: srcuser,
              dstuser: dstuser,
              description: d,
              active: active
            };
            axios.put(`/api/autorule`, form)
            .then((response) => {
              this.autoRules = response.data.items;
            });
        },
    },
    template: 
`
{% include 'ui-arules.html' %}
`
};
