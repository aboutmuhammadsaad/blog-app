
import {Card, CardContent} from '@/components/ui/card';
import { simpleBlogCard } from '@/lib/interface';
import {client, urlFor} from "@/lib/sanity";
import Image from "next/image";
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const revalidate = 36 // revalidate at every 30 sec

async function getData(){
  const query = `
  *[_type=='blog'] | order(_createdAt desc){
    title,
    smallDescription,
    "currentSlug":slug.current,
    titleImage,
  }`;
  
  const data= await client.fetch(query);
  return data
}


export default async function Home() {
  const data:simpleBlogCard[] = await getData();
  // console.log(data);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5">
      {data.map((post: any ,idx: any)=>(
        <Card key={idx}>
          <Image 
          src={urlFor(post.titleImage).url()} 
          alt='Blog Image' 
          width={500} 
          height={500}
          className='rounded-t-lg h-[500px] object-cover'
          />
          <CardContent className='mt-5'>
            <h3 className='text-lg line-clamp-2'>{post.title}</h3>
            <p className='line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-300'>{post.smallDescription}</p>
          </CardContent>
          <Button asChild className='w-full mt-3'>
            <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
          </Button>
        </Card>
      ))}
     
    </div>
  );
}
