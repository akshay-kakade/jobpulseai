import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.action";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { Skeleton } from "@/components/ui/skeleton";

// Component to fetch and display feedback header information
const FeedbackHeader = async ({ id }: { id: string }) => {
  const interview = await getInterviewById(id);
  if (!interview) redirect("/");
  
  return (
    <div className="flex flex-row justify-center">
      <h1 className="text-4xl font-semibold">
        Feedback on the Interview -{" "}
        <span className="capitalize">{interview.role}</span> Interview
      </h1>
    </div>
  );
};

// Component to fetch and display feedback details
const FeedbackDetails = async ({ id, userId }: { id: string, userId: string }) => {
  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: userId ?? "",
  });

  if (!feedback) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <p>No feedback available for this interview yet.</p>
        <Button className="btn-primary mt-4">
          <Link href={`/interview/${id}`} className="flex w-full justify-center">
            <p className="text-sm font-semibold text-black text-center">
              Take Interview
            </p>
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-row justify-center ">
        <div className="flex flex-row gap-5">
          {/* Overall Impression */}
          <div className="flex flex-row gap-2 items-center">
            <Image src="/star.svg" width={22} height={22} alt="star" />
            <p>
              Overall Impression:{" "}
              <span className="text-primary-200 font-bold">
                {feedback.totalScore}
              </span>
              /100
            </p>
          </div>

          {/* Date */}
          <div className="flex flex-row gap-2">
            <Image src="/calendar.svg" width={22} height={22} alt="calendar" />
            <p>
              {feedback.createdAt
                ? dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A")
                : "N/A"}
            </p>
          </div>
        </div>
      </div>

      <hr />

      <p>{feedback.finalAssessment}</p>

      {/* Interview Breakdown */}
      <div className="flex flex-col gap-4">
        <h2>Breakdown of the Interview:</h2>
        {feedback.categoryScores?.map((category, index) => (
          <div key={index}>
            <p className="font-bold">
              {index + 1}. {category.name} ({category.score}/100)
            </p>
            <p>{category.comment}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <h3>Strengths</h3>
        <ul>
          {feedback.strengths?.map((strength, index) => (
            <li key={index}>{strength}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-3">
        <h3>Areas for Improvement</h3>
        <ul>
          {feedback.areasForImprovement?.map((area, index) => (
            <li key={index}>{area}</li>
          ))}
        </ul>
      </div>

      <div className="buttons">
        <Button className="btn-secondary flex-1">
          <Link href="/" className="flex w-full justify-center">
            <p className="text-sm font-semibold text-primary-200 text-center">
              Back to dashboard
            </p>
          </Link>
        </Button>

        <Button className="btn-primary flex-1">
          <Link
            href={`/interview/${id}`}
            className="flex w-full justify-center"
          >
            <p className="text-sm font-semibold text-black text-center">
              Retake Interview
            </p>
          </Link>
        </Button>
      </div>
    </>
  );
};

// Loading fallback for the header
const HeaderLoading = () => (
  <div className="flex flex-row justify-center">
    <Skeleton className="h-10 w-3/4 max-w-lg" />
  </div>
);

// Loading fallback for the feedback details
const FeedbackLoading = () => (
  <>
    <div className="flex flex-row justify-center">
      <div className="flex flex-row gap-5">
        <div className="flex flex-row gap-2 items-center">
          <Skeleton className="w-6 h-6 rounded-full" />
          <Skeleton className="w-48 h-6" />
        </div>
        <div className="flex flex-row gap-2">
          <Skeleton className="w-6 h-6 rounded-full" />
          <Skeleton className="w-40 h-6" />
        </div>
      </div>
    </div>

    <hr className="my-6" />

    <Skeleton className="w-full h-16 mb-6" />

    <div className="flex flex-col gap-4 mb-6">
      <Skeleton className="w-64 h-8 mb-2" />
      
      {Array(5).fill(0).map((_, index) => (
        <div key={`category-${index}`} className="mb-4">
          <Skeleton className="w-48 h-6 mb-2" />
          <Skeleton className="w-full h-4 mb-1" />
          <Skeleton className="w-3/4 h-4" />
        </div>
      ))}
    </div>

    <div className="flex flex-col gap-3 mb-6">
      <Skeleton className="w-32 h-6 mb-2" />
      <ul>
        {Array(3).fill(0).map((_, index) => (
          <li key={`strength-${index}`} className="mb-2">
            <Skeleton className="w-full h-4" />
          </li>
        ))}
      </ul>
    </div>

    <div className="flex flex-col gap-3 mb-6">
      <Skeleton className="w-48 h-6 mb-2" />
      <ul>
        {Array(3).fill(0).map((_, index) => (
          <li key={`improvement-${index}`} className="mb-2">
            <Skeleton className="w-full h-4" />
          </li>
        ))}
      </ul>
    </div>

    <div className="buttons">
      <Skeleton className="w-full h-10 rounded-full mb-2" />
      <Skeleton className="w-full h-10 rounded-full" />
    </div>
  </>
);

const Feedback = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await getCurrentUser();

  return (
    <section className="section-feedback">
      <Suspense fallback={<HeaderLoading />}>
        <FeedbackHeader id={id} />
      </Suspense>

      <Suspense fallback={<FeedbackLoading />}>
        <FeedbackDetails id={id} userId={user?.id ?? ""} />
      </Suspense>
    </section>
  );
};

export default Feedback;