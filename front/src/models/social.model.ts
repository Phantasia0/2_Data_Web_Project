import { User } from "./user.model";

export interface SocialData {
  activity: Social[];
  total: number;
}

export interface Social {
  _id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: User[];
  likeCount: number;
  commentCount: number;
}

export interface SocialOne {
  _id: string;
  user: User;
  content: string;
  createdAt: string;
  updatedAt: string;
  likes: User[];
}
