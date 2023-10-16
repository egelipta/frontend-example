import { roleAdd, roleDelete, roleList, roleUpdate } from '@/services/role/api';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import {
  DrawerForm,
  ModalForm,
  ProForm,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumnType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Popconfirm, message } from 'antd';
import moment from 'moment';
import { memo, useRef, useState } from 'react';
import { history } from '@umijs/max';

export default memo(() => {
  const actionRef = useRef<ActionType>();
  const [addVisible, setAddVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [RoleData, setRoleData] = useState<ROLE.RoleItem>();

  // 创建角色
  const createRole = async (values: ROLE.CreateRole) => {
    const result = await roleAdd(values);
    if (result.code === 200) {
      // 关闭窗口
      setAddVisible(false);
      // 刷新列表
      actionRef.current?.reload();
      message.success(result.message);
    } else {
      message.success(result.message);
    }
  };

  // 删除角色
  const deleteRole = async (d: ROLE.RoleItem) => {
    const result = await roleDelete({ role_id: d.id });
    if (result.code === 200) {
      // 刷新列表
      actionRef.current?.reload();
      message.success(result.message);
    } else {
      message.success(result.message);
    }
  };

  // 修改角色
  const updateRole = async (d: ROLE.UpdateRole) => {
    if (RoleData) {
      d.id = RoleData.id;
      const result = await roleUpdate(d);
      if (result.code === 200) {
        // 刷新列表
        actionRef.current?.reload();
        setEditVisible(false);
        message.success(result.message);
      } else {
        message.success(result.message);
      }
    }
  };

  // 修改角色状态
  const changeRoleStatus = async (d: ROLE.RoleItem) => {
    d.role_status = !d.role_status;
    const result = await roleUpdate(d);
    if (result.code === 200) {
      // 刷新列表
      actionRef.current?.reload();
      message.success(result.message);
    } else {
      message.success(result.message);
    }
  };

  // 定义表头
  const columns: ProColumnType<ROLE.RoleItem>[] = [
    {
      title: 'Role Name',
      dataIndex: 'role_name',
      valueType: 'text',
    },
    {
      title: 'Description',
      dataIndex: 'role_desc',
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
        defaultValue: [moment().subtract(1, 'days').startOf('day'), moment()],
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
      title: 'state',
      dataIndex: 'role_status',
      width: 100,
      valueEnum: {
        false: { text: 'disabled', status: 'Error' },
        true: { text: 'enabled', status: 'Success' },
      },
    },
    {
      title: 'Actionable',
      valueType: 'option',
      width: 200,
      render: (_dom, d) => {
        return [
          <Button
            key={'disable'}
            type={d.role_status ? 'default' : 'primary'}
            ghost
            shape="round"
            danger={d.role_status}
            onClick={() => changeRoleStatus(d)}
          >
            {d.role_status ? 'Disable' : 'Enable'}
          </Button>,
          <Button
            key={'set_access'}
            onClick={() => history.push({ pathname: '/admin/set/access', state: d })}
            type="primary"
            shape="round"
          >
            Permission
          </Button>,
          <Button
            key={'edit'}
            type="dashed"
            shape="round"
            onClick={() => {
              setRoleData(d);
              setEditVisible(true);
            }}
          >
            Edit
          </Button>,
          <Popconfirm
            key={'delete'}
            title="Are you sure want to Delete this data?"
            onConfirm={() => deleteRole(d)}
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
        headerTitle="All roles"
        actionRef={actionRef}
        columns={columns}
        size="small"
        cardProps={{ bodyStyle: { paddingBottom: 20, paddingTop: 0 } }}
        pagination={{ defaultPageSize: 10, showSizeChanger: true }}
        locale={{ emptyText: 'Insufficient permission' }}
        request={async (params) => roleList({ ...params })}
        toolBarRender={() => [
          <Button key="add_user" type="primary" onClick={() => setAddVisible(true)}>
            <PlusOutlined />
            Add New
          </Button>,
        ]}
      />
      <ModalForm
        title={'Add a role'}
        visible={addVisible}
        width={500}
        submitter={{ searchConfig: { submitText: 'Save' } }}
        onFinish={createRole}
        modalProps={{
          destroyOnClose: true,
          mask: true,
          onCancel: () => setAddVisible(false),
        }}
      >
        <ProForm.Item>
          <ProFormText
            name={'role_name'}
            label={'Name'}
            placeholder={'The Name is 3-10 characters!'}
            rules={[
              {
                required: true,
                message: 'Please enter the Name!',
              },
              {
                min: 3,
                message: 'The Name is 3-10 characters!',
              },
              {
                max: 15,
                message: 'The Name is 3-10 characters!',
              },
            ]}
          />
        </ProForm.Item>
        <ProFormSwitch
          label={'Never enabled by default'}
          name={'role_status'}
          initialValue={false}
        />
        <ProForm.Item label="Description">
          <ProFormTextArea
            name="role_desc"
            fieldProps={{ maxLength: 30, showCount: true }}
            rules={[{ max: 30, message: 'Description length input within 30 characters' }]}
          />
        </ProForm.Item>
      </ModalForm>
      <DrawerForm
        title={'Editor'}
        visible={editVisible}
        width={500}
        submitter={{ searchConfig: { submitText: 'keep' } }}
        initialValues={RoleData}
        onFinish={updateRole}
        drawerProps={{
          destroyOnClose: true,
          mask: true,
          onClose: () => setEditVisible(false),
        }}
      >
        <ProForm.Item>
          <ProFormText
            name={'role_name'}
            label={'name'}
            placeholder={'The Name is 3-10 characters!'}
            rules={[
              {
                required: true,
                message: 'Please enter the Name!',
              },
              {
                min: 3,
                message: 'The Name is 3-10 characters!',
              },
              {
                max: 15,
                message: 'The Name is 3-10 characters!',
              },
            ]}
          />
        </ProForm.Item>
        <ProFormSwitch
          label={'Never enabled by default'}
          name={'role_status'}
          initialValue={false}
        />
        <ProForm.Item label="Description">
          <ProFormTextArea
            name="role_desc"
            fieldProps={{ maxLength: 30, showCount: true }}
            rules={[{ max: 30, message: 'Descriptions length input within 30 characters' }]}
          />
        </ProForm.Item>
      </DrawerForm>
    </PageContainer>
  );
});
