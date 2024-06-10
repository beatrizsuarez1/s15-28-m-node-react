import { Box, Button, Modal, Typography } from '@mui/material';
import { style } from '../styles/styles';
import { IProjectResponse } from '../../../types/ProjectsType';

interface Props {
  showModal: boolean;
  close: () => void;
  data: IProjectResponse;
}

export const ModalShowProject = ({ showModal, close, data }: Props) => {
  return (
    <Modal
      open={showModal}
      onClose={close}
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
          <Box component="h3" sx={{ mr: 2, fontWeight: 'bold', fontSize: 20 }}>
            {data.name}
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
              <Typography>{data.description}</Typography>
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
              <p className="font-bold">{data.init_date}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-xs">Fecha estipulada: </p>{' '}
              <p className="font-bold">{data.end_date}</p>
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
  );
};
