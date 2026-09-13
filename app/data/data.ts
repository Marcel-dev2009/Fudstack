import { IconType } from "react-icons"
import { RiInfinityLine } from "react-icons/ri";
import {TiShoppingCart } from "react-icons/ti";
import { MdOutlineLocationOn , MdOutlineInventory, MdBolt  } from "react-icons/md";
import { GrAnalytics } from "react-icons/gr";
import {

  TrendingUp,
  ShoppingCart,
  Package,
  Wallet,
  Home,
  UtensilsCrossed,
  User,
  Cog,
  Bell,
  BarChart3,
  Lightbulb,
  Headset,
  Zap,
  ShieldCheck,
  
} from "lucide-react";
import { IoPerson, IoShieldCheckmark } from "react-icons/io5";
import { FaHeadset} from "react-icons/fa";
import { CiLock } from "react-icons/ci";


export const serviceGrid = [
  {
    id: "client-interaction",
    icon: RiInfinityLine,
    title: "Seamless Client Interaction",
    description:
      "Get in contact with your clients by chatting with them directly to cater to their desired needs in real-time.",
    details: [
      "Instant live messaging channel for customer support",
      "Automated automated response triggers for frequently asked queries",
      "Custom interaction history logging & staff notes assignment",
    ],
    featured: true,
  },
  {
    id: "ordering",
    icon: TiShoppingCart,
    title: "Ordering System",
    description:
      "An automated system for your clients to make orders for your services at specified locations.",
    details: [
      "Custom digital menus & dynamic pricing tables",
      "Instant checkout integration with automated receipt generation",
      "Direct kitchen and bar order dispatching logic",
    ],
    featured: false,
  },
  {
    id: "delivery-tracking",
    icon: MdOutlineLocationOn,
    title: "Food Delivery Tracking",
    description:
      "Track and monitor delivery progress until goods reach from kitchen to consumer.",
    details: [
      "Real-time GPS mapping & ETA estimation",
      "Automated SMS dispatch notifications for customers",
      "Rider route optimization to ensure food arrives warm",
    ],
    featured: false,
  },
  {
    id: "inventory",
    icon: MdOutlineInventory,
    title: "Inventory Management",
    description:
      "Manage your products with ease without the friction of complexity.",
    details: [
      "Real-time stock level depletion tracking per order",
      "Automated low-stock threshold alerts for essential ingredients",
      "Vendor purchase order generation & batch tracking",
    ],
    featured: false,
  },
  {
    id: "analytics",
    icon: GrAnalytics,
    title: "Sales Analytics",
    description:
      "Monitor and track sales performance directly from your primary dashboard.",
    details: [
      "Visual revenue trends & peak operational hour heatmaps",
      "Item popularity reports to identify bestsellers",
      "Exportable financial summaries for accounting integration",
    ],
    featured: false,
  },
  {
    id: "customer-management",
    icon: IoPerson,
    title: "Customer Management",
    description:
      "See your recent customers and view business history with them as well.",
    details: [
      "Customer lifetime value calculation & visit frequency stats",
      "Loyalty rewards & automated promotional campaign targeting",
      "Direct feedback collection and satisfaction scoring",
    ],
    featured: false,
  },
]
export const DropItems = [
    {
      title : "Seamless client Interaction",
      link : "/docs",
    },
    {
      title : "Food delivery tracking",
      link : "/docs",
    },
    {
      title : "Inventory Management",
      link : "/docs",
    },
    {
      title : "Ordering System",
      link : "/docs",
    },
    {
      title : "Sales Analytics",
      link : "/docs",
    },
    {
      title : "Customer Management",
      link : "/docs",
    },

  ]
  export interface GridItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: IconType;
  badge: string;
  metrics: { label: string; value: string };
  accentColor: string;
  badgeColor: string;
}
  export const gridItemsData: GridItem[] = [
  {
    id: "confidentiality",
    title: "Confidentiality",
    subtitle: "Data Protection",
    description: "Strict end-to-end encryption & zero-knowledge data isolation protocols.",
    icon: CiLock,
    badge: "SOC2 Type II",
    metrics: { label: "Encryption", value: "AES-256" },
    accentColor: "from-amber-500/20 via-orange-500/10 to-transparent",
    badgeColor: "text-amber-400 bg-amber-400/10 border-amber-400/20"
  },
  {
    id: "reliability",
    title: "Reliability",
    subtitle: "Consistent Performance",
    description: "Guaranteed SLA uptime with fail-safe redundant node clusters.",
    icon: ShieldCheck,
    badge: "99.99% Uptime",
    metrics: { label: "Availability SLA", value: "99.99%" },
    accentColor: "from-emerald-500/20 via-teal-500/10 to-transparent",
    badgeColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20"
  },
  {
    id: "speed",
    title: "Speed",
    subtitle: "Ultra Low Latency",
    description: "Lightning-fast request execution and real-time edge processing.",
    icon: Zap,
    badge: "< 50ms Edge",
    metrics: { label: "Response Time", value: "32ms Avg" },
    accentColor: "from-cyan-500/20 via-blue-500/10 to-transparent",
    badgeColor: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20"
  },
  {
    id: "availability",
    title: "Availability",
    subtitle: "Always On Support",
    description: "24/7 dedicated technical monitoring & rapid resolution teams.",
    icon: Headset,
    badge: "24/7 Support",
    metrics: { label: "First Response", value: "< 5 Mins" },
    accentColor: "from-purple-500/20 via-indigo-500/10 to-transparent",
    badgeColor: "text-purple-400 bg-purple-400/10 border-purple-400/20"
  }
];
  interface PriceProps{
   trend:string,
   fill:string,
   title:string,
   price:number,
   duration:string,
   description:string,
   features:string[],
   className:string
  }
  export const priceData:PriceProps[] = [
      {
    trend :"starter",
     fill:"bg-purple-400 p-2 rounded-full",
     title : "M0-STARTER",
     price:5000,
     duration:"month", 
     className:"hover:border-brand-burn/50  hover:scale-108 transition-all duration:0.2 ease-in-out",
     description:"perfect for small restaurants",
     features:["Basic automation","Inventory Management","Ordering"]
      },
      {
      trend : "popular",
     fill:"bg-purple-400/50 p-2 rounded-full",
      title:"M1-GROWTH",
      price: 20000,
      className:"border-brand-burn/50 bg-brand-apricot/50 hover:scale-105 transition-all duration:0.2 ease-in-out shadow-md",
      duration:"month",
          description:"designed for growing restaurants",
      features:["Chat Systems","Sales Analytics","Team Support","Food delivery Tracking"]
      },
      {
      trend:"enterprise",
  fill:"bg-purple-400 p-2 rounded-full",
      title:"M2-ENTERPRISE",
      price: 50000,
      description:"for large scale restaurants",
       duration:"month",
       className:" hover:border-brand-burn/50  hover:scale-108 transition-all duration:0.2 ease-in-out",
       features:["Dedicated Admin Manager" , " Full Team Tools" , "Unlimited monthly reporting","Dedicated developer support","Advanced Security"]
      }
    ]
    export const footerItems = [
      {
           title:"Home",
           href:"#"
      },
      {
             title:"About",
              href:"#"
      },
          {
        title:"Pricing",
         href:"#"
      },
      {
        
         title:"Contact Us",
          href:"#"
      },
      {
          title:"FAQ",
          href:"#"
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

export const summaryCards = [
  {
    title: "Total live sales value",
    value: "111,076",
    icon: TrendingUp,
    tone: "bg-blue-50 text-blue-500",
    change: "↑ 2.15%",
  },
  {
    title: "Total value orders",
    value: "2,022",
    icon: ShoppingCart,
    tone: "bg-pink-50 text-pink-500",
    change: "↓ 2.15%",
  },
  {
    title: "Total waste value",
    value: "413",
    icon: Package,
    tone: "bg-orange-50 text-orange-500",
    change: "↓ 2.15%",
  },
  {
    title: "Total events cost",
    value: "2,022",
    icon: Wallet,
    tone: "bg-purple-50 text-purple-500",
    change: "↑ 2.15%",
  },
];
export const days = [
  { id: "mon", label: "Monday", short: "Mon" },
  { id: "tue", label: "Tuesday", short: "Tue" },
  { id: "wed", label: "Wednesday", short: "Wed" },
  { id: "thu", label: "Thursday", short: "Thu" },
  { id: "fri", label: "Friday", short: "Fri" },
  { id: "sat", label: "Saturday", short: "Sat" },
  { id: "sun", label: "Sunday", short: "Sun" },
];

export const weeklyData: Record<string, number[]> = {
  mon: [20, 38, 30, 50, 42, 62, 55],
  tue: [35, 25, 48, 42, 68, 55, 72],
  wed: [18, 42, 35, 58, 48, 70, 63],
  thu: [30, 46, 38, 65, 52, 74, 69],
  fri: [25, 40, 55, 45, 72, 66, 82],
  sat: [42, 32, 50, 62, 55, 78, 70],
  sun: [28, 45, 40, 58, 65, 60, 76],
};

export const navItems = [
    {
      id:"0",
      name: "Dashboard",
      icon: Home,
      route: "/agent/dashboard",
    },
    {
      id:"1",
      name: "Restaurants",
      icon: UtensilsCrossed,
      route: "/agent/dashboard/restaurants",
      dropdown: false,
    },
    {
       id:"2",
      name: "Profile",
      icon: User,
        route: "/agent/dashboard/profile",
      dropdown: false,
    },
    {
       id:"3",
      name: "Sales",
        route: "/agent/dashboard/sales",
      icon: BarChart3,
    },
    {
       id:"4",
      name: "Insights",
      icon: Lightbulb,
        route: "/agent/dashboard/insights",
      dropdown: false,
          
    },
    {
       id:"5",
      name: "Notifications",
      icon: Bell,
      route: "/agent/dashboard/notifications",
      dropdown: false,
          
    },
    {
       id:"6",
      name: "Settings",
      icon: Cog,
      route: "/agent/dashboard/settings",
      dropdown: false,
    },
  ];