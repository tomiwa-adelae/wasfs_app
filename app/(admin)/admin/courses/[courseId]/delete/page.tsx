import { DeleteForm } from "./_components/DeleteForm";

type Params = Promise<{ courseId: string }>;

const page = async ({ params }: { params: Params }) => {
	const { courseId } = await params;

	return <DeleteForm courseId={courseId} />;
};

export default page;
