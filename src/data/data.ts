export const getImageUrls = async () => {
  const response = await fetch('https://api.github.com/repos/ROSORRNT/img-data/contents/animals');
  const files = await response.json();
  const animalImagesUrl: { [key: string]: string } = {};

  files.forEach((file: any) => {
    const name = file.name.split('.')[0]; // Get the name of the animal from the file name
    let url = file.download_url; // Get the download URL of the file
    url = url.replace('blob/', 'raw/'); // Replace 'blob/' with 'raw/' in the URL
    animalImagesUrl[name] = url;
  });

  console.log(animalImagesUrl);
};

export const courses = {
  ewdCourses: [
    {
      title: "Full Stack Foundations",
      href: "/posts/full-stack-foundations",
    },
    {
      title: "Web Form",
      href: "/posts/web-form",
    },
    {
      title: "Data Modeling",
      href: "/posts/data-modeling",
    },
  ],
  femCourses: [
    {
      title: "TypeScript Path",
      url: "https://www.typescript-training.com/course/fundamentals-v4",
    },
    {
      title: "Vite Workshop",
      url: "https://vite-workshop.vercel.app/introduction",
    },
    {
      title: "Basics of Go",
      url: "https://frontendmasters.com/courses/go-basics/",
    },
  ],
  eggCourses: [
    {
      title: "Script Kit Showcase",
      url: "https://www.scriptkit.com/tutorials/automation-workflows-for-web-developers/scriptkit-showcase/scripting-hacker-news",
    },
    {
      title: "React Testing Library",
      url: "https://egghead.io/courses/an-introduction-to-the-react-testing-library-42204aaa?af=8mci9b",
    },
    {
      title: "Mock Service Worker",
      url: "https://egghead.io/courses/mock-rest-and-graphql-apis-with-mock-service-worker-8d471ece",
    },
  ],
  animalPrefix: [
    "ai",
    "cheval",
    "herison",
    "owl",
    "oi",
  ],
};

export const ewdCourses = [
  {
    title: "Full Stack Foundations",
    href: "/posts/full-stack-foundations",
  },
  {
    title: "Web Form",
    href: "/posts/web-form",
  },
  {
    title: "Data Modeling",
    href: "/posts/data-modeling",
  },
]

export const femCourses = [
  {
    title: "TypeScript Path",
    url: "https://www.typescript-training.com/course/fundamentals-v4",
  },
  {
    title: "Vite Workshop",
    url: "https://vite-workshop.vercel.app/introduction",
  },
  {
    title: "Basics of Go",
    url: "https://frontendmasters.com/courses/go-basics/",
  },
]

export const eggCourses = [
  {
    title: "Script Kit Showcase",
    url: "https://www.scriptkit.com/tutorials/automation-workflows-for-web-developers/scriptkit-showcase/scripting-hacker-news",
  },
  {
    title: "React Testing Library",
    url: "https://egghead.io/courses/an-introduction-to-the-react-testing-library-42204aaa?af=8mci9b",
  },
  {
    title: "Mock Service Worker",
    url: "https://egghead.io/courses/mock-rest-and-graphql-apis-with-mock-service-worker-8d471ece",
  },
]

export const animalPrefix = [
  "ai",
  "cheval",
  "herison",
  "owl",
  "oi",
]

export const animalImagesUrl = {
  owl: "https://raw.githubusercontent.com/ROSORRNT/img-data/main/animals/owl.png",
};


