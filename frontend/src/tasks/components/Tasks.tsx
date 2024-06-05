import { useEffect, useState } from 'react'
import '../styles/index.css'
import { DatePickerDemo } from './Calendar'
import { getAllStatus } from '@/service/status.service'
import { LabelType, StatusType } from '@/Types/types'
import { Selected } from './Selected'
import { getAllLabels } from '@/service/labels.service'
import { SelectGroupChip } from './SelectGroupChip'
export function Tasks () {
  const [status, setStatus] = useState<StatusType[]>([])
  const [labels, setLabels] = useState<LabelType[]>([])
  useEffect(() => {
    const getStatus = async () => {
      const allStatus = await getAllStatus()
      setStatus(allStatus)
    }

    getStatus()
  }, [])

  useEffect(() => {
    const getLabels = async () => {
      const allLabels = await getAllLabels()
      setLabels(allLabels)
    }

    getLabels()
  }, [])

  const classOptionTasks = `flex justify-between text-gray-500 cursor-pointer px-2 py-1 items-center`
  return (
    <div className="flex justify-center items-center fixed inset-0 w-full h-full bg-gray-500 bg-opacity-75 z-50">
      <section className="bg-white p-6 rounded-lg shadow-xl z-51 lg:w-6/12 lg:h-5/6 relative overflow-auto scroll">
        <div className='w-full mb-10'>
          <textarea placeholder="Escribe tu tarea" className="focus:outline-none focus:ring-0 text-3xl font-bold resize-none overflow-hidden field w-full " defaultValue={'F013 - Titulo de la tarea'} />
        </div>
        <div className='grid md:grid-cols-1 lg:grid-cols-2 gap-4 w-full mb-10'>
          <div className={`${classOptionTasks}`}>
            <span>Estado</span>
            <Selected array={status} title={'Estado'} />
          </div>
          <div className={`${classOptionTasks}`}>
            <span>Fecha Inicial</span>
            <div>
              <DatePickerDemo />
            </div>
          </div>
          <div className={`${classOptionTasks}`}>
            <span>Fecha Final</span>
            <div>
              <DatePickerDemo />
            </div>
          </div>
          <div className={`${classOptionTasks}`}>
            <span>Etiquetas</span>
            <div>
              <SelectGroupChip labels={labels} title={'Tags'} />
            </div>
          </div>
          <div className={`${classOptionTasks}`}>
            <span>Personas Asignadas</span>
            <span>vacio</span>
          </div>
          <div className={`${classOptionTasks}`}>
            <span>Registrar el Tiempo</span>
            <span>vacio</span>
          </div>

        </div>

        <div>
          <textarea placeholder="Descripción de la tarea" className="focus:outline-none border border-gray-300 resize-none overflow-hidden field w-full rounded-md px-2 py-1" />
        </div>
      </section>
    </div>
  )
}