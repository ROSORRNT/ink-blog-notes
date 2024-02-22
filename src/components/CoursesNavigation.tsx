import type { Course } from "@/types/types"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "./ui/navigation-menu"

export default function CoursesNavigation({ courses, title }: { courses: Course[], title: string }) {

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{title}</NavigationMenuTrigger>
          <NavigationMenuContent >
            {courses.map((course) => (
              <NavigationMenuItem key={course.title} className="hover:bg-chinook-50 px-4 py-2 block text-left ">
                {
                  course.href !== undefined ? (
                    <NavigationMenuLink className="no-underline" href={course.href}>{course.title}</NavigationMenuLink>
                  ) : (
                    <a className="no-underline" href={course.url} target="_blank" rel="noopener noreferrer" >
                      {course.title}
                    </a>
                  )
                }
              </NavigationMenuItem>
            ))}


          </NavigationMenuContent>
        </NavigationMenuItem>

      </NavigationMenuList>
    </NavigationMenu>

  )
}
