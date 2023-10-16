// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** Aset List Get All Asets
:return: GET /api/v1/aset/aset */
export async function asetListApiV1AsetAsetGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.asetListApiV1AsetAsetGetParams,
  options?: { [key: string]: any },
) {
  return request<API.AsetListData>('/api/v1/aset/aset', {
    method: 'GET',
    params: {
      // pageSize has a default value: 10
      pageSize: '10',
      // current has a default value: 1
      current: '1',

      // status_aset has a default value: true
      status_aset: 'true',

      ...params,
    },
    ...(options || {}),
  });
}

/** Update Aset Update aset information
:return:
:param post: PUT /api/v1/aset/aset */
export async function asetUpdateApiV1AsetAsetPut(
  body: API.UpdateAset,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/aset/aset', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Aset Add Aset Add
:param post: CreateAset
:return: POST /api/v1/aset/aset */
export async function asetAddApiV1AsetAsetPost(
  body: API.CreateAset,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/aset/aset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Data Perangkat GET /api/v1/aset/aset/dataPerangkat */
export async function dataPerangkatApiV1AsetAsetDataPerangkatGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.dataPerangkatApiV1AsetAsetDataPerangkatGetParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/aset/aset/dataPerangkat', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Aset List with Status False Get All Asets with status_aset=False
:return: GET /api/v1/aset/aset/status-false */
export async function asetListWithStatusFalseApiV1AsetAsetStatusFalseGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.asetListWithStatusFalseApiV1AsetAsetStatusFalseGetParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/aset/aset/status-false', {
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

/** Aset List with Status False Get All Asets with status_aset=False
:return: GET /api/v1/aset/aset/status-tmp */
export async function asetListWithStatusTmpApiV1AsetAsetStatusTmpGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.asetListWithStatusTmpApiV1AsetAsetStatusTmpGetParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/aset/aset/status-tmp', {
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

/** Update Aset Status PUT /api/v1/aset/aset/update-status */
export async function updateStatusAsetApiV1AsetAsetUpdateStatusPut(
  body: API.UpdateStatusAset,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/aset/aset/update-status', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Get Photo GET /api/v1/aset/aset/upload/photo/${param0} */
export async function getPhotoApiV1AsetAsetUploadPhoto_fileName_get(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPhotoApiV1AsetAsetUploadPhotoFileNameGetParams,
  options?: { [key: string]: any },
) {
  const { file_name: param0, ...queryParams } = params;
  return request<any>(`/api/v1/aset/aset/upload/photo/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Aset Delete Aset Delete
:param req:
:return: DELETE /api/v1/aset/asetaset-tmp */
export async function asetDelTmpApiV1AsetAsetasetTmpDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.asetDelTmpApiV1AsetAsetasetTmpDeleteParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/aset/asetaset-tmp', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** status-book PengunjungHadir Add
:param post: CreatePengunjungHadir
:return: PUT /api/v1/aset/asetbook-status */
export async function bookStatusPutApiV1AsetAsetbookStatusPut(
  body: API.InsertAkanPakaiAset,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/aset/asetbook-status', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
