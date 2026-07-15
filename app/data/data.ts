import { IconType } from "react-icons"
import { RiInfinityLine } from "react-icons/ri";
import { TiMessage, TiShoppingCart } from "react-icons/ti";
import { MdOutlineLocationOn , MdOutlineInventory, MdBolt  } from "react-icons/md";
import { GrAnalytics } from "react-icons/gr";

import { IoPerson, IoShapes, IoShieldCheckmark } from "react-icons/io5";
import { Home } from "lucide-react";
import { FcAbout } from "react-icons/fc";
import { FaHeadset, FaPhoneAlt } from "react-icons/fa";
import { CiHome, CiLock } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
interface gridProps{
  icon:IconType
  fill? : string,
  title:string,
  description:string,
  indepth?:string
}
/* interface PriceProps{
 title:string,
 duration:string,
 features:string[],
 price:number
} */
 export const serviceGrid = [
  {
    icon : RiInfinityLine,
   title:"Seamless Client Interaction",
   description:"Get in Contact with your client by chatting with them so as to meet up to their desired needs" 
  },
  {
    icon : TiShoppingCart,
   title:"Ordering",
   description:"An automated system for your clients to make orders for your services in a specified to location" 
  },
  {
      icon :MdOutlineLocationOn,
   title:"Food delivery Tracking",
   description:"Track and monitor delivery progress until goods get from manufacturer to the consumer" 
  },
  {
    icon : MdOutlineInventory ,
   title:"Inventory Management",
   description:"Management your products with ease without the friction of complexity" 
  },
  {
      icon : GrAnalytics,
   title:"Sales Analytics",
   description:"Monitor and track sales with your device" 
  },
  {
      icon : IoPerson,
   title:"Customer Management",
   description:"See your recent customers and view business history with them as well" 
  }
 ] 
export const DropItems = [
    {
      title : "Seamless client Interaction",
      link : "#",
    },
    {
      title : "Food delivery tracking",
      link : "#",
    },
    {
      title : "Inventory Management",
      link : "#",
    },
    {
      title : "Ordering System",
      link : "#",
    },
    {
      title : "Sales Analytics",
      link : "#",
    },
    {
      title : "Customer Management",
      link : "#",
    },

  ]
  export const gridItems:gridProps[] = [
    {
      icon:CiLock,
      fill:" #FAA0A0",
     title :  "Confidentiality",
     description:"Your data shared with us are safe and secured"
    },
    {
      icon :IoShieldCheckmark,
      fill:"#228B22",
      title:"Reliability",
      "description":"You can always rely on our team for efficent managment of your task",
    },
    {
      icon:MdBolt,
      fill:"#FFFF8F",
      title:"Speed",
      description:"Our solutions are lightweight which makes processes fast and accurate"
    },
    {
      icon:FaHeadset,
      fill:"#008AA4",
      title:"Availability",
      description:"Our strong team of developers are always at an armslength to give you proper support"
    }
  ]
  export const priceData = [
      {
    plan :"starter",
     title : "M0-STARTER",
     price:5000,
     duration:"Per month", 
     description:"perfect for small restaurants",
     features:["Basic automation","Inventory Management","Ordering"]
      },
      {
      plan : "growth",
      title:"M1-GROWTH",
      price: 20000,
      duration:"Per Month",
          description:"designed for growing businesses",
      features:["Chat Systems","Sales Analytics","Team Support","Food delivery Tracking"]
      },
      {
        plan:"enterprise",
       title:"M2-ENTERPRISE",
       price: 50000,
           description:"for large scale restaurants",
       duration:"Per Month",
       features:["Dedicated Admin Manager" , " Full Team Tools" , "Unlimited monthly reporting","Dedicated developer support","Advanced Security"]
      }
    ]
    export const footerItems = [
      {
           title:"Home",
      },
      {
             title:"About",
      },
          {
               title:"Pricing",
      },
      {
        
         title:"Contact Us",
      },
      {
               title:"FAQ",
      },
  
    ]

  export  const faqs = [
  {
    question: "How does the restaurant management system work?",
    answer:
      "Our platform centralizes inventory, reservations, orders, customer management and business analytics into one intuitive dashboard accessible from anywhere."
  },
  {
    question: "Can multiple staff members access the dashboard?",
    answer:
      "Yes. Assign custom roles and permissions for managers, waiters, cashiers and administrators while maintaining complete security."
  },
  {
    question: "Does it support real-time analytics?",
    answer:
      "Absolutely. Revenue, orders, inventory movement and customer insights update instantly so you always know how your restaurant is performing."
  },
  {
    question: "Can I manage multiple restaurant branches?",
    answer:
      "Yes. Monitor all branches from one dashboard while viewing reports individually or collectively."
  },
  {
    question: "Is my business data secure?",
    answer:
      "Every piece of information is encrypted with enterprise-grade security while automatic backups ensure your restaurant data remains protected."
  },
  {
    question: "Can customers reserve tables online?",
    answer:
      "Yes. Customers can reserve tables online while your staff manages availability directly from the dashboard."
  }
];