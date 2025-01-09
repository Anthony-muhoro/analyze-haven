import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload as UploadIcon } from "lucide-react";

const Upload = () => {
  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold tracking-tight">Upload Data</h1>
          <p className="text-lg text-muted-foreground">
            Upload your Excel files for analysis
          </p>
        </div>

        <Card className="w-full max-w-xl mx-auto">
          <CardHeader>
            <CardTitle>Upload Excel File</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full gap-2" size="lg">
              <UploadIcon className="h-4 w-4" />
              Choose File
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Upload;