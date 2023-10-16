declare namespace API {
  type AccessToken = {
    /** Token */
    token?: string;
    /** Expires In */
    expires_in?: number;
  };

  type AccountLogin = {
    /** Username username */
    username?: string;
    /** Password password */
    password?: string;
    /** Mobile phone number */
    mobile?: string;
    /** Captcha 6-digit verification code */
    captcha?: string;
  };

  type allRolesOptionsApiV1AdminRoleAllGetParams = {
    user_id?: number;
  };

  type asetDelTmpApiV1AsetAsetasetTmpDeleteParams = {
    user: string;
  };

  type AsetItem = {
    /** Merek */
    merek: string;
    /** Tipe */
    tipe: string;
    /** Fungsi Perangkat */
    fungsi_perangkat: string;
    /** Foto Perangkat */
    foto_perangkat: string;
    /** Nomor Seri */
    nomor_seri: string;
    /** Jenis Infra */
    jenis_infra: string;
    /** Instansi Pemilik */
    instansi_pemilik: string;
    /** Penanggung Jawab */
    penanggung_jawab: string;
    /** Lokasi */
    lokasi: string;
    /** Nama Ruangan */
    nama_ruangan: string;
    /** Posisi Rak */
    posisi_rak: string;
    /** Psu */
    psu: string;
    /** Posisi U */
    posisi_u: string;
    /** Power */
    power: string;
    /** Kapasitas Cpu */
    kapasitas_cpu: string;
    /** Kapasitas Hdd */
    kapasitas_hdd: string;
    /** Kapasitas Ram */
    kapasitas_ram: string;
    /** Daya */
    daya: string;
    /** Tanggal Pemasangan */
    tanggal_pemasangan?: string;
    /** Tanggal Penarikan */
    tanggal_penarikan?: string;
    /** Keterangan */
    keterangan?: string;
    /** Status Aset */
    status_aset: number;
    /** User */
    user: string;
    /** Id */
    id: number;
    /** Key */
    key: number;
    /** Create Time */
    create_time: string;
    /** Update Time */
    update_time: string;
  };

  type asetListApiV1AsetAsetGetParams = {
    pageSize?: number;
    current?: number;
    merek?: string;
    tipe?: string;
    fungsi_perangkat?: string;
    foto_perangkat?: string;
    nomor_seri?: string;
    jenis_infra?: string;
    instansi_pemilik?: string;
    penanggung_jawab?: number;
    lokasi?: string;
    nama_ruangan?: string;
    posisi_rak?: string;
    psu?: string;
    posisi_u?: string;
    power?: string;
    kapasitas_cpu?: string;
    kapasitas_hdd?: string;
    kapasitas_ram?: string;
    daya?: string;
    tanggal_pemasangan?: string;
    tanggal_penarikan?: string;
    keterangan?: string;
    status_aset?: boolean;
    create_time?: string;
    update_time?: string;
    user?: string;
  };

  type AsetListData = {
    /** Success status code */
    success: boolean;
    /** Data */
    data: AsetItem[];
    /** Total total */
    total: number;
  };

  type asetListWithStatusFalseApiV1AsetAsetStatusFalseGetParams = {
    pageSize?: number;
    current?: number;
  };

  type asetListWithStatusTmpApiV1AsetAsetStatusTmpGetParams = {
    pageSize?: number;
    current?: number;
    status_aset?: number;
    user?: string;
  };

  type BaseResp = {
    /** Code status code */
    code: number;
    /** Message message */
    message: string;
    /** Data data */
    data: any[];
  };

  type BodyAvatarUploadApiV1AdminUserAvatarUploadPut = {
    /** Avatar */
    avatar: string;
  };

  type BodyFileUploadApiV1AdminUserFileUploadPost = {
    /** File */
    file: string;
  };

  type BodyPhotoUploadApiV1AdminUserPhotoUploadPost = {
    /** File */
    file: string;
  };

  type BodyTestOath2ApiV1TestOath2Post = {
    /** Grant Type */
    grant_type?: string;
    /** Username */
    username: string;
    /** Password */
    password: string;
    /** Scope */
    scope?: string;
    /** Client Id */
    client_id?: string;
    /** Client Secret */
    client_secret?: string;
  };

  type bukuTamuDelApiV1BukuTamuBukuTamuDeleteParams = {
    id: number;
  };

  type BukuTamuItem = {
    /** No Tiket */
    no_tiket: string;
    /** Jam Masuk */
    jam_masuk: string;
    /** Jam Keluar */
    jam_keluar: string;
    /** Laporan Pekerjaan */
    laporan_pekerjaan: string;
    /** Daftar Pengunjung */
    daftar_pengunjung: string;
    /** Id */
    id: number;
    /** Key */
    key: number;
    /** Create Time */
    create_time: string;
    /** Update Time */
    update_time: string;
  };

  type bukuTamuListApiV1BukuTamuBukuTamuGetParams = {
    pageSize?: number;
    current?: number;
    no_tiket?: string;
    jam_masuk?: string;
    jam_keluar?: string;
    laporan_pekerjaan?: string;
    daftar_pengunjung?: string;
    create_time?: string;
    update_time?: string;
  };

  type BukuTamuListData = {
    /** Success status code */
    success: boolean;
    /** Data */
    data: BukuTamuItem[];
    /** Total total */
    total: number;
  };

  type CreateAccess = {
    /** Access Name Permission name */
    access_name?: string;
    /** Scopes Permissions */
    scopes?: string;
    /** Parent Id */
    parent_id?: number;
    /** Is Check */
    is_check?: boolean;
    /** Is Menu */
    is_menu?: boolean;
  };

  type CreateAset = {
    /** Merek */
    merek: string;
    /** Tipe */
    tipe: string;
    /** Fungsi Perangkat */
    fungsi_perangkat: string;
    /** Foto Perangkat */
    foto_perangkat: string;
    /** Nomor Seri */
    nomor_seri: string;
    /** Jenis Infra */
    jenis_infra: string;
    /** Instansi Pemilik */
    instansi_pemilik: string;
    /** Penanggung Jawab */
    penanggung_jawab: string;
    /** Lokasi */
    lokasi: string;
    /** Nama Ruangan */
    nama_ruangan: string;
    /** Posisi Rak */
    posisi_rak: string;
    /** Psu */
    psu: string;
    /** Posisi U */
    posisi_u: string;
    /** Power */
    power: string;
    /** Kapasitas Cpu */
    kapasitas_cpu: string;
    /** Kapasitas Hdd */
    kapasitas_hdd: string;
    /** Kapasitas Ram */
    kapasitas_ram: string;
    /** Daya */
    daya: string;
    /** Tanggal Pemasangan */
    tanggal_pemasangan?: string;
    /** Tanggal Penarikan */
    tanggal_penarikan?: string;
    /** Keterangan */
    keterangan?: string;
    /** Status Aset */
    status_aset: number;
    /** User */
    user: string;
  };

  type CreateBukuTamu = {
    /** No Tiket */
    no_tiket: string;
    /** Jam Masuk */
    jam_masuk: string;
    /** Jam Keluar */
    jam_keluar: string;
    /** Laporan Pekerjaan */
    laporan_pekerjaan: string;
    /** Daftar Pengunjung */
    daftar_pengunjung: string;
  };

  type CreateDaftarPengunjung = {
    /** Nik */
    nik: string;
    /** Nama */
    nama: string;
    /** Status */
    status: string;
    /** Instansi */
    instansi: string;
    /** Foto */
    foto: string;
  };

  type CreateLayanan = {
    /** Nomor Tiket */
    nomor_tiket: string;
    /** Jenis Layanan */
    jenis_layanan: string;
    /** Co Location */
    co_location: string;
    /** Perangkat */
    perangkat: string;
    /** Mulai Kunjungan */
    mulai_kunjungan: string;
    /** Akhir Kunjungan */
    akhir_kunjungan: string;
    /** Pemandu */
    pemandu?: string;
    /** Status */
    status?: number;
    /** Detail Tolak */
    detail_tolak?: string;
  };

  type CreateLokasi = {
    /** Lokasi */
    lokasi: string;
    /** Nama Ruangan */
    nama_ruangan?: string;
    /** Posisi Rak */
    posisi_rak?: string;
    /** Posisi U */
    posisi_u?: string;
    /** Sn Aset */
    sn_aset?: string;
  };

  type CreateMerekTipe = {
    /** Merek */
    merek: string;
    /** Tipe */
    tipe?: string;
  };

  type CreatePemandu = {
    /** Nama */
    nama: string;
    /** No Hp */
    no_hp?: string;
  };

  type CreateRole = {
    /** Role Name */
    role_name: string;
    /** Role Status */
    role_status?: boolean;
    /** Role Desc */
    role_desc?: string;
  };

  type CreateUser = {
    /** Username */
    username: string;
    /** Password */
    password: string;
    /** User Phone */
    user_phone?: string;
    /** User Status */
    user_status?: boolean;
    /** Remarks */
    remarks?: string;
    /** Roles */
    roles?: number[];
  };

  type CurrentUser = {
    /** Code status code */
    code: number;
    /** Message message */
    message: string;
    data: UserInfo;
  };

  type daftarPengunjungDelApiV1DaftarPengunjungDaftarPengunjungDeleteParams = {
    id: number;
  };

  type DaftarPengunjungItem = {
    /** Nik */
    nik: string;
    /** Nama */
    nama: string;
    /** Status */
    status: string;
    /** Instansi */
    instansi: string;
    /** Foto */
    foto: string;
    /** Id */
    id: number;
    /** Key */
    key: number;
    /** Create Time */
    create_time: string;
    /** Update Time */
    update_time: string;
  };

  type daftarPengunjungListApiV1DaftarPengunjungDaftarPengunjungGetParams = {
    pageSize?: number;
    current?: number;
    nama?: string;
    nik?: string;
    status?: string;
    instansi?: string;
    foto?: string;
    create_time?: string;
    update_time?: string;
  };

  type DaftarPengunjungListData = {
    /** Success status code */
    success: boolean;
    /** Data */
    data: DaftarPengunjungItem[];
    /** Total total */
    total: number;
  };

  type dataPerangkatApiV1AsetAsetDataPerangkatGetParams = {
    user: string;
  };

  type deleteRoleApiV1AdminRoleDeleteParams = {
    role_id: number;
  };

  type getAllAccessApiV1AdminAccessGetParams = {
    role_id: number;
  };

  type getAllRoleApiV1AdminRoleGetParams = {
    pageSize?: number;
    current?: number;
    role_name?: string;
    role_status?: boolean;
    create_time?: string[];
  };

  type getFederationTokenApiV1CosGetFederationTokenGetParams = {
    file_type: string;
  };

  type getFileApiV1LayananLayananUploadFileFileNameGetParams = {
    file_name: string;
  };

  type getPhotoApiV1AsetAsetUploadPhotoFileNameGetParams = {
    file_name: string;
  };

  type getPhotoApiV1DaftarPengunjungDaftarPengunjungUploadPhotoFileNameGetParams = {
    file_name: string;
  };

  type HTTPValidationError = {
    /** Detail */
    detail?: ValidationError[];
  };

  type InsertAkanHadir = {
    /** Nomor Tiket */
    nomor_tiket: string;
    /** Nik */
    nik: string[];
  };

  type InsertAkanPakaiAset = {
    /** Nomor Tiket */
    nomor_tiket: string;
    /** Nomor Seri */
    nomor_seri: string[];
  };

  type InsertPower = {
    /** Nama */
    nama?: string;
    /** Lokasi */
    lokasi?: string;
    /** Nama Ruangan */
    nama_ruangan?: string;
    /** Posisi Rak */
    posisi_rak?: string;
    /** Source */
    source?: string;
    /** Tipe */
    tipe: string[];
    /** Jumlah */
    jumlah: number[];
  };

  type laporanPintuApiCallbackIdentifyPostParams = {
    self: any;
  };

  type layananDelApiV1LayananLayananDeleteParams = {
    id: number;
  };

  type LayananItem = {
    /** Nomor Tiket */
    nomor_tiket: string;
    /** Jenis Layanan */
    jenis_layanan: string;
    /** Co Location */
    co_location: string;
    /** Perangkat */
    perangkat: string;
    /** Mulai Kunjungan */
    mulai_kunjungan: string;
    /** Akhir Kunjungan */
    akhir_kunjungan: string;
    /** Pemandu */
    pemandu?: string;
    /** Status */
    status?: number;
    /** Detail Tolak */
    detail_tolak?: string;
    /** Id */
    id: number;
    /** Key */
    key: number;
    /** Create Time */
    create_time: string;
    /** Update Time */
    update_time: string;
  };

  type layananListApiV1LayananLayananGetParams = {
    pageSize?: number;
    current?: number;
    nomor_tiket?: string;
    jenis_layanan?: string;
    co_location?: string;
    perangkat?: string;
    mulai_kunjungan?: string;
    akhir_kunjungan?: number;
    pemandu?: string;
    create_time?: string;
    update_time?: string;
  };

  type LayananListData = {
    /** Success status code */
    success: boolean;
    /** Data */
    data: LayananItem[];
    /** Total total */
    total: number;
  };

  type layananPerangkatApiV1PakaiAsetPakaiAsetLayananPerangkatGetParams = {
    pageSize?: number;
    current?: number;
    id?: number;
    nomor_seri?: string;
    nomor_tiket?: string;
  };

  type layananPerangkatApiV1PengunjungHadirPengunjungHadirLayananPengunjungGetParams = {
    pageSize?: number;
    current?: number;
    id?: number;
    nik?: string;
    nomor_tiket?: string;
  };

  type lokasiDelApiV1LokasiLokasiDeleteParams = {
    id: number;
  };

  type LokasiItem = {
    /** Lokasi */
    lokasi: string;
    /** Nama Ruangan */
    nama_ruangan?: string;
    /** Posisi Rak */
    posisi_rak?: string;
    /** Posisi U */
    posisi_u?: string;
    /** Sn Aset */
    sn_aset?: string;
    /** Id */
    id: number;
    /** Key */
    key: number;
    /** Create Time */
    create_time: string;
    /** Update Time */
    update_time: string;
  };

  type lokasiListApiV1LokasiLokasiGetParams = {
    pageSize?: number;
    current?: number;
    merek?: string;
    tipe?: string;
    create_time?: string;
    update_time?: string;
  };

  type LokasiListData = {
    /** Success status code */
    success: boolean;
    /** Data */
    data: LokasiItem[];
    /** Total total */
    total: number;
  };

  type merekTipeDelApiV1MerekTipeMerekTipeDeleteParams = {
    id: number;
  };

  type MerekTipeItem = {
    /** Merek */
    merek: string;
    /** Tipe */
    tipe?: string;
    /** Id */
    id: number;
    /** Key */
    key: number;
    /** Create Time */
    create_time: string;
    /** Update Time */
    update_time: string;
  };

  type merekTipeListApiV1MerekTipeMerekTipeGetParams = {
    pageSize?: number;
    current?: number;
    merek?: string;
    tipe?: string;
    create_time?: string;
    update_time?: string;
  };

  type MerekTipeListData = {
    /** Success status code */
    success: boolean;
    /** Data */
    data: MerekTipeItem[];
    /** Total total */
    total: number;
  };

  type ModifyMobile = {
    /** Mobile phone number */
    mobile: string;
    /** Captcha 6-digit verification code */
    captcha: string;
  };

  type namaRuanganApiV1LokasiLokasiNamaRuanganGetParams = {
    lokasi: string;
  };

  type pemanduDelApiV1PemanduPemanduDeleteParams = {
    id: number;
  };

  type PemanduItem = {
    /** Nama */
    nama?: string;
    /** No Hp */
    no_hp?: string;
    /** Id */
    id: number;
    /** Key */
    key: number;
    /** Create Time */
    create_time: string;
    /** Update Time */
    update_time: string;
  };

  type pemanduListApiV1PemanduPemanduGetParams = {
    pageSize?: number;
    current?: number;
    nama?: string;
    no_hp?: string;
    create_time?: string;
    update_time?: string;
  };

  type PemanduListData = {
    /** Success status code */
    success: boolean;
    /** Data */
    data: PemanduItem[];
    /** Total total */
    total: number;
  };

  type pengunjungHadirDelApiV1PengunjungHadirPengunjungHadirDeleteParams = {
    id: number;
  };

  type posisiUDataApiV1LokasiLokasiPosisiUGetParams = {
    lokasi: string;
    nama_ruangan: string;
    posisi_rak: string;
  };

  type powerADataApiV1PowerPowerPowerAGetParams = {
    lokasi: string;
    nama_ruangan: string;
    posisi_rak: string;
  };

  type powerADataApiV1PowerPowerPowerBGetParams = {
    lokasi: string;
    nama_ruangan: string;
    posisi_rak: string;
  };

  type powerDelApiV1PowerPowerDeleteParams = {
    id: number;
  };

  type PowerItem = {
    /** Nama */
    nama?: string;
    /** Lokasi */
    lokasi?: string;
    /** Nama Ruangan */
    nama_ruangan?: string;
    /** Posisi Rak */
    posisi_rak?: string;
    /** Source */
    source?: string;
    /** Power */
    power?: string;
    /** Tipe */
    tipe?: string;
    /** Sn Aset */
    sn_aset?: string;
    /** Id */
    id: number;
    /** Key */
    key: number;
    /** Create Time */
    create_time: string;
    /** Update Time */
    update_time: string;
  };

  type powerListApiV1PowerPowerGetParams = {
    pageSize?: number;
    current?: number;
    lokasi?: string;
    nama_ruangan?: string;
    sn_aset?: string;
    posisi_rak?: string;
    create_time?: string;
    update_time?: string;
  };

  type PowerListData = {
    /** Success status code */
    success: boolean;
    /** Data */
    data: PowerItem[];
    /** Total total */
    total: number;
  };

  type PutPower = {
    /** Id */
    id: number[];
    /** Sn Aset */
    sn_aset: string;
  };

  type RackItem = {
    /** Name */
    name: string;
    /** Posx */
    posx: number;
    /** Posy */
    posy: number;
    /** Posz */
    posz: number;
    /** Width */
    width: number;
    /** Height */
    height: number;
    /** Depth */
    depth: number;
    /** Id */
    id: number;
    /** Key */
    key: number;
    /** Create Time */
    create_time: string;
    /** Update Time */
    update_time: string;
  };

  type rackListApiV1PakaiAsetRackGetParams = {
    name?: string;
    posx?: number;
    posy?: number;
    posz?: number;
    width?: number;
    height?: number;
    depth?: number;
    create_time?: string;
    update_time?: string;
  };

  type RackListData = {
    /** Success status code */
    success: boolean;
    /** Data */
    data: RackItem[];
    /** Total total */
    total: number;
  };

  type rakApiV1LokasiLokasiRakGetParams = {
    lokasi: string;
    nama_ruangan: string;
  };

  type RoleItem = {
    /** Id */
    id: number;
    /** Key */
    key: number;
    /** Role Name */
    role_name: string;
    /** Role Status */
    role_status?: boolean;
    /** Role Desc */
    role_desc?: string;
    /** Create Time */
    create_time: string;
    /** Update Time */
    update_time: string;
  };

  type RoleList = {
    /** Success status code */
    success: boolean;
    /** Data */
    data: RoleItem[];
    /** Total total */
    total: number;
  };

  type sendMsgApiV1SmsModifySendGetParams = {
    phone_number: string;
  };

  type sendMsgApiV1SmsSendGetParams = {
    phone_number: string;
  };

  type SetAccess = {
    /** Role Id */
    role_id: number;
    /** Access Permissions */
    access?: number[];
  };

  type SetRole = {
    /** User Id */
    user_id: number;
    /** Roles Role */
    roles?: number[];
  };

  type tipeApiV1MerekTipeMerekTipeTipeGetParams = {
    merek: string;
  };

  type TolakLayanan = {
    /** Detail Tolak */
    detail_tolak?: string;
    /** Id */
    id: number;
  };

  type UpdateAset = {
    /** Merek */
    merek: string;
    /** Tipe */
    tipe: string;
    /** Fungsi Perangkat */
    fungsi_perangkat: string;
    /** Foto Perangkat */
    foto_perangkat: string;
    /** Nomor Seri */
    nomor_seri: string;
    /** Jenis Infra */
    jenis_infra: string;
    /** Instansi Pemilik */
    instansi_pemilik: string;
    /** Penanggung Jawab */
    penanggung_jawab: string;
    /** Lokasi */
    lokasi: string;
    /** Nama Ruangan */
    nama_ruangan: string;
    /** Posisi Rak */
    posisi_rak: string;
    /** Psu */
    psu: string;
    /** Posisi U */
    posisi_u: string;
    /** Power */
    power: string;
    /** Kapasitas Cpu */
    kapasitas_cpu: string;
    /** Kapasitas Hdd */
    kapasitas_hdd: string;
    /** Kapasitas Ram */
    kapasitas_ram: string;
    /** Daya */
    daya: string;
    /** Tanggal Pemasangan */
    tanggal_pemasangan?: string;
    /** Tanggal Penarikan */
    tanggal_penarikan?: string;
    /** Keterangan */
    keterangan?: string;
    /** Status Aset */
    status_aset: number;
    /** User */
    user: string;
    /** Id */
    id: number;
  };

  type UpdateBukuTamu = {
    /** No Tiket */
    no_tiket: string;
    /** Jam Masuk */
    jam_masuk: string;
    /** Jam Keluar */
    jam_keluar: string;
    /** Laporan Pekerjaan */
    laporan_pekerjaan: string;
    /** Daftar Pengunjung */
    daftar_pengunjung: string;
    /** Id */
    id: number;
  };

  type UpdateDaftarPengunjung = {
    /** Nik */
    nik: string;
    /** Nama */
    nama: string;
    /** Status */
    status: string;
    /** Instansi */
    instansi: string;
    /** Foto */
    foto: string;
    /** Id */
    id: number;
  };

  type UpdateLayanan = {
    /** Nomor Tiket */
    nomor_tiket: string;
    /** Jenis Layanan */
    jenis_layanan: string;
    /** Co Location */
    co_location: string;
    /** Perangkat */
    perangkat: string;
    /** Mulai Kunjungan */
    mulai_kunjungan: string;
    /** Akhir Kunjungan */
    akhir_kunjungan: string;
    /** Pemandu */
    pemandu?: string;
    /** Status */
    status?: number;
    /** Detail Tolak */
    detail_tolak?: string;
    /** Id */
    id: number;
  };

  type UpdateLokasi = {
    /** Lokasi */
    lokasi: string;
    /** Nama Ruangan */
    nama_ruangan?: string;
    /** Posisi Rak */
    posisi_rak?: string;
    /** Posisi U */
    posisi_u?: string;
    /** Sn Aset */
    sn_aset?: string;
    /** Id */
    id: number;
  };

  type UpdateMerekTipe = {
    /** Merek */
    merek: string;
    /** Tipe */
    tipe?: string;
    /** Id */
    id: number;
  };

  type UpdatePemandu = {
    /** Nama */
    nama: string;
    /** No Hp */
    no_hp?: string;
    /** Id */
    id: number;
  };

  type UpdateRole = {
    /** Id */
    id: number;
    /** Role Name */
    role_name: string;
    /** Role Status */
    role_status?: boolean;
    /** Role Desc */
    role_desc?: string;
  };

  type UpdateStatusAset = {
    /** Id */
    id: number;
    /** Status Aset */
    status_aset: boolean;
    /** Tanggal Penarikan */
    tanggal_penarikan?: string;
    /** Nomor Seri */
    nomor_seri?: string;
  };

  type UpdateUser = {
    /** Id */
    id: number;
    /** Username */
    username?: string;
    /** Password */
    password?: string;
    /** User Phone */
    user_phone?: string;
    /** User Status */
    user_status?: boolean;
    /** Remarks */
    remarks?: string;
  };

  type UpdateUserInfo = {
    /** Nickname */
    nickname?: string;
    /** User Email */
    user_email?: string;
    /** Header Img */
    header_img?: string;
    /** User Phone phone number */
    user_phone?: string;
    /** Password password */
    password?: string;
  };

  type userDelApiV1AdminUserDeleteParams = {
    user_id: number;
  };

  type UserInfo = {
    /** Username */
    username: string;
    /** Age */
    age?: number;
    /** User Type */
    user_type: boolean;
    /** Nickname */
    nickname?: string;
    /** User Phone */
    user_phone?: string;
    /** User Email */
    user_email?: string;
    /** Full Name */
    full_name?: string;
    /** Scopes */
    scopes?: string[];
    /** User Status */
    user_status: boolean;
    /** Header Img */
    header_img?: string;
    /** Sex */
    sex: number;
  };

  type userListApiV1AdminUserGetParams = {
    pageSize?: number;
    current?: number;
    username?: string;
    user_phone?: string;
    user_status?: boolean;
    create_time?: string[];
  };

  type UserListData = {
    /** Success status code */
    success: boolean;
    /** Data */
    data: UserListItem[];
    /** Total total */
    total: number;
  };

  type UserListItem = {
    /** Key */
    key: number;
    /** Id */
    id: number;
    /** Username */
    username: string;
    /** Age */
    age?: number;
    /** User Type */
    user_type: boolean;
    /** Nickname */
    nickname?: string;
    /** User Phone */
    user_phone?: string;
    /** User Email */
    user_email?: string;
    /** Full Name */
    full_name?: string;
    /** User Status */
    user_status: boolean;
    /** Header Img */
    header_img?: string;
    /** Sex */
    sex: number;
    /** Remarks */
    remarks?: string;
    /** Create Time */
    create_time: string;
    /** Update Time */
    update_time: string;
  };

  type UserLogin = {
    /** Code status code */
    code: number;
    /** Message message */
    message: string;
    data: AccessToken;
  };

  type ValidationError = {
    /** Location */
    loc: any[];
    /** Message */
    msg: string;
    /** Error Type */
    type: string;
  };
}
