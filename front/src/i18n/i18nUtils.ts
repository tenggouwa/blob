import enUS from '@arco-design/web-react/es/locale/en-US';
import zhTW from '@arco-design/web-react/es/locale/zh-TW';
import zhCN from '@arco-design/web-react/es/locale/zh-CN';

const ArcoLanFileList = [enUS, zhTW, zhCN];

const replaceLan = (lan:string) => lan.replace(/\-/g, '');

const LanNameList = ArcoLanFileList.map(lan => replaceLan(lan.locale))
  
const lanFileForArco = (lang:string) => {
  const result = ArcoLanFileList.find(lan => replaceLan(lan.locale) === lang);
  return result || enUS;
}

const availableLocales = () => {
  return LanNameList;
}

export {
  lanFileForArco,
  availableLocales,
}