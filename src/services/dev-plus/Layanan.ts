// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** Layanan List Get All Layanans
:return: GET /api/v1/layanan/layanan */
export async function layananListApiV1LayananLayananGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.layananListApiV1LayananLayananGetParams,
  options?: { [key: string]: any },
) {
  return request<API.LayananListData>('/api/v1/layanan/layanan', {
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

/** Update Layanan Update layanan information
:return:
:param post: PUT /api/v1/layanan/layanan */
export async function layananUpdateApiV1LayananLayananPut(
  body: API.UpdateLayanan,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/layanan/layanan', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Layanan Add Layanan Add
:param post: CreateLayanan
:return: POST /api/v1/layanan/layanan */
export async function layananAddApiV1LayananLayananPost(
  body: API.CreateLayanan,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/layanan/layanan', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Layanan Delete Layanan Delete
:param req:
:return: DELETE /api/v1/layanan/layanan */
export async function layananDelApiV1LayananLayananDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.layananDelApiV1LayananLayananDeleteParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/layanan/layanan', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Data Tiket GET /api/v1/layanan/layanan/pengunjung */
export async function pengunjungApiV1LayananLayananPengunjungGet(options?: { [key: string]: any }) {
  return request<any>('/api/v1/layanan/layanan/pengunjung', {
    method: 'GET',
    ...(options || {}),
  });
}

/** Data Tiket GET /api/v1/layanan/layanan/tiket */
export async function tiketApiV1LayananLayananTiketGet(options?: { [key: string]: any }) {
  return request<any>('/api/v1/layanan/layanan/tiket', {
    method: 'GET',
    ...(options || {}),
  });
}

/** Tolak Layanan Update layanan information
:return:
:param post: PUT /api/v1/layanan/layanan/tolak */
export async function layananTolakApiV1LayananLayananTolakPut(
  body: API.TolakLayanan,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/layanan/layanan/tolak', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Get File GET /api/v1/layanan/layanan/upload/file/${param0} */
export async function getFileApiV1LayananLayananUploadFile_fileName_get(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getFileApiV1LayananLayananUploadFileFileNameGetParams,
  options?: { [key: string]: any },
) {
  const { file_name: param0, ...queryParams } = params;
  return request<any>(`/api/v1/layanan/layanan/upload/file/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
