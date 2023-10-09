declare global {
  namespace globalThis {
    var prismadb: PrismaClient
  }
}

export interface PillsProps {
  id: number
  name: string
  description: string
  frequency: string
  hour: string
  date: string
  userId: number
}

export interface StateProps {
  state: "orange" | "red" | "green"
}

export interface MessagesContextProps {
  messages: Message[]
  isMessageUpdating: boolean
  addMessage: (message: Message) => void
  removeMessage: (id: string) => void
  updateMessage: (id: string, updateFn: (prevText: string) => string) => void
  setIsMessageUpdating: (isUpdating: boolean) => void
}

export interface UserData {
  data: {
    id?: number
    name?: string
    email: string
    image?: string
  }
  error?: any
  isLoading?: boolean
  mutate?: any
}

export interface EditUserProps {
  name: string
  email: string
}

export interface User {
  id: string
  name: string
  email: string
  image: string
  createdAt?: string
  updatedAt?: string
}

export interface UserValues {
  id?: number
  name: string
  email: string
  password: string
  emailVerified?: boolean
  image?: string
}

export interface LoginValues {
  id?: number
  name?: string
  email: string
  password: string
  image?: string
}

export interface StatusProps {
  NOT_AUTH: string
  LOADING: string
  AUTH: string
}

export interface BluetoothDevice {
  readonly id: string
  readonly name: string | undefined
  readonly gatt: BluetoothRemoteGATTServer | null
  readonly uuids: string[]
  readonly connected: boolean
}
