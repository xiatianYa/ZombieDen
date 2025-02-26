import { baRequest, wanmeiRequest, zedRequest } from '../request';

/** Get server info */
export function fetchGetServerInfo(params: any) {
  return zedRequest({
    url: '/getserverinfo.php',
    params
  });
}

/** Get server detail */
export function fetchGetPlayerList(params: any) {
  return zedRequest({
    url: '/getplayerlist.php',
    params
  });
}

/** Get map list */
export function fetchGetMapList() {
  return baRequest({
    url: '/api/gameMap/list'
  });
}

/** Get hot list */
export function fetchGetHotList() {
  return wanmeiRequest({
    url: '/api/server/searchServerList?brandId=168&page=1&pageSize=20&a=30000&r=123456&t=1636353975&s=8b9b42abce283ab50384555ebd0d755dda877f4f'
  });
}
