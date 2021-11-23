import '@mdi/font/css/materialdesignicons.css';
import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors';
import fr from 'vuetify/lib/locale/fr';

Vue.prototype.isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
Vue.prototype.isDarkTheme = false;
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
                primary: '#386FA4',
                secondary: '#133C55',
                light: colors.grey.lighten3,
                light1: colors.grey.lighten1,
                light2: '#91E5F6',
                light3: '#BBEFFA'
            },
            dark: {
                primary: '#386FA4',
                secondary: '#133C55',
                light: colors.grey.lighten3,
                light1: colors.grey.lighten1,
                light2: '#91E5F6',
                light3: '#ACEBF9'
            }
        }
    }
});

// use Vuetify's plugin
Vue.use(Vuetify);

export default vuetify;
