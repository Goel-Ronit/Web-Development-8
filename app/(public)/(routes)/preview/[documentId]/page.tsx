import DocumentPagePreview from "@/app/(main)/_components/document-page-preview";
import { Id } from "@/convex/_generated/dataModel";


interface DocumentIdPageProps {
    params: Promise<{
        documentId: Id<"documents">;
    }>;
};
const DocumentIdPage = async ({params}: DocumentIdPageProps) => {
    const {documentId} = await params;
    return (
        <DocumentPagePreview preview={true} id={documentId}/>
    )
}
 
export default DocumentIdPage;