import { AccountInterface } from "./account.interface";
import { TagInterface } from "./tag.interface";

export interface BlogInterface {
  id: number,
  title: string,
  metaDescription: string,
  content: string,
  photoURL: string,
  account: AccountInterface
  tag: TagInterface
  createdAt: Date
}