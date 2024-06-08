import { useState } from 'react';
import { Box, Button } from '@mui/material';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { data } from './data';
import {
  FormCreateProject,
  ModalShowProject,
  TableProject,
} from './components';
import type { IDataType } from '../../types/ProjectsType';

export const Project = () => {
  const [showModal, setShowModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [modalData, setModalData] = useState<IDataType>({
    name: '',
    client: '',
    date_in: '',
    date_out: '',
    status: '',
    email_client: '',
  });

  const handleCloseModal = () => setShowModal(false);

  const modal = (data: IDataType) => {
    setModalData(data); // Store data in state
    setShowModal(true); // Show modal
  };

  const handleCloseCreateModal = () => setCreateModal(false);

  const handleCreateModal = () => setCreateModal(true);

  return (
    <>
      <Box
        component="div"
        sx={{ display: 'flex', alignItems: 'center', mt: 6, mb: 2 }}
      >
        <Box component="h3" sx={{ mr: 2, fontWeight: 'bold', fontSize: 20 }}>
          Proyectos
        </Box>
        <Button onClick={handleCreateModal}>
          <CreateNewFolderIcon />
        </Button>
      </Box>

      <FormCreateProject close={handleCloseCreateModal} open={createModal} />

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
              placeholder="Buscar Proyecto"
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
                Cliente
              </th>
              <th scope="col" className="px-6 py-3">
                Fecha Inichal
              </th>
              <th scope="col" className="px-6 py-3">
                Fecha estipulada
              </th>
              <th scope="col" className="px-6 py-3">
                Estado
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((project, index) => (
              <TableProject key={index} data={project} modal={modal} />
            ))}
          </tbody>
        </table>
      </div>

      <ModalShowProject
        showModal={showModal}
        data={modalData}
        close={handleCloseModal}
      />
    </>
  );
};
