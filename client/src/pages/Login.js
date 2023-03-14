import React, { useState } from "react";
import { useMutation } from '@apollo/react-hooks';
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations"
import Auth from "../utils/auth";
import '../styles/Signup.css';

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' })
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async event => {
    event.preventDefault();
    try {
      const mutationResponse = await login({ variables: { email: formState.email, password: formState.password } })
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e)
    }
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  return (
    <div className="container">
      <div id='card'>
      <h2 id="signTitle">Login</h2>
      <form id="signForm" onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="Email">Email:</label>
          <input
            placeholder="email"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        {
          error ? <div>
            <p className="error-text" >The provided credentials are incorrect</p>
          </div> : null
        }
        <Link id="signLink" to="/signup">
        ← Go to Signup
        </Link>
        <div className="flex-row flex-end">
          <button id="signBtn" type="submit">
            Submit
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}


export default Login;
