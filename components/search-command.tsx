"use client";

import { useEffect, useState } from "react";
import { FileIcon, Search } from "lucide-react";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { Dialog, DialogHeader, DialogContent } from "./ui/dialog";
import { useSearch } from "@/hooks/use-search";
import { api } from "@/convex/_generated/api";
import { Input } from "./ui/input";
import ItemSearch from "@/app/(main)/_components/item-search";

const SearchCommand = () => {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const documents = useQuery(api.documents.getSearch);
    const filteredDocuments = documents?.filter((document) => {
        return document.title.toLowerCase().includes(search.toLowerCase());
    })
    const [isMounted, setIsMounted] = useState(false);
    const toggle = useSearch((store) => store.toggle);
    const isOpen = useSearch((store) => store.isOpen);
    const onClose = useSearch((store) => store.onClose);

    useEffect(() => {
        setIsMounted(true);
    },[]);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if  (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                toggle();
            }
        }

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    },[toggle]);

    const onClick = (documentId: string) => {
        router.push(`/documents/${documentId}`);
        onClose();
    };
    if (!isMounted) {
        return null;
    }
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader className="border-b pb-3">
                    <h2 className="text-lg font-medium">
                        Search For Documents
                    </h2>
                </DialogHeader>
                <div className="text-sm">
                    <div className="my-2 flex items-center gap-x-1 p-2">
                        <Search className="h-8 w-8"/>
                        <Input 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="h-8 px-2 focus-visible:ring-transparent bg-secondary"
                            placeholder="Filter by page title..."
                        />
                    </div>
                    <div>
                    <p className="hidden last:block text-lg text-center text-muted-foreground">
                        No Documents Found
                    </p>
                    {filteredDocuments?.map((document) => (
                        <div key={document._id}>
                            <ItemSearch
                                id={document._id}
                                onClick={() => onClick(document._id)}
                                label={document.title}
                                icon={FileIcon}
                                documentIcon={document.icon}
                            />
                        </div>
                    ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
 
export default SearchCommand;