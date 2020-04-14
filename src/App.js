import React, { useState, useEffect } from 'react';
import api from './services/api';

import "./styles.css";

function App() {

  const [repositorys, setRepositorys] = useState([]);

  useEffect(() => {
    api.get('/projects').then(response => {
      setRepositorys(response.data);
      console.log(repositorys);
    })
  }, []);

  async function handleAddRepository() {
    api.post('/projects',{
      title: `Novo Repository ${Date.now()}`,
	    owner: "Grunfeldt"
    }).then(response => {
      setRepositorys([...repositorys, response.data]);
    });
  }

  async function handleRemoveRepository(id) {
    console.log('Removendo: ' + id);
    api.delete(`/projects/${id}`).then(response => {
      setRepositorys([...repositorys, response.data]);
    });
  }

  return (
    <>
      <ul data-testid="repository-list">
        {
          repositorys.map(repo => {
          return(
          <>
              <li key={repo.id}>{repo.title}
                <button key={repo.id + 1} onClick={() => handleRemoveRepository(`${repo.id}`)}>
                  Remover
                </button>
              </li>
          </>
          );
          })
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </>
  );
}

export default App;
