import { userDelete, userList, userUpdate } from '@/services/user/api';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumnType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Avatar, Button, Popconfirm, message } from 'antd';
import moment from 'moment';
import { memo, useRef, useState } from 'react';
import AddUserForm from './components/AddUserForm';
import EditUserForm from './components/EditUserForm';
import SetRole from './components/SetRole';

export default memo(() => {
  const actionRef = useRef<ActionType>();
  const [addVisible, setAddVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [roleVisible, setroleVisible] = useState(false);
  const [UserData, setUserData] = useState<USER.UserItem>();

  // delete users
  const deletUser = async (d: USER.UserItem) => {
    const result = await userDelete({ user_id: d.id });
    if (result.code === 200) {
      // refresh the list
      actionRef.current?.reload();
      message.success(result.message);
    } else {
      message.info(result.message);
    }
  };

  // Modify the user status
  const changeUserStatus = async (d: USER.UpdateUser) => {
    d.user_status = !d.user_status;
    const result = await userUpdate(d);
    if (result.code === 200) {
      // refresh the list
      actionRef.current?.reload();
      message.success(result.message);
    } else {
      message.info(result.message);
    }
  };

  // Define the header
  const columns: ProColumnType<USER.UserItem>[] = [
    {
      title: 'Avatar',
      dataIndex: 'header_img',
      search: false,
      width: 60,
      render: (_, d) => <Avatar src={d.header_img} />,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      valueType: 'text',
    },
    {
      title: 'Phone',
      dataIndex: 'user_phone',
      valueType: 'text',
      copyable: true,
    },
    {
      title: 'Mail',
      dataIndex: 'user_email',
      valueType: 'text',
      search: false,
    },
    {
      title: 'Remark',
      dataIndex: 'remarks',
      valueType: 'text',
      search: false,
    },
    {
      title: 'Created at',
      dataIndex: 'create_time',
      valueType: 'dateTime',
      width: 150,
      search: false,
    },
    {
      title: 'Created at',
      dataIndex: 'create_time',
      valueType: 'dateTimeRange',
      fieldProps: {
        // defaultValue:[moment().subtract(1, 'days').startOf('day'), moment()],
        ranges: {
          Today: [moment().startOf('day'), moment().endOf('day')],
          Yesterday: [
            moment().subtract(1, 'days').startOf('day'),
            moment().subtract(1, 'days').endOf('day'),
          ],
          'Within 3 days': [moment().subtract(2, 'days').startOf('day'), moment().endOf('day')],
          'Within 7 days': [moment().subtract(6, 'days').startOf('day'), moment().endOf('day')],
          'This week': [moment().subtract('weeks').startOf('week'), moment().endOf('week')],
          'This month': [moment().subtract('months').startOf('month'), moment().endOf('month')],
          'Last month': [
            moment().subtract(1, 'months').startOf('month'),
            moment().subtract(1, 'months').endOf('month'),
          ],
        },
        showTime: {
          defaultValue: [moment('00:00:00', 'hh:mm:ss'), moment('23:59:59', 'hh:mm:ss')],
        },
      },
      hideInTable: true,
    },

    {
      title: 'Status',
      dataIndex: 'user_status',
      width: 100,
      valueEnum: {
        false: { text: 'Disabled', status: 'Error' },
        true: { text: 'Enabled', status: 'Success' },
      },
    },
    {
      title: 'Action',
      valueType: 'option',
      width: 200,
      render: (_dom, d) => {
        return [
          <Button
            key={'disable'}
            type={d.user_status ? 'default' : 'primary'}
            ghost
            shape="round"
            danger={d.user_status}
            onClick={() => changeUserStatus(d)}
          >
            {d.user_status ? 'Disable' : 'Enable'}
          </Button>,
          <Button
            key={'setrole'}
            type={'primary'}
            // ghost
            shape="round"
            onClick={() => {
              setUserData(d);
              setroleVisible(true);
            }}
          >
            Role
          </Button>,
          <Button
            key={'edit'}
            shape="round"
            type="dashed"
            onClick={() => {
              setUserData(d);
              setEditVisible(true);
            }}
          >
            Edit
          </Button>,
          <Popconfirm
            key={'delete'}
            title="Are you sure?"
            onConfirm={() => deletUser(d)}
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
        headerTitle="All users"
        rowKey={'key'}
        actionRef={actionRef}
        columns={columns}
        size="small"
        cardProps={{ bodyStyle: { paddingBottom: 20, paddingTop: 0 } }}
        pagination={{ defaultPageSize: 10, showSizeChanger: true }}
        locale={{ emptyText: 'Unexpected users' }}
        request={async (params) => userList({ ...params })}
        toolBarRender={() => [
          <Button key="add_user" type="primary" onClick={() => setAddVisible(true)}>
            <PlusOutlined />
            Add new
          </Button>,
        ]}
      />
      <AddUserForm visible={addVisible} setvisible={setAddVisible} actionRef={actionRef.current} />
      {UserData && (
        <EditUserForm
          visible={editVisible}
          setvisible={setEditVisible}
          actionRef={actionRef.current}
          UserData={UserData}
        />
      )}
      {UserData && (
        <SetRole visible={roleVisible} setvisible={setroleVisible} UserData={UserData} />
      )}
    </PageContainer>
  );
});
