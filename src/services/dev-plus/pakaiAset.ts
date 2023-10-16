// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** PakaiAset Add PengunjungHadir Add
:param post: CreatePengunjungHadir
:return: POST /api/v1/pakai_Aset/pakai_Aset */
export async function pakaiAsetAddApiV1PakaiAsetPakaiAsetPost(
  body: API.InsertAkanPakaiAset,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/pakai_Aset/pakai_Aset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Data Perangkat Get All Employees
:return: GET /api/v1/pakai_Aset/pakai_Aset/layanan_perangkat */
export async function layananPerangkatApiV1PakaiAsetPakaiAsetLayananPerangkatGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.layananPerangkatApiV1PakaiAsetPakaiAsetLayananPerangkatGetParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/pakai_Aset/pakai_Aset/layanan_perangkat', {
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
