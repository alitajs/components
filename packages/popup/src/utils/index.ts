import { useMemo } from 'react';
import type { PopupType } from '../PropsType';
import type { TransitionProps } from '../components/Transition';
import addClass from 'dom-helpers/addClass';
import removeClass from 'dom-helpers/removeClass';

export const overlayOrigin = (
  topEle: HTMLElement,
  mode?: PopupType['mode'],
  offset = 0,
  popMode?: PopupType['type'],
): TransitionProps['overlayStyle'] => {
  if (mode === 'alert' || mode === 'sliderLeft' || mode === 'sliderRight') {
    return {};
  }
  if (popMode === 'fullscreen') {
    return {};
  }
  switch (mode) {
    case 'popup':
      return {
        bottom: document.documentElement.clientHeight - topEle.getBoundingClientRect().y - offset,
      };
    case 'dropdown':
      return {
        top: topEle.getBoundingClientRect().y + offset,
      };
    default:
      break;
  }
  return {};
};

export const setClass = (targetEle: HTMLElement, className: string, type: 'add' | 'remove') => {
  if (type === 'add') {
    addClass(targetEle, className);
  }
  if (type === 'remove') {
    removeClass(targetEle, className);
  }
};

export const useLockScroll = (show: boolean, scrollElement: HTMLElement, className: string) => {
  // show变化时增加滚动锁定
  useMemo(() => {
    setClass(scrollElement, className, show ? 'add' : 'remove');
  }, [className, scrollElement, show]);
};

export const getRadiusStyle = (
  mode: PopupType['mode'],
  round: boolean,
  size: string,
): React.CSSProperties => {
  if (!round) {
    return {};
  }
  const style: React.CSSProperties = { overflow: 'hidden' };
  switch (mode) {
    case 'alert':
      style.borderRadius = size;
      break;
    case 'dropdown':
      style.borderBottomLeftRadius = size;
      style.borderBottomRightRadius = size;
      break;
    case 'popup':
      style.borderTopLeftRadius = size;
      style.borderTopRightRadius = size;
      break;
    case 'sliderLeft':
      style.borderTopRightRadius = size;
      style.borderBottomRightRadius = size;
      break;
    case 'sliderRight':
      style.borderTopLeftRadius = size;
      style.borderBottomLeftRadius = size;
      break;
    default:
      break;
  }
  return style;
};

export const getcloseIconPositionClass = (mode: PopupType['mode']) => {
  switch (mode) {
    case 'alert':
    case 'popup':
    case 'sliderLeft':
      return 'top-right';
    case 'dropdown':
      return 'bottom-right';
    case 'sliderRight':
      return 'top-left';
    default:
      break;
  }
  return 'top-right';
};
