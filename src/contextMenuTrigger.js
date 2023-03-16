import React, { useRef, useCallback } from 'react';
import classnames from 'classnames';
import { callShowEvent, callHideEvent } from './registerEvent';

function ContextMenuTrigger({
  children, id, disableWhileShiftPressed, leftClickEnabled, attributes, disable, className
}) {
  const menuTrigger = useRef(null);

  const handleContextMenu = useCallback(e => {
    if (disable) return;
    if (disableWhileShiftPressed && e.nativeEvent.shiftKey) {
      callHideEvent(id);
      return;
    }
    e.preventDefault();
    e.stopPropagation();

    const { clientX, clientY } = e.nativeEvent;
    const opts = {
      position: {
        clientY,
        clientX
      },
      id
    };

    callShowEvent(opts);
  });

  return (
    <div
      className={classnames('menu-trigger', ...className.split(' '))}
      ref={menuTrigger}
      {...attributes}
      onClick={e => (leftClickEnabled ? handleContextMenu(e) : undefined)}
      onContextMenu={e => (!leftClickEnabled ? handleContextMenu(e) : undefined)}
    >
      {children}
    </div>
  );
}

export default ContextMenuTrigger;

ContextMenuTrigger.defaultProps = {
  attributes: {},
  disable: false,
  leftClickEnabled: false,
  renderTag: 'div',
  disableWhileShiftPressed: false,
  className: ''
};
