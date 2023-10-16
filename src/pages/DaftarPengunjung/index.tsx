//@ts-nocheck
import {
  daftarPengunjungAddApiV1DaftarPengunjungDaftarPengunjungPost,
  daftarPengunjungDelApiV1DaftarPengunjungDaftarPengunjungDelete,
  daftarPengunjungListApiV1DaftarPengunjungDaftarPengunjungGet,
  daftarPengunjungUpdateApiV1DaftarPengunjungDaftarPengunjungPut,
} from '@/services/dev-plus/DaftarPengunjung';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { ProFormUploadButton } from '@ant-design/pro-components';
import {
  DrawerForm,
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProForm,
} from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumnType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Popconfirm, message } from 'antd';
import type { RcFile, UploadChangeParam, UploadProps } from 'antd/es/upload/interface';
import { memo, useRef, useState } from 'react';

export default memo(() => {
  const actionRef = useRef<ActionType>();
  const [addVisible, setAddVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [daftarPengunjung, setDaftarPengunjung] = useState<API.DaftarPengunjungItem>();
  const [fotoPengunjung, setFotoPengunjung] = useState('');


  const upload_props: UploadProps = {
    action: '/api/v1/admin/user/photo/upload',
    method: 'POST',
    maxCount: 1,
    accept: 'image/png, image/jpeg',
    beforeUpload: async (file: RcFile) => {
      // The adjustment file is a file object
      // File type judgment
      const file_type = "'image/png', 'image/jpeg'";
      if (!file_type.indexOf(file.type)) {
        message.info('Support file type PNG, JPG');
        return false;
      }
      // File size judgment
      if (file.size > 1 * 1048576) {
        message.info('File size within 1MB!');
        return false;
      }
      return true;
    },
    onChange: (info: UploadChangeParam) => {
      // Upload the logo as Done
      if (info.file.status === 'done') {
        // const newCurrentUser = currentUser!;
        const url = info.file.response.data.url;
        setFotoPengunjung(url);
        console.log('url photo:', url);
        // message.success(info.file.response.message);
      }
    },
  };

  // Creating a Role
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const createData = async (values: API.CreateAset) => {
    values.foto = fotoPengunjung;
    const result = await daftarPengunjungAddApiV1DaftarPengunjungDaftarPengunjungPost(values);
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

  // Delete the role
  const deleteData = async (d: API.DaftarPengunjungItem) => {
    const result = await daftarPengunjungDelApiV1DaftarPengunjungDaftarPengunjungDelete({ id: d.id });
    if (result.code === 200) {
      // refresh the list
      actionRef.current?.reload();
      message.success(result.message);
    } else {
      message.error(result.message);
    }
  };

  // Modify the role
  const updateData = async (d: API.UpdateAset) => {
    if (daftarPengunjung) {
      d.id = daftarPengunjung.id;
      d.foto = fotoPengunjung;
      const result = await daftarPengunjungUpdateApiV1DaftarPengunjungDaftarPengunjungPut(d);
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

  // Define the header
  const columns: ProColumnType<API.DaftarPengunjungItem>[] = [
    {
      title: 'NIK/ NIP',
      dataIndex: 'nik',
    },
    {
      title: 'Nama Pengunjung',
      dataIndex: 'nama',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Instansi/ Perusahaan',
      dataIndex: 'instansi',
    },
    {
      title: 'Foto',
      dataIndex: 'foto',
      hideInSearch: true,
      render: (foto) => (
        <img
          src={`/api/v1/daftar_pengunjung/daftar_pengunjung${foto}`}
          alt="Foto Pengunjung"
          style={{ width: '50px' }}
        />
      ),
    },
    {
      title: 'Actionable',
      valueType: 'option',
      width: 200,
      render: (_dom, d) => {
        return [
          // <Button
          //   key={'disable'}
          //   type={d.status === 1 ? 'dashed' : 'primary'}
          //   danger={false}
          //   onClick={() => changeStatus(d)}
          // >
          //   {d.status === 1 ? 'Disable' : 'Enable'}
          // </Button>,
          <Button
            key={'edit'}
            type="dashed"
            shape="round"
            onClick={() => {
              setDaftarPengunjung(d);
              setFotoPengunjung(d.foto ? d.foto : '');
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
            <Button danger type="primary">
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
        headerTitle="Aset"
        actionRef={actionRef}
        columns={columns}
        size="small"
        cardProps={{ bodyStyle: { paddingBottom: 20, paddingTop: 0 } }}
        // pagination={{ pageSize: 10 }}
        pagination={{ defaultPageSize: 10, showSizeChanger: true }}
        locale={{ emptyText: 'Insufficient permission' }}
        request={async (params) => daftarPengunjungListApiV1DaftarPengunjungDaftarPengunjungGet({ ...params })}
        toolBarRender={() => [
          <Button
            key="add_user"
            type="primary"
            onClick={() => {
              setAddVisible(true);

            }}
          >
            <PlusOutlined />
            Add New
          </Button>,
        ]}
      />

      <ModalForm
        title={'Add New'}
        visible={addVisible}
        width={550}
        submitter={{ searchConfig: { submitText: 'Save' } }}
        onFinish={createData}
        modalProps={{
          destroyOnClose: true,
          mask: true,
          onCancel: () => {
            setAddVisible(false);
            // setFpLoading(false);


          },
        }}
      >
        <ProForm.Group>
          <ProFormText
            name={'nik'}
            label={'NIK/ NIP'}
            placeholder={'NIK/ NIP'}
            rules={[
              {
                required: true,
                message: 'NIK/ NIP harus diisi!',
              },
            ]}
          />
        </ProForm.Group>
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
          <ProFormSelect
            options={[
              {
                value: 'ASN',
                label: 'ASN',
              },
              {
                value: 'Tenaga Ahli',
                label: 'Tenaga Ahli',
              },
              {
                value: 'Vendor',
                label: 'Vendor',
              },
            ]}
            name={`status`}
            label={`Status`}
            placeholder={'Status'}
            rules={[
              {
                required: true,
                message: 'Status harus diisi!',
              },
            ]}
          />
          <ProFormText
            name={'instansi'}
            label={'Instansi/ Perusahaan'}
            placeholder={'Instansi/ Perusahaan'}
            rules={[
              {
                required: true,
                message: 'Instansi/ Perusahaan harus diisi!',
              },
            ]}
          />
          {/**UPLOAD FOTO */}
          <ProFormUploadButton
            name="photo_box"
            title="Upload"
            rules={[{ required: true }]}
            extra="Foto Pengunjung"
            max={1}
            showUploadList={false}
            {...upload_props}
            fieldProps={{
              headers: { Authorization: `Bearer ${localStorage.getItem('Authorization') || ''}` },
            }}
          />
        </ProForm.Item>
      </ModalForm>

      {/* drawer edit */}
      <DrawerForm
        title={'Editor'}
        visible={editVisible}
        width={500}
        submitter={{ searchConfig: { submitText: 'Save' } }}
        initialValues={daftarPengunjung}
        onFinish={updateData}
        drawerProps={{
          destroyOnClose: true,
          mask: true,
          onClose: () => setEditVisible(false),
        }}
      >
        <ProForm.Group>
          <ProFormText
            name={'nik'}
            label={'NIK/ NIP'}
            placeholder={'NIK/ NIP'}
            rules={[
              {
                required: true,
                message: 'NIK/ NIP harus diisi!',
              },
            ]}
          />
        </ProForm.Group>
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
          <ProFormSelect
            options={[
              {
                value: 'ASN',
                label: 'ASN',
              },
              {
                value: 'Tenaga Ahli',
                label: 'Tenaga Ahli',
              },
              {
                value: 'Vendor',
                label: 'Vendor',
              },
            ]}
            name={`status`}
            label={`Status`}
            placeholder={'Status'}
            rules={[
              {
                required: true,
                message: 'Status harus diisi!',
              },
            ]}
          />
          <ProFormText
            name={'instansi'}
            label={'Instansi/ Perusahaan'}
            placeholder={'Instansi/ Perusahaan'}
            rules={[
              {
                required: true,
                message: 'Instansi/ Perusahaan harus diisi!',
              },
            ]}
          />
          {/**UPLOAD FOTO */}
          <ProFormUploadButton
            name="photo_box"
            title="Upload"
            rules={[{ required: true }]}
            extra="Foto Pengunjung"
            max={1}
            showUploadList={false}
            {...upload_props}
            fieldProps={{
              headers: { Authorization: `Bearer ${localStorage.getItem('Authorization') || ''}` },
            }}
          />
        </ProForm.Item>
      </DrawerForm>
    </PageContainer>
  );
});




