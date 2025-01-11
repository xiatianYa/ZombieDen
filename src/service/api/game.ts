import { baRequest, zedRequest } from '../request';

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
