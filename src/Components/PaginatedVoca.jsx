import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Paginated from '~/Components/Paginated';
import _ from 'lodash';

function PaginatedBook({ children }) {
  const [check, setCheck] = useState(false);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const data = useSelector((state) => state.DataSearchVoca);

  const itemsPerPage = 16;

  useEffect(() => {
    setCheck(!check);
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(data.slice(itemOffset, endOffset));

    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Paginated onClick={handlePageClick} pageCount={pageCount}>
        {currentItems.map((item, index) => {
          return { children };
        })}
      </Paginated>
    </>
  );
}

export default PaginatedBook;
