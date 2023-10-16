import { userAdd } from '@/services/user/api';
import { ModalForm, ProFormSwitch, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import type { ActionType } from '@ant-design/pro-table';
import { message } from 'antd';
import { memo } from 'react';

interface IProps {
  actionRef: ActionType | undefined;
  visible: boolean;
  setvisible: (e: boolean) => void;
}

export default memo(({ actionRef, visible, setvisible }: IProps) => {
  // Create users
  const createUser = async (values: USER.CreateUser) => {
    if (values.user_phone === '') {
      values.user_phone = null;
    }
    const result = await userAdd(values);
    if (result.code === 200) {
      // close the window
      setvisible(false);
      // refresh the list
      actionRef?.reload();
      message.success(result.message);
    } else {
      message.info(result.message);
    }
  };

  return (
    <ModalForm
      title={'Add user'}
      visible={visible}
      width={500}
      submitter={{ searchConfig: { submitText: 'create' } }}
      onFinish={createUser}
      modalProps={{
        destroyOnClose: true,
        mask: true,
        onCancel: () => setvisible(false),
      }}
    >
      <ProFormText
        name={'username'}
        label={'username'}
        placeholder={'Username'}
        rules={[
          {
            required: true,
            message: 'Please enter username!',
          },
          {
            min: 3,
            message: 'Minimum 3 characters!',
          },
          {
            max: 255,
            message: 'Maximum 255 characters!',
          },
        ]}
      />
      <ProFormText.Password
        name={'password'}
        label={'password'}
        placeholder={'Password'}
        rules={[
          {
            required: true,
            message: 'Please enter the password!',
          },
          {
            min: 6,
            message: 'Minimum 6 characters!',
          },
        ]}
      />
      <ProFormText
        name="user_phone"
        placeholder="phone number"
        label={'phone number'}
        rules={[{ pattern: /^08|628[1-9]{2}[\d]{7,9}$/, message: 'Please enter phone number' }]}
      />

      <ProFormSwitch
        label={'user status'}
        tooltip={'Default disable'}
        name={'user_status'}
        initialValue={false}
      />

      <ProFormTextArea
        label="Remark"
        name="remarks"
        fieldProps={{ maxLength: 30, showCount: true }}
        rules={[{ max: 30, message: 'Remarks length input within 30 characters' }]}
      />
    </ModalForm>
  );
});
