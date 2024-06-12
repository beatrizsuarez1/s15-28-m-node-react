import { Box, Modal, Typography } from '@mui/material';
import { style } from '../styles/styles';
import { ProjectService } from '../../../service/ProjectService';
import { useForm } from 'react-hook-form';
import { ICreateProject } from '../../../types/ProjectsType';

export const FormCreateProject = ({
  open,
  close,
}: {
  open: boolean;
  close: () => void;
}) => {

  const { createProject, clients } = ProjectService();
  const { register, handleSubmit } = useForm<ICreateProject>({
    defaultValues: {
      name: '',
      description: '',
      email_client: '',
    },
  });

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
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(createProject)}>
          <input
            type="text"
            placeholder="nombre del proyecto"
            className="px-4 py-2 border border-rounded rounded-md"
            {...register('name')}
          />
          <textarea
            placeholder="describa el proyecto"
            className="px-4 py-2 border border-rounded rounded-md"
            rows={4}
            {...register('description')}
          />
          <div className="flex gap-4">
            <input
              type="number"
              placeholder="costo por hora"
              className="px-4 py-2 border border-rounded rounded-md w-1/3"
              {...register('price_hour')}
            />
            <select
              className="px-4 py-2 border border-rounded rounded-md w-2/3"
              {...register('email_client')}
            >
              {clients.map((client) => (
                <option key={client.email} value={client.email}>
                  {client.email}
                </option>
              ))}
            </select>
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
