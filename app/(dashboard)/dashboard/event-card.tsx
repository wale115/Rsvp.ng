"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ShareButtons from "./share-buttons";
import DeleteButton from "./delete-button";

type Counts = { going: number; maybe: number; declined: number; total: number };

type Props = {
  id: string;
  slug: string;
  title: string;
  status: string;
  counts: Counts;
};

export default function EventCard({ id, slug, title, status, counts }: Props) {
  const router = useRouter();

  return (
    <div className="block bg-white border border-gray-100 p-4 rounded-2xl hover:shadow-lg transition-shadow">
      {/* Clickable main body navigates to the public event page */}
      <div
        className="cursor-pointer"
        onClick={() => router.push(`/e/${slug}`)}
      >
        <div className="flex justify-between items-start">
          <div>
            <p className="font-semibold">{title}</p>
            <p className="text-sm text-gray-500">{status}</p>
          </div>
          <div className="text-right text-sm">
            <p className="font-medium text-brand">{counts.total} response{counts.total !== 1 ? "s" : ""}</p>
            <p className="text-gray-500">
              {counts.going} going · {counts.maybe} maybe · {counts.declined} declined
            </p>
          </div>
        </div>
      </div>
      {/* Action row — links are top-level anchors, no nesting */}
      <div className="flex justify-between items-center mt-2">
        <ShareButtons slug={slug} />
        <div className="flex gap-3 items-center">
          <Link href={`/dashboard/${id}/edit`} className="text-xs text-gray-600 underline">
            Edit
          </Link>
          <Link href={`/dashboard/${id}/guests`} className="text-xs text-blue-600 underline">
            View Guests
          </Link>
          <DeleteButton id={id} />
        </div>
      </div>
    </div>
  );
}
