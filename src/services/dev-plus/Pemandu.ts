// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** Pemandu List Get All Pemandus
:return: GET /api/v1/pemandu/pemandu */
export async function pemanduListApiV1PemanduPemanduGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.pemanduListApiV1PemanduPemanduGetParams,
  options?: { [key: string]: any },
) {
  return request<API.PemanduListData>('/api/v1/pemandu/pemandu', {
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

/** Update Pemandu Update pemandu information
:return:
:param post: PUT /api/v1/pemandu/pemandu */
export async function pemanduUpdateApiV1PemanduPemanduPut(
  body: API.UpdatePemandu,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/pemandu/pemandu', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Pemandu Add Pemandu Add
:param post: CreatePemandu
:return: POST /api/v1/pemandu/pemandu */
export async function pemanduAddApiV1PemanduPemanduPost(
  body: API.CreatePemandu,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/pemandu/pemandu', {
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
:return: DELETE /api/v1/pemandu/pemandu */
export async function pemanduDelApiV1PemanduPemanduDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.pemanduDelApiV1PemanduPemanduDeleteParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/pemandu/pemandu', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Data Pemandu GET /api/v1/pemandu/pemandu/dataPemandu */
export async function dataPemanduApiV1PemanduPemanduDataPemanduGet(options?: {
  [key: string]: any;
}) {
  return request<any>('/api/v1/pemandu/pemandu/dataPemandu', {
    method: 'GET',
    ...(options || {}),
  });
}
