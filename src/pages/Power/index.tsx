//@ts-nocheck
import {
  powerAddApiV1PowerPowerPost,
  powerDelApiV1PowerPowerDelete,
  powerListApiV1PowerPowerGet,
  // pemanduUpdateApiV1PemanduPemanduPut,
} from '@/services/dev-plus/Power';


import { DeleteOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { DrawerForm, ModalForm, ProForm, ProFormText, ProFormSelect } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumnType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Popconfirm, message, Card, Form, Select, Modal, Input, Space, InputNumber } from 'antd';
import { memo, useRef, useState,useEffect } from 'react';
import { dataLokasiApiV1LokasiLokasiLokasiGet, 
          namaRuanganApiV1LokasiLokasiNamaRuanganGet,
          rakApiV1LokasiLokasiRakGet
 } from '@/services/dev-plus/Lokasi';
import Operation from 'antd/es/transfer/operation';


export default memo(() => {
  const actionRef = useRef<ActionType>();
  const [addVisible, setAddVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [PemanduData, setPemanduData] = useState<API.PemanduItem>();
  const [PowerData, setPowerData] = useState<API.PowerItem>();
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [disableAddNew, setDisableAddNew] = useState(true);
  const [namaData, setNamaData] = useState("All Data");
  const [dataSocket, setDataSocket] = useState([]);

  const [dataLokasi, setDataLokasi] = useState([]);
  const [lokasi, setLokasi] = useState('');

  const [dataNamaRuangan, setDataNamaRuangan] = useState([]);
  const [NamaRuangan, setNamaRuangan] = useState('');

  const [dataRak, setDataRak] = useState({});
  const [Rak, setRak] = useState('');


  // const [UnlockDoor, setUnlockDoor] = useState<API.unlockDoorApiV1CommonUnlockPutParams>();

  
  const reloadPower: API.PowerItem = {
    // id: d,
    lokasi: lokasi,
    nama_ruangan: NamaRuangan,
    posisi_rak: Rak,

  };

  // Creating a Role
  const createData = async (values: API.CreatePower) => {
    const result = await powerAddApiV1PowerPowerPost(values);
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
  const deleteData = async (d: API.PowerItem) => {
    const result = await powerDelApiV1PowerPowerDelete({ id: d.id });
    if (result.code === 200) {
      // refresh the list
      getDataPDU(reloadPower);
      message.success(result.message);
    } else {
      message.error(result.message);
    }
  };

  const fetchDataLokasi = async () => {
    try {
      console.log('getting Lokasi')
      const result = await dataLokasiApiV1LokasiLokasiLokasiGet();
      console.log('Lokasi done')
      if (result.code === 200) {
        setDataLokasi(result.data);
      } else {
        console.error('Error fetching dataLokasi:', result.message);
      }
    } catch (error) {
      console.error('Error fetching dataLokasi:', error);
    }
  };

  const getDataPDU = async (values: API.PowerItem) => {
    
      const result = await powerListApiV1PowerPowerGet(values);
      if (result.success) {
        // refresh the list
        setPowerData(result.data)
        setDisableAddNew(false)
        setNamaData("Lokasi "+ lokasi + " Ruangan "+ NamaRuangan + " Rak " +Rak)
        actionRef.current?.reload();
        message.success(result.message);
      } else {
        message.error(result.message);
      }
    
  };

  const iNeedMorePower = async (values) => {
    // const temps = selRows.map((row) => row.id);
    // console.log(temps)
    // try {
    //   // const authorized_device_ids = selRows.map(({ id }) => id);
    //   // console.log(authorized_device_ids)
    //   selRows?.map(a => console.log(a))
    // } catch (error) {
    //   console.log(error)
    // }

    const tipes = values.users.map(({ tipe }) => tipe);
    const jumlahs = values.users.map(({ jumlah }) => jumlah);

    console.log("ini data socket ya", values.users.tipe)

    const deauthPer: API.InsertPower = {
      // id: d,
      nama: values.nama,
      source: values.source,
      lokasi: lokasi,
      nama_ruangan: NamaRuangan,
      posisi_rak: Rak,
      tipe:tipes,
      jumlah: jumlahs
    };

    const result = await powerAddApiV1PowerPowerPost(deauthPer);
    // refresh the list
    if (result.code === 200) {
      actionRef.current?.reload();
      setAddVisible(false);
      message.success(result.message);
    } else {
      message.error(result.message);
    }
  };

  const handleForm1Submit = (values) => {
    // Logika untuk submit form 1
    getDataPDU(values);
  };

  const insertPowertoDB = (values) => {
    // Logika untuk submit form 1
    // console.log("Ini data socket ya",  values);
    // setDataSocket(values.users);
    iNeedMorePower(values);
    form2.resetFields();
    setAddVisible(false);


    getDataPDU(reloadPower);    


  };


  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    setAddVisible(false);
  };



  // Modify
  // const updateData = async (d: API.UpdatePemandu) => {
  //   if (PemanduData) {
  //     d.id = PemanduData.id;
  //     const result = await pemanduUpdateApiV1PemanduPemanduPut(d);
  //     if (result.code === 200) {
  //       // refresh the list
  //       actionRef.current?.reload();
  //       setEditVisible(false);
  //       message.success(result.message);
  //     } else {
  //       message.error(result.message);
  //     }
  //   }
  // };
  const cekIsi = (values) =>{
      console.log("ini isi form add", values)
      setDataSocket(values.users)
      
  };

  useEffect(() => {
    fetchDataLokasi();
    const fetchDataNamaRuangan = async () => {
      try {
        const result = await namaRuanganApiV1LokasiLokasiNamaRuanganGet({ lokasi: lokasi });
        if (result.code === 200) {
          setDataNamaRuangan(result.data);
        } else {
          console.error('Error fetching dataMerek:', result.message);
        }

      } catch (error) {
        console.error('Error fetching dataMerek:', error);
      }
    };
    fetchDataNamaRuangan();
    const fetchDataRak = async () => {
      try {
        const result = await rakApiV1LokasiLokasiRakGet({ lokasi: lokasi, nama_ruangan : NamaRuangan });
        if (result.code === 200) {
          setDataRak(result.data);
        } else {
          console.error('Error fetching dataMerek:', result.message);
        }

      } catch (error) {
        console.error('Error fetching dataMerek:', error);
      }
    };
    fetchDataRak();
    
  }, [lokasi,NamaRuangan]);

  const columns: ProColumnType<API.PowerItem>[] = [
    {
      title: 'Nama',
      dataIndex: 'nama',
    },
    {
      title: 'Power',
      dataIndex: 'power',
    },
    {
      title: 'Source',
      dataIndex: 'source',
    },
    {
      title: 'Tipe',
      dataIndex: 'tipe',
    },
    {
      title: 'Aset',
      dataIndex: 'sn_aset',
    },
    {
      title: 'Actionable',
      valueType: 'option',
      width: 200,
      render: (_dom, d) => {
        return [
          // <Button
          //   key={'edit'}
          //   type="dashed"
          //   shape="round"
          //   onClick={() => {
          //     setPemanduData(d);
          //     setEditVisible(true);
          //   }}
          // >
          //   Edit
          // </Button>,
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
      <Card style={{ marginBottom: '20px' }}>
            <Form
            layout='inline'
            form={form1} 
            onFinish={handleForm1Submit}>
              <Form.Item name="lokasi" label="Lokasi" >
                <Select
                  // disabled={AsetData?.merek ? true : false}
                  style={{ width: 328 }}
                  value={lokasi}
                  placeholder="Pilih Lokasi..."
                  onSelect={(e) => (setLokasi(e))}
                  rules={[{ required: true, message: 'Silahkan pilih Lokasi!' }]}
                  // ref={inputRef}
                  options={Object.values(dataLokasi).map((item) => ({ label: item, value: item }))}
                />
              </Form.Item>
              <Form.Item name="nama_ruangan" label="Ruangan" >
                <Select
                  // disabled={AsetData?.merek ? true : false}
                  style={{ width: 328 }}
                  value={NamaRuangan}
                  placeholder="Pilih Ruangan..."
                  onSelect={(e) => (setNamaRuangan(e))}
                  rules={[{ required: true, message: 'Silahkan pilih Ruangan!' }]}
                  // ref={inputRef}
                  options={Object.values(dataNamaRuangan).map((item) => ({ label: item, value: item }))}
                />
              </Form.Item>
              <Form.Item name="posisi_rak" label="Posisi Rak" >
                <Select
                  // disabled={AsetData?.merek ? true : false}
                  style={{ width: 328 }}
                  value={Rak}
                  placeholder="Pilih Rak..."
                  onSelect={(e) => (setRak(e))}
                  rules={[{ required: true, message: 'Silahkan pilih Rak!' }]}
                  // ref={inputRef}
                  options={Object.values(dataRak).map((item) => ({ label: item, value: item }))}
                />
              </Form.Item>
              <Form.Item>
              <Button type="primary" htmlType="submit">
                Cari
              </Button>
            </Form.Item>
            </Form>
      </Card>
      <ProTable
        headerTitle={namaData}
        actionRef={actionRef}
        columns={columns}
        size="small"
        cardProps={{ bodyStyle: { paddingBottom: 20, paddingTop: 0 } }}
        pagination={{ defaultPageSize: 20, showSizeChanger: true }}
        locale={{ emptyText: 'Insufficient permission' }}
        search={false}
        dataSource={PowerData}
        toolBarRender={() => [
          <Button key="add_data" type="primary" disabled={disableAddNew} onClick={() => setAddVisible(true)}>
            <PlusOutlined />
            Add New
          </Button>,
        ]}
      />

      {/* BEGIN::MODAL TAMBAH */}
      <Modal
        title={'Add New'}
        visible={addVisible}
        width={550}
        onCancel={handleCancel}
        okButtonProps={{ hidden:true }}
        cancelButtonProps={{ hidden: true }}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" htmlType="submit" form="formPower">
            Submit
          </Button>,
        ]}
      >
        <Form onFinish={insertPowertoDB} id="formPower" form={form2}>
        <Form.Item label="Nama" name="nama"
        rules={[{ required: true, message: 'Silahkan Masukkan Nama' }]}>
            <Input placeholder="Nama" />
          </Form.Item>
          <Form.Item label="Source" name="source"
          rules={[{ required: true, message: 'Silahkan Masukkan source' }]}>
          <Select
              style={{ width: 120 }}
              options={[
                { value: 'A', label: 'A' },
                { value: 'B', label: 'B' },
              ]}
            />
          </Form.Item>
        <Form.List name="users">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
              <Form.Item
                {...restField}
                name={[name, 'tipe']}
                rules={[{ required: true, message: 'Silahkan Masukkan Tipe' }]}
              >
                <Input placeholder="Tipe" />
              </Form.Item>
              <Form.Item
                {...restField}
                name={[name, 'jumlah']}
                rules={[{ required: true, message: 'Silahkan Masukkan Jumlah' }]}
              >
                <InputNumber placeholder="Jumlah" min={1} />
              </Form.Item>
              <MinusCircleOutlined onClick={() => remove(name)} />
            </Space>
          ))}
          <Form.Item>
            <Button type="primary" onClick={() => add()} block icon={<PlusOutlined />}>
              Add field
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
    {/* <Button htmlType='submit'>
      Masuk
    </Button> */}
        </Form>
      </Modal>
      {/* END::MODAL TAMBAH */}

      {/* BEGIN::DRAWER EDIT */}
      {/* <DrawerForm
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
      </DrawerForm> */}
      {/* END::DRAWER EDIT */}
    </PageContainer>
  );
});
