import React, { useRef } from 'react';
import type { SelectTreeMultiple, SelectTreeSingle, SelectTreeAttributesMethod } from './PropTypes';
import TreePanel from './components/TreePanel';
import Popup from '@alita/popup';
import './index.less';
import Header from './Header';

const prefixCls = 'select-tree';
function SelectTree(
  props: SelectTreeSingle & { children?: any },
): React.ReactElement<any, any> | null;

function SelectTree(
  // eslint-disable-next-line @typescript-eslint/unified-signatures
  props: SelectTreeMultiple & { children?: any },
): React.ReactElement<any, any> | null;

function SelectTree(props: any) {
  const treePanelRef = useRef<SelectTreeAttributesMethod>();
  const {
    title = '',
    onOk = () => {},
    onDismiss = () => {},
    show = false,
    okText = '确定',
    ...restProps
  } = props;

  const onConfirm = () => {
    const values = treePanelRef.current?.getValues();
    if (values && values?.length > 0) {
      if (props.type === 'multiple') {
        onOk(values);
      } else {
        onOk(values[0]);
      }
      onDismiss();
    }
  };

  return (
    <Popup show={show} round onClose={onDismiss}>
      <div className={prefixCls}>
        <Header title={title} color={props.color} onOk={onConfirm} okText={okText} />
        <TreePanel ref={treePanelRef} {...restProps} />
      </div>
    </Popup>
  );
}

export default SelectTree;
