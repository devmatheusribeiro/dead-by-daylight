import { Image } from "../../../shared/interfaces/image.interface"

export interface Characters {
  id: string
  name: string
  role: Role
  image: Image
}

export interface Role {
  id: string
  name: string
}
