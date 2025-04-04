import Image from "next/image";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import { Button } from "../ui/button";
import { navlinks } from "@/constants/constant";
import { NavLink, NavProps } from "@/types/type";
import Link from "next/link";
// import { FaBars, FaTimes } from "react-icons/fa";

const SideDrawer = () => {
  return (
    <Drawer direction="left" >
      <DrawerTrigger asChild>
        <Button variant="outline">
          <Image src="/menu.svg" alt="menu" width={20} height={20} />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <div className="flex justify-between items-center">
              <DrawerTitle>Investment</DrawerTitle>
              <DrawerClose asChild>
                <Button variant="ghost">
                  <Image src="/close.svg" alt="menu" width={20} height={20} />
                </Button>
              </DrawerClose>
            </div>
            {/* <DrawerDescription>Set your daily activity goal.</DrawerDescription> */}
          </DrawerHeader>
          <nav className="ps-2 pt-8">
            <ul className="flex flex-col gap-2 space-x-4">
              {navlinks.map((link: NavLink) =>
                <li key={link.path} className=" border-b-2  py-1 px-2 mx-3 border-black transition">
                  <Link href={link.path} className="block py-1  ">
                    {link.name}
                  </Link>
                </li>
              )}
            </ul>
          </nav>
          <DrawerFooter>
            {/* <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose> */}
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default SideDrawer;
