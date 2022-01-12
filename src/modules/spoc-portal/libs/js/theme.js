import valid, {
    errors,
    sysConfig,
    sysAttachment,
    common,
    api
} from "@public/libs/request.js";


import { mapMutations, mapState } from 'vuex';
let themeName = localStorage.theme;
let themeExterior = localStorage.exterior;
export default {
    data(){
        return {

        }
    },
    created(){
    },
    mounted(){
        if (themeName||themeExterior) {
            this.setLink(themeName,themeExterior);
        } else {
            this.setLink();
        }
        let params = {
            domain: location.host
        }
        api
            .getByDomain(params)
            .then(valid.call(this))
            .then((res) => {
                if (res.ok) {
                    // let loginLogo = document.querySelector('.loginBox .logo');
                    if (res.data.data) {
                        let data = res.data.data;
                        // loginLogo.style.background = "url(" + data.logo + ") center center no-repeat"
                        if ((data.theme && data.theme != themeName)||(data.theme && data.exterior != themeExterior)) {
                            this.setLink(data.theme,data.exterior);
                        }
                        this.$store.commit('updateLogoUrlLight', {logoUrlLight:data.logoLight});
                        this.$store.commit('updateLogoUrl', {logoUrlLight:data.logo});
                    }
                }
            }).finally(() => {

            })
    },
    methods:{
        setLink(color = 'default',type='leftStyle') {
            localStorage.theme = color;
            localStorage.exterior = type;
            if(type=='topStyle'){
                this.$store.commit('changeMenuTheme', 'light');
            }else{
                this.$store.commit('changeMenuTheme', 'dark');
            }
            // let themeDom = document.querySelector('link[name="theme"]');
            // if (!themeDom) {
            //     let dom = document.createElement("LINK");
            //     dom.setAttribute("type", "text/css");
            //     dom.setAttribute("rel", "stylesheet");
            //     dom.setAttribute("name", "theme");
            //     dom.setAttribute("href", "");
            //     document.querySelector("head").appendChild(dom);
            // }
            // let path = '';
            // if (process.env.NODE_ENV.indexOf('dev') > -1) {
            //     path = '/';
            // } else {
            //     path = '/';
            // }
            // let stylesheetPath = path + color + '.css';
            // let themeLink = document.querySelector('link[name="theme"]');
            // themeLink.setAttribute('href', stylesheetPath);
            let themeWrap = document.querySelector('body');
            let classcont = themeWrap.className;
            if (classcont.search(/\w+_wrap/gi) == -1) {
                classcont = classcont + ' ' + color + '_wrap';
            } else {
                classcont = classcont.replace(/\w+_wrap/gi, color + '_wrap');
            }
            if(classcont.search(/\w+Style/gi)==-1){
                classcont=classcont+' '+type;
            }else{
                classcont=classcont.replace(/\w+Style/gi, type);
            }
            themeWrap.className = classcont;
        }
    }
}
// if(themeExterior=='topStyle'){
//     this.$store.commit('changeMenuTheme', 'light');
// }else{
//     this.$store.commit('changeMenuTheme', 'dark');
// }
