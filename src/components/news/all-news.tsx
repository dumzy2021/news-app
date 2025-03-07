import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GuardianNewsContents } from "./guardian-news";
import { NewsContents } from "./news";
import { BBCNewsContents } from "./bbcnews";

export const AllNewsContents = () => {
  return (
    <Tabs defaultValue="news" className="max-w-6xl mx-auto p-4 rounded-md">
      <TabsList className="grid h-full w-full sm:grid-cols-3 max-w-[400px] mx-auto">
        <TabsTrigger value="news">News Api</TabsTrigger>
        <TabsTrigger value="guardian">Guardian Api</TabsTrigger>
        <TabsTrigger value="BBCNews">BBC News Api</TabsTrigger>
      </TabsList>
      <TabsContent value="news">
        <NewsContents />
      </TabsContent>
      <TabsContent value="guardian">
        <GuardianNewsContents />
      </TabsContent>
      <TabsContent value="BBCNews">
        <BBCNewsContents />
      </TabsContent>
    </Tabs>
  );
};
