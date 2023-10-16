// https://umijs.org/config/
import { defineConfig } from '@umijs/max';
import { join } from 'path';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV = 'dev' } = process.env;

export default defineConfig({
  /**
   * @name Open the HASH mode
   * @description Let the product after Build contain the Hash suffix.It is usually used to release and avoid browser loading cache.
   * @doc https://umijs.org/docs/api/config#hash
   */
  hash: true,

  /**
   * @name Compatibility settings
   * @description Setting IE11 is not necessarily perfect, you need to check all the dependencies you use
   * @doc https://umijs.org/docs/api/config#targets
   */
  // targets: {
  //   ie: 11,
  // },
  /**
   * @name The configuration of the routing, the files not introduced in the route will not compile
   * @description Only support Path, Component, Routes, Redirect, Wrappers, Title configuration
   * @doc https://umijs.org/docs/guides/routes
   */
  // umi routes: https://umijs.org/docs/routing
  routes,
  /**
   * @name Configuration of theme
   * @description Although it is called the theme, it is actually just a variable settings for LESS
   * @doc Antd's theme settings https://ant.design/docs/react/customize-theme-cn
   * @doc UMI's theme configuration https://umijs.org/docs/api/config#theme
   */
  theme: {
    // If you don't want ConfigProvide to dynamically set the theme, you need to set this to default
    // Only set to VARIABLE
    'root-entry-name': 'variable',
  },
  /**
   * @name moment International configuration
   * @description If there is no requirement for internationalization, the bag size of the JS can be reduced after opening
   * @doc https://umijs.org/docs/api/config#ignoremomentlocale
   */
  ignoreMomentLocale: true,
  /**
   * @name Proxy configuration
   * @description You can allow your local server to represent your server so that you can access the data of the server
   * @see It should be noted that the following agents can only be used in local development, and it cannot be used after Build.
   * @doc Agent introduction https://umijs.org/docs/guides/proxy
   * @doc Proxy configuration https://umijs.org/docs/api/config#proxy
   */
  proxy: proxy[REACT_APP_ENV as keyof typeof proxy],
  /**
   * @name Quick hot update configuration
   * @description A good hot update component, you can retain the state when updated
   */
  fastRefresh: true,
  //============== The following are the plug -in configuration of MAX ===============
  /**
   * @name Data stream plug -in
   * @@doc https://umijs.org/docs/max/data-flow
   */
  model: {},
  /**
   * A global initial data stream, you can use it to share data between plugins
   * @description It can be used to store some global data, such as user information, or some global status. The global initial state is created at the beginning of the entire UMI project.
   * @doc https://umijs.org/docs/max/data-flow#%E5%85%A8%E5%B1%80%E5%88%9D%E5%A7%8B%E7%8A%B6%E6%80%81
   */
  initialState: {},
  /**
   * @name layout Plug-in
   * @doc https://umijs.org/docs/max/layout-menu
   */
  title: 'PJVMS',
  layout: {
    locale: true,
    ...defaultSettings,
  },
  /**
   * @name moment2dayjs Plug -in
   * @description Replace the moment in the project to dayjs
   * @doc https://umijs.org/docs/max/moment2dayjs
   */
  moment2dayjs: {
    preset: 'antd',
    plugins: ['duration'],
  },
  /**
   * @name International plug -in
   * @doc https://umijs.org/docs/max/i18n
   */
  locale: {
    // default zh-CN
    default: 'en-US',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  /**
   * @name antd Plug-in
   * @description Builtin Babel Import plugin
   * @doc https://umijs.org/docs/max/antd#antd
   */
  antd: {},
  /**
   * @name Network request configuration
   * @description It provides a unified network request and error processing solution based on AXIOS and Ahooks.
   * @doc https://umijs.org/docs/max/request
   */
  request: {},
  /**
   * @name Permission plugin
   * @description Based on the initialState permissions plug -in, you must first open the initialState
   * @doc https://umijs.org/docs/max/access
   */
  access: {},
  /**
   * @name <head> Extravagant script
   * @description Configure the additional SCRIPT in <head>
   */
  headScripts: [
    // Solve the problem of the white screen when loading for the first time
    { src: '/scripts/loading.js', async: true },
  ],
  //================ Pro plugin configuration =================
  presets: ['umi-presets-pro'],
  /**
   * @name openAPI Configuration of plug -in
   * @description Generate Serve and Mock based on the specifications of OpenAPI, which can reduce many model code
   * @doc https://pro.ant.design/zh-cn/docs/openapi/
   */
  openAPI: [
    {
      requestLibPath: "import { request } from '@umijs/max'",
      // Or use the online version
      // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json"
      schemaPath: join(__dirname, 'oneapi.json'),
      mock: false,
    },
    {
      requestLibPath: "import { request } from '@umijs/max'",
      schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
      projectName: 'swagger',
    },
  ],
  mfsu: {
    strategy: 'normal',
  },
  requestRecord: {},
});
