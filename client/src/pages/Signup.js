import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";
import '../styles/Signup.css';

function Signup(props) {
  const [formState, setFormState] = useState({ username:'', email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);
  
  const handleChange = event => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  // const handleFormSubmit = async event => {
  //   event.preventDefault();
  //   const mutationResponse = await addUser({
  //     variables: {
  //       email: formState.email, password: formState.password, username: formState.username
  //     }
  //   });
  //   const token = mutationResponse.data.addUser.token;
  //   Auth.login(token);
  // };
    const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="container">
      <div id="card">
      <h2 id="signTitle">Signup</h2>
      <form id="signForm" onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="username">Username:</label>
          <input
            placeholder="Username"
            name="username"
            type="username"
            id="username"
            value={formState.username}
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Email:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            value={formState.email}
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
            value={formState.password}
            onChange={handleChange}
          />
        </div>
        <Link id="signLink" to="/login">
        ← Already Signed Up? Go to Login!
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

export default Signup;
