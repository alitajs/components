import type { FC, CSSProperties } from 'react';
import { useState, useMemo } from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import classnames from 'classnames';
import './index.less';

export interface TransitionProps {
  /**
   * @description 是否展示
   * @default false
   */
  show?: boolean;
  /**
   * @description 弹出方式
   * @default popup
   */
  mode: 'popup' | 'dropdown' | 'sliderLeft' | 'sliderRight' | 'alert';

  /**
   * @description 是否在点击遮罩层后关闭菜单
   * @default true
   */
  closeOnClickOverlay?: boolean;

  /**
   * @description 关闭事件
   */
  onClose?: () => void;

  /**
   * @description 动画即将进入
   */
  onEnter?: () => void;

  /**
   * @description 动画已经进入
   */
  onEntered?: () => void;

  /**
   * @description 动画即将退出
   */
  onExit?: () => void;

  /**
   * @description 动画已经退出
   */
  onExited?: () => void;

  /**
   * @description 遮罩层样式
   */
  overlayStyle?: Pick<CSSProperties, 'top' | 'left' | 'right' | 'bottom' | 'zIndex'>;

  /**
   * @description 容器的class
   */
  className?: string;

  /**
   * @description 容器的尺寸
   */
  contentSize?: CSSProperties['maxHeight'];

  /**
   * @description 层级
   */
  zIndex?: number;
}

const prefixCls = 'alita-transition';
const Transition: FC<TransitionProps> = ({
  show = false,
  onClose,
  children,
  mode = 'popup',
  closeOnClickOverlay = true,
  onEnter,
  onEntered,
  onExit,
  onExited,
  overlayStyle,
  className,
  zIndex = 1,
  contentSize = '80%',
}) => {
  const [display, setDisplay] = useState<CSSProperties['display']>('none');
  useMemo(() => {
    if (show) {
      setDisplay('block');
    }
  }, [show]);
  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex,
        ...overlayStyle,
        display,
        overflow: 'hidden',
        transform: 'scale(1)',
      }}
    >
      <CSSTransition in={show} timeout={200} classNames={`${prefixCls}-overlay`} unmountOnExit>
        {() => {
          return (
            <div
              className={`${prefixCls}-overlay-box`}
              onClick={() => {
                if (closeOnClickOverlay) {
                  if (onClose) {
                    onClose();
                  }
                }
              }}
            ></div>
          );
        }}
      </CSSTransition>
      <CSSTransition
        in={show}
        timeout={200}
        classNames={`${prefixCls}-${mode.toLowerCase()}`}
        unmountOnExit
        onEnter={() => {
          if (onEnter) {
            onEnter();
          }
        }}
        onEntered={onEntered}
        onExit={onExit}
        onExited={() => {
          setDisplay('none');
          if (onExited) {
            onExited();
          }
        }}
      >
        {() => {
          return (
            <div
              className={classnames(
                `${prefixCls}-${mode.toLowerCase()}-box`,
                `${prefixCls}-wrapper`,
                {
                  [`${className}`]: !!className,
                },
              )}
              style={
                mode === 'sliderLeft' || mode === 'sliderRight'
                  ? { maxWidth: contentSize }
                  : { maxHeight: contentSize }
              }
            >
              {children}
            </div>
          );
        }}
      </CSSTransition>
    </div>
  );
};

Transition.displayName = 'Transition';
export default Transition;
