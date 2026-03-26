"use client";

interface SearchUserProps {
  id: number;
  username: string;
  avatar: string;
}

export default function SearchUserCard({
  id,
  username,
  avatar,
}: SearchUserProps) {
  return (
    <div className="card card-side bg-white bg-base-100 shadow-sm w-xs cursor-pointer hover:shadow-2xl transition-shadow">
      <figure className="figure w-full">
        <img src={avatar} alt="User avatar image" />
      </figure>
      <div className="card-body w-xs">
        <h2 className="card-title flex text-black items-center justify-center ">
          @{username}
        </h2>
      </div>
    </div>
  );
}
