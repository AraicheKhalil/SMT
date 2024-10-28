import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AppContext } from "@/context/AppContext"
import { LogOut, Settings, User } from "lucide-react"
import { useContext } from "react"


export default function UserProfileDrop() {
  const { auth } = useContext(AppContext);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-2 px-1 py-1.5">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://www.upwork.com/profile-portraits/c1RmQ96SDoNkbNt96V28_LolSWvXt6CI27WMlXsFaK29dxY3BMm6FdDDnVoYctOwnx" alt="@johndoe" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <span className="hidden md:block text-sm font-medium">{auth?.user?.name} {auth?.user?.lastname}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}