
import { Box, Button } from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import {TableClient} from './TableClient';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Person, Result } from '../../Types/person';

export const Client = () => {

  const [data, setData] = useState<Result[]>()

  const getClients = () => {
    axios.get('https://randomuser.me/api/?results=10')
      .then(response => {
        const data: Person = response.data;
        setData(data.results);
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    getClients();
  }, [])

  return (
    <>
      <Box
        component="div"
        sx={{ display: 'flex', alignItems: 'center', mt: 6, mb: 2 }}
      >
        <Box component="h3" sx={{ mr: 2 }}>
          Clientes
        </Box>
        <Button>
          <PersonAddAlt1Icon />
        </Button>
      </Box>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-10">
        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 p-4 bg-white dark:bg-gray-900">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search-users"
              className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Buscar Cliente"
            />
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center"></div>
              </th>
              <th scope="col" className="px-6 py-3">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3">
                Organización
              </th>
              <th scope="col" className="px-6 py-3">
                Estado
              </th>
              <th scope="col" className="px-6 py-3">
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            {
              data && data.map((item, index) => <TableClient key={index} data={item}/>)
            }
          </tbody>
        </table>
      </div>
    </>
  );
};
