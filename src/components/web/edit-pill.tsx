import { updatePill } from "@/lib/controllers/pills"
import { cn } from "@/lib/utils"
import { PillsProps, UpdatePillProps } from "@/types/types"
import { IconX } from "@tabler/icons-react"
import { useSession } from "next-auth/react"
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { QueryClient, useMutation } from "react-query"

type EditPillProps = {
  setOpenPillEditor: React.Dispatch<React.SetStateAction<boolean>>
  name: string
  hour: string
  frequency: string
}

const EditPill = ({
  hour,
  name,
  frequency,
  setOpenPillEditor,
}: EditPillProps) => {
  const { data: session } = useSession()
  const [isEditing, setIsEditing] = useState(false)
  const [newHour, setNewHour] = useState<string>("")
  const [newName, setNewName] = useState<string>("")
  const [newFrequency, setNewFrequency] = useState<string>("")
  const queryClient = new QueryClient()

  const updatePillMutation = useMutation({
    mutationKey: ["updateExercise"],
    mutationFn: async () => {
      await updatePill(session?.user.id, {
        name: newName ? newName : name,
        hour: newHour ? newHour : hour,
        frequency: newFrequency ? newFrequency : frequency,
      })
    },
    onSuccess: () => {
      toast.success("Pastilla actualizada")
      queryClient.invalidateQueries("pills")
    },
    onError: () => {
      toast.error("Error updating exercise")
    },
  })

  const handleEdit = async () => {
    try {
      await updatePillMutation.mutateAsync()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    console.log(isEditing)
  }, [isEditing])

  return (
    <main className="w-full h-screen flex items-center justify-center absolute top-0 left-0 z-50 bg-black/50">
      <section className="relative w-[95%] h-[300px] flex items-center justify-start bg-white rounded-sm flex-col gap-7">
        <div className="absolute top-5 left-4">
          <IconX
            className="w-6 h-6 text-black cursor-pointer"
            onClick={() => setOpenPillEditor(false)}
          />
        </div>
        <h1 className="text-black text-2xl font-semibold mt-5">
          Edita tu pastilla
        </h1>
        <form
          onSubmit={handleEdit}
          className="w-full h-full flex items-center justify-center flex-col "
        >
          <div className="w-[85%] h-[90px] flex items-center justify-between rounded-lg bg-primary_blue transition-colors duration-200">
            <div className="w-full h-full flex items-center justify-start">
              <input
                value={!isEditing ? hour : newHour}
                placeholder={isEditing ? "Hora" : ""}
                type="time"
                onChange={(e) => setNewHour(e.target.value)}
                disabled={!isEditing}
                className={cn(
                  "w-full h-full border-none bg-transparent text-white font-semibold text-6xl ml-2 outline-none my-2",
                  {
                    "text-6xl": isEditing,
                  }
                )}
              />
            </div>
            <div className="w-full h-full flex items-center justify-center flex-col my-2">
              <input
                value={!isEditing ? name : newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder={isEditing ? "Nombre" : ""}
                disabled={!isEditing}
                className="w-full h-max flex items-center justify-center text-center bg-transparent border-none font-semibold text-white text-lg outline-none"
              />
              <input
                value={!isEditing ? frequency : newFrequency}
                placeholder={isEditing ? "Frecuencia" : ""}
                onChange={(e) => setNewFrequency(e.target.value)}
                disabled={!isEditing}
                className="w-full h-max flex items-center justify-center text-center bg-transparent border-none text-sm text-white font-normal outline-none"
              />
            </div>
          </div>
          {!isEditing && (
            <div
              onClick={() => setIsEditing(true)}
              className="w-[60%] h-12 bg-primary_blue text-white font-semibold text-lg flex items-center justify-center rounded-sm mt-8"
            >
              Editar
            </div>
          )}
          {isEditing && (
            <div className="w-full h-full flex items-center justify-center flex-row gap-2">
              <button
                type="submit"
                className="w-[45%] h-12 bg-primary_blue outline-none border-none rounded-sm text-white text-lg font-semibold"
              >
                Enviar
              </button>
              <div
                onClick={() => setIsEditing(false)}
                className="w-[45%] h-12 bg-transparent rounded-sm text-black text-lg font-semibold border-[1px] border-black hover:bg-black hover:text-white transition-colors duration-200 flex items-center justify-center"
              >
                Volver
              </div>
            </div>
          )}
        </form>
      </section>
    </main>
  )
}

export default EditPill
