import React, { FC } from 'react';
import { SelectTreeBase } from './PropTypes';
import './index.less';

interface HeaderProps extends Omit<SelectTreeBase, 'show' | 'onDismiss' | 'onOk'> {
  onOk?: () => void;
}

const prefixCls = 'select-tree-header';
const Header: FC<HeaderProps> = (props) => {
  const { title = '请选择', onOk, okText, color = '#1989fa' } = props;
  return (
    <div className={prefixCls}>
      <div className={`${prefixCls}-title`}>{title}</div>
      <div className={`${prefixCls}-ok`} style={{ color }} onClick={onOk}>
        {okText}
      </div>
    </div>
  );
};

export default Header;
