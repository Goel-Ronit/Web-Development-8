import DocumentPage from "@/app/(main)/_components/document-page";
import { Id } from "@/convex/_generated/dataModel";


interface DocumentIdPageProps {
    params: Promise<{
        documentId: Id<"documents">;
    }>;
};
const DocumentIdPage = async ({params}: DocumentIdPageProps) => {
    const {documentId} = await params;
    return (
        <DocumentPage preview={false} id={documentId}/>
    )
}
 
export default DocumentIdPage;