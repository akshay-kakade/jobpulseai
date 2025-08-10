import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import InterviewCard from "@/components/InterviewCard";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { getInterviewsByUserId, getLatestInterviews } from "@/lib/actions/general.action";
import { Suspense } from "react";
import SkeletonInterviewCard from "@/components/SkeletonInterviewCard";

// Component to fetch and display user interviews
const UserInterviews = async ({ userId }: { userId: string }) => {
  const userInterviews = await getInterviewsByUserId(userId);
  const hasPastInterviews = userInterviews?.length! > 0;

  return (
    <div className="interviews-section">
      {hasPastInterviews ? (
        userInterviews?.map((interview) => (
          <InterviewCard
            key={interview.id}
            userId={userId}
            interviewId={interview.id}
            role={interview.role}
            type={interview.type}
            techstack={interview.techstack}
            createdAt={interview.createdAt}
          />
        ))
      ) : (
        <p>You haven&apos;t taken any interviews yet</p>
      )}
    </div>
  );
};

// Component to fetch and display all available interviews
const AvailableInterviews = async ({ userId }: { userId: string }) => {
  const allInterview = await getLatestInterviews({ userId });
  const hasUpcomingInterviews = allInterview?.length! > 0;

  return (
    <div className="interviews-section">
      {hasUpcomingInterviews ? (
        allInterview?.map((interview) => (
          <InterviewCard
            key={interview.id}
            userId={userId}
            interviewId={interview.id}
            role={interview.role}
            type={interview.type}
            techstack={interview.techstack}
            createdAt={interview.createdAt}
          />
        ))
      ) : (
        <p>There are no interviews available</p>
      )}
    </div>
  );
};

// Loading fallback for interview sections
const InterviewsLoading = () => (
  <div className="interviews-section">
    {Array(3).fill(0).map((_, index) => (
      <SkeletonInterviewCard key={`skeleton-${index}`} />
    ))}
  </div>
);

export default async function Home() {
  const user = await getCurrentUser();
  return (
    <>
        <section className="card-cta">
          <div className="flex flex-col gap-6 max-w-lg">
            <h2>
              Get Interview ready with AI-Powered Practice & Feedback
            </h2>
            <p className="text-lg">
             Practice on real interview questions & get instant feedback 
              </p>

              <Button asChild className="btn-primary max-sm:w-full">
                <Link href="/interview">
                  Start an Interview </Link>
              </Button>
          </div>
          <Image
          src="/robot.png"
          alt="robot"
          width={200}
          height={100}
          className="max-sm:hidden overflow-hidden"
          />
        </section>

        <section>
          <h2 className="flex flex-col gap-6 mt-8">
            Your Interviews
          </h2>

          {user?.id ? (
            <Suspense fallback={<InterviewsLoading />}>
              <UserInterviews userId={user.id} />
            </Suspense>
          ) : (
            <p>Please sign in to view your interviews</p>
          )}
        </section>

        <section className="mt-8 flex flex-col gap-6">
          <h2>Take an Interview </h2>
          
          {user?.id ? (
            <Suspense fallback={<InterviewsLoading />}>
              <AvailableInterviews userId={user.id} />
            </Suspense>
          ) : (
            <p>Please sign in to view available interviews</p>
          )}
        </section>
    </>
  );
}
