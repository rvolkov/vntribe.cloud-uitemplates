/*
show groups list only
    <ui-groups>
    </ui-groups>

*/

const uiGroups = {
    name: "ui-groups",
    props: ['mode'],
    mixins: [mixinlang, mixinvnt],
    data() {
      return {
        //
      }
    },
  template: 
`
{% include 'ui-groups.html' %}
`
};
  