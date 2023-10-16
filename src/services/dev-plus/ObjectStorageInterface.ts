// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** Get Federation Token 获取临时访问token
:return: GET /api/v1/cos/get/federation/token */
export async function getFederationTokenApiV1CosGetFederationTokenGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getFederationTokenApiV1CosGetFederationTokenGetParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/cos/get/federation/token', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
