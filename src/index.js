import locale from './utils/locale';

import HelloWorld from "../packages/hello-world/src";
import cloudvMap from '../packages/cloudv-map/src';

const components = [HelloWorld, cloudvMap];
const version = "0.0.8";

const install = function (Vue, opts = {}) {
  // 判断是否安装
  if (install.installed) return;
  locale.use(opts.locale);
  locale.i18n(opts.i18n);

  components.forEach((component) => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default { version, install, HelloWorld, cloudvMap };
