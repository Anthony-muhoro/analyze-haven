import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Tables = () => {
  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold tracking-tight">Data Tables</h1>
          <p className="text-lg text-muted-foreground">
            View and manage your data
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Data</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              No data available. Please upload an Excel file first.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Tables;