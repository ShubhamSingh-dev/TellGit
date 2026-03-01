"use client";

import Image from "next/image";
import React from "react";
import useProject from "~/hooks/use-project";
import { api } from "~/trpc/react";

const TeamMembers = () => {
    const {projectId} = useProject();
    const {data: teamMembers} = api.project.getTeamMembers.useQuery({projectId: projectId!}, {
      enabled: !!projectId
    });
  return (
    <div className="flex items-center gap-2">
      {teamMembers?.map((member) => (
        <Image
          key={member.id}
          src={member.user.image ?? ""}
          alt={member.user.name ?? ""}
          height={30}
          width={30}
          className="rounded-full"
        />
      ))}
    </div>
  )
}

export default TeamMembers