import { fetchUser, getActivity } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  // Get Activity
  const activity = await getActivity(userInfo._id);

  return (
    <section>
      <h1 className="head-text mb-10">Activity</h1>
      <section className="mt-10 flex flex-col gap-5">
        {activity.length > 0 ? (
          <>
            {activity.map((activity) => (
              <Link key={activity._id} href={`/thread/${activity.parentId}`}>
                <article className="activity-card">
                  <div className="relative w-5 h-5 rounded-full overflow-hidden">
                    <Image
                      src={activity.author.image}
                      alt="Profile Picture"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="flex gap-1 !text-small-regular text-light-1">
                    <span className="text-primary-500">
                      {activity.author.name}
                    </span>{" "}
                    replied your thread
                  </p>
                </article>
              </Link>
            ))}
          </>
        ) : (
          <p className="no-result">No Activity Yet</p>
        )}
      </section>
    </section>
  );
}
