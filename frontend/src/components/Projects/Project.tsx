import { Box, Button, Modal, Typography } from '@mui/material';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { data } from './data';
import { TableProject } from './components/TableProject';
import { useState } from 'react';
import { style } from './styles/styles';
import { FormCreateProject } from './components/FormCreateProject';
import { IDataType } from '../../types/ProjectsType';

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

      <FormCreateProject close={handleCloseCreateModal} open={createModal}/>

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

      <Modal
        open={showModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            component="div"
            sx={{
              display: 'flex',
              alignItems: 'center',
              mt: 6,
              mb: 2,
              justifyContent: 'space-between',
            }}
          >
            <Box
              component="h3"
              sx={{ mr: 2, fontWeight: 'bold', fontSize: 20 }}
            >
              {modalData.name}
            </Box>
            <Button>Asignar Tareas</Button>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '60%',
              }}
            >
              <div>
                <Typography
                  component="h5"
                  sx={{ fontWeight: 'bold', fontSize: 20 }}
                >
                  Descripción
                </Typography>
                <Typography>{modalData.description}</Typography>
              </div>
            </Box>
            <Box
              sx={{
                display: 'flex',
                mt: 6,
                mb: 2,
                flexDirection: 'column',
                width: '20%',
                gap: 2,
              }}
            >
              <div className="flex flex-col">
                <span className="text-xs">Fecha Inichal: </span>
                <p className="font-bold">{modalData.date_in}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-xs">Fecha estipulada: </p>{' '}
                <p className="font-bold">{modalData.date_out}</p>
              </div>
            </Box>
          </Box>
          <Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                mt: 3,
                mb: 2,
                gap: 2,
                justifyContent: 'center',
              }}
            >
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded">
                Completado
              </div>
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
                Pendiente
              </div>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mt: 3,
              mb: 2,
              gap: 2,
              justifyContent: 'center',
            }}
          >
            <button className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-2 rounded">
              Eliminar proyecto
            </button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
