//@ts-nocheck
import {
  pemanduAddApiV1PemanduPemanduPost,
  pemanduDelApiV1PemanduPemanduDelete,
  pemanduListApiV1PemanduPemanduGet,
  pemanduUpdateApiV1PemanduPemanduPut,
} from '@/services/dev-plus/Pemandu';
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
  const [PemanduData, setPemanduData] = useState<API.PemanduItem>();
  // const [UnlockDoor, setUnlockDoor] = useState<API.unlockDoorApiV1CommonUnlockPutParams>();

  // Creating a Role
  const createData = async (values: API.CreatePemandu) => {
    const result = await pemanduAddApiV1PemanduPemanduPost(values);
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
  const deleteData = async (d: API.PemanduItem) => {
    const result = await pemanduDelApiV1PemanduPemanduDelete({ id: d.id });
    if (result.code === 200) {
      // refresh the list
      actionRef.current?.reload();
      message.success(result.message);
    } else {
      message.error(result.message);
    }
  };

  // Modify
  const updateData = async (d: API.UpdatePemandu) => {
    if (PemanduData) {
      d.id = PemanduData.id;
      const result = await pemanduUpdateApiV1PemanduPemanduPut(d);
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

  const columns: ProColumnType<API.PemanduItem>[] = [
    {
      title: 'Nama',
      dataIndex: 'nama',
    },
    {
      title: 'No Hanphone',
      dataIndex: 'no_hp',
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
              setPemanduData(d);
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
        request={async (params) => pemanduListApiV1PemanduPemanduGet({ ...params })}
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
            name={'nama'}
            label={'Nama'}
            placeholder={'Nama'}
            rules={[
              {
                required: true,
                message: 'Nama harus diisi!',
              },
            ]}
          />
          <ProFormText
            name={'no_hp'}
            label={'No Hanphone'}
            placeholder={'No Hanphone'}
            rules={[
              {
                required: true,
                message: 'No Hanphone harus diisi!',
              },
              {
                pattern: /^08[0-9]/,
                message: 'Please enter phone number',
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
        initialValues={PemanduData}
        onFinish={updateData}
        drawerProps={{
          destroyOnClose: true,
          mask: true,
          onClose: () => setEditVisible(false),
        }}
      >
        <ProForm.Item>
          <ProFormText
            name={'nama'}
            label={'Nama'}
            placeholder={'Nama'}
            rules={[
              {
                required: true,
                message: 'Nama harus diisi!',
              },
            ]}
          />
          <ProFormText
            name={'no_hp'}
            label={'No Hanphone'}
            placeholder={'No Hanphone'}
            rules={[
              {
                required: true,
                message: 'No Hanphone harus diisi!',
              },
              {
                pattern: /^08[0-9]/,
                message: 'Please enter phone number',
              },
            ]}
          />
        </ProForm.Item>
      </DrawerForm>
      {/* END::DRAWER EDIT */}
    </PageContainer>
  );
});
