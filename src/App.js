import React, { useState } from 'react';
import GithubImage from './github-mark.png';
import logo from './logo.svg';
import './App.css';

function App() {
const [search, setSearch] = useState('');
const [userData, setUserData] = useState();

  const handleSubmit = (event) => {
    event.preventDefault(); //tira o comportamento padrão no caso refresh
    console.log('submit!') //msg no console do inspecionar
    fetch(`https://api.github.com/users/${search}`)
      .then( response => response.json())
      .then(userResponse => setUserData(userResponse));
  }

  console.log(userData);

  const hanldeChange = (event) => {
      setSearch(event.target.value);
  }

  return (
    <div className="container text-center">
      <h1 className="py-5 text-uppercase">GitHub Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="input-group">
            <input type="text" 
              className="form-control"
              required
              value={search}
              onChange={hanldeChange}
            />
            <span className="input-group-btn">
              <button type="submit" className="btn btn-success">Search</button>
            </span>
          </div>
        </div>
      </form>
      <div className="py-5">
       {!userData && (
          <img src={GithubImage} 
          className="responsive round-circle" 
          alt="" 
          height="200p"
        />
       )}
       {userData && (
         <div>
         <img src={userData.avatar_url} 
            className="responsive round-circle" 
            alt="" 
            height="200p"
          />
          <h1 className="pt-3">
          <a href={`https://github.com/${userData.name}`}
            target="_new">
            {userData.name}
          </a>
          </h1>
          <h3>{userData.location}</h3>
          <p>
            <a href={`https://github.com/${userData.name}`}
              target="_new"
              className="text-info">
              {userData.blog}
            </a> 
          </p>
          </div>
       )}
      </div>
    </div>
  );
}

export default App;
