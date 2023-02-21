/*
show list of groups and users and show org topology
    <ui-topology>
    </ui-topology>

*/

const uiTopology = {
  name: "ui-topology",
  props: ['dialog'],
  mixins: [mixinlang, mixinvnt],
  data() {
    return {
      groupsmap: [],          // list of nodes and links in JSON (maybe show in JS)
      VntTopoSrc: null, // topology image generated
    }
  },
  methods: {
    // load topology image
    loadTopoImage() {
      axios.get(`/api/groupsmap?vntid=`+this.vnt.activevntid)
      .then(response => (this.groupsmap = response.data.items));
          if(this.vnt.activevntid == null) {
            return;
          }
          axios({
            method: 'get',
            url: '/api/vnttopo?vntid='+this.vnt.activevntid,
            responseType: 'arraybuffer'
          })
          .then((resp) => {
            var mimeType = resp.headers['content-type'].toLowerCase();
            var bytes = new Uint8Array(resp.data);
            var binary = bytes.reduce((data, b) => data += String.fromCharCode(b), '');
            this.VntTopoSrc = 'data:' + mimeType + ';base64,' + btoa(binary);
          })
          .catch((error) => {
            this.VntTopoSrc = 'error';
          });
        },
    },
  template: 
`
{% include 'ui-topology.html' %}
`
};
  