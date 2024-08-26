export const modesDefault = {
    default: [
      'zoom-canvas', // 缩放画布
      'brush-select', // shift选中（拖动框选节点）
      'drag-canvas', // 拖拽画布
      'drag-node', // 拖拽节点
      'click-select', // 点击选中节点，再次点击或点Canvas取消选中；
      'shortcuts-call' //使用键盘组合键
      // 'activate-relations'
    ]
  }
  export const defaultNode = {
    size: 42,
    style: {
      fill: '#78D3F8',
      cursor: 'pointer',
      lineWidth: 0,
    },
    labelCfg: {
      position: 'center',
      style: {
        fill: '#333',
        cursor: 'pointer',
        fontSize: 14
      }
    }
  }
  export const defaultEdge = {
    // type: 'quadratic',
    color: '#a5d1e3',
    size: 2,
    style: {
      endArrow: {
        path: 'M 0,0 L 6,3 L 6,-3 Z',
        fill: '#a5d1e3',
      },
    },
    labelCfg: {
      autoRotate: true, //标签文字是否跟随旋转
      style: {
        fill: '#333',
        fontSize: 11
      }
    }
  }
  export const nodeStateStyles = {
    hover: {
      opacity: 0.7,
      lineWidth: 0
    },
    selected: {
      opacity: 0.7,
      lineWidth: 0
    }
  }
  