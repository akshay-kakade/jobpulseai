import Image from "next/image";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import Agent from "@/components/Agent";
import { getRandomInterviewCover } from "@/lib/utils";

import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.action";
import { getCurrentUser } from "@/lib/actions/auth.action";
import DisplayTechIcons from "@/components/DisplayTechIcons";
import { Skeleton } from "@/components/ui/skeleton";

// Component to fetch and display interview header information
const InterviewHeader = async ({ id }: { id: string }) => {
  const interview = await getInterviewById(id);
  if (!interview) redirect("/");
  
  return (
    <div className="flex flex-row gap-4 justify-between">
      <div className="flex flex-row gap-4 items-center max-sm:flex-col">
        <div className="flex flex-row gap-4 items-center">
          <Image
            src={getRandomInterviewCover()}
            alt="cover-image"
            width={40}
            height={40}
            className="rounded-full object-cover size-[40px]"
          />
          <h3 className="capitalize">{interview.role} Interview</h3>
        </div>

        <DisplayTechIcons techStack={interview.techstack} />
      </div>

      <p className="bg-dark-200 px-4 py-2 rounded-lg h-fit">
        {interview.type}
      </p>
    </div>
  );
};

// Component to fetch and display the interview agent
const InterviewAgent = async ({ id, user }: { id: string, user: any }) => {
  const interview = await getInterviewById(id);
  if (!interview) redirect("/");

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id ?? "",
  });

  return (
    <Agent
      userName={user?.name ?? "Guest"}
      userId={user?.id}
      interviewId={id}
      type="interview"
      questions={interview.questions}
      feedbackId={feedback?.id}
    />
  );
};

// Loading fallback for the header
const HeaderLoading = () => (
  <div className="flex flex-row gap-4 justify-between">
    <div className="flex flex-row gap-4 items-center max-sm:flex-col">
      <div className="flex flex-row gap-4 items-center">
        <Skeleton className="rounded-full size-[40px]" />
        <Skeleton className="h-6 w-48" />
      </div>

      <div className="flex flex-row">
        <Skeleton className="w-8 h-8 rounded-full" />
        <Skeleton className="w-8 h-8 rounded-full -ml-3" />
        <Skeleton className="w-8 h-8 rounded-full -ml-3" />
      </div>
    </div>

    <Skeleton className="w-24 h-10 rounded-lg" />
  </div>
);

// Loading fallback for the agent
const AgentLoading = () => (
  <div className="mt-8 flex flex-col items-center justify-center p-8 rounded-lg bg-dark-200/30">
    <Skeleton className="w-16 h-16 rounded-full mb-4" />
    <Skeleton className="w-48 h-6 mb-2" />
    <Skeleton className="w-64 h-4" />
    <div className="mt-8 w-full max-w-md">
      <Skeleton className="w-full h-12 rounded-full mb-4" />
      <Skeleton className="w-full h-12 rounded-full" />
    </div>
  </div>
);

const InterviewDetails = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await getCurrentUser();

  return (
    <>
      <Suspense fallback={<HeaderLoading />}>
        <InterviewHeader id={id} />
      </Suspense>

      <Suspense fallback={<AgentLoading />}>
        <InterviewAgent id={id} user={user} />
      </Suspense>
    </>
  );
};

export default InterviewDetails;