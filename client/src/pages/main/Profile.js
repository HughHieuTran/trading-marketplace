import React, { useState } from 'react';
import { FormRow, AlertBox } from '../../component';
import { useSelector, useDispatch } from 'react-redux';
import { displayAlert, setAlert, clearAlert } from '../../store/modalSlice';
import { updateUser } from '../../store/authSlice';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const { showAlert, isLoading, alertText, alertType } = useSelector(
    (state) => state.modal
  );
  const dispatch = useDispatch();

  const initialState = {
    name: user.name,
    email: user.email,
    lastName: user.lastName,
    location: user.location,
  };
  const [values, setValues] = useState(initialState);

  const inputChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const { name, lastName, email, location } = values;
    if (!name || !lastName || !email || !location) {
      dispatch(setAlert({ text: 'please provide all values', type: 'danger' }));
      dispatch(displayAlert());
      setTimeout(() => {
        dispatch(clearAlert());
      }, 2500);
      return;
    }
    dispatch(updateUser(values));
  };

  return (
    <div className="m-auto p-8 bg-white rounded-md mt-5 md:mt-10 shadow-md">
      <h3>User Profile</h3>
      {showAlert && <AlertBox alertText={alertText} alertType={alertType} />}
      <form
        onSubmit={submitHandler}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 "
      >
        <FormRow
          type="text"
          name="name"
          value={values.name}
          handleChange={inputChangeHandler}
          labelText="name"
        />
        <FormRow
          type="text"
          name="lastName"
          value={values.lastName}
          handleChange={inputChangeHandler}
          labelText="last name"
        />
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={inputChangeHandler}
          labelText="email"
        />
        <FormRow
          type="text"
          name="location"
          value={values.location}
          handleChange={inputChangeHandler}
          labelText="location"
        />
        <button
          className="btn btn-block mt-9"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Please wait...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default Profile;
