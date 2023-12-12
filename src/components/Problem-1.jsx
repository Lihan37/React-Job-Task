import React, { useState } from 'react';

const Problem1 = () => {
  const [show, setShow] = useState('all');
  const [tasks, setTasks] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = event.target.elements.name.value;
    const status = event.target.elements.status.value;

    setTasks((prevTasks) => [...prevTasks, { name, status }]);
  };

  const filterTasks = () => {
    if (show === 'all') {
      return tasks.sort((a, b) => {
        if (a.status === 'active' && b.status !== 'active') return -1;
        if (a.status === 'completed' && b.status !== 'completed') return 1;
        return 0;
      });
    } else {
      return tasks.filter((task) => task.status === show);
    }
  };

  return (
    <div className="container mt-5">
      <h4 className="text-center text-uppercase mb-5">Problem-1</h4>

      <div className="row justify-content-center">
        <div className="col-6">
          <form className="row gy-2 gx-3 align-items-center mb-4" onSubmit={handleSubmit}>
            <div className="col-auto">
              <input type="text" className="form-control" placeholder="Name" name="name" />
            </div>
            <div className="col-auto">
              <input type="text" className="form-control" placeholder="Status" name="status" />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>

        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button className={`nav-link ${show === 'all' && 'active'}`} type="button" onClick={() => setShow('all')}>
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === 'active' && 'active'}`}
                type="button"
                onClick={() => setShow('active')}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === 'completed' && 'active'}`}
                type="button"
                onClick={() => setShow('completed')}
              >
                Completed
              </button>
            </li>
          </ul>

          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {filterTasks().map((task, index) => (
                <tr key={index}>
                  <td>{task.name}</td>
                  <td>{task.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;