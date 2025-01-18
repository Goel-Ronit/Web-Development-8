"use client"
import { useEdgeStore } from "@/lib/edgestore";
import { PartialBlock } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { useTheme } from "next-themes";


interface EditorProps {
    onChange: (value: string) => void;
    initialContent?: string;
    editable?: boolean;
};
const Editor = ({
    onChange,
    initialContent,
    editable
}: EditorProps) => {
    const {edgestore} = useEdgeStore();
    const {resolvedTheme} = useTheme();

    const handleUpload = async (file: File) => {
        const response = await edgestore.publicFiles.upload({
            file
        });

        return response.url;
    };
    const editor = useCreateBlockNote({
        initialContent: initialContent ? JSON.parse(initialContent) as PartialBlock[] : undefined,
        uploadFile: handleUpload,
      });
    return (  
        <div>
            <BlockNoteView 
                editable={editable}
                editor={editor}
                onChange={() => {
                    onChange(JSON.stringify(editor.document))
                }}
                theme={resolvedTheme === "dark" ? "dark" : "light"}
            />
        </div>
    );
}
 
export default Editor;