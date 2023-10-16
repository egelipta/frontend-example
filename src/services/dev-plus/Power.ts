// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** Power List Get All Pemandus
:return: GET /api/v1/power/power */
export async function powerListApiV1PowerPowerGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.powerListApiV1PowerPowerGetParams,
  options?: { [key: string]: any },
) {
  return request<API.PowerListData>('/api/v1/power/power', {
    method: 'GET',
    params: {
      // pageSize has a default value: 10
      pageSize: '10',
      // current has a default value: 1
      current: '1',

      ...params,
    },
    ...(options || {}),
  });
}

/** Power Put Pemandu Add
:param post: CreatePemandu
:return: PUT /api/v1/power/power */
export async function powerPutApiV1PowerPowerPut(
  body: API.PutPower,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/power/power', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Power Add Pemandu Add
:param post: CreatePemandu
:return: POST /api/v1/power/power */
export async function powerAddApiV1PowerPowerPost(
  body: API.InsertPower,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/power/power', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Pemandu Delete Pemandu Delete
:param req:
:return: DELETE /api/v1/power/power */
export async function powerDelApiV1PowerPowerDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.powerDelApiV1PowerPowerDeleteParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/power/power', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Get data power A GET /api/v1/power/power/power_a */
export async function powerADataApiV1PowerPowerPowerAGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.powerADataApiV1PowerPowerPowerAGetParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/power/power/power_a', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Get data power B GET /api/v1/power/power/power_b */
export async function powerADataApiV1PowerPowerPowerBGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.powerADataApiV1PowerPowerPowerBGetParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/power/power/power_b', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
