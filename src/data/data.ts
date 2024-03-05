import type { LearningResource } from "@/types/types";

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

export const learningResources: LearningResource[] = [
  {
    displayName: "Epic Web Dev",
    courses: [
      {
        title: "Full Stack Foundations",
        href: "/posts/workshop-resume/epic-web-dev/fullstack-foundations",
      },
      {
        title: "Web Form",
        href: "/posts/workshop-resume/epic-web-dev/web-form",
      },
      {
        title: "Data Modeling",
        href: "/posts/workshop-resume/epic-web-dev/data-modeling",
      },
    ]
  },
  {
    displayName: "F-E Masters",
    courses: [
      {
        title: "TypeScript Path",
        url: "https://www.typescript-training.com/course/fundamentals-v4",
      },
      {
        title: "Vite Workshop",
        url: "https://vite-workshop.vercel.app/introduction",
      },
      {
        title: "Tailwind Workshop",
        url: "https://tailwind-workshop.vercel.app/utility-first",
      },
      
    ]
  },
  {
    displayName: "Primeagen",
    courses: [
      {
        title: "JS Performance",
        url: "https://theprimeagen.github.io/fem-jsperf/",
      },
      {
        title: "Dev Productivity",
        url: "https://theprimeagen.github.io/dev-productivity/",
      },
      {
        title: "Into HTMX",
        url: "https://theprimeagen.github.io/fem-htmx/",
      },
      {
        title: "VIM",
        url: "https://theprimeagen.github.io/vim-fundamentals/",
      },
    ]
  },
  {
    displayName: "M Firtman",
    courses: [
      {
        title: "Web Data Storage",
        url: "https://firtman.github.io/browser-storage/",
      },
      {
        title: "Web Auth",
        url: "https://firtman.github.io/authentication",
      },
      {
        title: "Js Patterns",
        url: "https://firtman.github.io/vanilla/",
      },
    ]
  },
  {
    displayName: "Build UI",
    courses: [
      {
        title: "Radix UI",
        url: "https://buildui.com/courses/advanced-radix-ui",
      },
      {
        title: "Tailwind CSS",
        url: "https://buildui.com/courses/tailwind-mastery",
      },
      {
        title: "Framer Motion",
        url: "https://buildui.com/courses/framer-motion-recipes",
      },
    ]
  },
  {
    displayName: "Egghead",
    courses: [
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
  }

];

export const animalPrefix = [
  "ai",
  "cheval",
  "oi",
  "an",
  "peni",
  "herison",
]

export const animalImagesUrl = {
  owl: "https://raw.githubusercontent.com/ROSORRNT/img-data/main/animals/owl.png",
};


