import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Navbar: React.FC = () => {
  return (
    <>
        <nav className="w-full shadow-md py-3 sticky top-0">
          <NavigationMenu className="max-w-6xl mx-auto flex justify-between items-center">

            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink href="/">
                  <h1 className="font-bold text-3xl">LOGO</h1>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>

            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/"
                  className={navigationMenuTriggerStyle()}
                >
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/vote"
                  className={navigationMenuTriggerStyle()}
                >
                  Vote
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>

            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/login"
                  className={navigationMenuTriggerStyle()}
                >
                  Login
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/register"
                  className={navigationMenuTriggerStyle()}
                >
                  Register
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>

          </NavigationMenu>
        </nav>
    </>
  );
};

export default Navbar;
