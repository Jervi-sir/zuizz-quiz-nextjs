"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader } from "@/components/ui/card"

const Subject = ({ topic }) => {
  return (
    <>
      <a href={`/topics/${topic.id}`}>
        <Card >
          <CardHeader className="p-4">
            <div className="relative flex items-start justify-between gap-3">
              <Button variant="outline" className="bg-white">
                <Image src={topic.icon} alt="arrow" width={30} height={30} />
              </Button>
              <div className="pt-[6px] text-right">
                <CardDescription>{topic.name}</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      </a>

    </>
  );
};

export default Subject;
