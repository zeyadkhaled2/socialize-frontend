'use client';
import AddPost from "@/components/AddPost";
import Feed from "@/components/Feed";
import Navbar from "@/components/Navbar";
import UserInfo from "@/components/UserInfo";
import { useGlobalContext } from "@/store";
import { useEffect } from "react";
import LoginPage from "./login/page";
import axios from "axios";
import Sponsored from "@/components/Sponsor";
import FriendList from "@/components/FriendList";
import PeopleYouMayKnow from "@/components/PeopleYouMayKnow";


export default function Home() {
  const { user, token, setPosts } = useGlobalContext();




  if (user === null) {
    return <LoginPage />
  }

  return (
    <div className="bg-slate-950 h-full">
      <Navbar />
      <div className="flex flex-row">
        <UserInfo className="flex-none w-4/12 " />
        <div className="flex flex-col align-center w-5/12 ">
          <AddPost className="flex-none " />
          <Feed className="flex-grow" />
        </div>
        <div className="flex flex-col w-4/12 h-1/2">
          <Sponsored className="flex-none" />
          <PeopleYouMayKnow className="flex-none w-full" />
          <FriendList className="flex-none w-full" />
        </div>
      </div>
    </div>
  );
}
