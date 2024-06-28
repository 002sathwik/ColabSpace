"use client ";
import React, { useState } from "react";
import HomeCard from "../utils/Homecard/HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "../MeetingModal/MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import ReactDatePicker from 'react-datepicker';
import { useToast } from "../ui/use-toast";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Loader from "../Loder/Loder";
const MeetingTypeList = () => {
  const { toast } = useToast();
  const router = useRouter();

  const [MeetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
    >(undefined);
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
  
  if (!client || !user) return <Loader />;

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;


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
        handelClick={() => setMeetingState("isScheduleMeeting")}
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
      {!callDetails ? (
        <MeetingModal
          isOpen={MeetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          handelClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Add a description
            </label>
            <Textarea
              className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) =>
                setvalues({ ...values, description: e.target.value })
              }
            />
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <Label className="text-base font-normal leading-[22.4px] text-sky-2">
              Select Date and Time
            </Label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setvalues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-3 p-2 focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={MeetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          handelClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: 'Link Copied' });
          }}
          image={'/icons/checked.svg'}
          buttonIcon="/icons/copy.svg"
          className="text-center"
          buttonText="Copy Meeting Link"
        />
      )}

      <MeetingModal
        isOpen={MeetingState === 'isJoiningMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Type the link here"
        className="text-center"
        buttonText="Join Meeting"
        handelClick={() => router.push(values.link)}
      >
        <Input
          placeholder="Meeting link"
          onChange={(e) => setvalues({ ...values, link: e.target.value })}
          className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </MeetingModal>

      <MeetingModal
        isOpen={MeetingState === 'isInstantMeeting'}
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
