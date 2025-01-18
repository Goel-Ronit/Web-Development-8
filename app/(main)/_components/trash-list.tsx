"use client";

import { Doc, Id } from "@/convex/_generated/dataModel";
import ItemTrash from "./item-trash";
import { FileIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";
import Item from "./item";

interface TrashListProps {
    parentDocumentId?: Id<"documents">;
    level?: number;
    data?: Doc<"documents">[];
    search: string;
}

const TrashList = ({
    parentDocumentId,
    level=0,
    search,
}:TrashListProps) => {
    const router = useRouter();
    const params = useParams();
    const documents = useQuery(api.documents.getTrash, {
        parentDocument: parentDocumentId
    });
    const restore = useMutation(api.documents.restore);
    const remove = useMutation(api.documents.remove);

    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    const onExpand = (documentId: string) => {
        setExpanded(prevExpanded => ({
            ...prevExpanded,
            [documentId]: !prevExpanded[documentId]
        }));
    };

    const filteredDocuments = documents?.filter((document) => {
        return document.title.toLowerCase().includes(search.toLowerCase());
    })

    const onClick = (documentId: string) => {
        router.push(`/documents/${documentId}`);
    };

    const onRestore = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        documentId: Id<"documents">,
    ) => {
        event.stopPropagation();
        const promise = restore({id: documentId});

        toast.promise(promise, {
            loading: "Restoring note...",
            success: "Note restored!",
            error: "Failed to restore note."
        });
    };
    const onRemove = (
        documentId: Id<"documents">,
    ) => {
        const promise = remove({id: documentId});

        toast.promise(promise, {
            loading: "Deleting note...",
            success: "Note deleted!",
            error: "Failed to delete note."
        });

        if (params.documentId === documentId) {
            router.push("/documents");
        }
    };

    if (documents === undefined) {
        return (
            <>
                <Item.Skeleton level={level}/>
                {level === 0 && (
                    <>
                        <Item.Skeleton level={level}/>
                        <Item.Skeleton level={level}/>
                    </>
                )}
            </>
        );
    }
    return ( 
        <div>
            <p className="hidden last:block text-xs text-center text-muted-foreground">
                No Documents Found
            </p>
            {filteredDocuments?.map((document) => (
                <div key={document._id}>
                    <ItemTrash
                        id={document._id}
                        onClick={() => onClick(document._id)}
                        label={document.title}
                        icon={FileIcon}
                        documentIcon={document.icon}
                        active={params.documentId === document._id}
                        level={level}
                        onExpand={() => onExpand(document._id)}
                        expanded={expanded[document._id]}
                        onRestore={(e) => onRestore(e, document._id)}
                        onRemove={() => onRemove(document._id)}
                    />
                {expanded[document._id] && (
                    <TrashList
                        parentDocumentId={document._id}
                        level={level+1}
                        search={search}
                    />
                )}
                </div>
            ))}
        </div>
     );
}
 
export default TrashList;