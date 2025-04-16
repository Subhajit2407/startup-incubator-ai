import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Minus, Edit2 } from "lucide-react";

interface WireframePromptProps {
  onSubmit: (pages: string[], prompt: string) => void;
  defaultPrompt?: string;
}

export default function WireframePrompt({ onSubmit, defaultPrompt = "" }: WireframePromptProps) {
  const [pages, setPages] = useState<string[]>(["Home"]);
  const [prompt, setPrompt] = useState(defaultPrompt);
  const [isEditing, setIsEditing] = useState(false);

  const addPage = () => {
    setPages([...pages, `Page ${pages.length + 1}`]);
  };

  const removePage = (index: number) => {
    setPages(pages.filter((_, i) => i !== index));
  };

  const updatePageName = (index: number, name: string) => {
    const newPages = [...pages];
    newPages[index] = name;
    setPages(newPages);
  };

  const handleSubmit = () => {
    onSubmit(pages, prompt);
  };

  return (
    <div className="space-y-6 p-6 bg-card rounded-lg border border-border">
      <div>
        <h3 className="text-lg font-medium mb-4">Configure Wireframe Pages</h3>
        <div className="space-y-4">
          {pages.map((page, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={page}
                onChange={(e) => updatePageName(index, e.target.value)}
                placeholder="Page name"
                className="flex-1"
              />
              {pages.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removePage(index)}
                  className="text-destructive hover:text-destructive"
                >
                  <Minus className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            variant="outline"
            onClick={addPage}
            className="w-full mt-2"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Page
          </Button>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label>Wireframe Prompt</Label>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="text-muted-foreground hover:text-foreground"
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Edit Prompt
          </Button>
        </div>
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Wireframe Prompt</DialogTitle>
              <DialogDescription>
                Customize the prompt to better describe your desired wireframe layout.
              </DialogDescription>
            </DialogHeader>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your desired wireframe layout..."
              className="min-h-[200px]"
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsEditing(false)}>
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Button onClick={handleSubmit} className="w-full glow-effect">
        Create Wireframe
      </Button>
    </div>
  );
} 