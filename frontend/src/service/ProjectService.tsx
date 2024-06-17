import axios from 'axios';
import { useEffect, useState } from 'react';
import { IClient, ICreateProject, IProjectResponse } from '../types/ProjectsType';
import { SubmitHandler } from 'react-hook-form';

export const ProjectService = () => {
  const [projects, setProjects] = useState<IProjectResponse[]>([]);
  console.log(projects)
  const [clients, setClients] = useState<IClient[]>([]);


  const getClients = async () => {
    return await axios
      .get('http://localhost:3000/api/v1/user/?role_id=2')
      .then((res) => {
        return setClients(res.data.data);
      });
  }


  const createProject: SubmitHandler<ICreateProject> = async (data) => {
    const formatData = { ...data, price_hour: Number(data.price_hour) };
    await axios
      .post('http://localhost:3000/api/v1/project', formatData, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    window.location.reload();
  };

  useEffect(() => {
    const getProjects = async () => {
      return await axios
        .get('http://localhost:3000/api/v1/project', { withCredentials: true })
        .then((res) => {
          return setProjects(res.data);
        });
    };
    getProjects();
    getClients();
  }, []);
  return {
    projects,
    setProjects,
    createProject,
    clients,
  };
};
