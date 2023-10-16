

import { merekTipeAddApiV1MerekTipeMerekTipePost, merekTipeDelApiV1MerekTipeMerekTipeDelete, merekTipeListApiV1MerekTipeMerekTipeGet, merekTipeUpdateApiV1MerekTipeMerekTipePut } from '@/services/dev-plus/MerekTipe';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { DrawerForm, ModalForm, ProForm, ProFormText } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumnType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Popconfirm, message } from 'antd';
import { memo, useRef, useState } from 'react';

export default memo(() => {
  const actionRef = useRef<ActionType>();
  const [addVisible, setAddVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [MerekTipe, setMerekTipe] = useState<API.MerekTipeItem>();
  // const [UnlockDoor, setUnlockDoor] = useState<API.unlockDoorApiV1CommonUnlockPutParams>();

  // Creating a Role
  const createData = async (values: API.CreateMerekTipe) => {
    const result = await merekTipeAddApiV1MerekTipeMerekTipePost(values);
    if (result.code === 200) {
      // close the window
      setAddVisible(false);
      // refresh the list
      actionRef.current?.reload();
      message.success(result.message);
    } else {
      message.error(result.message);
    }
  };

  // Delete
  const deleteData = async (d: API.MerekTipeItem) => {
    const result = await merekTipeDelApiV1MerekTipeMerekTipeDelete({ id: d.id });
    if (result.code === 200) {
      // refresh the list
      actionRef.current?.reload();
      message.success(result.message);
    } else {
      message.error(result.message);
    }
  };

  // Modify
  const updateData = async (d: API.UpdateMerekTipe) => {
    if (MerekTipe) {
      d.id = MerekTipe.id;
      const result = await merekTipeUpdateApiV1MerekTipeMerekTipePut(d);
      if (result.code === 200) {
        // refresh the list
        actionRef.current?.reload();
        setEditVisible(false);
        message.success(result.message);
      } else {
        message.error(result.message);
      }
    }
  };

  const columns: ProColumnType<API.MerekTipeItem>[] = [
    {
      title: 'Merek',
      dataIndex: 'merek',
    },
    {
      title: 'Tipe',
      dataIndex: 'tipe',
    },
    {
      title: 'Actionable',
      valueType: 'option',
      width: 200,
      render: (_dom, d) => {
        return [
          <Button
            key={'edit'}
            type="dashed"
            shape="round"
            onClick={() => {
              setMerekTipe(d);
              setEditVisible(true);
            }}
          >
            Edit
          </Button>,
          <Popconfirm
            key={'delete'}
            title="Are you sure want to Delete this data?"
            onConfirm={() => deleteData(d)}
            placement="leftTop"
          >
            <Button danger type="primary" shape="default">
              <DeleteOutlined />
            </Button>
          </Popconfirm>,
        ];
      },
    },
  ];
  return (
    <PageContainer>
      <ProTable
        headerTitle="All Data"
        actionRef={actionRef}
        columns={columns}
        size="small"
        cardProps={{ bodyStyle: { paddingBottom: 20, paddingTop: 0 } }}
        pagination={{ defaultPageSize: 20, showSizeChanger: true }}
        locale={{ emptyText: 'Insufficient permission' }}
        request={async (params) => merekTipeListApiV1MerekTipeMerekTipeGet({ ...params })}
        toolBarRender={() => [
          <Button key="add_data" type="primary" onClick={() => setAddVisible(true)}>
            <PlusOutlined />
            Add New
          </Button>,
        ]}
      />

      {/* BEGIN::MODAL TAMBAH */}
      <ModalForm
        title={'Add New'}
        visible={addVisible}
        width={550}
        submitter={{ searchConfig: { submitText: 'Save' } }}
        onFinish={createData}
        modalProps={{
          destroyOnClose: true,
          mask: true,
          onCancel: () => setAddVisible(false),
        }}
      >
        <ProForm.Item>
          <ProFormText
            name={'merek'}
            label={'Merek'}
            placeholder={'Merek'}
            rules={[
              {
                required: true,
                message: 'Merek harus diisi!',
              },
            ]}
          />
          <ProFormText
            name={'tipe'}
            label={'Tipe'}
            placeholder={'Tipe'}
            rules={[
              {
                required: true,
                message: 'Tipe harus diisi!',
              },
            ]}
          />
        </ProForm.Item>
      </ModalForm>
      {/* END::MODAL TAMBAH */}

      {/* BEGIN::DRAWER EDIT */}
      <DrawerForm
        title={'Editor'}
        visible={editVisible}
        width={500}
        submitter={{ searchConfig: { submitText: 'Save' } }}
        initialValues={MerekTipe}
        onFinish={updateData}
        drawerProps={{
          destroyOnClose: true,
          mask: true,
          onClose: () => setEditVisible(false),
        }}
      >
        <ProForm.Item>
          <ProFormText
            name={'name'}
            label={'Name'}
            placeholder={'Name'}
            rules={[
              {
                required: true,
                message: 'Name harus diisi!',
              },
            ]}
          />
          <ProFormText
            name={'seri_merk'}
            label={'Seri/ Merk'}
            placeholder={'Seri/ Merk'}
            rules={[
              {
                required: true,
                message: 'Seri/ Merk harus diisi!',
              },
            ]}
          />
        </ProForm.Item>
      </DrawerForm>
      {/* END::DRAWER EDIT */}
    </PageContainer>
  );
});
function brandAddApiV1MerekTipeMerekTipePost(values: API.CreateMerekTipe) {
  throw new Error('Function not implemented.');
}

