
import {client, urlFor} from "@/lib/sanity"
import { fullBlogCard } from '@/lib/interface';
import Image from "next/image";
import { PortableText } from "@portabletext/react";

async function getData(slug: string){
    const query = `
    *[_type=="blog" && slug.current=="${slug}"]{
        "currentSlug":slug.current,
        title,
        content,
        titleImage,
    }[0]`;
    const data = await client.fetch(query);
    return data;
}


export default async function BlogArticle({params}:{params: {slug: string}} ){
    const data:fullBlogCard =await getData(params.slug);
    // console.log(data);
    return (
        <div>
            <h1>
                <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">Saad Blog</span>
                <span className="mt-3 block text-3xl text-center leading-8 font-bold tracking-wide sm:4xl">{data.title}</span>
            </h1>
            <div>
                <Image 
                src={urlFor(data.titleImage).url()}
                width={300}
                height={300}
                alt="Title image"
                priority
                className="rounded-lg mt-8 border"
                />
                <div className="mt-10 prose prose-blue prosw-xl dark:prose-invert">
                    <PortableText value={data.content}/>
                </div>
            </div>
        </div>
    )
}