import axios from 'axios';
import { useEffect, useState } from 'react';
import { ICreateProject, IProjectResponse } from '../types/ProjectsType';

export const ProjectService = () => {
  const [projects, setProjects] = useState<IProjectResponse[]>([]);
  const [formState, setFormState] = useState<ICreateProject>({
    name: '',
    description: '',
    email_client: '',
    price_hour: 0,
  });


  const createProject = async () => {
    // console.log(formState);
    await axios.post('http://localhost:3000/api/v1/project', formState, {
      headers: {
        'Content-Type': 'application/json',
        ['apikey']: import.meta.env.VITE_API_KEY,
      },
      withCredentials: true,
    }
    ).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    })
    setFormState({
      name: '',
      description: '',
      email_client: '',
      price_hour: 0,
    });
  };

  useEffect(() => {
    const getProjects = async () => {
      await axios
        .get('http://localhost:3000/api/v1/project', {
          headers: {
            'Content-Type': 'application/json',
            ['apikey']: import.meta.env.VITE_API_KEY,
          },
        })
        .then((res) => {
          return setProjects(res.data);
        });
    };

    getProjects();
  }, []);
  return {
    projects,
    setProjects,
    formState,
    setFormState,
    createProject,
  }
};
