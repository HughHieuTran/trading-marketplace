import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Logo, FormRow, AlertBox } from '../component';
import { useNavigate } from 'react-router-dom';
import { displayAlert, setAlert, clearAlert } from '../store/modalSlice';
import { setupUser } from '../store/authSlice';

const AuthPage = () => {
  const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
  };
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { isLoading, showAlert, alertText, alertType } = useSelector(
    (state) => state.modal
  );
  const [values, setValues] = useState(initialState);
  const dispatch = useDispatch();

  const changeHander = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const modAlert = (text, type) => {
    dispatch(setAlert({ text: text, type: type }));
    dispatch(displayAlert());
    setTimeout(() => {
      dispatch(clearAlert());
    }, 2500);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      modAlert('Please provide all value', 'danger');
      return;
    }
    const currentUser = { name, email, password };
    if (isMember) {
      dispatch(
        setupUser({
          currentUser,
          link: 'login',
        })
      );
    } else {
      dispatch(
        setupUser({
          currentUser,
          link: 'register',
        })
      );
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  }, [user, navigate]);

  return (
    <div className="full-page grid items-center">
      <form
        onSubmit={submitHandler}
        className="form border-t-4 border-primary-500 "
      >
        <Logo className="mt-6 block m-auto" />
        <h3 className="pt-5 font-semibold text-center">
          {values.isMember ? 'Login' : 'Register'}
        </h3>
        {showAlert && <AlertBox alertText={alertText} alertType={alertType} />}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            labelText="name"
            value={values.name}
            handleChange={changeHander}
          />
        )}
        <FormRow
          type="email"
          name="email"
          labelText="email"
          value={values.email}
          handleChange={changeHander}
        />
        <FormRow
          type="password"
          name="password"
          labelText="password"
          value={values.password}
          handleChange={changeHander}
        />

        <button
          type="submit"
          className="btn btn-block mt-10"
          disabled={isLoading}
        >
          {values.isMember ? 'Login' : 'Register'}
        </button>

        <p className="pt-5 text-center font-semibold">
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}
          <button
            type="button"
            onClick={toggleMember}
            className="text-primary-500 pl-3 text-md"
          >
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </div>
  );
};

export default AuthPage;
