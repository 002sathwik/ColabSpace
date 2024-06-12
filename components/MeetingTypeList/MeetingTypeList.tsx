"use client ";
import React, { useState } from "react";
import HomeCard from "../utils/Homecard/HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "../MeetingModal/MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";

import { useToast } from "../ui/use-toast";
const MeetingTypeList = () => {
  const { toast } = useToast();
  const router = useRouter();

  const [MeetingState, setMeetingState] = useState<
    "isScheduleMeeting " | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();
  const [values, setvalues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setCallDetails] = useState<Call>();

  const { user } = useUser();

  const client = useStreamVideoClient();

  const createMeeting = async () => {
    if (!client || !user) return;
    try {
      if (!values.dateTime) {
        toast({
          variant: "destructive",
          title: "Please select a date and  time",
        });
        return;
      }

      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create call");
      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCallDetails(call);
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
        toast({
          title: "New meeting created",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Failed to create meeting",
      });
    }
  };

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        bgcolor=" from-yellow-500 to-indigo-600"
        imgSrc="/icons/add-meeting.svg"
        Heading=" Create New Meeting"
        Description="Start instant meeting"
        handelClick={() => setMeetingState("isInstantMeeting")}
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
        isOpen={MeetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handelClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;
