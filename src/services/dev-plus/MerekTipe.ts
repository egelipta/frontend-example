// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** MerekTipe List Get All MerekTipes
:return: GET /api/v1/merek_tipe/merek_tipe */
export async function merekTipeListApiV1MerekTipeMerekTipeGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.merekTipeListApiV1MerekTipeMerekTipeGetParams,
  options?: { [key: string]: any },
) {
  return request<API.MerekTipeListData>('/api/v1/merek_tipe/merek_tipe', {
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

/** Update MerekTipe Update merek_tipe information
:param post:
:return: PUT /api/v1/merek_tipe/merek_tipe */
export async function merekTipeUpdateApiV1MerekTipeMerekTipePut(
  body: API.UpdateMerekTipe,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/merek_tipe/merek_tipe', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** MerekTipe Add MerekTipe Add
:param post: CreateMerekTipe
:return: POST /api/v1/merek_tipe/merek_tipe */
export async function merekTipeAddApiV1MerekTipeMerekTipePost(
  body: API.CreateMerekTipe,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/merek_tipe/merek_tipe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** MerekTipe Delete MerekTipe Delete
:param req:
:return: DELETE /api/v1/merek_tipe/merek_tipe */
export async function merekTipeDelApiV1MerekTipeMerekTipeDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.merekTipeDelApiV1MerekTipeMerekTipeDeleteParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/merek_tipe/merek_tipe', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Get data merek GET /api/v1/merek_tipe/merek_tipe/merek */
export async function dataMerekApiV1MerekTipeMerekTipeMerekGet(options?: { [key: string]: any }) {
  return request<any>('/api/v1/merek_tipe/merek_tipe/merek', {
    method: 'GET',
    ...(options || {}),
  });
}

/** Get data tipe GET /api/v1/merek_tipe/merek_tipe/tipe */
export async function tipeApiV1MerekTipeMerekTipeTipeGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tipeApiV1MerekTipeMerekTipeTipeGetParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/merek_tipe/merek_tipe/tipe', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
