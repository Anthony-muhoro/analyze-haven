import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Analysis = () => {
  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold tracking-tight">Analysis</h1>
          <p className="text-lg text-muted-foreground">
            Analyze your data and view insights
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              No analysis available. Please upload and process data first.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Analysis;