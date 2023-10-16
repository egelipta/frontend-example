// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** BukuTamu List Get All BukuTamus
:return: GET /api/v1/buku_tamu/buku_tamu */
export async function bukuTamuListApiV1BukuTamuBukuTamuGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.bukuTamuListApiV1BukuTamuBukuTamuGetParams,
  options?: { [key: string]: any },
) {
  return request<API.BukuTamuListData>('/api/v1/buku_tamu/buku_tamu', {
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

/** Update BukuTamu Update buku_tamu information
:param post:
:return: PUT /api/v1/buku_tamu/buku_tamu */
export async function bukuTamuUpdateApiV1BukuTamuBukuTamuPut(
  body: API.UpdateBukuTamu,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/buku_tamu/buku_tamu', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** BukuTamu Add BukuTamu Add
:param post: CreateBukuTamu
:return: POST /api/v1/buku_tamu/buku_tamu */
export async function bukuTamuAddApiV1BukuTamuBukuTamuPost(
  body: API.CreateBukuTamu,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/buku_tamu/buku_tamu', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** BukuTamu Delete BukuTamu Delete
:param req:
:return: DELETE /api/v1/buku_tamu/buku_tamu */
export async function bukuTamuDelApiV1BukuTamuBukuTamuDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.bukuTamuDelApiV1BukuTamuBukuTamuDeleteParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/buku_tamu/buku_tamu', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
