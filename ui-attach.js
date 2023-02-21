// <ui-attach></ui-attach>
// work with attachnments in requests, keep files on AWS S3 bucket

  const uiAttach = {
    name: "ui-attach",
    props: [],
    data() {
      return {
        langp: [],
        activevntid: null,
        activeuservntid: null,
        fileList: [],
        //[{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        authorization_header: null, // header for use in upload template
        reqid: null,
        awsData: null,
        awsUrl: null,
      }
    },
    methods: {
      onChange(file, filelist) {
        axios.get('/api/req/file/send/url?reqid='+this.reqid+'&file_name='+file.name)
        .then(response => {
          this.awsUrl = response.data.message;
          console.log("AWS URL=", this.awsUrl);
        });
        return true
      }
  },
  template: 
`
{% include 'ui-attach.html' %}
`
};