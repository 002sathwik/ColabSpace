import Image from 'next/image'
import React from 'react'

interface HomeCardProps {
    bgcolor: string;
    imgSrc: string;
    Heading: string;
    Description: string;
    handelClick:()=> void ;
  }
  
  const HomeCard: React.FC<HomeCardProps> = ({ bgcolor, imgSrc, Heading, Description, handelClick }) => {
  return (
        <div  onClick={handelClick}  className={`bg-gradient-to-r ${bgcolor} p-5 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105`}>
        <div className="flex-center glass  size-12 rounded-[10px]">
          <Image
            src={imgSrc}
            alt="Meeting"
            width={27}
            height={27}
          />
        </div>
        <div className="flex  flex-col gap-2">
          <h1 className="text-2xl font-bold  text-white">{Heading}</h1>
          <p className="text-md  font-semibold text-gray-100">{Description}</p>
        </div>
      </div>
  )
}

export default HomeCard