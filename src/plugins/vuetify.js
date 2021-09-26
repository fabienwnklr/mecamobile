import '@mdi/font/css/materialdesignicons.css';
import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors';
import fr from 'vuetify/lib/locale/fr';


Vue.prototype.isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
Vue.use(Vuetify);

const vuetify = new Vuetify({
    lang: {
        locales: { fr },
        current: 'fr'
    },
    theme: {
        dark: Vue.prototype.isDarkTheme,
        options: {
            customProperties: true
        },
        themes: {
            light: {
                primary: colors.shades.black,
                secondary: '#818383',
                accent: '#2178ff',
                light: colors.grey.lighten4,
                light2: colors.grey.lighten3,
                light3: colors.grey.lighten2
            },
            dark: {
                accent: colors.blue.lighten1
            }
        }
    }
});

// use Vuetify's plugin
Vue.use(Vuetify);

export default vuetify;
