// <ui-files></ui-files>
// show attachnments in requests from AWS S3 bucket

const uiFiles = {
    name: "ui-files",
    props: [],
    data() {
      return {
        langp: [],
        activevntid: null,
        activeuservntid: null,
        fileList: [],
        //[{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        //authorization_header: null, // header for use in upload template
        reqid: null,
      }
    },
  template: 
  `
  {% include 'ui-files.html' %}
  `
};