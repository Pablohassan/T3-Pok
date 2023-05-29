import { SignInButton, useUser} from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";


import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";

import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import Image from "next/image";
dayjs.extend(relativeTime)

const CreatePostWizard = () => {
  const {user} = useUser()

  if(!user) return null
  console.log(user)

  return (
  
  <div className="flex w-full gap-3">
  <Image
  src={user.profileImageUrl} 
  alt="Profile image" 
  className="h-16 w-16 rouded-full" 
  height={56}
  width={56}
  />
  <input placeholder="Type some emojis" className="bg-transparent"/>
  </div>
  )
}

type PostWithUser = RouterOutputs["posts"]["getAll"][number]

const PostView =(props: PostWithUser) => {

  const {post, author} = props
return(
  <div key={post.id} className="flex border-b border-slate-400 p-4 gap-3">
    <Image 
    src={author.profilePictrue} 
    className="h-14 rounded-full" 
    alt={`@${author.username}'s`}
    height={56}
    width={56}
    />
    <div className="flex flex-col">
      <div className="flex gap-1 text-slate-300">
      <span>{`@${author?.username}`}</span>
       <span>{` . ${dayjs(post.createdAt).fromNow()}`}</span>
      
      </div> 
      <span>{post.content}</span>
      </div>
      </div>
      
 
)
}

const Home: NextPage = () => {
 
const user = useUser();
const {data, isLoading} = api.posts.getAll.useQuery()

if (isLoading) return <div>Loading...</div>

if(!data) return <div>data missing</div>
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen justify-center">
    <div className="h-full w-full border-x border-slate-400 md:max-w-2xl "> 
      <div className="`flex border-b border-slate-400 p-4">
      {!user.isSignedIn && (
      <div className="flex justify-center">
        <SignInButton />
        </div> 
        )}
      {!!user.isSignedIn && <CreatePostWizard /> }
      </div>
     <div className="flex flex-col">
      {[...data, ...data]?.map((fullPost)=>(
      <PostView {...fullPost} key={fullPost.post.id}/>
      ))}
     </div>
     </div>
      </main>
    </>
  );
};

export default Home;
