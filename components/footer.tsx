import { socials } from "@/constants";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#0d0e10]  mt-10 rounded-2xl text-white w-full">
      <div className="container rounded-2xl items-center justify-center mx-auto py-3 px-3">
        <div className="flex w-full flex-col md:flex-row justify-center items-center">
          
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <p className="text-xs cursor-pointer hover:underline transition-all duration-300">
              Privacy Policy
            </p>
            <p className="text-xs cursor-pointer hover:underline transition-all duration-300">
              Terms of Use
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-center gap-4 mt-2">
          {socials.map(({ id, url, icon, title }) => (
            <div key={id} className="hover:scale-110 transition-transform duration-300">
              <a href={url} target="_blank" rel="noopener noreferrer" className="block w-8 h-8">
                <Image
                  src={icon}
                  alt={title}
                  height={32}
                  width={32}
                  className="object-contain"
                />
              </a>
            </div>
          ))}
        </div>
        <div className="flex items-center  justify-center gap-4">
            <p className="text-sm opacity-70">
              &copy; 2025 Akshay Kakade & Maverick Jones
            </p>
          </div>
      </div>
    </footer>
  );
};

export default Footer;
