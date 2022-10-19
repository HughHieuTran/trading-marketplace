import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormRow, SelectFormRow } from '../index.js';
import { handleChange } from '../../store/modProductSlice';
import { clearFilters } from '../../store/productSlice';

const SearchContainer = () => {
  const dispatch = useDispatch();
  const { search, searchStatus, searchCondition, sort, sortOptions } =
    useSelector((state) => state.getProduct);
  const { statusOptions, conditionOptions } = useSelector(
    (state) => state.addProduct
  );

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(clearFilters());
  };
  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    dispatch(handleChange({ name, value }));
  };

  return (
    <div className="m-auto p-8 bg-white rounded-md mt-5 md:mt-10 shadow-md ">
      <form
        onSubmit={submitHandler}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 "
      >
        <FormRow
          type="text"
          name="search"
          value={search}
          handleChange={inputChangeHandler}
          labelText="Search by Name"
        />

        <SelectFormRow
          name="searchStatus"
          labelText="status"
          onChange={inputChangeHandler}
          options={statusOptions}
          value={searchStatus}
        />
        <SelectFormRow
          name="searchCondition"
          labelText="Condition"
          onChange={inputChangeHandler}
          options={conditionOptions}
          value={searchCondition}
        />
        <SelectFormRow
          name="sort"
          labelText="Sort"
          onChange={inputChangeHandler}
          options={sortOptions}
          value={sort}
        />

        <div className="flex items-center justify-between mt-5">
          <button type="submit" className="btn btn-block">
            Reset filter
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchContainer;
