import React, { useEffect, useState } from 'react';

import Dropdown from '../Dropdown';
import Button from '../Button';

import { PokeAPI_with_fetch } from '../../api';

const PaginationHelper = ({ listProvider: ListProvider }) => {
  const [page, setPage] = useState(1);
  const [elements, setElements] = useState(5);
  const [currentPage, setCurrentPage] = useState(null);

  const maxPage = Math.ceil(currentPage?.count / elements);

  useEffect(() => {
    const fetch = async () => {
      const payload = await PokeAPI_with_fetch.list({
        offset: (page - 1) * elements,
        limit: elements,
      });
      setCurrentPage(payload);
    };

    fetch();
  }, [page, elements]);

  const dropdownSelectHandler = (newSelection) => {
    if (page != 1) {
      const approximatedCount = page * elements;
      const count = Math.min(approximatedCount, currentPage?.count);
      const bookmark = Math.ceil(count / newSelection);
      setPage(bookmark);
    }

    setElements(newSelection);
  };

  const generatePaginationActionButtons = () => {
    let focus = [false, true, false];
    let indexes = [page - 1, page, page + 1];
    if (page == 1) {
      indexes = [1, 2, 3];
      focus = [true, false, false];
    }

    if (page === maxPage) {
      indexes = [maxPage - 2, maxPage - 1, maxPage];
      focus = [false, false, true];
    }

    const buttons = [0, 1, 2].map((num) => (
      <Button
        key={`pmb-${num}`}
        noBorders={num % 2 == 0}
        isFocused={focus[num]}
        onClick={() => setPage(indexes[num])}
      >
        {indexes[num]}
      </Button>
    ));

    return buttons;
  };

  const renderPaginationActions = () => {
    const [first, second, third] = generatePaginationActionButtons();

    return (
      <>
        <div className="col g-0">
          <Button
            key="pb-0"
            borderRadius="5px 0px 0px 5px"
            onClick={() => setPage(1)}
          >
            &#8810;
          </Button>
        </div>
        <div className="col g-0">{first}</div>
        <div className="col g-0">{second}</div>
        <div className="col g-0">{third}</div>
        <div className="col g-0">
          <Button
            key="pb-1"
            borderRadius="0px 5px 5px 0px"
            onClick={() => setPage(maxPage)}
          >
            &#8811;
          </Button>
        </div>
      </>
    );
  };

  return (
    <div className="col g-0 pt-3">
      <div className="row g-0 pb-3 align-items-center">
        <div className="col">
          <Dropdown
            options={[5, 10, 25, 50, 100]}
            onSelect={dropdownSelectHandler}
          >
            Pok&eacute;mon a mostrar ({elements})
          </Dropdown>
        </div>
        <div className="col">
          <h6 className="text-end">
            P&aacute;gina {page} de {maxPage}
          </h6>
        </div>
      </div>
      <div className="row px-3 pb-3">
        <ListProvider items={currentPage?.results} />
      </div>
      <div className="row justify-content-center pb-5">
        <div className="col-7 col-lg-5 col-xl-4">
          <div className="row">{renderPaginationActions()}</div>
        </div>
      </div>
    </div>
  );
};

export default PaginationHelper;
