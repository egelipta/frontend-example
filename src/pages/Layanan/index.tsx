//@ts-nocheck
import {
  layananAddApiV1LayananLayananPost,
  layananDelApiV1LayananLayananDelete,
  layananListApiV1LayananLayananGet,
  layananUpdateApiV1LayananLayananPut,
  layananTolakApiV1LayananLayananTolakPut
} from '@/services/dev-plus/Layanan';
import {
  asetAddApiV1AsetAsetPost,
} from '@/services/dev-plus/Aset';
import {
  pengunjungApiV1DaftarPengunjungDaftarPengunjungPengunjungGet,
} from '@/services/dev-plus/DaftarPengunjung';

import {
  dataPerangkatApiV1AsetAsetDataPerangkatGet,
  asetListApiV1AsetAsetGet,
  asetListWithStatusTmpApiV1AsetAsetStatusTmpGet,
  asetDelTmpApiV1AsetAsetasetTmpDelete,
  bookStatusPutApiV1AsetAsetbookStatusPut
} from '@/services/dev-plus/Aset';
import { dataLokasiApiV1LokasiLokasiLokasiGet, 
  namaRuanganApiV1LokasiLokasiNamaRuanganGet,
  rakApiV1LokasiLokasiRakGet,
  posisiUDataApiV1LokasiLokasiPosisiUGet
 } from '@/services/dev-plus/Lokasi';

import {
  dataPemanduApiV1PemanduPemanduDataPemanduGet,
} from '@/services/dev-plus/Pemandu';

import {
  pakaiAsetAddApiV1PakaiAsetPakaiAsetPost,
  layananPerangkatApiV1PakaiAsetPakaiAsetLayananPerangkatGet
} from '@/services/dev-plus/pakaiAset';

import {pengunjungHadirAddApiV1PengunjungHadirPengunjungHadirPost,
        layananPerangkatApiV1PengunjungHadirPengunjungHadirLayananPengunjungGet} from '@/services/dev-plus/pengunjungHadir';
import { DeleteOutlined, PlusOutlined, DownloadOutlined } from '@ant-design/icons';
import { ProForm, ProFormCheckbox, ProFormUploadButton, ProDescriptions, ProCard } from '@ant-design/pro-components';
import {
  powerListApiV1PowerPowerGet,
  powerPutApiV1PowerPowerPut
} from '@/services/dev-plus/Power';
import {
  DrawerForm,
  ModalForm,
  ProFormDateTimePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm
} from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumnType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Popconfirm, message, Form, Select, Divider, Space, Input, Table, Image, Drawer } from 'antd';
import { memo, useRef, useState, useEffect } from 'react';
import { request, useModel } from '@umijs/max';
import { dataMerekApiV1MerekTipeMerekTipeMerekGet, tipeApiV1MerekTipeMerekTipeTipeGet } from '@/services/dev-plus/MerekTipe';
import DaftarPengunjung from '../DaftarPengunjung';

export default memo(() => {
  const actionRef = useRef<ActionType>();
 
  //ini visible 
  const [addVisible, setAddVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [tolakVisible, setTolakVisible] = useState(false);
  const [editTolakVisible, setEditTolakVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [detailVisibleAset, setDetailVisibleAset] = useState(false);
  const [asetVisible, setAsetVisible] = useState(false);

  //selesai disini visible

  //ini untuk data
  const [AsetData, setAsetData] = useState<API.AsetItem>();
  const [dataPengunjung, setDataPengunjung] = useState<API.DaftarPengunjungItem>();
  const [dataDetailPengunjung, setDataDetailPengunjung] = useState<API.DaftarPengunjungItem>();
  const [dataPerangkat, setDataPerangkat] = useState<Record<string, never>>();
  const [dataPerangkatTMP, setDataPerangkatTMP] = useState<Record<string, never>>();
  const [dataPemandu, setDataPemandu] = useState<Record<string, never>>();
  const [layananData, setLayananData] = useState<API.LayananItem>();

  //selesai data


  //ambill nickname
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const nicknameData = String( currentUser?.username)
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();
  const formRef = useRef<ProFormInstance>();

  //selesai nickname


  const [string, setString] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [currentStepAset, setCurrentStepAset] = useState(0);

  const [suratPermintaan, setSuratPermintaan] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  


  const steps = [
    'general',
    'lokasi',
    'kepemilikan',
    'utilisasi',
    'power',
  ];

  const [jenisLayanan, setJenisLayanan] = useState('');
  const [addAset, setAddAset] = useState(false);


//state untuk aset
  const [devicePhoto2, setDevicePhoto2] = useState('');

  const [dataMerek, setDataMerek] = useState([]);
  const [newMerek, setNewMerek] = useState('');
  const [items, setItems] = useState(['']);
  const [merek, setMerek] = useState('');


  const [dataTipe, setDataTipe] = useState({});
  const [newTipe, setNewTipe] = useState('');
  const [itemsTipe, setItemsTipe] = useState(['']);
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

  const [PowerData, setPowerData] = useState<any>();

  const[disTipe, setDisTipe] = useState(true);
  const[disRuang, setDisRuang] = useState(true);
  const[disRak, setDisRak] = useState(true);
  const[disPosU, setDisPosU] = useState(true);
  const[disLokasi, setDisLokasi] = useState(false);

  const [BatasPilih, setBatasPilih] = useState(0);
  const [PowerAset, setPowerAset] = useState<any>();



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
      const result = await posisiUDataApiV1LokasiLokasiPosisiUGet({ lokasi: lokasi, nama_ruangan : NamaRuangan, posisi_rak:Rak });
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
      const result = await powerListApiV1PowerPowerGet({ lokasi: lokasi, nama_ruangan : NamaRuangan, posisi_rak:Rak, sn_aset:'kosong' });
      if (result.success) {
        setPowerData(result.data)
        console,log("inin powewr data oi", data.result)
      } else {
        console.error('Error fetching dataMerek:', result.message);
      }

    } catch (error) {
      console.error('Error fetching dataMerek:', error);
    }
  };

 


  //Select Power

  const [selectedRowKeysPower, setSelectedRowKeysPower] = useState([]);

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
      const result = await powerListApiV1PowerPowerGet({ sn_aset: d.nomor_seri  });
      if (result.success) {
        setPowerAset(result.data);
        console,log("inin powewr data oi", data.result)
      } else {
        console.error('Error fetching dataMerek:', result.message);
      }

    } catch (error) {
      console.error('Error fetching dataMerek:', error);
    }
  };

  const resetLokasi = () => {
    setRak('');
    setNamaRuangan('')
    setDataRak('');
    // setDataNamaRuangan('');
    setPosisiU('');
    setDisPosU(true);
    setDisRak(true);
    setDisRuang(true);
    setDisTipe(true);
    setDisLokasi(false)
    setSelectedRowKeys([]);

  }
  

  const createDataAset = async (values: API.CreateAset) => {
    values.foto_perangkat = devicePhoto;
  
    // values.status_aset = 1;
    values.power = "Cek di tabel Power";
    values.user = nicknameData;
    values.status_aset = 2;
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
      // setAddVisible(false);
      // refresh the list
      getDataPerangkatTMP();

      actionRef.current?.reload();
      resetLokasi();
      // setCurrentStep(0);
      setAsetVisible(false);
      message.success(result.message);
    } else {
      message.error(result.message);
    }
  };

// selesai untuk aset



const onCloseLayanan = () => {

  setDetailVisible(false);
};

const tolakLayanan = () => {

  setTolakVisible(true);
};

  const [devicePhoto, setDevicePhoto] = useState('');

  const inputRef = useRef<InputRef>(null);

  const [daftarLayanan, setDaftarLayanan] = useState([
    {
      value: 'Kunjungan Data Center',
      label: 'Kunjungan Data Center',
    },
    {
      value: 'Perawatan / Pengecekan Perangkat',
      label: 'Perawatan / Pengecekan Perangkat',
    },
    {
      value: 'Pemasangan Perangkat',
      label: 'Pemasangan Perangkat',
    },
    {
      value: 'Pengambilan perangkat',
      label: 'Pengambilan perangkat',
    },
  ]);

  

  const handleJenisLayananChange = (value) => {
    setJenisLayanan(value);
    if (value === 'Pemasangan Perangkat') {
      setAddAset(true)
     
      // console.log("tes ya ngab", daftarLayanan)
    } else { setAddAset(false) }
  };


  const getDataPengunjung = async () => {
    const result = await pengunjungApiV1DaftarPengunjungDaftarPengunjungPengunjungGet();
    if (result.code === 200)  {
      // close the window

      // refresh the list
      actionRef.current?.reload();
      // return result;
      setDataPengunjung(result.data);
    } else {
      message.success(result.message);
    }
  };

  const getDataPengunjungDetail = async (d: API.LayananItem) => {
    const result = await layananPerangkatApiV1PengunjungHadirPengunjungHadirLayananPengunjungGet({nomor_tiket: d.nomor_tiket});
    if (result.success)  {
      // close the window

      // refresh the list
      actionRef.current?.reload();
      // return result;
      setDataDetailPengunjung(result.data);
    } else {
      message.success(result.message);
    }
  };

  

  const getDataPerangkat = async () => {
    console.log("ini nickname", nicknameData);
    const result = await asetListApiV1AsetAsetGet({ user: nicknameData });
    if (result.success) {
      // close the window

      // refresh the list
      actionRef.current?.reload();
      // return resul
      setDataPerangkat(result.data);
    } else {
      message.success(result.message);
    }
  };

  const getDataPerangkatTMP = async () => {
    console.log("ini nickname", nicknameData);
    const result = await asetListWithStatusTmpApiV1AsetAsetStatusTmpGet({ user: nicknameData, status_aset: 2 });
    if (result.success) {
      // close the window

      // refresh the list
      actionRef.current?.reload();
      // return resul
      setDataPerangkatTMP(result.data);
    } else {
      message.success(result.message);
    }
  };

  const getDataPerangkatLayanan = async (d: API.LayananItem) => {
    console.log("ini nickname", nicknameData);
    const result = await layananPerangkatApiV1PakaiAsetPakaiAsetLayananPerangkatGet({ nomor_tiket: d.nomor_tiket });
    if (result.success) {
      // close the window

      // refresh the list
      actionRef.current?.reload();
      // return resul
      setDataPerangkat(result.data);
    } else {
      message.success(result.message);
    }
  };

  const getDataPemandu = async () => {
    const result = await dataPemanduApiV1PemanduPemanduDataPemanduGet();
    if (result.code === 200) {
      // close the window

      // refresh the list
      actionRef.current?.reload();
      // return resul
      setDataPemandu(result.data);
    } else {
      message.success(result.message);
    }
  };

  const deleteAsetTMP= async () => {
    const result = await asetDelTmpApiV1AsetAsetasetTmpDelete({user: nicknameData});
  }


  const upload_props: UploadProps = {
    action: '/api/v1/admin/user/file/upload',
    method: 'POST',
    maxCount: 1,
    accept: 'file/pdf, file/docs',
    beforeUpload: async (file: RcFile) => {
      // The adjustment file is a file object
      // File type judgment
      const file_type = "'file/pdf', 'file/docs'";
      if (!file_type.indexOf(file.type)) {
        message.info('Support file type pdf, docs');
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
        setSuratPermintaan(url);
        console.log('url file:', url);
        // message.success(info.file.response.message);
      }
    },
  };

  const upload_props_image: UploadProps = {
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

  const generateRandomString = (lenth: number) => {
    const char = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890';
    const random = Array.from(
      { length: lenth },
      () => char[Math.floor(Math.random() * char.length + 1)],
    );
    const randomString = random.join('');
    return setString(randomString);
  };

  // const getDataInfra = async (d: API.LayananItem) => {
  //   const result = await layananListApiV1LayananLayananGet();
  //   if (result.data === []) {
  //     // close the window

  //     // refresh the list
  //     actionRef.current?.reload();
  //     // return result;
  //     setDaftarPengunjung(result.data);
  //   } else {
  //     message.success(result.message);
  //   }
  // };
  // Creating a Role
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const createData = async (values: API.CreateLayanan) => {
    values.co_location = suratPermintaan;
    // values.jenis_infra = JSON.stringify(values.jenis_infra);
    values.status = 0;
    values.perangkat = '-';
    const niks = values.data_pengunjung.map(({ key }) => key);
   

    const tmpPower: API.InsertAkanHadir = {
      // id: d,
      nomor_tiket: values.nomor_tiket,
      nik: niks,
      
    };


    const result = await layananAddApiV1LayananLayananPost(values);
    await pengunjungHadirAddApiV1PengunjungHadirPengunjungHadirPost(tmpPower);

    if(values.jenis_layanan !== 'Kunjungan Data Center'){
     
      const ns = selectedRowKeys.map(({ nomor_seri }) => nomor_seri);
      const tmpPakaiAset: API.InsertAkanPakaiAset = {
        // id: d,
        nomor_tiket: values.nomor_tiket,
        nomor_seri: ns,
        
      };

      await pakaiAsetAddApiV1PakaiAsetPakaiAsetPost(tmpPakaiAset);
    
    }

    if(values.jenis_layanan === 'Pemasangan Perangkat'){
      await bookStatusPutApiV1AsetAsetbookStatusPut(tmpPakaiAset);
      deleteAsetTMP();
    }
   


    setSelectedRowKeys([]);
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
  const deleteData = async (d: API.LayananItem) => {
    const result = await layananDelApiV1LayananLayananDelete({ id: d.id });
    if (result.code === 200) {
      // refresh the list
      actionRef.current?.reload();
      message.success(result.message);
    } else {
      message.error(result.message);
    }
  };

  // Modify the role
  const updateData = async (d: API.UpdateLayanan) => {
    if (layananData) {
      d.jenis_infra = JSON.stringify(d.jenis_infra);
      d.id = layananData.id;
      // d.id = Aset.id;
      const result = await layananUpdateApiV1LayananLayananPut(d);
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

  const tolakLayananConfirm = async (d: API.TolakLayanan) => {
    if (layananData) {
      d.id = layananData.id;
      // d.id = Aset.id;
      const result = await layananTolakApiV1LayananLayananTolakPut(d);
      if (result.code === 200) {
        // refresh the list
        actionRef.current?.reload();
        setTolakVisible(false);
        setDetailVisible(false);
        message.success(result.message);
      } else {
        message.error(result.message);
      }
    }
  };

  // Define the header
  const columns: ProColumnType<API.LayananItem>[] = [
    {
      title: 'Nomor Tiket',
      dataIndex: 'nomor_tiket',
      // tip: 'NO Tiket is unique key',
    },
    {
      title: 'Jenis Layanan',
      dataIndex: 'jenis_layanan',
    },
    {
      title: 'Surat Permintaan Co-Location',
      dataIndex: 'co_location',
      render: (co_location) => {
        if (co_location.includes('/upload/file/')) {
          return (
            <a
              href={`/api/v1/layanan/layanan${co_location}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <DownloadOutlined /> Surat
            </a>
          );
        } else {
          return null;
        }
      },
    },
    
    {
      title: 'Status',
      dataIndex: 'status',
      valueEnum: {
        0: 'Tidak Aktif',
        1: 'Aktif',
        2: 'Selesai',
        3: 'Tolak'
       },
      render: (text, record) => {
        if (record.status === 3) {
          return (
            <a
              key={'detail'}
              type="primary"
              onClick={() => {
                setLayananData(record);
                getDataPengunjungDetail(record);
                getDataPengunjung();

                setEditTolakVisible(true);
                
                // console.log("ini isi tolak", record)
                
                // fetchDataPower2(record)
              }}
            >
              Tolak
            </a>
          );
        } else {
          return text;
        }
      },
     
    },
    {
      title: 'Mulai Kunjungan',
      dataIndex: 'mulai_kunjungan',
      valueType: 'dateTime',
    },
    {
      title: 'Akhir Kunjungan',
      dataIndex: 'akhir_kunjungan',
      valueType: 'dateTime',
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
              getDataPengunjung();
              setLayananData(d);
              setDetailVisible(true);
              getDataPerangkatLayanan(d);
              getDataPengunjungDetail(d);
              console.log("tes data pengunjung", dataPengunjung)
            }}
          >
            Review
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


  const pengunjungColom : ProColumnType<API.DaftarPengunjungItem>[] = [
    {
      title: 'Nama',
      dataIndex: 'nama',
    },
    {
      title: 'NIK',
      dataIndex: 'nik',
    },
    {
      title: 'Instansi',
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
  ]

  const asetColom : ProColumnType<API.AsetItem>[] = [
    {
      title: 'Merek',
      dataIndex: 'merek',
    },
    {
      title: 'Tipe',
      dataIndex: 'tipe',
    },
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
              setDevicePhoto2(d.foto_perangkat ? d.foto_perangkat : '');
              setDetailVisibleAset(true);
              // fetchDataPower2(d)

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
      filters: [
        {
          text: 'Server',
          value: 'Server',
        },
        {
          text: 'Storage',
          value: 'Storage',
        },
        {
          text: 'Network',
          value: 'Network',
        },
        {
          text: 'Periferal',
          value: 'Periferal',
        },
      ],
      onFilter: (value: string, record) => record.jenis_infra.startsWith(value),
      filterSearch: true
    },
  ]

  const powerColom : ProColumnType<API.PowerItem>[] = [
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
        headerTitle="Layanan"
        actionRef={actionRef}
        columns={columns}
        size="small"
        cardProps={{ bodyStyle: { paddingBottom: 20, paddingTop: 0 } }}
        // pagination={{ pageSize: 10 }}
        pagination={{ defaultPageSize: 10, showSizeChanger: true }}
        locale={{ emptyText: 'Insufficient permission' }}
        request={async (params) => layananListApiV1LayananLayananGet({ ...params })}
        toolBarRender={() => [
          <Button
            key="add_user"
            type="primary"
            onClick={() => {
              getDataPengunjung();
              getDataPerangkat();
              getDataPerangkatTMP();
              getDataPemandu();
              setAddVisible(true);
              generateRandomString(15);
              fetchDataLokasi();
              fetchDataMerek();
              console.log("isi data pengunjung", dataPengunjung);
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
        submitter={false}
       
        modalProps={{
          destroyOnClose: true,
          mask: true,
          maskClosable: false ,
          onCancel() {
            setAddVisible(false);
            deleteAsetTMP();

            
          },
        }}
        // onClick={() => {
        //   setAddVisible(true);
        //   fetchDataMerek();

        // }}
      >
        <StepsForm
        form={form3}
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
                    // loading={loading}
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
                    // loading={loading}
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
              // setLoading(true);
              // await waitTime(2000);
              // setLoading(false);
              return true;
            }}
          >
        <ProFormText
          name="nomor_tiket"
          width="md"
          label="Nomor Tiket"
          initialValue={string}
          disabled
          // tooltip="Nomor Tiket must be unique!"
          // placeholder="please enter a name"
          rules={[{ required: true }]}
        />

        
        <ProFormSelect
          name="jenis_layanan"
          width="md"
          label="Jenis Layanan"
          rules={[{ required: true }]}
          options={daftarLayanan}
          onChange={handleJenisLayananChange}
        />
        <ProFormSelect.SearchSelect
          name="data_pengunjung"
          label="Data Pengunjung"
          width="lg"
          valueEnum={dataPengunjung}
          rules={[{ required: true }]}
        />
        {jenisLayanan === 'Pemasangan Perangkat' && (
          <ProFormUploadButton
            name="co_location"
            title="Upload"
            rules={[{ required: true }]}
            extra="Surat"
            max={1}
            showUploadList={false}
            {...upload_props}
            fieldProps={{
              headers: { Authorization: `Bearer ${localStorage.getItem('Authorization') || ''}` },
            }}
          />
        )}
        {jenisLayanan === 'Kunjungan Data Center' && (
          <ProFormSelect
          name="pemandu"
          label="Pemandu"
          width="lg"
          rules={[{ required: true }]}
          valueEnum={dataPemandu}
        />
        )}
        
       
        <ProForm.Group>
          <ProFormDateTimePicker
            name="mulai_kunjungan"
            label="Mulai Kunjungan"
            rules={[{ required: true }]}
          />
          <ProFormDateTimePicker
            name="akhir_kunjungan"
            label="Akhir Kunjungan"
            rules={[{ required: true }]}
          />
        </ProForm.Group>
        
       
        </StepsForm.StepForm>
  
        
         {jenisLayanan !== 'Kunjungan Data Center' && jenisLayanan !== 'Pemasangan Perangkat' && (
          
         <StepsForm.StepForm name="Perangkat" title="Perangkat" rules={[{ required: true }]}>
         <Table
          
          rowSelection={{
            type: 'checkbox',
            // selectedRowKeys: [1, 5],
            onChange: (_, selectedRows) => {
              setSelectedRowKeys(selectedRows);
              console.log('row selected:', selectedRows);
            },
          }}
        columns={asetColom}
        dataSource={dataPerangkat}
        />

         </StepsForm.StepForm>
         )}

        {jenisLayanan === 'Pemasangan Perangkat' && (
          
          <StepsForm.StepForm name="Perangkat" title="Perangkat" rules={[{ required: true }]}>
             <Button

            onClick={() => setAsetVisible(true)}
          >
           Add New
          </Button>,
          <Table
           
           rowSelection={{
             type: 'checkbox',
             // selectedRowKeys: [1, 5],
             onChange: (_, selectedRows) => {
               setSelectedRowKeys(selectedRows);
               console.log('row selected:', selectedRows);
             },
           }}
         columns={asetColom}
         dataSource={dataPerangkatTMP}
         />
 
          </StepsForm.StepForm>
          )}


        
        </StepsForm>
      </ModalForm>

      {/* Drawer Add Aset */}
      <Drawer
        title={'Detail Layanan'}
        visible={detailVisible}
        width={780}
        onClose={onCloseLayanan}
        extra={
          <Space>
            <Button onClick={tolakLayanan} danger type="primary">Tolak</Button>
            <Button onClick={onCloseLayanan} type="primary">
              Terima
            </Button>
          </Space>
        }
      >
        
      

        <ProDescriptions
          labelStyle={{ fontWeight: 'bold' }}
          size='small'
          bordered
          dataSource={layananData}
          column={2}
          // title="Informasi Aset"
        >
          <ProDescriptions.Item
            label="Nomor Tiket"
            dataIndex="nomor_tiket"
          />
          <ProDescriptions.Item
            label="Jenis Layanan"
            dataIndex="jenis_layanan"
          />
          <ProDescriptions.Item
            label="Mulai Kunjungann"
            dataIndex="mulai_kunjungan"
          />
          <ProDescriptions.Item
            label="Akhir Kunjungan"
            dataIndex="akhir_kunjungan"
          />
          
        </ProDescriptions>

        {layananData?.jenis_layanan !== 'Kunjungan Data Center' && (
        <Table
        
        columns={asetColom}
        dataSource={dataPerangkat}
        title={() => 'Daftar Perangkat'}
      />
      )}

        <Table 
        columns={pengunjungColom}
        dataSource={dataDetailPengunjung}
        title={() => 'Daftar Pengunjung'}
      />
     

      </Drawer>

      {/* Drawer Detail Aset*/}
      <DrawerForm
        title={'Detail Aset'}
        visible={detailVisibleAset}
        width={780}
        submitter={false}
        onFinish={updateData}
        drawerProps={{
          destroyOnClose: true,
          mask: true,
          onClose: () => setDetailVisibleAset(false),
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
        {/* <Table
         columns={powerColom}
        dataSource={PowerAset}
      /> */}


      </DrawerForm>

      <ModalForm
        title={'Tolak'}
        visible={tolakVisible}
        width={550}
        submitter={{ searchConfig: { submitText: 'Tolak' } }}
        onFinish={tolakLayananConfirm}
        initialValues={layananData}
        modalProps={{
          destroyOnClose: true,
          mask: true,
          onCancel: () => setTolakVisible(false),
        }}
      >
      
        <ProForm.Item>
          <ProFormTextArea
            name={'detail_tolak'}
            label={'Detail'}
            placeholder={'Detail'}
            rules={[
              {
                required: true,
                message: 'Detail harus diisi!',
              },
            ]}
          />
        </ProForm.Item>
        
      </ModalForm>

      <ModalForm
        title={'Edit Request'}
        visible={editTolakVisible}
        width={550}
        submitter={{ searchConfig: { submitText: 'Tolak' } }}
        onFinish={tolakLayananConfirm}
        initialValues={layananData}
        modalProps={{
          destroyOnClose: true,
          mask: true,
          onCancel: () => setEditTolakVisible(false),
        }}
      >
        {/* <a>{layananData?.jenis_layanan}</a> */}
        <ProForm.Item>
          <ProFormTextArea
            name={'detail_tolak'}
            label={'Detail'}
            placeholder={'Detail'}
            disabled
            rules={[
              {
                required: true,
                message: 'Detail harus diisi!',
              },
            ]}
          />
        </ProForm.Item>
        <ProFormText
          name="nomor_tiket"
          width="md"
          label="Nomor Tiket"
          initialValue={string}
          disabled
          rules={[{ required: true }]}
        />

        
        <ProFormSelect
          name="jenis_layanan"
          width="md"
          label="Jenis Layanan"
          disabled
          rules={[{ required: true }]}
          options={daftarLayanan}
          onChange={handleJenisLayananChange}
        />
        <ProFormSelect.SearchSelect
          name="dt_pengunjung"
          label="Data Pengunjung"
          width="lg"
          initialValue={dataDetailPengunjung}
          
          valueEnum={dataPengunjung}
          rules={[{ required: true }]}
        />
        {jenisLayanan === 'Pemasangan Perangkat' && (
          <ProFormUploadButton
            name="co_location"
            title="Upload"
            rules={[{ required: true }]}
            extra="Surat"
            max={1}
            showUploadList={false}
            {...upload_props}
            fieldProps={{
              headers: { Authorization: `Bearer ${localStorage.getItem('Authorization') || ''}` },
            }}
          />
        )}
        {jenisLayanan === 'Kunjungan Data Center' && (
          <ProFormSelect
          name="pemandu"
          label="Pemandu"
          width="lg"
          rules={[{ required: true }]}
          valueEnum={dataPemandu}
        />
        )}
        
      
        <ProForm.Group>
          <ProFormDateTimePicker
            name="mulai_kunjungan"
            label="Mulai Kunjungan"
            rules={[{ required: true }]}
          />
          <ProFormDateTimePicker
            name="akhir_kunjungan"
            label="Akhir Kunjungan"
            rules={[{ required: true }]}
          />
        </ProForm.Group>
      </ModalForm>

      <ModalForm
        title={'Add Aset'}
        visible={asetVisible}
        width={1200}
        submitter={{ searchConfig: { submitText: 'Save' } }}

        onFinish={createDataAset}
        modalProps={{
          destroyOnClose: true,
          mask: true,
          maskClosable: false ,
          onCancel() {
            setAsetVisible(false);
            
          },
        }}
      >
        
              <ProCard
            title="General"
            bordered
            headerBordered
            collapsible
            style={{
              marginBlockEnd: 16,
              minWidth: 800,
              maxWidth: '100%',
            }}
          >
            <ProForm.Group>
              <Form.Item name="merek" label="Merek" >
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

              <Form.Item name="tipe" label="Tipe" >
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
                
              />

              <ProFormText
                name="fungsi_perangkat"
                width="md"
                label="Fungsi Perangkat"
               
              />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormSelect
                name="jenis_infra"
                label="Jenis Infrastruktur"
                width="md"
                
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
              
            
            
            </ProForm.Group>
           


            <ProForm.Group>
              <ProFormSelect
                name="instansi_pemilik"
                label="Instansi Pemilik"
                width="md"
               
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
                {...upload_props_image}
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
            </ProCard>

             {/* LOKASI */}
            <ProCard
            title="Lokasi"
            bordered
            headerBordered
            collapsible
            style={{
              marginBlockEnd: 16,
              minWidth: 800,
              maxWidth: '100%',
            }}
          >
            <ProForm.Group>
            <Form.Item name="lokasi" label="Lokasi" >
                <Select
                  showSearch
                  style={{ width: 328 }}
                  placeholder="Pilih Lokasi..."
                  disabled={disLokasi}
                  onSelect={(e) => (setLokasi(e),setDisRuang(false), setDisLokasi(true))}
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

              <Form.Item name="nama_ruangan" label="Nama Ruangan" >
                <Select
                  // disabled={AsetData?.merek ? true : false}
                  style={{ width: 328 }}
                  value={tipe}
                  placeholder="Pilih Tipe..."
                  name="nama_ruangan"
                 disabled={disRuang}
                  onSelect={(e) => (setNamaRuangan(e),setDisRak(false), setDisRuang(true))}
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
                  
                  disabled={disRak}
                  onSelect={(e) => (setRak(e),setDisPosU(false), setDisRak(true))}
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

              <Form.Item name="posisi_u" label="Posisi U"  >
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

            <Button
            
            danger={false}
            onClick={() => resetLokasi()}
          >
           Reset
          </Button>
            </ProCard>

             {/* KEPEMILIKAN */}
            <ProCard
            title="Kepemilikan"
            bordered
            headerBordered
            collapsible
            style={{
              marginBlockEnd: 16,
              minWidth: 800,
              maxWidth: '100%',
            }}
          >
            <ProForm.Group>
            <ProFormSelect
              name="psu"
              label="Total PSU"
              width="md"
              onChange={(value) => setBatasPilih(value)}
             
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
               
                fieldProps={{
                  addonAfter: 'Core',
                }}
              />

              <ProFormText
                name="kapasitas_hdd"
                label="Kapasitas Hard Disk"
                width="md"
                
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
               
                fieldProps={{
                  addonAfter: 'GB',
                }}
              />
            </ProForm.Group>
            </ProCard>


            {/* POWER */}
            <ProCard
            title="Power"
            bordered
            headerBordered
            collapsible
            style={{
              marginBlockEnd: 16,
              minWidth: 800,
              maxWidth: '100%',
            }}
          >
            <Table
          
          rowSelection={rowSelection}
          columns={powerColom}
          dataSource={PowerData}
        />

          </ProCard>

      </ModalForm>

          {/* <Button
            
            danger={false}
            onClick={() => console.log("ini cek isi data pengunjung select", dataPerangkatTMP)}
          >
           Cek Isi
          </Button> */}
          
       
    </PageContainer>
  );
});
