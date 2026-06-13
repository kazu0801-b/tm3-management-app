import { AppLayout } from "@/components/templates/AppLayout";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const TaskDetailPage = async ({ params }: Props) => {
  const { id } = await params;

  return (
    <AppLayout>
    
      <h1 className="text-2xl font-bold">タスク詳細</h1>

      <p className="mt-4">Task ID: {id}</p>
    
    </AppLayout>
  );
};

export default TaskDetailPage;