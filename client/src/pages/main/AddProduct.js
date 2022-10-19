import React, { useState } from 'react';
import { FormRow, AlertBox, SelectFormRow } from '../../component';
import { useSelector, useDispatch } from 'react-redux';
import { displayAlert, setAlert, clearAlert } from '../../store/modalSlice';
import {
  handleChange,
  clearValue,
  createProduct,
  editProduct,
} from '../../store/modProductSlice';

const AddProduct = () => {
  const { isLoading, showAlert, alertType, alertText } = useSelector(
    (state) => state.modal
  );
  const {
    isEditing,
    editProdId,
    productName,
    brand,
    shopLocation,
    condition,
    conditionOptions,
    status,
    statusOptions,
  } = useSelector((state) => state.addProduct);

  const [image, setImage] = useState(undefined);
  const dispatch = useDispatch();

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  const fileChangeHandler = (e) => {
    const imageFile = e.target.files[0];
    setImage(imageFile);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const product = {
      productName,
      brand,
      shopLocation,
      condition,
      status,
      image,
    };
    if (isEditing) {
      product.prodId = editProdId;
      if (!productName || !brand || !shopLocation) {
        dispatch(
          setAlert({ text: 'please provide all values', type: 'danger' })
        );
        dispatch(displayAlert());
        setTimeout(() => {
          dispatch(clearAlert());
        }, 2500);
        return;
      }
      dispatch(editProduct(product));
      return;
    }

    if (!productName || !brand || !shopLocation || !image) {
      dispatch(setAlert({ text: 'please provide all values', type: 'danger' }));
      dispatch(displayAlert());
      setTimeout(() => {
        dispatch(clearAlert());
      }, 2500);
      return;
    }

    dispatch(createProduct(product));
    dispatch(clearValue());
  };

  return (
    <div className="m-auto p-8 bg-white rounded-md mt-5 md:mt-10 shadow-md">
      {showAlert && <AlertBox alertText={alertText} alertType={alertType} />}
      <h3>{isEditing ? `Edit product of ${editProdId}` : 'Add product'}</h3>
      <form
        onSubmit={submitHandler}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
      >
        <FormRow
          type="text"
          name="productName"
          value={productName}
          handleChange={inputChangeHandler}
          labelText="Product Name"
        />
        <FormRow
          type="text"
          name="brand"
          value={brand}
          handleChange={inputChangeHandler}
          labelText="brand"
        />
        <FormRow
          type="select"
          name="shopLocation"
          value={shopLocation}
          handleChange={inputChangeHandler}
          labelText="Shop Location"
        />
        {/* job type */}
        <SelectFormRow
          name="condition"
          labelText="condition"
          value={condition}
          options={conditionOptions}
          onChange={inputChangeHandler}
        />
        <SelectFormRow
          name="status"
          labelText="Status"
          value={status}
          options={statusOptions}
          onChange={inputChangeHandler}
        />
        <div>
          <label htmlFor="image">Product Image</label>
          <input
            className="mt-2"
            type="file"
            name="image"
            onChange={fileChangeHandler}
          />
        </div>

        {/* job status */}
        <div className="flex items-center justify-between mt-5">
          <button
            className="btn btn-block mr-2"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Please wait...' : 'Submit'}
          </button>
          <button
            type="button"
            className="btn btn-block"
            onClick={() => dispatch(clearValue())}
          >
            {isEditing ? 'Stop editing' : 'Clear values'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
