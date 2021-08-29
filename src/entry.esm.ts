import _Vue, { PluginFunction } from 'vue';

// Import vue components
import {
  ApiView,
} from '@/lib-components';

// install function executed by Vue.use()
const install: PluginFunction<any> = function installVueApiTools(Vue: typeof _Vue) {
  Vue.component('api-view', components.ApiView)
};

// Create module definition for Vue.use()
export default install;
export * from '@/lib-components/index'
export const components = {
  ApiView,
}
