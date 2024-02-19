
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

type Course = {
  title: string
  href?: string
  url?: string
}

export default function CoursesNavigation({ courses, title }: { courses: Course[], title: string }) {
  return (

    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{title}</NavigationMenuTrigger>
          <NavigationMenuContent>

            {courses.map((course) => (
              <NavigationMenuItem className="hover:bg-chinook-50
               px-4
               py-2
               block
             ">
                <a href={course.href !== undefined ? course.href : course.url} target="_blank" rel="noopener noreferrer" >
                  {course.title}
                </a>
              </NavigationMenuItem>
            ))}


          </NavigationMenuContent>
        </NavigationMenuItem>

      </NavigationMenuList>
    </NavigationMenu>

  )
}
