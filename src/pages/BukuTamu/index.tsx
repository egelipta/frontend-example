//@ts-nocheck
import {
  bukuTamuAddApiV1BukuTamuBukuTamuPost,
  bukuTamuDelApiV1BukuTamuBukuTamuDelete,
  bukuTamuListApiV1BukuTamuBukuTamuGet,
  bukuTamuUpdateApiV1BukuTamuBukuTamuPut,
} from '@/services/dev-plus/BukuTamu';
import {
  tiketApiV1LayananLayananTiketGet,
  pengunjungApiV1LayananLayananPengunjungGet,
} from '@/services/dev-plus/Layanan';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import {
  DrawerForm,
  ModalForm,
  ProForm,
  ProFormDateTimePicker,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumnType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Popconfirm, message } from 'antd';
import { memo, useRef, useState } from 'react';

import { ProFormSelect } from '@ant-design/pro-form';

export default memo(() => {
  const actionRef = useRef<ActionType>();
  const [addVisible, setAddVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [BukuTamuData, setBukuTamuData] = useState<API.BukuTamuItem>();

  // const [UnlockDoor, setUnlockDoor] = useState<API.unlockDoorApiV1CommonUnlockPutParams>();
  const [dataTiket, setDataTiket] = useState<Record<string, never>>();
  const [dataPengunjung, setDataPengunjung] = useState<Record<string, never>>();

  const getDataPengunjung = async () => {
    const result = await pengunjungApiV1LayananLayananPengunjungGet();
    if (result.code === 200) {
      // close the window

      // refresh the list
      actionRef.current?.reload();
      // return result;
      setDataPengunjung(result.data);
    } else {
      message.success(result.message);
    }
  };

  const getDataTiket = async () => {
    const result = await tiketApiV1LayananLayananTiketGet();
    if (result.code === 200) {
      // close the window

      // refresh the list
      actionRef.current?.reload();
      // return result;
      setDataTiket(result.data);
    } else {
      message.success(result.message);
    }
  };

  // Creating a Role
  const createData = async (values: API.CreateBukuTamu) => {
    const result = await bukuTamuAddApiV1BukuTamuBukuTamuPost(values);
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
  const deleteData = async (d: API.BukuTamuItem) => {
    const result = await bukuTamuDelApiV1BukuTamuBukuTamuDelete({ id: d.id });
    if (result.code === 200) {
      // refresh the list
      actionRef.current?.reload();
      message.success(result.message);
    } else {
      message.error(result.message);
    }
  };

  // Modify
  const updateData = async (d: API.UpdateBukuTamu) => {
    if (BukuTamuData) {
      d.id = BukuTamuData.id;
      const result = await bukuTamuUpdateApiV1BukuTamuBukuTamuPut(d);
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

  const columns: ProColumnType<API.BukuTamuItem>[] = [
    {
      title: 'No Tiket',
      dataIndex: 'no_tiket',
    },
    {
      title: 'Jam Masuk',
      dataIndex: 'jam_masuk',
    },
    {
      title: 'Jam Keluar',
      dataIndex: 'jam_keluar',
    },
    {
      title: 'Laporan Pekerjaan',
      dataIndex: 'laporan_pekerjaan',
    },
    {
      title: 'Daftar Pengunjung',
      dataIndex: 'daftar_pengunjung',
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
              setBukuTamuData(d);
              setEditVisible(true);
              getDataTiket();
              getDataPengunjung();
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
        request={async (params) => bukuTamuListApiV1BukuTamuBukuTamuGet({ ...params })}
        toolBarRender={() => [
          <Button key="add_data" type="primary" onClick={() => {
            getDataTiket();
            getDataPengunjung();
            setAddVisible(true);
          }}>
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
        <ProForm.Group>
          <ProFormSelect
            width="lg"
            name="no_tiket"
            label="Nomor Tiket"
            valueEnum={dataTiket}
            rules={[{ required: true }]}
          />
        </ProForm.Group>
        <ProForm.Item>
          <ProFormDateTimePicker
            rules={[
              {
                required: true,
                message: 'Jam Masuk harus diisi!',
              },
            ]}
            name="jam_masuk"
            label="Jam Masuk"
          />
          <ProFormDateTimePicker
            rules={[
              {
                required: true,
                message: 'Jam Keluar harus diisi!',
              },
            ]}
            name="jam_keluar"
            label="Jam Keluar"
          />
          <ProFormTextArea
            name={'laporan_pekerjaan'}
            label={'Laporan Pekerjaan'}
            placeholder={'Laporan Pekerjaan'}
            rules={[
              {
                required: true,
                message: 'Laporan Pekerjaan harus diisi!',
              },
            ]}
          />
          <ProFormSelect
            width="lg"
            name="daftar_pengunjung"
            label="Daftar Pengunjung"
            valueEnum={dataPengunjung}
            rules={[{ required: true }]}
          />
          {/* <ProFormSelect
            options={[
              {
                value: 'Waldo Pili',
                label: 'Waldo Pili',
              },
              {
                value: 'Reza Alfabet',
                label: 'Reza Alfabet',
              },
              {
                value: 'Zeki Alfikri',
                label: 'Zeki Alfikri',
              },
            ]}
            mode="multiple"
            name={`daftar_pengunjung`}
            label={`Daftar Pengunjung`}
            rules={[
              {
                required: true,
                message: 'Daftar pengunjung diisi!',
              },
            ]}
          /> */}
        </ProForm.Item>
      </ModalForm>
      {/* END::MODAL TAMBAH */}

      {/* BEGIN::DRAWER EDIT */}
      <DrawerForm
        title={'Editor'}
        visible={editVisible}
        width={500}
        submitter={{ searchConfig: { submitText: 'Save' } }}
        initialValues={BukuTamuData}
        onFinish={updateData}
        drawerProps={{
          destroyOnClose: true,
          mask: true,
          onClose: () => setEditVisible(false),
        }}
      >
        <ProForm.Group>
          <ProFormSelect
            width="lg"
            name="no_tiket"
            label="Nomor Tiket"
            valueEnum={dataTiket}
            rules={[{ required: true }]}
          />
        </ProForm.Group>
        <ProForm.Item>
          <ProFormDateTimePicker
            rules={[
              {
                required: true,
                message: 'Jam Masuk harus diisi!',
              },
            ]}
            name="jam_masuk"
            label="Jam Masuk"
          />
          <ProFormDateTimePicker
            rules={[
              {
                required: true,
                message: 'Jam Keluar harus diisi!',
              },
            ]}
            name="jam_keluar"
            label="Jam Keluar"
          />
        </ProForm.Item>
        <ProForm.Group>
          <ProFormTextArea
            name={'laporan_pekerjaan'}
            label={'Laporan Pekerjaan'}
            placeholder={'Laporan Pekerjaan'}
            rules={[
              {
                required: true,
                message: 'Laporan Pekerjaan harus diisi!',
              },
            ]}
          />
          <ProFormSelect
            width="lg"
            name="daftar_pengunjung"
            label="Daftar Pengunjung"
            valueEnum={dataPengunjung}
            rules={[{ required: true }]}
          />
          {/* <ProFormSelect
            options={[
              {
                value: 'Waldo Pili',
                label: 'Waldo Pili',
              },
              {
                value: 'Reza Alfabet',
                label: 'Reza Alfabet',
              },
              {
                value: 'Zeki Alfikri',
                label: 'Zeki Alfikri',
              },
            ]}
            name={`daftar_pengunjung`}
            label={`Daftar Pengunjung`}
            rules={[
              {
                required: true,
                message: 'Daftar pengunjung diisi!',
              },
            ]}
          /> */}
        </ProForm.Group>
      </DrawerForm>
      {/* END::DRAWER EDIT */}
    </PageContainer>
  );
});
