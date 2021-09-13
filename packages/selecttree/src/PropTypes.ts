type noop = () => void;

export interface SelectTreeAttributesMethod {
  getValues: () => SelectTreeDataSource[];
}

export interface SelectTreeDataSource {
  /**
   * @description 节点唯一标识符
   */
  id?: string;
  /**
   * @description value字段
   */
  value: string;
  /**
   * @description 展示标题
   */
  title: string;
  /**
   * @description 子节点
   */
  children?: SelectTreeDataSource[];
  [key: string]: any;
}

export interface SelectTreeBase {
  /**
   * @description 是否展示弹出框
   * @default false
   */
  show: boolean;

  /**
   * @description 标题
   * @default -
   */
  title?: string;

  /**
   * @description 弹窗关闭回调
   */
  onDismiss?: noop;

  /**
   * @description 为多选时右上角显示的文字
   * @default 确定
   */
  okText?: string;

  /**
   * @description 点击ok按钮时回调
   */
  onOk?: (value: SelectTreeDataSource) => void;

  /**
   * @description 主题颜色
   * @default #1989fa
   */
  color?: string;
}

// 单选属性定义
export interface SelectTreeSingle extends SelectTreeBase {
  /**
   * @description 数据源
   * @default []
   */
  data?: SelectTreeDataSource[];

  /**
   * @description 选择类型，支持多选和单选。
   * @default single
   */
  type?: 'single';

  /**
   * @description 手动设置选择项 单选时为string  多选为string[]
   * @default -
   */
  value?: string;

  /**
   * @description 选择内容变化时回调
   */
  onChange?: (value: SelectTreeDataSource) => void;
}

// 多选属性定义
export interface SelectTreeMultiple
  extends Omit<SelectTreeSingle, 'type' | 'onChange' | 'value' | 'defaultValue' | 'onOk'> {
  /**
   * @description 选择类型，支持多选和单选。
   * @default single
   */
  type?: 'multiple';

  /**
   * @description 选择内容变化时回调
   */
  onChange?: (value: SelectTreeDataSource[]) => void;

  /**
   * @description 手动设置选择项 单选时为string  多选为string[]
   * @default -
   */
  value?: string[];

  /**
   * @description 点击ok按钮时回调
   */
  onOk?: (value: SelectTreeDataSource[]) => void;
}
