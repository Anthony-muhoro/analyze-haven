import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { FileSpreadsheet, Loader2, Pencil, Save, Trash, Upload as UploadIcon } from "lucide-react";
import { useState, useRef } from "react";
import * as XLSX from 'xlsx';

interface DataSet {
  id: string;
  name: string;
  rows: number;
  columns: number;
  date: string;
}

const Upload = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [datasets, setDatasets] = useState<DataSet[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setProgress(0);

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);

        const newDataset: DataSet = {
          id: crypto.randomUUID(),
          name: file.name,
          rows: jsonData.length,
          columns: Object.keys(jsonData[0] || {}).length,
          date: new Date().toISOString(),
        };

        setDatasets((prev) => [...prev, newDataset]);
        toast({
          title: "Success",
          description: "File uploaded successfully",
        });
      };

      reader.onprogress = (e) => {
        if (e.lengthComputable) {
          const progress = (e.loaded / e.total) * 100;
          setProgress(progress);
        }
      };

      reader.readAsArrayBuffer(file);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload file",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      setProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleEdit = (dataset: DataSet) => {
    setEditingId(dataset.id);
    setEditName(dataset.name);
  };

  const handleSave = (id: string) => {
    setDatasets((prev) =>
      prev.map((dataset) =>
        dataset.id === id ? { ...dataset, name: editName } : dataset
      )
    );
    setEditingId(null);
    toast({
      title: "Success",
      description: "Dataset name updated",
    });
  };

  const handleDelete = (id: string) => {
    setDatasets((prev) => prev.filter((dataset) => dataset.id !== id));
    toast({
      title: "Success",
      description: "Dataset deleted",
    });
  };

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
          <CardContent className="space-y-4">
            <Input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileUpload}
              disabled={uploading}
            />
            {uploading && (
              <div className="space-y-2">
                <Progress value={progress} />
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Uploading...
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {datasets.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Uploaded Datasets</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Rows</TableHead>
                    <TableHead>Columns</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {datasets.map((dataset) => (
                    <TableRow key={dataset.id}>
                      <TableCell>
                        {editingId === dataset.id ? (
                          <Input
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="max-w-[200px]"
                          />
                        ) : (
                          <div className="flex items-center gap-2">
                            <FileSpreadsheet className="h-4 w-4" />
                            {dataset.name}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{dataset.rows}</TableCell>
                      <TableCell>{dataset.columns}</TableCell>
                      <TableCell>
                        {new Date(dataset.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {editingId === dataset.id ? (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleSave(dataset.id)}
                            >
                              <Save className="h-4 w-4" />
                            </Button>
                          ) : (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(dataset)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(dataset.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Upload;