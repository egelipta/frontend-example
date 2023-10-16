import { userUpdate } from '@/services/user/api';
import type { FormInstance } from '@ant-design/pro-form';
import { DrawerForm, ProFormSwitch, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import type { ActionType } from '@ant-design/pro-table';
import { message } from 'antd';
import { memo, useRef } from 'react';

interface IProps {
  actionRef: ActionType | undefined;
  visible: boolean;
  setvisible: (e: boolean) => void;
  UserData: USER.UserItem;
}

export default memo(({ actionRef, visible, setvisible, UserData }: IProps) => {
  const formRef = useRef<FormInstance>();
  // Modify the user
  const updateUser = async (d: USER.UpdateUser) => {
    if (UserData) {
      console.log(d);

      if (d.user_phone === '') {
        d.user_phone = null;
      }
      if (d.password === '') {
        d.password = null;
      }
      d.id = UserData.id;
      const result = await userUpdate(d);
      if (result.code === 200) {
        // refresh the list
        actionRef?.reload();
        setvisible(false);
        message.success(result.message);
      } else {
        message.info(result.message);
      }
    }
  };

  return (
    <DrawerForm
      title={'Edit user'}
      visible={visible}
      formRef={formRef}
      width={500}
      submitter={{ searchConfig: { submitText: 'Save' } }}
      initialValues={UserData}
      onFinish={updateUser}
      drawerProps={{
        destroyOnClose: true,
        mask: true,
        onClose: () => setvisible(false),
      }}
    >
      <ProFormText
        label={'Username'}
        name={'username'}
        placeholder={'Username'}
        rules={[
          {
            required: true,
            message: 'please enter username!',
          },
          {
            min: 3,
            message: 'Minimum 3 characters!',
          },
        ]}
      />
      <ProFormText.Password
        label={'Password'}
        name={'password'}
        placeholder={'Please enter password'}
        rules={[
          {
            min: 6,
            message: 'Password minimum length is 6 characters',
          },
        ]}
      />
      <ProFormText name="user_phone" placeholder="Phone" label={'Phone'} />
      <ProFormSwitch label={'Status'} tooltip={'Default: disabled'} name={'user_status'} />
      <ProFormTextArea
        name="remarks"
        label="Description"
        fieldProps={{ maxLength: 30, showCount: true }}
        rules={[{ max: 30, message: 'Remarks length input within 30 characters' }]}
      />
    </DrawerForm>
  );
});
