// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 发送验证码 手机号修改 GET /api/v1/sms/modify/send */
export async function sendMsgApiV1SmsModifySendGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sendMsgApiV1SmsModifySendGetParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/sms/modify/send', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 发送验证码 注册、登陆 GET /api/v1/sms/send */
export async function sendMsgApiV1SmsSendGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sendMsgApiV1SmsSendGetParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/sms/send', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
