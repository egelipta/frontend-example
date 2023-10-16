// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** DaftarPengunjung List Get All DaftarPengunjungs
:return: GET /api/v1/daftar_pengunjung/daftar_pengunjung */
export async function daftarPengunjungListApiV1DaftarPengunjungDaftarPengunjungGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.daftarPengunjungListApiV1DaftarPengunjungDaftarPengunjungGetParams,
  options?: { [key: string]: any },
) {
  return request<API.DaftarPengunjungListData>('/api/v1/daftar_pengunjung/daftar_pengunjung', {
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

/** Update DaftarPengunjung Update daftar_pengunjung information
:param post:
:return: PUT /api/v1/daftar_pengunjung/daftar_pengunjung */
export async function daftarPengunjungUpdateApiV1DaftarPengunjungDaftarPengunjungPut(
  body: API.UpdateDaftarPengunjung,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/daftar_pengunjung/daftar_pengunjung', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** DaftarPengunjung Add DaftarPengunjung Add
:param post: CreateDaftarPengunjung
:return: POST /api/v1/daftar_pengunjung/daftar_pengunjung */
export async function daftarPengunjungAddApiV1DaftarPengunjungDaftarPengunjungPost(
  body: API.CreateDaftarPengunjung,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/daftar_pengunjung/daftar_pengunjung', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** DaftarPengunjung Delete DaftarPengunjung Delete
:param req:
:return: DELETE /api/v1/daftar_pengunjung/daftar_pengunjung */
export async function daftarPengunjungDelApiV1DaftarPengunjungDaftarPengunjungDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.daftarPengunjungDelApiV1DaftarPengunjungDaftarPengunjungDeleteParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/daftar_pengunjung/daftar_pengunjung', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Data Pengunjung GET /api/v1/daftar_pengunjung/daftar_pengunjung/pengunjung */
export async function pengunjungApiV1DaftarPengunjungDaftarPengunjungPengunjungGet(options?: {
  [key: string]: any;
}) {
  return request<any>('/api/v1/daftar_pengunjung/daftar_pengunjung/pengunjung', {
    method: 'GET',
    ...(options || {}),
  });
}

/** Get Photo GET /api/v1/daftar_pengunjung/daftar_pengunjung/upload/photo/${param0} */
export async function getPhotoApiV1DaftarPengunjungDaftarPengunjungUploadPhoto_fileName_get(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPhotoApiV1DaftarPengunjungDaftarPengunjungUploadPhotoFileNameGetParams,
  options?: { [key: string]: any },
) {
  const { file_name: param0, ...queryParams } = params;
  return request<any>(`/api/v1/daftar_pengunjung/daftar_pengunjung/upload/photo/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
