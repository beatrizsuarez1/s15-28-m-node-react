import { useEffect, useState } from "react";
import { Result } from "../../Types/person";


export const TableClient = ({data}: {data: Result}) => {
  const [state, setState] = useState('')
  const { email, picture, name  } = data
  const { first, last } = name

  useEffect(() => {
    const stateGenerate = () => {
      const states = ['online', 'offline'];
      setState(states[Math.floor(Math.random() * states.length)]);
    };

    stateGenerate();
  }, [])


  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="w-4 p-4"></td>
        <th
          scope="row"
          className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
        >
          <img
            className="w-10 h-10 rounded-full"
            src={picture.thumbnail}
            alt="Jese image"
          />
          <div className="ps-3">
            <div className="text-base font-semibold">{first} {last}</div>
            <div className="font-normal text-gray-500">
              {email}
            </div>
          </div>
        </th>
        <td className="px-6 py-4">Fiver</td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <div className={`h-2.5 w-2.5 rounded-full ${ state === 'online' ? 'bg-green-400' : 'bg-red-400'} me-2`}></div>{' '}
            { state }
          </div>
        </td>
        <td className="px-6 py-4">
          <a
            href="#"
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Edit user
          </a>
        </td>
      </tr>
    </>
  );
};
