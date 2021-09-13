import type { FC } from 'react';
import { useMemo } from 'react';
import { loadSprite } from '../loadSprite';
import '../../index.less';
import type { SelectTreeDataSource } from '../../PropTypes';

interface TreeItemProps extends Omit<SelectTreeDataSource, 'children'> {
  type?: 'single' | 'multiple';

  /**
   * @description 手动设置选择项 单选时为string  多选为string[]
   * @default -
   */
  selectValue?: string | string[];

  /**
   * @description 选择内容变化时回调
   */
  onChange?: (value: SelectTreeDataSource, type: 'replace' | 'add' | 'remove' | 'switch') => void;
}

const prefixCls = 'tree-item';
const TreeItem: FC<TreeItemProps> = (props) => {
  const {
    type = 'single',
    selectValue,
    onChange = () => {},
    color = '#1989fa',
    ...dataSourceItem
  } = props;
  const { value, title, id, children } = dataSourceItem;
  const isChecked = useMemo(() => {
    if (selectValue && Array.isArray(selectValue)) {
      if (selectValue.includes(value)) {
        return true;
      }
    }
    return false;
  }, [selectValue, value]);

  const onClick = (e: any) => {
    e.stopPropagation();
    if (type === 'multiple') {
      if (selectValue?.includes(value)) {
        onChange({ id, value, title, child: children }, 'remove');
      } else {
        onChange({ id, value, title, child: children }, 'add');
      }
    } else {
      onChange({ id, value, title, child: children }, 'replace');
    }
  };

  const onSwitchClick = (e: any) => {
    if (Array.isArray(children) && children.length > 0) {
      onChange({ id, value, title, child: children }, 'switch');
    } else {
      // 如果没有子元素，直接选中
      onClick(e);
    }
  };

  return (
    <div className={prefixCls} onClick={onSwitchClick}>
      <div className={`${prefixCls}-checkbox`} onClick={onClick}>
        <i
          style={{
            backgroundImage: isChecked
              ? `url(${loadSprite(color).mChecked})`
              : `url(${loadSprite(color).mnotChecked})`,
          }}
        ></i>
      </div>
      <div
        style={{
          color: isChecked ? color : '#323233',
        }}
        className={`${prefixCls}-title`}
      >
        {title}
      </div>

      <div className={`${prefixCls}-checkbox`}>
        <i
          className={`${prefixCls}-checkbox-right`}
          style={{
            backgroundImage:
              Array.isArray(children) && children.length > 0
                ? `url(${loadSprite(color).rightIcon})`
                : '',
          }}
        ></i>
      </div>
    </div>
  );
};

export default TreeItem;
