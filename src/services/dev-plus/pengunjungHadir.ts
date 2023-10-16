// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** PengunjungHadir Add PengunjungHadir Add
:param post: CreatePengunjungHadir
:return: POST /api/v1/pengunjung_hadir/pengunjung_hadir */
export async function pengunjungHadirAddApiV1PengunjungHadirPengunjungHadirPost(
  body: API.InsertAkanHadir,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/pengunjung_hadir/pengunjung_hadir', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** PengunjungHadir Delete PengunjungHadir Delete
:param req:
:return: DELETE /api/v1/pengunjung_hadir/pengunjung_hadir */
export async function pengunjungHadirDelApiV1PengunjungHadirPengunjungHadirDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.pengunjungHadirDelApiV1PengunjungHadirPengunjungHadirDeleteParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/pengunjung_hadir/pengunjung_hadir', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Data Pengunjung Get All Employees
:return: GET /api/v1/pengunjung_hadir/pengunjung_hadir/layanan_pengunjung */
export async function layananPerangkatApiV1PengunjungHadirPengunjungHadirLayananPengunjungGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.layananPerangkatApiV1PengunjungHadirPengunjungHadirLayananPengunjungGetParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/pengunjung_hadir/pengunjung_hadir/layanan_pengunjung', {
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
