import { Link } from '@inertiajs/react'
import { footerData } from '@/config/footerConfig'

const Footer = () => {
    return (
        <div className="footer relative flex flex-col gap-3 bg-white
                        h-fit pt-8 sm:pt-10 lg:pt-12 pb-6 sm:pb-8 mx-auto w-full">
            <div className="container footer-main flex flex-col lg:flex-row justify-between
                             mx-auto mb-8 gap-10 lg:gap-0 lg:mb-4 w-[90%]">
                <div className="footer-col w-full lg:w-[22%] flex flex-col gap-5
                                sm:gap-6 lg:gap-7 text-center lg:text-left">
                    <Link className="logo bg-transparent hover:bg-transparent border-0 font-satoshi
                                     font-extrabold transition-all duration-300 text-[28px]
                                     md:text-[30px] text-black"
                          href={'/'}>
                        {footerData.brandInfo.name}
                    </Link>
                    <p className="font-satoshi font-normal text-sm leading-relaxed
                                  tracking-normal text-black opacity-70 max-w-sm mx-auto lg:mx-0">
                        {footerData.brandInfo.description}
                    </p>
                    <div className="social-media-row flex justify-center lg:justify-start gap-5 sm:gap-6">
                        {footerData.socialLinks.map((social) => (
                            <a key={social.name}
                               href={social.href}
                               className="social-media-icon text-black overflow-hidden hover:text-gray-600
                                          transition-colors p-2 -m-2"
                               aria-label={social.name}>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     className="w-6 h-6"
                                     fill="currentColor"
                                     viewBox="0 0 16 16">
                                    <path d={social.icon} />
                                </svg>
                            </a>
                        ))}
                    </div>
                </div>
                <div className="footer-col w-full lg:w-[70%] grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-8 text-center">
                    {footerData.columns.map((column) => (
                        <div key={column.title} className="footer-col-item flex flex-col gap-3">
                            <h3 className="font-satoshi font-semibold text-black text-base tracking-[1px] sm:tracking-[2px]">
                                {column.title}
                            </h3>
                            <ul className="flex flex-col gap-1">
                                {column.links.map((link) => (
                                    <li key={link.label}>
                                        <Link href={link.href}
                                              className="font-satoshi font-normal text-sm leading-relaxed
                                                         tracking-normal text-black opacity-70
                                                         hover:opacity-90 transition-opacity inline-block py-1">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <div className="rights-footer w-[90%] sm:w-[85%] mx-auto flex justify-center items-center pt-3">
                <div className='text-sm sm:text-base text-black opacity-70 text-center'>
                    &copy; {footerData.copyright.text}
                    {footerData.copyright.showYear && ` - ${new Date().getFullYear()}`}, All rights reserved
                </div>
            </div>
        </div>
    )
}

export default Footer
