// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** Lokasi List Get All Lokasis
:return: GET /api/v1/lokasi/lokasi */
export async function lokasiListApiV1LokasiLokasiGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.lokasiListApiV1LokasiLokasiGetParams,
  options?: { [key: string]: any },
) {
  return request<API.LokasiListData>('/api/v1/lokasi/lokasi', {
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

/** Update Lokasi Update lokasi information
:param post:
:return: PUT /api/v1/lokasi/lokasi */
export async function lokasiUpdateApiV1LokasiLokasiPut(
  body: API.UpdateLokasi,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/lokasi/lokasi', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Lokasi Add Lokasi Add
:param post: CreateLokasi
:return: POST /api/v1/lokasi/lokasi */
export async function lokasiAddApiV1LokasiLokasiPost(
  body: API.CreateLokasi,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/lokasi/lokasi', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Lokasi Delete Lokasi Delete
:param req:
:return: DELETE /api/v1/lokasi/lokasi */
export async function lokasiDelApiV1LokasiLokasiDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.lokasiDelApiV1LokasiLokasiDeleteParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/lokasi/lokasi', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Get data lokasi GET /api/v1/lokasi/lokasi/lokasi */
export async function dataLokasiApiV1LokasiLokasiLokasiGet(options?: { [key: string]: any }) {
  return request<any>('/api/v1/lokasi/lokasi/lokasi', {
    method: 'GET',
    ...(options || {}),
  });
}

/** Get data nama_ruangan GET /api/v1/lokasi/lokasi/nama_ruangan */
export async function namaRuanganApiV1LokasiLokasiNamaRuanganGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.namaRuanganApiV1LokasiLokasiNamaRuanganGetParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/lokasi/lokasi/nama_ruangan', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Get data rak GET /api/v1/lokasi/lokasi/posisi_u */
export async function posisiUDataApiV1LokasiLokasiPosisiUGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.posisiUDataApiV1LokasiLokasiPosisiUGetParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/lokasi/lokasi/posisi_u', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Get data rak GET /api/v1/lokasi/lokasi/rak */
export async function rakApiV1LokasiLokasiRakGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.rakApiV1LokasiLokasiRakGetParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/lokasi/lokasi/rak', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
