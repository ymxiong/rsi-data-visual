import React from 'react';
import {
  AppstoreAddOutlined,
  LinkOutlined,
  ExpandOutlined,
  CompressOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Tooltip, Button } from 'antd';

interface FooterProps {
  onCollapseChange: (isCollapsed: boolean) => void;
  isCollapsed?: boolean;
}

const LiStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  height: '32px',
  fontSize: '16px',
  lineHeight: '32px',
};

const ModelFooter = (props: FooterProps): JSX.Element => {
  return (
    <li style={{ ...LiStyle }}>
      {/* <Tooltip title="添加"> */}
      <Button type="text" icon={<AppstoreAddOutlined />} />
      {/* </Tooltip> */}
      {/* <Tooltip title="链接"> */}
      <Button type="text" icon={<LinkOutlined />} />
      {/* </Tooltip> */}
      {props.isCollapsed ? (
        // <Tooltip title="拓展">
        <Button
          type="text"
          icon={<ExpandOutlined />}
          onClick={() => props.onCollapseChange(false)}
        />
      ) : (
        // </Tooltip>
        // <Tooltip title="收缩">
        <Button
          type="text"
          icon={<CompressOutlined />}
          onClick={() => props.onCollapseChange(true)}
        />
        // </Tooltip>
      )}
      {/* <Tooltip title="删除"> */}
      <Button type="text" icon={<DeleteOutlined />} />
      {/* </Tooltip> */}
    </li>
  );
};

export default ModelFooter;
