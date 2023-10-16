import {
    asetListWithStatusFalseApiV1AsetAsetStatusFalseGet, asetUpdateApiV1AsetAsetPut,
} from '@/services/dev-plus/Aset';

import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumnType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { message, Image, Row, Col, Card } from 'antd';
import {
    DrawerForm,
    ProDescriptions,
} from '@ant-design/pro-components';
import { memo, useRef, useState } from 'react';


export default memo(() => {


    const [detailVisible, setDetailVisible] = useState(false);
    const [AsetData, setAsetData] = useState<API.AsetItem>();
    const [devicePhoto, setDevicePhoto] = useState('');
    const actionRef = useRef<ActionType>();

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
        // {
        //     title: 'Fungsi Perangkat',
        //     dataIndex: 'fungsi_perangkat',
        // },
        {
            title: 'Serial Number',
            dataIndex: 'nomor_seri',
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
        //     title: 'Nama Ruangan',
        //     dataIndex: 'nama_ruangan',
        // },
        // {
        //     title: 'Posisi Rak',
        //     dataIndex: 'posisi_rak',
        // },
        // {
        //   title: 'Total PSU',
        //   dataIndex: 'psu',
        // },
        // {
        //     title: 'Posisi U',
        //     dataIndex: 'posisi_u',
        // },
        // {
        //     title: 'Power',
        //     dataIndex: 'power',
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
            title: 'Tgl Pemasangan',
            dataIndex: 'tanggal_pemasangan',
            valueType: 'date'
        },
        {
            title: 'Tgl Penarikan',
            dataIndex: 'tanggal_penarikan',
            valueType: 'date'
        },
        {
            title: 'Keterangan',
            dataIndex: 'keterangan',
        },
    ];

    return (
        <PageContainer>
            <ProTable
                headerTitle="Aset"
                actionRef={actionRef}
                columns={columns}
                size="small"
                onRow={(r) => {
                    return {
                        onClick: () => {
                            if (r.nomor_seri) {
                                // selectedDataState(r.nama_kegiatan);
                                setAsetData(r);
                                setDevicePhoto(r.foto_perangkat ? r.foto_perangkat : '');
                                setDetailVisible(true);
                                console.log('onRow Selected:', r.nomor_seri);
                            }
                        },
                    };
                }}

                cardProps={{ bodyStyle: { paddingBottom: 20, paddingTop: 0 } }}
                // pagination={{ pageSize: 10 }}
                pagination={{ defaultPageSize: 10, showSizeChanger: true }}
                locale={{ emptyText: 'Insufficient permission' }}
                request={async (params) => asetListWithStatusFalseApiV1AsetAsetStatusFalseGet({ ...params })}
                toolBarRender={() => [

                ]}
            />

            <DrawerForm
                title={'Detail Aset'}
                visible={detailVisible}
                width={780}
                submitter={false}
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
                    <ProDescriptions.Item
                        label="Power"
                        dataIndex="power"
                    />
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
            </DrawerForm>

        </PageContainer>
    );
});



