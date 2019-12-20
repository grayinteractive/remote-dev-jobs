import React from 'react';
import './App.css';

import JobList from './JobList';
import Filter from './Filter';
import Header from './Header';
import Footer from './Footer';

const JOB_API_URL = 'http://localhost:3001/jobs';

async function fetchJobs(updateCallback) {
  const response = await fetch(JOB_API_URL);
  const json = await response.json();
  updateCallback(json);
}

function App() {
  const [jobList, updateJobs] = React.useState([]);
  const [filteredJobs, setFilteredJobs] = React.useState([]);
  const [filterList, setFilters] = React.useState({
    backend: false,
    frontend: false,
    fullstack: false,
    devops: false,
    product: false
  });
  const [isFiltered, showFilteredJobs] = React.useState([false]);

  function handleFilterUpdate(name, event) {
    setFilters({ ...filterList, [name]: event });
  };

  function filterJobs(filterList) {
    const activeFilters = Object.keys(filterList).filter(function (id) {
      return filterList[id];
    })
    if (activeFilters.length) {
      showFilteredJobs(true);

      // Add additional search criteria...
      if(activeFilters.includes("frontend")) {
        activeFilters.push("front end");
      }
      if(activeFilters.includes("backend")) {
        activeFilters.push("back end");
      }
      if(activeFilters.includes("fullstack")) {
        activeFilters.push("full stack");
      }
      if(activeFilters.includes("devops")) {
        activeFilters.push("dev ops");
      }
    }
    else {
      showFilteredJobs(false);
    }

    setFilteredJobs(jobList.filter(
      job => {
        return activeFilters.some(filterWord => {
          return job.title.toLowerCase().includes(filterWord)
        })
      }
    ))
  }

  React.useEffect(() => {
    fetchJobs(updateJobs);
    filterJobs(filterList);
  }, [filterList])

  return (
    <div className="App">
      <Header />
      <Filter filters={filterList} onChildClick={handleFilterUpdate} />
      <JobList filters={filterList} jobs={isFiltered ? filteredJobs : jobList} />
      <Footer />
    </div>
  );
}

export default App;
