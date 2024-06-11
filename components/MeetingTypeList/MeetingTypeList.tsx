"use client ";
import React, { useState } from "react";
import HomeCard from "../utils/Homecard/HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "../MeetingModal/MeetingModal";

const MeetingTypeList = () => {
  const router = useRouter();
  const [MeetingState, setMeetingState] = useState<
    "isScheduleMeeting " | "isJoiningMeeting" | 'isInstantMeeting' | undefined
  >();

  const  createMeeting=()=>{
 
  }
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        bgcolor=" from-yellow-500 to-indigo-600"
        imgSrc="/icons/add-meeting.svg"
        Heading=" Create New Meeting"
        Description="Start instant meeting"
        handelClick={() => setMeetingState('isInstantMeeting')}
      />
      <HomeCard
        bgcolor="from-fuchsia-900 to-indigo-600"
        imgSrc="/icons/join-meeting.svg"
        Heading="Join  New Meeting"
        Description="via invitation link"
        handelClick={() => setMeetingState("isJoiningMeeting")}
      />
      <HomeCard
        bgcolor="from-emerald-500 to-indigo-600"
        imgSrc="/icons/schedule.svg"
        Heading="Schedule Meeting"
        Description="plan your meeting"
        handelClick={() => setMeetingState("isScheduleMeeting ")}
      />
      <a href="/recordings">
        <HomeCard
          bgcolor="from-rose-900 to-indigo-600"
          imgSrc="/icons/recordings.svg"
          Heading="View Recordings"
          Description="checkout your  past"
          handelClick={() => router.push("/recordings")}
        />
      </a>
      <MeetingModal
       isOpen={MeetingState === 'isInstantMeeting'}
       onClose={()=>setMeetingState(undefined)}
       title ="Start an Instant Meeting"
       className="text-center"
       buttonText="Start Meeting"
       handelClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;
