

import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems, SidebarLogo } from "flowbite-react";
import { BiBuoy } from "react-icons/bi";
import { HiArrowSmRight, HiChartPie, HiInbox, HiOutlineCloudUpload, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import userImg from "../assets/profile.jpg"
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
const SideBar = () => {
  const {user} = useContext(AuthContext)
    return(
        <div color="white">
        <Sidebar >
        <SidebarLogo  href="#" img={userImg} imgAlt="Flowbite logo" >
       <p >
        {
          user?.displayName || "Admin"
        }
       </p>
        </SidebarLogo>
      <SidebarItems>
        <SidebarItemGroup>
          <SidebarItem href="/admin/dashboard" icon={HiChartPie}>
            Dashboard
          </SidebarItem>
          <SidebarItem href="/admin/dashboard/Upload" icon={HiOutlineCloudUpload}>
            Uploadbook
          </SidebarItem>
          <SidebarItem href="/admin/dashboard/ManageBook" icon={HiInbox}>
            ManageBook
          </SidebarItem>
          <SidebarItem href="#" icon={HiUser}>
            Users
          </SidebarItem>
          <SidebarItem href="#" icon={HiShoppingBag}>
            Materials
          </SidebarItem>
          <SidebarItem href="/login" icon={HiArrowSmRight}>
            Sign In
          </SidebarItem>
          <SidebarItem href="/logout" icon={HiTable}>
          Log Out
          </SidebarItem>
        </SidebarItemGroup>
       {/* <SidebarItemGroup>
          <SidebarItem href="#" icon={HiChartPie}>
            Upgrade to Pro
          </SidebarItem>
          <SidebarItem href="#" icon={HiViewBoards}>
            Documentation
          </SidebarItem>
          <SidebarItem href="#" icon={BiBuoy}>
            Help
          </SidebarItem>
        </SidebarItemGroup>*/}
      </SidebarItems>
    </Sidebar>
    </div>
    )
}
export default SideBar