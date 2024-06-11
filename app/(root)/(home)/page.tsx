"use client";
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import TimeDisplay from "@/components/TimeDisplay/TimeDisplay";
import DateDisplay from "@/components/DateDisplay/DateDisplay";
import MeetingTypeList from "@/components/MeetingTypeList/MeetingTypeList";

const Home = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <section className="flex size-full flex-col gap-10 ">
      <div className="flex  h-[300px] rounded-md  bg-hero bg-cover border border-white-3">
        <div className="flex h-full  flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <div className=" flex flex-row justify-between gap-2 ">
            <h2 className="glass p-2 rounded-md   ">
              Upcomming Meeting at:12:30 PM
            </h2>
            <Dialog>
              <DialogTrigger className="text-white bg-blue-1 p-2 rounded-lg ">
                Calender
              </DialogTrigger>
              <DialogContent className="flex items-center justify-center bg-dark-1">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border bg-dark-2 text-white"
                />
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className=" text-4xl font-extrabold lg:text-7xl text-white">
              <TimeDisplay />
            </h1>
            <p className="text-lg font-bold text-white text-sky-1 lg:text-2xl">
              <DateDisplay />
            </p>
          </div>
        </div>
      </div>
      <MeetingTypeList/>
    </section>
  );
};

export default Home;
