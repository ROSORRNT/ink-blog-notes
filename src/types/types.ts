export type BlogResource = {
  name: string
  url: string
}

export type Course = {
  title: string
  href?: string
  url?: string
}

export type LearningResource = {
  displayName: string;
  courses: Course[];
};
