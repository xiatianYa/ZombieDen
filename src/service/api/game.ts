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
    url: '/perfectWorldServerList.php'
  });
}
