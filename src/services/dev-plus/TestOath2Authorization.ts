// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** Test Oath2 POST /api/v1/test/oath2 */
export async function testOath2ApiV1TestOath2Post(
  body: API.BodyTestOath2ApiV1TestOath2Post,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === 'object' && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ''));
        } else {
          formData.append(ele, JSON.stringify(item));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<any>('/api/v1/test/oath2', {
    method: 'POST',
    data: formData,
    ...(options || {}),
  });
}
