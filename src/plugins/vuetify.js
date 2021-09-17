import '@mdi/font/css/materialdesignicons.css';
import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors';
import fr from 'vuetify/lib/locale/fr';

Vue.use(Vuetify);

// import plugin
import { TiptapVuetifyPlugin } from 'tiptap-vuetify';
// don't forget to import CSS styles
import 'tiptap-vuetify/dist/main.css';
// Vuetify's CSS styles
import 'vuetify/dist/vuetify.min.css';

const vuetify = new Vuetify({
    lang: {
        locales: { fr },
        current: 'fr'
    },
    theme: {
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
            }
        }
    }
});

// use Vuetify's plugin
Vue.use(Vuetify);
// use this package's plugin
Vue.use(TiptapVuetifyPlugin, {
    // the next line is important! You need to provide the Vuetify Object to this place.
    vuetify, // same as "vuetify: vuetify"
    // optional, default to 'md' (default vuetify icons before v2.0.0)
    iconsGroup: 'mdi'
});

export default vuetify;
