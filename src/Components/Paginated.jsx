import ReactPaginate from 'react-paginate';
import classNames from 'classnames/bind';
import styles2 from '~/sass/GlobalStyles/_GlobalStyle.scss';
import { useEffect } from 'react';
const gx = classNames.bind(styles2);

function Paginated({ onClick, pageCount, children, currentItems, indexVoca, sm, music, nodiv }) {
  useEffect(() => {
    const element1 = document.querySelector('.pagination :nth-child(2) :nth-child(1)');
    const element2 = document.querySelector('.pagination :nth-child(2) ');
    const allElli = document.querySelectorAll('.pagination li');
    const allEla = document.querySelectorAll('.pagination li a');
    if (allElli !== undefined && allEla !== undefined && element1 !== undefined && element2 !== undefined) {
      allElli.forEach((x) => {
        x.classList.remove('selected');
      });
      allEla.forEach((x) => {
        x.classList.remove('active');
      });

      if (element1.rel !== 'next') {
        element1.classList.add('active');
      }
      element2.classList.add('selected');
    } else {
    }
  }, [indexVoca]);

  const classes = gx('item-bookgrid', { sm, music });
  return (
    <>
      {nodiv ? <>{children}</> : <div className={classes}>{children}</div>}
      {nodiv ? (
        <>
          <tbody style={{ height: '30px' }}></tbody>
          <tbody style={{ position: 'relative' }}>
            <td></td>
            <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translate(-50%, -50%)', height: '100%' }}>
              <ReactPaginate
                breakLabel="........"
                disableInitialCallback={true}
                // initialPage={1}
                nextLabel=">>"
                onPageChange={onClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel="<<"
                // renderOnZeroPageCount={null}
                containerClassName={'pagination'}
                pageLinkClassName={'page-num'}
                previousClassName={'page-num'}
                nextClassName={'page-num'}
                activeLinkClassName={'active'}
              />
            </div>
          </tbody>
        </>
      ) : (
        <ReactPaginate
          breakLabel="........"
          disableInitialCallback={true}
          // initialPage={1}
          nextLabel=">>"
          onPageChange={onClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="<<"
          // renderOnZeroPageCount={null}
          containerClassName={'pagination'}
          pageLinkClassName={'page-num'}
          previousClassName={'page-num'}
          nextClassName={'page-num'}
          activeLinkClassName={'active'}
        />
      )}
    </>
  );
}

export default Paginated;
