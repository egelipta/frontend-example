// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** Rack List Get All Racks
:return: GET /api/v1/pakai_Aset/rack */
export async function rackListApiV1PakaiAsetRackGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.rackListApiV1PakaiAsetRackGetParams,
  options?: { [key: string]: any },
) {
  return request<API.RackListData>('/api/v1/pakai_Aset/rack', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
