// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** Laporan Pintu POST /api/callback/identify */
export async function laporanPintuApiCallbackIdentifyPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.laporanPintuApiCallbackIdentifyPostParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/callback/identify', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
