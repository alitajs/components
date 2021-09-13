import React, { useState, FC } from 'react';
import SelectTree from '../';

import { dataSource } from './data';

interface DemoProps {}

const Demo: FC<DemoProps> = (props) => {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState<any>([]);
  return (
    <>
      <div
        style={{
          padding: '0.2rem',
          backgroundColor: '#1989fa',
          color: '#fff',
          textAlign: 'center',
        }}
        onClick={() => setShow(true)}
      >
        展开
      </div>
      <div
        style={{
          fontSize: '0.28rem',
          lineHeight: '0.4rem',
          padding: '0 0.3rem',
        }}
      >
        <div
          hidden={(Array.isArray(value) ? value : [value]).length === 0}
          style={{
            lineHeight: '0.8rem',
            fontSize: '0.28rem',
          }}
        >
          已下为选中数据：
        </div>
        {(Array.isArray(value) ? value : [value]).map((v) => (
          <div key={v.value}>{v.title}</div>
        ))}
      </div>
      <SelectTree
        show={show}
        data={dataSource}
        type="multiple"
        title="树状选择器(可设置多选)"
        onDismiss={() => setShow(false)}
        onChange={(v) => console.log(v)}
        onOk={(v) => {
          setValue(v);
        }}
      />
    </>
  );
};

export default Demo;
