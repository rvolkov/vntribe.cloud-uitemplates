
/*
show top menu
    <ui-topmenu>
    </ui-topmenu>

*/

const uiTopmenu = {
    name: "ui-topmenu",
    props: [],
    mixins: [mixinlang],
    components: {
        "ui-help": uiHelp,
        "ui-vntselector": uiVntselector,
    },
    data() {
        return {
            langp: [],
            activevntid: null,
            activeuservntid: null,
            groupsmapVisible: false,
            activeIndex: '1',
            accountVisible: false,
            svcfilterVisible: false,
            autorulesVisible: false,
        }
    },
    methods: {
        // To log out, we just need to remove the token
        logout: function() {
            localStorage.removeItem('token');
            window.sessionStorage.token = "";
            //document.cookie = "vntlogintoken=example; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/vnt";
            window.location.href = "/";
        },
    },
    template: 
`
{% include 'ui-topmenu.html' %}
`
};