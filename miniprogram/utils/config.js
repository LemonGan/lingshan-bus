// 灵山公交小程序 - API 配置
// 开发环境：http://localhost:8882
// 生产环境：http://8.138.129.142:8882（待配置 HTTPS）

const DEV = 'http://localhost:8882';
// TODO: 配置 Nginx SSL 后改成 https://8.138.129.142:8882
const PROD = 'http://8.138.129.142:8882';

module.exports = {
  BASE_URL: PROD,
  REQUEST_TIMEOUT: 10000
};
