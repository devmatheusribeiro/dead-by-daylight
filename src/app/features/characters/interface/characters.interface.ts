import { Image } from "../../../shared/interfaces/image.interface"

export interface ICharacters {
  id: string
  name: string
  role: IRole
  image: Image
}

export interface IRole {
  id: string
  name: string
}
