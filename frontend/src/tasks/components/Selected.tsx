import { StatusType } from "@/Types/types"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SelectedProps {
  title?: string
  array: StatusType[]
}

export function Selected ({ array, title }: SelectedProps) {

  return (
    <Select>
      <SelectTrigger className={`w-6/12 bg-white rounded-lg`}>
        <SelectValue placeholder={title ?? 'Seleccione'} />
      </SelectTrigger>
      <SelectContent >
        <SelectGroup className="bg-white">
          {array.map((item) => {

            return (
              <SelectItem
                className="cursor-pointer"
                key={item.uuid}
                value={item.name}>
                {item.name}
              </SelectItem>
            )
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
