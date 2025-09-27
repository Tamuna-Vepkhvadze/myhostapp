type InputType = "text" | "email" | "password" | "tel" | "file";


export interface inputeType {
    name: string,
    type:InputType,
    label:string,
    placeholder:string
}
export interface validationType{
    email:string,
    password:string
}

export interface registUzerType {
    firstName: string,
    lastName: string,
    image?: string | null
    phone:string,
    email:string,
    password:string,
    confirmPassword:string
}

export interface loginUzerType extends registUzerType {
    id:string,

}

export interface TipType {
  icon: string
  text: string
}

export interface ActivityType {
  image: string
  title: string
  description: string
}
export interface WorkAuthor  {
  key: string; // "/authors/OL23919A"
  name?: string;
};

export interface Work  {
  key: string; // "/works/OL12345W"
  title: string;
  cover_id?: number;
  edition_count?: number;
  first_publish_year?: number;
  authors?: WorkAuthor[];
  subject?: string[];
};

export interface AuthorWork {
  key: string; // "/works/OLxxxxW"
  title: string;
  covers?: number[];
  first_publish_year?: number;
};

export interface WorkDetail {
  title: string;
  description?: string | { value: string };
  subjects?: string[];
  covers?: number[];
  first_publish_date?: string;
  links?: { title?: string; url?: string }[];
  authors?: { author: { key: string; name?: string } }[];
  key?: string; // "/works/OLxxxxW"
};

export interface WechselnPasvordType {
  oldPassword: string
  newPassword: string
}

export interface ChangePasswordSchemaType extends WechselnPasvordType{
  confirmPassword: string
}

export interface EditType {
    firstName: string,
    lastName: string,
    image?: string | null
    phone:string,
}