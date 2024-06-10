import { Box, Modal, Typography } from '@mui/material';
import { style } from '../styles/styles';
import { ProjectService } from '../../../service/ProjectService';
// import { useCookies } from 'react-cookie';

export const FormCreateProject = ({
  open,
  close,
}: {
  open: boolean;
  close: () => void;
}) => {
  const { createProject, formState, setFormState } = ProjectService();

  return (
    <Modal
      open={open}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h3"
          sx={{ m: 2, textAlign: 'center' }}
        >
          Crear nuevo proyecto
        </Typography>
        <form className="flex flex-col gap-4" onSubmit={createProject}>
          <input
            type="text"
            placeholder="nombre del proyecto"
            className="px-4 py-2 border border-rounded rounded-md"
            onChange={(e) =>
              setFormState({ ...formState, name: e.target.value })
            }
            value={formState.name}
          />
          <textarea
            placeholder="describa el proyecto"
            className="px-4 py-2 border border-rounded rounded-md"
            rows={4}
            onChange={(e) =>
              setFormState({ ...formState, description: e.target.value })
            }
            value={formState.description}
          />
          <div className="flex gap-4">
            <input
              type="number"
              placeholder="costo por hora"
              className="px-4 py-2 border border-rounded rounded-md w-1/3"
              onChange={(e) =>
                setFormState({
                  ...formState,
                  price_hour: Number(e.target.value),
                })
              }
            />
            <input
              type="email"
              placeholder="email del cliente"
              className="px-4 py-2 border border-rounded rounded-md w-full"
              onChange={(e) =>
                setFormState({ ...formState, email_client: e.target.value })
              }
              value={formState.email_client}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Crear
          </button>
        </form>
      </Box>
    </Modal>
  );
};
