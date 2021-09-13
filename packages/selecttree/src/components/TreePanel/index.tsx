import React, {
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type {
  SelectTreeSingle,
  SelectTreeMultiple,
  SelectTreeBase,
  SelectTreeDataSource,
} from '../../PropTypes';
import TreeNav from '../TreeNav';
import TreeItem from '../TreeItem';
import '../../index.less';

const prefixCls = 'tree-panel';

type TreePanelProps = Omit<SelectTreeSingle, keyof SelectTreeBase>;
type TreePanelMultipleProps = Omit<SelectTreeMultiple, keyof SelectTreeBase>;

function TreePanel<T>(
  props: TreePanelProps & { children?: any },
  ref: React.LegacyRef<T> | undefined,
): React.ReactElement<any, any> | null;
function TreePanel<T>(
  // eslint-disable-next-line @typescript-eslint/unified-signatures
  props: TreePanelMultipleProps & { children?: any },
  ref: React.LegacyRef<T> | undefined,
): React.ReactElement<any, any> | null;

function TreePanel(props: any, ref: any) {
  const { data = [], type, value, onChange = () => {}, color = '#1989fa' } = props;
  const [val, setVal] = useState<string[]>([]);
  const [totalPages, setTotalPages] = useState<(string | SelectTreeDataSource)[]>(['请选择']);
  const [currentPage, setCurrentPage] = useState(0);
  const [dataSource, setDataSource] = useState([data]);
  const [selectValues, setSelectValues] = useState<SelectTreeDataSource[]>([]);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    if (!value) {
      setVal([]);
    } else if (typeof value === 'string') {
      setVal([value]);
    } else {
      setVal(value);
    }
  }, [value]);

  const getAllValues = useCallback(
    (target: SelectTreeDataSource[], dataArr?: SelectTreeDataSource[]) => {
      dataArr?.forEach((d: SelectTreeDataSource) => {
        if (val?.includes(d.value)) {
          target.push(d);
        }
        getAllValues(target, d.children);
      });
    },
    [val],
  );

  useEffect(() => {
    const target: SelectTreeDataSource[] = [];
    getAllValues(target, data);
    onChange(target);
    setSelectValues(target);
  }, [val, data, getAllValues, onChange]);

  const replaceChangeData = (item: SelectTreeDataSource) => {
    setVal([item.value]);
  };
  const addChangeData = (item: SelectTreeDataSource) => {
    const vs = [...val];
    vs.push(item.value);
    setVal(vs);
  };
  const removeChangeData = (item: SelectTreeDataSource) => {
    const vs = val.filter((it) => it !== item.value);
    setVal([...vs]);
  };

  const getData = (d: any, pageItem: any, index: number): any[] => {
    if (!pageItem || typeof pageItem === 'string') {
      return d;
    }
    const target: any = d.find((item: any) => item.value === pageItem.value);
    if (target?.children?.length > 0) {
      return getData(target?.children, totalPages[index + 1], index + 1);
    }
    return d;
  };

  const onValueChange = (
    item: SelectTreeDataSource,
    t: 'replace' | 'add' | 'remove' | 'switch' | 'switchAdd',
  ) => {
    switch (t) {
      case 'replace':
        replaceChangeData(item);
        break;
      case 'add':
        addChangeData(item);
        break;
      case 'remove':
        removeChangeData(item);
        break;
      case 'switch':
        {
          const temp = [...totalPages];
          const tempDataSource = [...dataSource];
          if (item.child && item.child.length > 0) {
            const dif = totalPages.length - 1 - currentPage;
            if (dif === 0) {
              // 增加
              temp.splice(currentPage, 0, item);
              tempDataSource.push(item.child);
            } else if (dif > 0) {
              // 修改后面几项数据
              temp.splice(currentPage, dif, item);
              tempDataSource.splice(currentPage + 1, dif, item.child);
            }
            setTotalPages([...temp]);
            setDataSource([...tempDataSource]);
            setCurrentPage(temp.length - 1);
            setTimeout(() => {
              swiperRef.current.slideTo(temp.length - 1);
            }, 30);
          }
        }
        break;
      default:
        break;
    }
  };

  useImperativeHandle(ref, () => ({
    getValues: () => selectValues,
  }));

  return (
    <div className={prefixCls}>
      <TreeNav
        pages={totalPages}
        currentIndex={currentPage}
        color={color}
        onChange={(idx) => {
          setCurrentPage(idx);
          swiperRef.current.slideTo(idx);
        }}
      />
      <div className={`${prefixCls}-container`}>
        <Swiper
          observer={true}
          autoplay={false}
          initialSlide={currentPage}
          // eslint-disable-next-line no-return-assign
          onInit={(swiper) => (swiperRef.current = swiper)}
          onSlideChangeTransitionEnd={(swiper) => setCurrentPage(swiper.activeIndex)}
        >
          {totalPages.map((p: any, index) => {
            return (
              <SwiperSlide key={typeof p === 'object' ? p.value : p}>
                {(dataSource[index] || []).map((item: SelectTreeDataSource) => {
                  return (
                    <TreeItem
                      key={item.value}
                      {...item}
                      type={type}
                      selectValue={val}
                      color={color}
                      onChange={onValueChange}
                    />
                  );
                })}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}

export default forwardRef(TreePanel);
