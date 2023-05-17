import { useDrop } from 'react-dnd';
import classNames from 'classnames/bind';
import styles from './_DragDropGame.module.scss';
const cx = classNames.bind(styles);

export const Dustbin = ({ name, active, order }) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: name,
    drop: () => ({ name }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <>
      {active ? (
        <div className={cx('box-img')} style={{ order: order }}>
          <img src={`https://resourcesk.bkt.net.vn/ImagesPNG/${name}.png`} alt="" />
        </div>
      ) : (
        <div ref={drop} className={cx('box-text')} style={{ order: order }}>
          {name}
        </div>
      )}
    </>
  );
};
