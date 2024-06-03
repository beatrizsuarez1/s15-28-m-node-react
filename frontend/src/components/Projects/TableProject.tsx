interface Props {
  name: string;
  client: string;
  date_in: string;
  date_out: string;
  status: string;
  email_client: string;
}

export const TableProject = ({ data }: { data: Props }) => {

  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="w-4 p-4"></td>
        <th className="flex items-center px-2 py-4 text-gray-900 whitespace-nowrap dark:text-white">
          <div className="ps-3 text-base font-semibold">{data.name}</div>
        </th>
        <td className="px-6 py-4">
          <div className="text-base font-semibold">{data.client}</div>
          <div className="font-normal text-gray-500">{data.email_client}</div>
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center pl-2">{data.date_in}</div>
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center pl-2">{data.date_in}</div>
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center justify-start">
            <div
              className={`${
                data.status === 'Completo'
                  ? 'bg-green-400 p-2 rounded-lg ml-[-10px] text-white'
                  : 'bg-red-400 p-2 rounded-lg ml-[-10px] text-white'
              } me-2`}
            >
              {data.status}
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};
