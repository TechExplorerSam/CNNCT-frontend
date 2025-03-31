import React, { useEffect } from 'react'
import SidebarStyles from './Sidebar.module.css';
import { NavLink } from 'react-router-dom';
import Buttons from './Buttons';
import { useState } from'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import SidebarResponsive from './Sidebarresponsive';
const Sidebar = () => {
  const navigate = useNavigate();
 const location = useLocation();
 const pathname=location.pathname;
 let buttoncolorstyle='btn_sidebar_create';
  const handleclickoncreatebutton = () =>{
    navigate('/UserEventCreation')
  }
  const createbuttoncolorchange=()=>{
    if(pathname=='/UserEventCreation'){
        buttoncolorstyle='btn_sidebar_create2'

    }
  }
  const signout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/');
  }
 const currentusername=localStorage.getItem('username');
const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }
  , []);

  
  if (isMobile) {
    return <SidebarResponsive />;
  }
  
  return (
    <div className={SidebarStyles.sidebar}>
      <div className={SidebarStyles.sidebar_logo_container}>
        <img src='logo_1.png' alt=''>
      </img>
      <h1 style={{backgroundColor:'transparent'}}>CNNCT</h1>
    </div>
    <div className={SidebarStyles.sidebar_links_container}>
      <ul style={{backgroundColor:'transparent',listStyleType:'none'}}>
        <li className={SidebarStyles.sidebar_links}>
          <NavLink to='/UserDashboard' style={{display:'flex'} } > <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 8C5.752 8 4 9.752 4 12C4 14.248 5.752 16 8 16H10C10.2652 16 10.5196 16.1054 10.7071 16.2929C10.8946 16.4804 11 16.7348 11 17C11 17.2652 10.8946 17.5196 10.7071 17.7071C10.5196 17.8946 10.2652 18 10 18H8C4.648 18 2 15.352 2 12C2 8.648 4.648 6 8 6H10C10.2652 6 10.5196 6.10536 10.7071 6.29289C10.8946 6.48043 11 6.73478 11 7C11 7.26522 10.8946 7.51957 10.7071 7.70711C10.5196 7.89464 10.2652 8 10 8H8ZM13 7C13 6.73478 13.1054 6.48043 13.2929 6.29289C13.4804 6.10536 13.7348 6 14 6H16C19.352 6 22 8.648 22 12C22 15.352 19.352 18 16 18H14C13.7348 18 13.4804 17.8946 13.2929 17.7071C13.1054 17.5196 13 17.2652 13 17C13 16.7348 13.1054 16.4804 13.2929 16.2929C13.4804 16.1054 13.7348 16 14 16H16C18.248 16 20 14.248 20 12C20 9.752 18.248 8 16 8H14C13.7348 8 13.4804 7.89464 13.2929 7.70711C13.1054 7.51957 13 7.26522 13 7ZM7 12C7 11.7348 7.10536 11.4804 7.29289 11.2929C7.48043 11.1054 7.73478 11 8 11H16C16.2652 11 16.5196 11.1054 16.7071 11.2929C16.8946 11.4804 17 11.7348 17 12C17 12.2652 16.8946 12.5196 16.7071 12.7071C16.5196 12.8946 16.2652 13 16 13H8C7.73478 13 7.48043 12.8946 7.29289 12.7071C7.10536 12.5196 7 12.2652 7 12Z" fill="#676767"/>
</svg>
Events</NavLink>

        </li>
        <li className={SidebarStyles.sidebar_links} >
          <NavLink to='/UserBookings' style={{display:'flex'}} > <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
<path d="M14.5 18C13.8 18 13.2083 17.7583 12.725 17.275C12.2417 16.7917 12 16.2 12 15.5C12 14.8 12.2417 14.2083 12.725 13.725C13.2083 13.2417 13.8 13 14.5 13C15.2 13 15.7917 13.2417 16.275 13.725C16.7583 14.2083 17 14.8 17 15.5C17 16.2 16.7583 16.7917 16.275 17.275C15.7917 17.7583 15.2 18 14.5 18ZM3 22V4H6V2H8V4H16V2H18V4H21V22H3ZM5 20H19V10H5V20ZM5 8H19V6H5V8Z" fill="#676767"/>
</svg>
Bookings</NavLink>
        </li>
        <li className={SidebarStyles.sidebar_links}>
          <NavLink to='/UserAvailability'style={{display:'flex'}}> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8626 7.46392 19.1997 6.47177 18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3C9.61305 3 7.32387 3.94821 5.63604 5.63604C3.94821 7.32387 3 9.61305 3 12C3 14.3869 3.94821 16.6761 5.63604 18.364C7.32387 20.0518 9.61305 21 12 21ZM23 12C23 18.075 18.075 23 12 23C5.925 23 1 18.075 1 12C1 5.925 5.925 1 12 1C18.075 1 23 5.925 23 12ZM15 16.414L11 12.414V5.5H13V11.586L16.414 15L15 16.414Z" fill="#676767"/>
</svg>
Availability</NavLink>

        </li>
        <li className={SidebarStyles.sidebar_links}>
          <NavLink to='/UserProfile'style={{display:'flex'}}> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.7776 0C13.6687 0 14.5348 0.340524 15.1558 0.932387C15.7756 1.52773 16.1178 2.34429 16.0917 3.17243C16.0942 3.35891 16.1601 3.57434 16.2796 3.76314C16.4775 4.07586 16.7898 4.29593 17.1607 4.38627C17.5316 4.47198 17.9198 4.42566 18.2496 4.24381C19.8426 3.39713 21.8699 3.90444 22.7796 5.37542L23.5549 6.62516C23.5748 6.65875 23.5922 6.69118 23.6072 6.72477C24.431 8.17374 23.881 9.99797 22.3502 10.8308C22.1275 10.95 21.947 11.1168 21.8226 11.3184C21.6297 11.6299 21.5762 12.0006 21.6732 12.3411C21.7728 12.6886 22.0105 12.977 22.3453 13.1553C23.1007 13.5596 23.6644 14.2406 23.8897 15.0271C24.1149 15.8124 23.9917 16.6648 23.5524 17.3679L22.7261 18.6489C21.8164 20.1037 19.7891 20.6075 18.2123 19.7597C18.002 19.6473 17.7593 19.5859 17.5179 19.5801H17.5104C17.1507 19.5801 16.7811 19.7226 16.5123 19.9716C16.2398 20.2253 16.0904 20.5635 16.0929 20.9225C16.0842 22.624 14.5971 24 12.7776 24H11.2183C9.39009 24 7.90293 22.6171 7.90293 20.9156C7.90044 20.7059 7.83572 20.4882 7.71501 20.2994C7.51962 19.982 7.20352 19.755 6.83888 19.6647C6.47674 19.5743 6.07974 19.6241 5.75369 19.8002C4.97215 20.2056 4.05247 20.304 3.21119 20.084C2.37116 19.8627 1.64562 19.3253 1.22 18.613L0.442193 17.3656C-0.467531 15.8969 0.073823 14.0148 1.64935 13.1669C2.09612 12.9272 2.37365 12.4801 2.37365 12.0006C2.37365 11.5211 2.09612 11.0728 1.64935 10.8331C0.0725785 9.9806 -0.467531 8.09382 0.440948 6.62516L1.28471 5.33604C2.18199 3.8836 4.21052 3.37165 5.79227 4.21717C6.00756 4.33647 6.24153 4.3967 6.47923 4.39902C7.25454 4.39902 7.90293 3.80368 7.91537 3.07167C7.91039 2.26437 8.25263 1.4895 8.87612 0.90459C9.5021 0.320834 10.3334 0 11.2183 0H12.7776ZM12.7776 1.73737H11.2183C10.8325 1.73737 10.4716 1.87752 10.199 2.13001C9.92771 2.38367 9.77962 2.72072 9.78211 3.07977C9.75597 4.77313 8.26881 6.13638 6.46802 6.13638C5.89058 6.13059 5.33429 5.98581 4.85143 5.7171C4.17318 5.35804 3.2871 5.57927 2.89011 6.22209L2.04759 7.51122C1.6618 8.13436 1.89825 8.95787 2.58521 9.32967C3.60445 9.87867 4.24038 10.9026 4.24038 12.0006C4.24038 13.0986 3.60445 14.1213 2.58272 14.6715C1.89949 15.0398 1.66304 15.8587 2.05879 16.4957L2.84406 17.7559C3.0382 18.0814 3.35555 18.3165 3.72267 18.4126C4.08856 18.5076 4.49177 18.4671 4.82778 18.2933C5.32185 18.0235 5.8968 17.8833 6.47425 17.8833C6.75924 17.8833 7.04423 17.9169 7.32299 17.9864C8.16427 18.1972 8.89479 18.7207 9.32787 19.4238C9.60912 19.8651 9.76469 20.3805 9.76966 20.9063C9.76966 21.6592 10.4193 22.2626 11.2183 22.2626H12.7776C13.5728 22.2626 14.2225 21.6627 14.2262 20.9225C14.2212 20.1048 14.5647 19.3276 15.1932 18.7427C15.8129 18.1659 16.6791 17.8196 17.5453 17.8428C18.1127 17.8555 18.6591 17.998 19.1407 18.2528C19.8339 18.6223 20.7187 18.4022 21.1194 17.7652L21.9458 16.483C22.13 16.1876 22.1835 15.817 22.0852 15.4753C21.9881 15.1336 21.7442 14.8371 21.4156 14.6622C20.6465 14.2499 20.0977 13.5851 19.87 12.7882C19.6447 12.0064 19.7679 11.1527 20.2072 10.4497C20.4935 9.98639 20.9128 9.59606 21.4156 9.32735C22.0901 8.96019 22.3266 8.13899 21.9346 7.49964C21.9184 7.47416 21.9035 7.44752 21.891 7.41972L21.1617 6.24294C20.7648 5.60012 19.8812 5.37889 19.188 5.74606C18.4388 6.15839 17.5477 6.27653 16.6915 6.06689C15.8366 5.86072 15.1197 5.35688 14.673 4.64572C14.3867 4.20095 14.2312 3.68322 14.2262 3.15622C14.2374 2.7601 14.0881 2.40452 13.8168 2.14391C13.5467 1.88447 13.1671 1.73737 12.7776 1.73737ZM12.0034 8.07772C14.3269 8.07772 16.2173 9.83825 16.2173 12.0007C16.2173 14.1631 14.3269 15.9214 12.0034 15.9214C9.67994 15.9214 7.78955 14.1631 7.78955 12.0007C7.78955 9.83825 9.67994 8.07772 12.0034 8.07772ZM12.0034 9.81509C10.7091 9.81509 9.65629 10.7961 9.65629 12.0007C9.65629 13.2053 10.7091 14.184 12.0034 14.184C13.2977 14.184 14.3505 13.2053 14.3505 12.0007C14.3505 10.7961 13.2977 9.81509 12.0034 9.81509Z" fill="#676767"/>
</svg>
Settings</NavLink>
        </li>
       
      </ul>
      
      </div>
      {
        createbuttoncolorchange()
      }
      
      <Buttons buttontext='Create' typeofstyle={buttoncolorstyle} buttonactionfunction={handleclickoncreatebutton}>
      

      </Buttons>
      
      <Buttons buttontext={currentusername} typeofstyle='btn_sidebar_dispalyusername'>

      </Buttons>
      <Buttons buttontext='Sign out' typeofstyle='btn_sidebar_logout' className="btn_sidebar_logout" buttonactionfunction={signout}>
        </Buttons>

      </div>
      
      
  )
}

export default Sidebar