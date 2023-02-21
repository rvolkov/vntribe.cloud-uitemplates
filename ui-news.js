/*
  <ui-news></ui-news>
*/

const uiNews = {
  name: "ui-news",
  props: [],
  data() {
    return {
      drawer: false,  // vnt news drawer
      NewsForm: {
        subject: '',
        newstext: ''
      },
      news_list: [],
      activenickvnt: null,
      activevntid: null,
      activeuservntid: null,
    }
  },
  methods: {
    NewsGetCall() {
      console.log('Call for NewsGetCall');
      if(this.activevntid) {
        console.log('We have activevntid');
        var self = this;
        axios
          .get(`/api/news?vntid=`+this.activevntid)//, { headers: { Authorization: `JWT ${localStorage.token}` } })
          .then((response) => {
            //console.log('We have reply:', response.data.items);
            self.news_list = response.data.items;
            for(var i = 0; i < self.news_list.length; i++) {
              //console.log("news_list.created1=", self.news_list[i].created);
              self.news_list[i].created = new Date(self.news_list[i].created);
              //console.log("news_list.created2=", self.news_list[i].created);
              self.news_list[i].created = self.news_list[i].created.toLocaleString();
              //console.log("news_list.created3=", self.news_list[i].created);
            }
            //console.log('We have reply2:', self.news_list);
          });
      }
    },
    NewsAddCall(subject, newstext) {
      if(subject && newstext) {
      form = {
        vntid: this.activevntid,
        uservntid: this.activeuservntid,
        subject: subject,
        newstext: newstext
      };
      var self = this;
      axios
        .post(`/api/news`, form)//, { headers: { Authorization: `JWT ${localStorage.token}` } })
        .then((response) => {
          self.NewsGetCall();
        });
      this.NewsForm.subject = '';
      this.NewsForm.newstext = '';
      }
    }
  },
  template: 
`
{% include 'ui-news.html' %}
`
};
