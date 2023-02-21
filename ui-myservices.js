
/*
show my services list only
    <ui-myservices>
    </ui-myservices>

*/

const uiMyservices = {
    name: "ui-myservices",
    props: ['mode'],
    mixins: [mixinlang, mixinvnt],
    data() {
      return {
        //
      }
    },
  template: 
`
{% include 'ui-myservices.html' %}
`
};
