/*
services filter
<ui-sfilter></ui-sfilter>
*/

const uiSfilter = {
    name: "ui-sfilter",
    props: ['dialog'],
    mixins: [mixinlang, mixinvnt],
    data() {
      return {
        svcFilters: [],
        svcFilterId: 0,
        svcFiltersForm: {
          svcfilterid: 0,
          l1rule: '',
          l2rule: '',
          l3rule: '',
          l4rule: '',
          desc: '',
          active: '',
          incme: false
        },
      }
    },
    methods: {
      changeSvcFilterId(svcfilterid) {
        for(var i = 0; i < this.svcFilters.length; i++) {
          if(this.svcFilters[i].svcfilterid == svcfilterid) {
            this.svcFiltersForm = this.svcFilters[i];
            break;
          }
        }
      },
        svcFiltersGetCall() {
          axios.get(`/api/services/filters?vntid=`+this.vnt.activevntid+'&uservntid='+this.vnt.activeuservntid)
          .then((response) => {
            this.svcFilters = response.data.items;
          });
        },
        svcFiltersAddCall(l1r, l2r, l3r, l4r, d, i) {
          if(!d) {
            d = '';
          }
          form = {
            vntid: this.vnt.activevntid,
            uservntid: this.vnt.activeuservntid,
            l1rule: l1r,
            l2rule: l2r,
            l3rule: l3r,
            l4rule: l4r,
            descr: d,
            incme: i
          };
          axios.post(`/api/services/filters`, form)
          .then((response) => {
            this.svcFilters = response.data.items;
          });
        },
        svcFiltersDelCall(svcfilterid) {
          const form = {
            vntid: this.vnt.activevntid,
            uservntid: this.vnt.activeuservntid,
            svcfilterid: svcfilterid
          };
          axios.delete(`/api/services/filters`, {data: form})
          .then((response) => {
            this.svcFilters = response.data.items;
          });
        },
        svcFiltersModifyCall(svcfilterid, l1r, l2r, l3r, l4r, d, active, i) {
          form = {
            vntid: this.vnt.activevntid,
            uservntid: this.vnt.activeuservntid,
            svcfilterid: svcfilterid,
            l1rule: l1r,
            l2rule: l2r,
            l3rule: l3r,
            l4rule: l4r,
            descr: d,
            active: active,
            incme: i
          }
          axios.put(`/api/services/filters`, form)
          .then((response) => {
            this.svcFilters = response.data.items;
          });
        },
    },
    template: 
`
{% include 'ui-sfilter.html' %}
`
};
