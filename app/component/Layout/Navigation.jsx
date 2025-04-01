import Link from 'next/link'

const navItem = [
    {
        title: "Home",
        href: "/"
    },
    {
        title: "Blog",
        href: "/blog"
    },
    {
        title: "Vendors",
        href: "/vendors"
    },
    {
        title: "Let's Swipe",
        href: "/swipe"
    },
    {
        title: "Locate Us",
        href: "/locate"
    },
    {
        title: "Join Us",
        href: "/join"
    },
    {
        title: "Support Us",
        href: "/support"
    },

]

const Navigation = ({activeItem})=>{
    return(
        <div className="block md:flex" >
            {
                navItem.map((item , index)=>(
                    <Link href={item.href} className="" key={item.title} >
                        <h5 className={`md:px-4 xl:px-8 py-2 text-[18px] font-[500] font-Inter ${activeItem === index  && 'text-orange-500'}  `} >
                            {item.title}
                        </h5>
                    
                    </Link>
                ))
            }
        </div>
    )
}

export default Navigation