//@ts-nocheck
import {
  asetAddApiV1AsetAsetPost,
  // asetDelApiV1AsetAsetDelete,
  // asetDelApiV1AsetAsetDelete,
  asetListApiV1AsetAsetGet,
  asetUpdateApiV1AsetAsetPut,
  updateStatusAsetApiV1AsetAsetUpdateStatusPut,
} from '@/services/dev-plus/Aset';

import {
  powerListApiV1PowerPowerGet,
  powerPutApiV1PowerPowerPut
} from '@/services/dev-plus/Power';

import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { ProDescriptions, ProFormUploadButton } from '@ant-design/pro-components';
import type { ColumnsType } from 'antd/es/table';
import {
  DrawerForm,
  ModalForm,
  ProFormDateTimePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProForm,
  StepsForm,
  ProFormGroup,
} from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumnType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Popconfirm, message, Select, Divider, Space, Input, Form, Image, Table, Checkbox } from 'antd';
// import type { RcFile, UploadChangeParam, UploadProps } from 'antd/es/upload/interface';
import type { RcFile, UploadChangeParam, UploadProps } from 'antd/es/upload/interface';
import { memo, useRef, useState, useEffect } from 'react';
import { useModel } from '@umijs/max';


import type { InputRef } from 'antd';
import { dataMerekApiV1MerekTipeMerekTipeMerekGet, tipeApiV1MerekTipeMerekTipeTipeGet } from '@/services/dev-plus/MerekTipe';
import {
  dataLokasiApiV1LokasiLokasiLokasiGet,
  namaRuanganApiV1LokasiLokasiNamaRuanganGet,
  rakApiV1LokasiLokasiRakGet,
  posisiUDataApiV1LokasiLokasiPosisiUGet
} from '@/services/dev-plus/Lokasi';

import {
  powerADataApiV1PowerPowerPowerAGet,
  powerADataApiV1PowerPowerPowerBGet
} from '@/services/dev-plus/Power';
import { set, values } from 'lodash';


export default memo(() => {
  const actionRef = useRef<ActionType>();
  const [addVisible, setAddVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [AsetData, setAsetData] = useState<API.AsetItem>();
  const [devicePhoto, setDevicePhoto] = useState('');
  const [PowerData, setPowerData] = useState<any>();
  const [BatasPilih, setBatasPilih] = useState(0);
  const [PowerAset, setPowerAset] = useState<any>();
  const [form2] = Form.useForm();
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const nicknameData = String(currentUser?.username)
  // const [selectedRowsState, setSelectedRows] = useState<API.PowerItem[]>([]);

  const [disTipe, setDisTipe] = useState(true);
  const [disRuang, setDisRuang] = useState(true);
  const [disRak, setDisRak] = useState(true);
  const [disPosU, setDisPosU] = useState(true);
  const [disLokasi, setDisLokasi] = useState(false);





  const [dataMerek, setDataMerek] = useState([]);
  const [newMerek, setNewMerek] = useState('');
  const [items, setItems] = useState(['']);
  const [merek, setMerek] = useState('');
  const [tipe, setTipe] = useState('');

  const [dataLokasi, setDataLokasi] = useState([]);
  const [lokasi, setLokasi] = useState('');
  const [newLokasi, setNewLokasi] = useState('');
  const [itemsLokasi, setItemsLokasi] = useState(['']);

  const [dataNamaRuangan, setDataNamaRuangan] = useState([]);
  const [NamaRuangan, setNamaRuangan] = useState('');
  const [newNamaRuangan, setNewNamaRuangan] = useState('');
  const [itemsNamaRuangan, setItemsNamaRuangan] = useState(['']);

  const [dataRak, setDataRak] = useState({});
  const [newRak, setNewRak] = useState('');
  const [Rak, setRak] = useState('');
  const [itemsRak, setItemsRak] = useState(['']);

  const [dataPosisiU, setPosisiU] = useState({});
  const [newPosisiU, setNewPosisiU] = useState('');
  const [itemsPosisiU, setItemsPosisiU] = useState(['']);

  const [dataPowerA, setPowerA] = useState({});
  const [newPowerA, setNewPowerA] = useState('');
  const [itemsPowerA, setItemsPowerA] = useState(['']);

  const [dataPowerB, setPowerB] = useState([]);
  const [newPowerB, setNewPowerB] = useState('');
  const [itemsPowerB, setItemsPowerB] = useState(['']);

  const [dataTipe, setDataTipe] = useState({});
  const [newTipe, setNewTipe] = useState('');
  const [itemsTipe, setItemsTipe] = useState(['']);
  const inputRef = useRef<InputRef>(null);

  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    'general',
    'lokasi',
    'kepemilikan',
    'utilisasi',
    'power',
  ];



  const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    if (newMerek) {
      setItems([...items, newMerek]);
      setDataMerek(prevDataMerek => ({
        ...prevDataMerek,
        [newMerek]: newMerek,
      }));
      setNewMerek('');
    }
  };

  const addItemLokasi = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    if (newLokasi) {
      setItemsLokasi([...itemsLokasi, newLokasi]);
      setDataLokasi(prevDataMerek => ({
        ...prevDataMerek,
        [newLokasi]: newLokasi,
      }));
      setNewLokasi('');
    }
  };

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMerek(event.target.value);
  };

  const onNameChangeLokasi = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewLokasi(event.target.value);
  };

  // useEffect(() => {
  const fetchDataMerek = async () => {
    try {
      console.log('getting merek')
      const result = await dataMerekApiV1MerekTipeMerekTipeMerekGet();
      console.log('merek done')
      if (result.code === 200) {
        setDataMerek(result.data);
      } else {
        console.error('Error fetching dataMerek:', result.message);
      }
    } catch (error) {
      console.error('Error fetching dataMerek:', error);
    }
  };

  const fetchDataLokasi = async () => {
    try {
      console.log('getting lokasi')
      const result = await dataLokasiApiV1LokasiLokasiLokasiGet();
      console.log('lokasi done')
      if (result.code === 200) {
        setDataLokasi(result.data);
      } else {
        console.error('Error fetching dataMerek:', result.message);
      }
    } catch (error) {
      console.error('Error fetching dataMerek:', error);
    }
  };

  // }, []);


  // Tipe
  const addItemTipe = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    if (newTipe) {
      setItemsTipe([...itemsTipe, newTipe]);
      setDataTipe(prevDataTipe => ({
        ...prevDataTipe,
        [newTipe]: newTipe,
      }));
      setNewTipe('');
    }
  };

  const onNameChangeTipe = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTipe(event.target.value);
  };

  const fetchDataTipe = async () => {
    try {
      const result = await tipeApiV1MerekTipeMerekTipeTipeGet({ merek: merek });
      if (result.code === 200) {
        setDataTipe(result.data);
      } else {
        console.error('Error fetching dataMerek:', result.message);
      }

    } catch (error) {
      console.error('Error fetching dataMerek:', error);
    }
  };

  // NamaRuangan
  const addItemNamaRuangan = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    if (newNamaRuangan) {
      setItemsNamaRuangan([...itemsNamaRuangan, newNamaRuangan]);
      setDataNamaRuangan(prevDataTipe => ({
        ...prevDataTipe,
        [newNamaRuangan]: newNamaRuangan,
      }));
      setNewNamaRuangan('');
    }
  };

  const onNameChangeNamaRuangan = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewNamaRuangan(event.target.value);
  };

  const fetchDataNamaRuangan = async () => {
    try {
      const result = await namaRuanganApiV1LokasiLokasiNamaRuanganGet({ lokasi: lokasi });
      if (result.code === 200) {
        setDataNamaRuangan(result.data);
        // form2.resetFields(['nama_ruangan'])
      } else {
        console.error('Error fetching dataMerek:', result.message);
      }

    } catch (error) {
      console.error('Error fetching dataMerek:', error);
    }
  };

  // Rak
  const addItemRak = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    if (newRak) {
      setItemsRak([...itemsRak, newRak]);
      setDataRak(prevDataTipe => ({
        ...prevDataTipe,
        [newRak]: newRak,
      }));
      setNewRak('');
    }
  };

  const onNameChangeRak = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewRak(event.target.value);
  };

  const fetchDataRak = async () => {
    try {
      const result = await rakApiV1LokasiLokasiRakGet({ lokasi: lokasi, nama_ruangan: NamaRuangan });
      if (result.code === 200) {
        setDataRak(result.data);
      } else {
        console.error('Error fetching dataMerek:', result.message);
      }

    } catch (error) {
      console.error('Error fetching dataMerek:', error);
    }
  };

  // Posisi U
  const addItemPosisiU = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    if (newRak) {
      setItemsPosisiU([...itemsPosisiU, newPosisiU]);
      setPosisiU(prevDataTipe => ({
        ...prevDataTipe,
        [newRak]: newRak,
      }));
      setNewRak('');
    }
  };

  const onNameChangePosisiU = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPosisiU(event.target.value);
  };

  const fetchDataPosisiU = async () => {
    try {
      const result = await posisiUDataApiV1LokasiLokasiPosisiUGet({ lokasi: lokasi, nama_ruangan: NamaRuangan, posisi_rak: Rak });
      // const result2 = await powerListApiV1PowerPowerGet({ lokasi: lokasi, nama_ruangan : NamaRuangan, posisi_rak:Rak, sn_aset:'' });

      if (result.code === 200) {
        setPosisiU(result.data);
        // setPowerData(result2.data.filter((row) => row.sn_aset === ''))
        console.log("posisi u berubah cuy")
      } else {
        console.error('Error fetching dataMerek:', result.message);
      }

    } catch (error) {
      console.error('Error fetching dataMerek:', error);
    }
  };

  // Power 
  const fetchDataPowerB = async () => {
    try {
      const result = await powerListApiV1PowerPowerGet({ lokasi: lokasi, nama_ruangan: NamaRuangan, posisi_rak: Rak, sn_aset: 'kosong' });
      if (result.success) {
        setPowerData(result.data)
        console, log("inin powewr data oi", data.result)
      } else {
        console.error('Error fetching dataMerek:', result.message);
      }

    } catch (error) {
      console.error('Error fetching dataMerek:', error);
    }
  };




  //Select Power

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const handleSelectChange = (selectedRowKeys) => {
    // Define your selection limit here
    const selectionLimit = BatasPilih; // Example: Limit to 2 selections
    if (selectedRowKeys.length <= selectionLimit) {
      setSelectedRowKeys(selectedRowKeys);
      console.log('row selected:', selectedRowKeys);
    }

  };


  const rowSelection = {
    selectedRowKeys,
    onChange: handleSelectChange,
  };



  //useEffect Tipe
  useEffect(() => {

    setTipe('');

    fetchDataTipe();

  }, [merek]);

  //useEffect Ruangan
  useEffect(() => {

    setNamaRuangan('');
    fetchDataNamaRuangan();

  }, [lokasi]);

  //useEffect Rak
  useEffect(() => {

    setRak('');
    fetchDataRak();

  }, [NamaRuangan]);

  //useEffect Pos U
  useEffect(() => {

    setPosisiU('');
    setPowerData('');
    fetchDataPosisiU();
    fetchDataPowerB();

  }, [Rak]);




  const fetchDataPower2 = async (d: API.AsetItem) => {
    try {
      const result = await powerListApiV1PowerPowerGet({ sn_aset: d.nomor_seri });
      if (result.success) {
        setPowerAset(result.data);
        console, log("inin powewr data oi", data.result)
      } else {
        console.error('Error fetching dataMerek:', result.message);
      }

    } catch (error) {
      console.error('Error fetching dataMerek:', error);
    }
  };

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
        setDevicePhoto(url);
        console.log('url photo:', url);
        // message.success(info.file.response.message);
      }
    },
  };

  // Creating a Role
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const createData = async (values: API.CreateAset) => {
    values.foto_perangkat = devicePhoto;

    values.status_aset = 1;
    values.power = "Cek di tabel Power";
    values.user = nicknameData;

    console.log("ini username", nicknameData)
    // values.tipe = JSON.stringify(values.tipe);
    const tmpPower: API.PutPower = {
      // id: d,
      id: selectedRowKeys,
      sn_aset: values.nomor_seri,

    };

    const result = await asetAddApiV1AsetAsetPost(values);
    await powerPutApiV1PowerPowerPut(tmpPower);
    setSelectedRowKeys([]);
    if (result.code === 200) {
      // close the window
      setAddVisible(false);
      // refresh the list
      actionRef.current?.reload();

      setRak('');

      setDataRak('');
      // setDataNamaRuangan('');
      setPosisiU('');
      setDisPosU(true);
      setDisRak(true);
      setDisRuang(true);
      setDisTipe(true);
      setCurrentStep(0);
      message.success(result.message);
    } else {
      message.error(result.message);
    }
  };

  // Delete the role
  // const deleteData = async (d: API.AsetItem) => {
  //   const result = await asetDelApiV1AsetAsetDelete({ id: d.id });
  //   if (result.code === 200) {
  //     // refresh the list
  //     actionRef.current?.reload();
  //     message.success(result.message);
  //   } else {
  //     message.error(result.message);
  //   }
  // };


  //Delete Aset
  const updateStatusAset = async (d: API.AsetItem) => {
    try {
      const updatedStatusAset2 = {
        id: d.id,
        status_aset: false,
        nomor_Seri: d.nomor_seri
        // tanggal_penarikan: format(new Date(), 'yyyy-MM-dd HH:mm:ss')

      };

      // Panggil API untuk mengupdate status_aset dan tanggal_penarikan
      const result = await updateStatusAsetApiV1AsetAsetUpdateStatusPut(updatedStatusAset2);

      if (result.code === 200) {
        // refresh the list
        actionRef.current?.reload();
        message.success(result.message);
      } else {
        message.error(result.message);
      }
    } catch (error) {
      console.error("Error updating status aset:", error);
      message.error("Error updating status aset");
    }
  };


  // Modify the role
  const updateData = async (d: API.UpdateAset) => {
    if (AsetData) {
      d.id = AsetData.id;
      d.foto_perangkat = devicePhoto;
      // d.tipe = JSON.stringify(d.tipe);
      const result = await asetUpdateApiV1AsetAsetPut(d);
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

  const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };
  const [loading, setLoading] = useState(false);

  // Define the header
  const columns: ProColumnType<API.AsetItem>[] = [
    {
      title: 'Merek',
      dataIndex: 'merek',
      // tip: 'NO Tiket is unique key',
    },
    {
      title: 'Tipe',
      dataIndex: 'tipe',
    },
    {
      title: 'Foto Perangkat',
      dataIndex: 'foto_perangkat',
      hideInSearch: true,
      hideInTable: true,
      render: (foto_perangkat) => (
        <img
          src={`/api/v1/aset/aset${foto_perangkat}`}
          alt="Foto Perangkat"
          style={{ width: '50px' }}
        />
      ),
    },
    // {
    //   title: 'Fungsi Perangkat',
    //   dataIndex: 'fungsi_perangkat',
    // },
    {
      title: 'Serial Number',
      dataIndex: 'nomor_seri',
      render: (_dom, d) => {
        return [
          <a
            key={'detail'}
            type="primary"
            onClick={() => {
              setAsetData(d);
              setDevicePhoto(d.foto_perangkat ? d.foto_perangkat : '');
              setDetailVisible(true);
              fetchDataPower2(d)

            }}
          >
            {d.nomor_seri}
          </a>,
        ];
      },

    },
    {
      title: 'Jenis Infrastruktur',
      dataIndex: 'jenis_infra',
    },
    {
      title: 'Instansi Pemilik',
      dataIndex: 'instansi_pemilik',
    },
    {
      title: 'Penanggung Jawab',
      dataIndex: 'penanggung_jawab',
    },
    {
      title: 'Lokasi',
      dataIndex: 'lokasi',
    },
    // {
    //   title: 'Nama Ruangan',
    //   dataIndex: 'nama_ruangan',
    // },
    // {
    //   title: 'Posisi Rak',
    //   dataIndex: 'posisi_rak',
    // },
    // {
    //   title: 'Total PSU',
    //   dataIndex: 'psu',
    // },
    // {
    //   title: 'Posisi U',
    //   dataIndex: 'posisi_u',
    // },
    // {
    //   title: 'Power',
    //   dataIndex: 'power',
    // },
    // {
    //   title: 'Kapasitas CPU',
    //   dataIndex: 'kapasitas_cpu',
    // },
    // {
    //   title: 'Kapasitas Hard Disk',
    //   dataIndex: 'kapasitas_hdd',
    // },
    // {
    //   title: 'Kapasitas RAM',
    //   dataIndex: 'kapasitas_ram',
    // },
    // {
    //   title: 'Daya',
    //   dataIndex: 'daya',
    // },
    {
      title: 'Tanggal Pemasangan',
      dataIndex: 'tanggal_pemasangan',
      valueType: 'date'
    },
    // {
    //   title: 'Tanggal Penarikan',
    //   dataIndex: 'tanggal_penarikan',
    // },
    // {
    //   title: 'Keterangan',
    //   dataIndex: 'keterangan',
    // },
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

          //TOMBOL EDIT
          // <Button
          //   key={'edit'}
          //   type="dashed"
          //   shape="round"
          //   onClick={() => {
          //     setAsetData(d);
          //     setDevicePhoto(d.foto_perangkat ? d.foto_perangkat : '');
          //     setEditVisible(true);

          //   }}
          // >
          //   Edit
          // </Button>,

          //TOMBOL DELETE
          // <Popconfirm
          //   key={'delete'}
          //   title="Are you sure want to Delete this data?"
          //   onConfirm={() => deleteData(d)}
          //   placement="leftTop"
          // >
          //   <Button danger type="primary">
          //     <DeleteOutlined />
          //   </Button>
          // </Popconfirm>,
          <Popconfirm
            key={'delete'}
            title="Are you sure want to Delete this data?"
            onConfirm={() => updateStatusAset(d)}
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

  const powerColom: ProColumnType<API.PowerItem>[] = [
    {
      title: 'Nama',
      dataIndex: 'nama',
      // filters:  filters2,

      onFilter: (value: string, record) => record.nama.startsWith(value),
      filterSearch: true,
      width: '40%',
      // tip: 'NO Tiket is unique key',
    },
    {
      title: 'Power',
      dataIndex: 'power',
    },
    {
      title: 'Source',
      dataIndex: 'source',
      filters: [
        {
          text: 'A',
          value: 'A',
        },
        {
          text: 'B',
          value: 'B',
        },
      ],
      onFilter: (value: string, record) => record.source.startsWith(value),
      filterSearch: true,
      width: '40%',
      // tip: 'NO Tiket is unique key',
    },
    {
      title: 'Tipe',
      dataIndex: 'tipe',
    },
  ]


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
        request={async (params) => asetListApiV1AsetAsetGet({ ...params })}
        toolBarRender={() => [
          <Button
            key="add_user"
            type="primary"
            onClick={() => {
              setAddVisible(true);
              fetchDataMerek();
              fetchDataLokasi();

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
        width={1200}
        submitter={false
          // { searchConfig: { submitText: 'Save' } }
        }
        // onFinish={createData}
        modalProps={{
          destroyOnClose: true,
          mask: true,
          maskClosable: false,
          onCancel() {
            setAddVisible(false);

          },
        }}
      >
        <StepsForm
          form={form2}
          onFinish={createData}
          submitter={{
            render: ({ form, onSubmit, step, onPre }) => {
              return [
                <Button
                  key="rest"
                  onClick={() => {
                    form?.resetFields();
                    setDisLokasi(false);
                    setDisPosU(true);


                  }}
                >
                  Reset
                </Button>,
                currentStep > 0 && (
                  <Button
                    key="pre"
                    onClick={() => {
                      onPre?.();
                      setCurrentStep(currentStep - 1);
                    }}
                  >
                    Prev
                  </Button>
                ),
                currentStep === steps.length - 1 ? (
                  <Button
                    key="save"
                    loading={loading}
                    type="primary"
                    onClick={() => {
                      onSubmit?.();
                    }}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    key="next"
                    loading={loading}
                    type="primary"
                    onClick={() => {
                      onSubmit?.();
                      setCurrentStep(currentStep + 1);
                    }}
                  >
                    Next
                  </Button>
                ),
              ];
            },
          }}
          formProps={{
            validateMessages: {
              required: 'Harus diisi!',
            },
          }}
        >
          {/* GENERAL */}
          <StepsForm.StepForm
            name="general"
            title="General"
            onFinish={async () => {
              setLoading(true);
              await waitTime(2000);
              setLoading(false);
              return true;
            }}
          >
            <ProForm.Group>
              <Form.Item name="merek" label="Merek" rules={[{ required: true }]}>
                <Select
                  showSearch
                  style={{ width: 328 }}
                  placeholder="Pilih Merek..."

                  onSelect={(e) => (setMerek(e), setDisTipe(false))}
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider style={{ margin: '8px 0' }} />
                      <Space style={{ padding: '0 8px 4px' }}>
                        <Input
                          placeholder="Please enter merek"
                          ref={inputRef}
                          value={newMerek}
                          onChange={onNameChange}
                        />
                        <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                          Add Merek
                        </Button>
                      </Space>
                    </>
                  )}
                  options={Object.values(dataMerek).map((item) => ({ label: item, value: item }))}
                // options={dataMerek?.map((item: { merek: string; }) => (
                //   { label: item.merek, value: item.merek }
                //   // (console.log(item.merek))
                //   // {label: item.id, value: item.merek}
                // ))}
                // getOptionLabel={(dataMerek) => dataMerek.merek}

                //   options={Object.keys(dataMerek).map(items) => (
                // {value: item.merek, label: item.merek}
                // )}
                />
              </Form.Item>

              <Form.Item name="tipe" label="Tipe" rules={[{ required: true }]}>
                <Select
                  // disabled={AsetData?.merek ? true : false}
                  style={{ width: 328 }}
                  value={tipe}
                  placeholder="Pilih Tipe..."
                  disabled={disTipe}

                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider style={{ margin: '8px 0' }} />
                      <Space style={{ padding: '0 8px 4px' }}>
                        <Input
                          placeholder="Please enter Tipe"
                          ref={inputRef}
                          value={newTipe}
                          onChange={onNameChangeTipe}
                        />
                        <Button type="text" icon={<PlusOutlined />} onClick={addItemTipe}>
                          Add Tipe
                        </Button>
                      </Space>
                    </>
                  )}
                  options={Object.values(dataTipe).map((item) => ({ label: item, value: item }))}
                />
              </Form.Item>
            </ProForm.Group>
            <ProForm.Group>
              <ProFormText
                name="nomor_seri"
                width="md"
                label="Serial Number"
                rules={[{ required: true }]}
              />

              <ProFormText
                name="fungsi_perangkat"
                width="md"
                label="Fungsi Perangkat"
                rules={[{ required: true }]}
              />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormSelect
                name="jenis_infra"
                label="Jenis Infrastruktur"
                width="md"
                rules={[{ required: true }]}
                options={[
                  {
                    value: 'Server',
                    label: 'Server',
                  },
                  {
                    value: 'Storage',
                    label: 'Storage',
                  },
                  {
                    value: 'Network',
                    label: 'Network',
                  },
                  {
                    value: 'Periferal',
                    label: 'Periferal',
                  },
                ]}
              />

              <ProFormDateTimePicker
                name="tanggal_pemasangan"
                label="Tanggal Pemasangan"
                rules={[{ required: true }]}
                fieldProps={{
                  style: { width: '327px' },
                }}
              />

            </ProForm.Group>
            <ProForm.Group>
              <ProFormSelect
                name="instansi_pemilik"
                label="Instansi Pemilik"
                width="md"
                rules={[{ required: true }]}
                options={[
                  {
                    value: 'Perangkat Daerah 1',
                    label: 'Perangkat Daerah 1',
                  },
                  {
                    value: 'Perangkat Daerah 2',
                    label: 'Perangkat Daerah 2',
                  },
                  {
                    value: 'Perangkat Daerah 3',
                    label: 'Perangkat Daerah 3',
                  },
                ]}
              />

              <ProFormSelect
                name="penanggung_jawab"
                label="Penanggung Jawab"
                width="md"
                rules={[{ required: true }]}
                options={[
                  {
                    value: 'Jabatan 1',
                    label: 'Jabatan 1',
                  },
                  {
                    value: 'Jabatan 2',
                    label: 'Jabatan 2',
                  },
                  {
                    value: 'Jabatan 3',
                    label: 'Jabatan 3',
                  },
                ]}
              />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormUploadButton
                name="photo_box"
                title="Upload"
                // rules={[{ required: true }]}
                extra="Foto Perangkat"
                max={1}
                showUploadList={false}
                {...upload_props}
                fieldProps={{
                  headers: { Authorization: `Bearer ${localStorage.getItem('Authorization') || ''}` },
                }}
              />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormTextArea
                name="keterangan"
                label="Keterangan"
                width="xl"

              />
            </ProForm.Group>
          </StepsForm.StepForm>

          {/* LOKASI */}
          <StepsForm.StepForm name="lokasi" title="Lokasi" rules={[{ required: true }]}>
            <ProForm.Group>
              <Form.Item name="lokasi" label="Lokasi" >
                <Select
                  showSearch
                  style={{ width: 328 }}
                  placeholder="Pilih Lokasi..."
                  disabled={disLokasi}
                  onSelect={(e) => (setLokasi(e), setDisRuang(false), setDisLokasi(true))}
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider style={{ margin: '8px 0' }} />
                      <Space style={{ padding: '0 8px 4px' }}>
                        <Input
                          placeholder="Please enter lokasi"
                          ref={inputRef}
                          value={newLokasi}
                          onChange={onNameChangeLokasi}
                        />
                        <Button type="text" icon={<PlusOutlined />} onClick={addItemLokasi}>
                          Add Lokasi
                        </Button>
                      </Space>
                    </>
                  )}
                  options={Object.values(dataLokasi).map((item) => ({ label: item, value: item }))}
                // options={dataMerek?.map((item: { merek: string; }) => (
                //   { label: item.merek, value: item.merek }
                //   // (console.log(item.merek))
                //   // {label: item.id, value: item.merek}
                // ))}
                // getOptionLabel={(dataMerek) => dataMerek.merek}

                //   options={Object.keys(dataMerek).map(items) => (
                // {value: item.merek, label: item.merek}
                // )}
                />
              </Form.Item>

              <Form.Item name="nama_ruangan" label="Nama Ruangan" rules={[{ required: true }]}>
                <Select
                  // disabled={AsetData?.merek ? true : false}
                  style={{ width: 328 }}
                  value={tipe}
                  placeholder="Pilih Tipe..."
                  name="nama_ruangan"
                  disabled={disRuang}
                  onSelect={(e) => (setNamaRuangan(e), setDisRak(false), setDisRuang(true))}
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider style={{ margin: '8px 0' }} />
                      <Space style={{ padding: '0 8px 4px' }}>
                        <Input
                          placeholder="Please enter Tipe"
                          ref={inputRef}
                          value={newNamaRuangan}
                          onChange={onNameChangeNamaRuangan}
                        />
                        <Button type="text" icon={<PlusOutlined />} onClick={addItemNamaRuangan}>
                          Add Tipe
                        </Button>
                      </Space>
                    </>
                  )}
                  options={Object.values(dataNamaRuangan).map((item) => ({ label: item, value: item }))}
                />
              </Form.Item>
            </ProForm.Group>
            <ProForm.Group>
              <Form.Item name="posisi_rak" label="Posisi Rak" >
                <Select
                  // disabled={AsetData?.merek ? true : false}
                  style={{ width: 328 }}
                  value={tipe}
                  placeholder="Pilih Rak..."
                  rules={[{ required: true }]}
                  disabled={disRak}
                  onSelect={(e) => (setRak(e), setDisPosU(false), setDisRak(true))}
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider style={{ margin: '8px 0' }} />
                      <Space style={{ padding: '0 8px 4px' }}>
                        <Input
                          placeholder="Please enter Tipe"
                          ref={inputRef}
                          value={newRak}
                          onChange={onNameChangeRak}
                        />
                        <Button type="text" icon={<PlusOutlined />} onClick={addItemRak}>
                          Add Tipe
                        </Button>
                      </Space>
                    </>
                  )}
                  options={Object.values(dataRak).map((item) => ({ label: item, value: item }))}
                />
              </Form.Item>

              <Form.Item name="posisi_u" label="Posisi U" rules={[{ required: true }]}>
                <Select
                  // disabled={AsetData?.merek ? true : false}
                  style={{ width: 328 }}
                  value={tipe}
                  placeholder="Pilih U"
                  disabled={disPosU}
                  onSelect={(e) => (setDisPosU(true))}

                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider style={{ margin: '8px 0' }} />
                      <Space style={{ padding: '0 8px 4px' }}>
                        <Input
                          placeholder="Please enter Tipe"
                          ref={inputRef}
                          value={newPosisiU}
                          onChange={onNameChangePosisiU}
                        />
                        <Button type="text" icon={<PlusOutlined />} onClick={addItemPosisiU}>
                          Add Tipe
                        </Button>
                      </Space>
                    </>
                  )}
                  options={Object.values(dataPosisiU).map((item) => ({ label: item, value: item }))}
                />
              </Form.Item>
            </ProForm.Group>
          </StepsForm.StepForm>

          {/* KEPEMILIKAN */}


          {/* UTILISASI */}
          <StepsForm.StepForm name="utilisasi" title="Utilisasi">
            <ProForm.Group>
              <ProFormSelect
                name="psu"
                label="Total PSU"
                width="md"
                onChange={(value) => setBatasPilih(value)}
                rules={[{ required: true }]}
                options={[
                  {
                    value: 1,
                    label: '1',
                  },
                  {
                    value: 2,
                    label: '2',
                  },
                  {
                    value: 3,
                    label: '3',
                  },
                  {
                    value: 4,
                    label: '4',
                  },
                  {
                    value: 5,
                    label: '5',
                  },
                  {
                    value: 6,
                    label: '6',
                  },
                ]}
              />

              <ProFormText
                name="daya"
                label="Daya"
                width="md"
                rules={[{ required: true }]}

                fieldProps={{
                  addonAfter: 'Watt',
                }}
              />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormText
                name="kapasitas_cpu"
                label="Kapasitas CPU"
                width="md"
                rules={[{ required: true }]}
                fieldProps={{
                  addonAfter: 'Core',
                }}
              />

              <ProFormText
                name="kapasitas_hdd"
                label="Kapasitas Hard Disk"
                width="md"
                rules={[{ required: true }]}
                fieldProps={{
                  addonAfter: 'GB',
                }}
              />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormText
                name="kapasitas_ram"
                label="Kapasitas RAM"
                width="md"
                rules={[{ required: true }]}
                fieldProps={{
                  addonAfter: 'GB',
                }}
              />
            </ProForm.Group>

          </StepsForm.StepForm>

          {/* POWER */}
          <StepsForm.StepForm name="power" title="Power">
            <Table

              rowSelection={rowSelection}
              columns={powerColom}
              dataSource={PowerData}
            />
          </StepsForm.StepForm>
        </StepsForm>
      </ModalForm>

      {/* drawer edit */}
      {/* <DrawerForm
        title={'Editor'}
        visible={editVisible}
        width={780}
        submitter={{ searchConfig: { submitText: 'Save' } }}
        initialValues={AsetData}
        onFinish={updateData}
        drawerProps={{
          destroyOnClose: true,
          mask: true,
          onClose: () => setEditVisible(false),
        }}
      >
        <ProForm.Group>
          <Form.Item name="merek" label="Merek" rules={[{ required: true }]} hidden>
            <Select
              showSearch
              style={{ width: 328 }}
              placeholder="Pilih Merek..."
              onSelect={(e) => (setMerek(e))}
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Divider style={{ margin: '8px 0' }} />
                  <Space style={{ padding: '0 8px 4px' }}>
                    <Input
                      placeholder="Please enter merek"
                      ref={inputRef}
                      value={newMerek}
                      onChange={onNameChange}
                    />
                    <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                      Add Merek
                    </Button>
                  </Space>
                </>
              )}
              options={Object.values(dataMerek).map((item) => ({ label: item, value: item }))}
            />
          </Form.Item>

          <Form.Item name="tipe" label="Tipe" rules={[{ required: true }]} hidden>
            <Select
              // disabled={AsetData?.merek ? true : false}
              style={{ width: 328 }}
              value={tipe}
              placeholder="Pilih Tipe..."
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Divider style={{ margin: '8px 0' }} />
                  <Space style={{ padding: '0 8px 4px' }}>
                    <Input
                      placeholder="Please enter Tipe"
                      ref={inputRef}
                      value={newTipe}
                      onChange={onNameChangeTipe}
                    />
                    <Button type="text" icon={<PlusOutlined />} onClick={addItemTipe}>
                      Add Tipe
                    </Button>
                  </Space>
                </>
              )}
              options={Object.values(dataTipe).map((item) => ({ label: item, value: item }))}
            />
          </Form.Item>
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            name="fungsi_perangkat"
            width="md"
            label="Fungsi Perangkat"
            rules={[{ required: true }]}
          />

          <ProFormText
            name="nomor_seri"
            width="md"
            label="Serial Number"
            rules={[{ required: true }]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSelect
            name="jenis_infra"
            label="Jenis Infrastruktur"
            width="md"
            rules={[{ required: true }]}
            options={[
              {
                value: 'Server',
                label: 'Server',
              },
              {
                value: 'Storage',
                label: 'Storage',
              },
              {
                value: 'Network',
                label: 'Network',
              },
              {
                value: 'Periferal',
                label: 'Periferal',
              },
            ]}
          />

          <ProFormSelect
            name="instansi_pemilik"
            label="Instansi Pemilik"
            width="md"
            rules={[{ required: true }]}
            options={[
              {
                value: 'Perangkat Daerah 1',
                label: 'Perangkat Daerah 1',
              },
              {
                value: 'Perangkat Daerah 2',
                label: 'Perangkat Daerah 2',
              },
              {
                value: 'Perangkat Daerah 3',
                label: 'Perangkat Daerah 3',
              },
            ]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSelect
            name="penanggung_jawab"
            label="Penanggung Jawab"
            width="md"
            rules={[{ required: true }]}
            options={[
              {
                value: 'Jabatan 1',
                label: 'Jabatan 1',
              },
              {
                value: 'Jabatan 2',
                label: 'Jabatan 2',
              },
              {
                value: 'Jabatan 3',
                label: 'Jabatan 3',
              },
            ]}
          />

          <ProFormSelect
            name="lokasi"
            label="Lokasi"
            width="md"
            rules={[{ required: true }]}
            options={[
              {
                value: 'Pusat Komputasi Diskominfotik',
                label: 'Pusat Komputasi Diskominfotik',
              },
              {
                value: 'Pusat Komputasi Dispusip',
                label: 'Pusat Komputasi Dispusip',
              },
              {
                value: 'Pusat Komputasi DCKTRP',
                label: 'Pusat Komputasi DCKTRP',
              },
              {
                value: 'Pusat Komputasi DPMPTSP',
                label: 'Pusat Komputasi DPMPTSP',
              },
              {
                value: 'Pusat Komputasi Dukcapil',
                label: 'Pusat Komputasi Dukcapil',
              },
            ]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSelect
            name="nama_ruangan"
            label="Nama Ruangan"
            width="md"
            rules={[{ required: true }]}
            options={[
              {
                value: 'Ruang Server 1',
                label: 'Ruang Server 1',
              },
              {
                value: 'Ruang Server 2',
                label: 'Ruang Server 2',
              },
              {
                value: 'Ruang Co-Location',
                label: 'Ruang Co-Location',
              },
              {
                value: 'Ruang Network',
                label: 'Ruang Network',
              },
            ]}
          />

          <ProFormSelect
            name="posisi_rak"
            label="Posisi Rak"
            width="md"
            rules={[{ required: true }]}
            options={[
              {
                value: 'Rak 1',
                label: 'Rak 1',
              },
              {
                value: 'Rak 2',
                label: 'Rak 2',
              },
              {
                value: 'Rak 3',
                label: 'Rak 3',
              },
              {
                value: 'Rak 4',
                label: 'Rak 4',
              },
            ]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSelect
            name="psu"
            label="Total PSU"
            width="md"
            rules={[{ required: true }]}
            options={[
              {
                value: 1,
                label: '1',
              },
              {
                value: 2,
                label: '2',
              },
              {
                value: 3,
                label: '3',
              },
              {
                value: 4,
                label: '4',
              },
              {
                value: 5,
                label: '5',
              },
              {
                value: 6,
                label: '6',
              },
            ]}
          />

          <ProFormSelect
            name="posisi_u"
            label="Posisi U"
            width="md"
            rules={[{ required: true }]}
            options={[
              {
                value: 'U 1',
                label: 'U 1',
              },
              {
                value: 'U 2',
                label: 'U 2',
              },
              {
                value: 'U 3',
                label: 'U 3',
              },
              {
                value: 'U 4',
                label: 'U 4',
              },
            ]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSelect
            name="power"
            label="Power"
            width="md"
            rules={[{ required: true }]}
            options={[
              {
                value: 'Power A',
                label: 'Power A',
              },
              {
                value: 'Power B',
                label: 'Power B',
              },
              {
                value: 'Power A dan B',
                label: 'Power A dan B',
              },
            ]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            name="kapasitas_cpu"
            label="Kapasitas CPU"
            width="md"
            rules={[{ required: true }]}
            fieldProps={{
              addonAfter: 'Core',
            }}
          />

          <ProFormText
            name="kapasitas_hdd"
            label="Kapasitas Hard Disk"
            width="md"
            rules={[{ required: true }]}
            fieldProps={{
              addonAfter: 'GB',
            }}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            name="kapasitas_ram"
            label="Kapasitas RAM"
            width="md"
            rules={[{ required: true }]}
            fieldProps={{
              addonAfter: 'GB',
            }}
          />

          <ProFormText
            name="daya"
            label="Daya"
            width="md"
            rules={[{ required: true }]}
            fieldProps={{
              addonAfter: 'Watt',
            }}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormDateTimePicker
            name="tanggal_pemasangan"
            label="Tanggal Pemasangan"
            rules={[{ required: true }]}
            fieldProps={{
              style: { width: '327px' },
            }}
          />

          <ProFormDateTimePicker
            name="tanggal_penarikan"
            label="Tanggal Penarikan"
            rules={[{ required: true }]}
            fieldProps={{
              style: { width: '327px' },
            }}
          />
        </ProForm.Group>
        <ProFormUploadButton
          name="photo_box"
          title="Upload"
          rules={[{ required: true }]}
          extra="Foto Perangkat"
          max={1}
          showUploadList={false}
          {...upload_props}
          fieldProps={{
            headers: { Authorization: `Bearer ${localStorage.getItem('Authorization') || ''}` },
          }}
        />

        <ProFormTextArea
          name="keterangan"
          label="Keterangan"
          width="xl"
          rules={[{ required: true }]}
        />
        <ProFormText
          name="status_aset"
          label="Delete Aset"
          width="lg"
          rules={[{ required: true }]}
          initialValue={initialValues.status_aset}
          hidden  // Mengatur elemen sebagai tersembunyi
        />

      </DrawerForm> */}

      {/* Drawer Detail */}
      <DrawerForm
        title={'Detail Aset'}
        visible={detailVisible}
        width={780}
        submitter={false}
        onFinish={updateData}
        drawerProps={{
          destroyOnClose: true,
          mask: true,
          onClose: () => setDetailVisible(false),
        }}
      >

        <ProDescriptions
          dataSource={AsetData}
          columns={[
            {
              dataIndex: 'foto_perangkat',
              render: (foto_perangkat) => (
                <Image
                  src={`/api/v1/aset/aset${foto_perangkat}`}
                  alt="Foto Perangkat"
                  style={{ width: '150px' }}
                />
              ),
            },
          ]}>
        </ProDescriptions>

        <ProDescriptions
          labelStyle={{ fontWeight: 'bold' }}
          size='small'
          bordered
          dataSource={AsetData}
          column={2}
          title="Informasi Aset"
        >
          <ProDescriptions.Item
            label="Merek"
            dataIndex="merek"
          />
          <ProDescriptions.Item
            label="Tipe"
            dataIndex="tipe"
          />
          <ProDescriptions.Item
            label="Serial Number"
            dataIndex="nomor_seri"
          />
          <ProDescriptions.Item
            label="Fungsi Perangkat"
            dataIndex="fungsi_perangkat"
          />
          <ProDescriptions.Item
            label="Jenis Infra"
            dataIndex="jenis_infra"
          />
          <ProDescriptions.Item
            label="Instansi Pemilik"
            dataIndex="instansi_pemilik"
          />
          <ProDescriptions.Item
            label="Penanggung Jawab"
            dataIndex="penanggung_jawab"
          />
          <ProDescriptions.Item
            label="Lokasi"
            dataIndex="lokasi"
          />
          <ProDescriptions.Item
            label="Ruangan"
            dataIndex="nama_ruangan"
          />
          <ProDescriptions.Item
            label="Posisi Rack"
            dataIndex="posisi_rak"
          />
          <ProDescriptions.Item
            label="PSU"
            dataIndex="psu"
          />
          <ProDescriptions.Item
            label="Posisi U"
            dataIndex="posisi_u"
          />
          {/* <ProDescriptions.Item
            label="Power"
            dataIndex="power"
          /> */}
          <ProDescriptions.Item
            label="CPU"
            dataIndex="kapasitas_cpu"
            render={(text) => (
              <span>
                {text} Core
              </span>
            )}
          />
          <ProDescriptions.Item
            label="HDD"
            dataIndex="kapasitas_hdd"
            render={(text) => (
              <span>
                {text} GB
              </span>
            )}
          />
          <ProDescriptions.Item
            label="RAM"
            dataIndex="kapasitas_ram"
            render={(text) => (
              <span>
                {text} GB
              </span>
            )}
          />
          <ProDescriptions.Item
            label="Daya"
            dataIndex="daya"
            render={(text) => (
              <span>
                {text} Watt
              </span>
            )}
          />
          <ProDescriptions.Item
            label="Tanggal Pemasangan"
            dataIndex="tanggal_pemasangan"
            valueType="date"
          />
          <ProDescriptions.Item
            label="Tanggal Penarikan"
            dataIndex="tanggal_penarikan"
            valueType="date"
          />
          <ProDescriptions.Item
            label="Keterangan"
            dataIndex="keterangan"
          />
        </ProDescriptions>
        <Table

          // rowSelection={rowSelection}
          columns={powerColom}
          dataSource={PowerAset}
        />


      </DrawerForm>
      {/* <Button
      onClick={() => {
        console.log("ini data power ya", PowerData);
        console.log("Ini batas selek",  BatasPilih);

      }}>
        cek isi
      </Button> */}
    </PageContainer>
  );
});
