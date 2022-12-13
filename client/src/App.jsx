import React, { useState, useEffect } from 'react';
import UsersTable from './components/UsersTable';
import Form from './components/Form';

function App() {
  const [errorsCount, setErrorsCount] = useState(0);
  const [seed, setSeed] = useState(0);
  const [locale, setLocale] = useState('en');
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (fetching) {
      fetch(`https://mrn-fks-bcknd.vercel.app/api/users/all?page=${currentPage}&seed=${seed}&locale=${locale}&errorsCount=${errorsCount}`)
        .then((res) => res.json())
        .then(data => {
          setUsers([...users, ...data.users]);
          setCurrentPage(prevState => prevState + 1);
        }).finally(() => setFetching(false));

    }
  }, [fetching]);

  useEffect(() => {
    setUsers([]);
    setCurrentPage(1);
    setFetching(true);
  }, [errorsCount, seed, locale])

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);

    return function () {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function handleScroll(event) {
    if (event.target.documentElement.scrollHeight - (event.target.documentElement.scrollTop + window.innerHeight) < 1000) {
      setFetching(true);
    }
  }

  return (
    <>
      < Form
        errorsCount={errorsCount}
        setErrorsCount={setErrorsCount}
        seed={seed}
        setSeed={setSeed}
        locale={locale}
        setLocale={setLocale}
      />

      <UsersTable users={users} />
    </>
  );
}

export default App;
