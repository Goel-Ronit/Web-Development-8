"use client";

import Error from "@/app/error";
import Cover from "@/components/cover";
import Toolbar from "@/components/toolbar";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import dynamic from "next/dynamic";
import { useMemo } from "react";

interface DocumentPagePreviewProps {
    id : Id<"documents">;
    preview: boolean;
};
const DocumentPagePreview = ({
    id, 
    preview
}: DocumentPagePreviewProps) => {
    const Editor = useMemo(() => dynamic(() => import("@/components/editor"), {ssr: false}),[]);
    const document = useQuery(api.documents.getById, {
        documentId: id
    });

    const update = useMutation(api.documents.update);

    const onChange = (content: string) => {
        update({
            id: id,
            content
        });
    };

    if (document === undefined) {
        return (
            <div>
                <Cover.Skeleton />
                <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
                    <div className="space-y-4 pl-8 pt-4">
                        <Skeleton className="h-14 w-[50%]"/>
                        <Skeleton className="h-4 w-[80%]"/>
                        <Skeleton className="h-4 w-[40%]"/>
                        <Skeleton className="h-4 w-[60%]"/>
                    </div>
                </div>
            </div>
        )
    }

    if (document === null || !document.isPublished) {
        return (
            <div className="pt-[280px]">
                <Error />
            </div>
        )
    }
    return ( 
        <div className="pb-40">
            <Cover preview={preview} url={document.coverImage} />
            <div className="md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl mx-auto">
                <Toolbar preview={preview} initialData={document}/>
                <Editor
                    editable={!preview}
                    onChange={onChange}
                    initialContent={document.content}
                />
            </div>
        </div>
     );
}
 
export default DocumentPagePreview;