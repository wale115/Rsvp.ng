"use client";
import Link from "next/link";
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
  return (
    <Link href={`/e/${slug}`} className="block border p-4 rounded-xl hover:shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold">{title}</p>
          <p className="text-sm text-gray-500">{status}</p>
        </div>
        <div className="text-right text-sm">
          <p className="font-medium">{counts.total} response{counts.total !== 1 ? "s" : ""}</p>
          <p className="text-gray-500">
            {counts.going} going · {counts.maybe} maybe · {counts.declined} declined
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-2">
        <ShareButtons slug={slug} />
        <div className="flex gap-3 items-center">
          <Link
            href={`/dashboard/${id}/edit`}
            onClick={(ev) => ev.stopPropagation()}
            className="text-xs text-gray-600 underline"
          >
            Edit
          </Link>
          <Link
            href={`/dashboard/${id}/guests`}
            onClick={(ev) => ev.stopPropagation()}
            className="text-xs text-blue-600 underline"
          >
            View Guests
          </Link>
          <DeleteButton id={id} />
        </div>
      </div>
    </Link>
  );
}
