"use client";

import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { Badge } from "@/components/ui/badge";
import useProject from "@/hooks/use-project";
import { api } from "@/trpc/react";
import { User } from "lucide-react";
import Image from "next/image";
import { useMemo } from "react";

const MAX_VISIBLE_MEMBERS = 5;

const TeamMembers = () => {
  const { projectId } = useProject();
  const { data: members } = api.project.getTeamMembers.useQuery({ projectId });

  const { displayMembers, extraMembersCount } = useMemo(() => {
    if (!members) return { displayMembers: [], extraMembersCount: 0 };

    let selected = members;

    // Only shuffle if we have more members than we can display
    if (members.length > MAX_VISIBLE_MEMBERS) {
      // Randomly select MAX_VISIBLE_MEMBERS
      const shuffled = [...members].sort(() => 0.5 - Math.random());
      selected = shuffled.slice(0, MAX_VISIBLE_MEMBERS);
    } else {
      // Otherwise just use all members
      selected = [...members];
    }

    const formatted = selected.map((member, index) => ({
      id: member.id ? String(member.id) : `member-${index}`,
      name: member.user.name || "",
      image: member.user.image || "",
    }));

    return {
      displayMembers: formatted,
      extraMembersCount: Math.max(0, members.length - MAX_VISIBLE_MEMBERS),
    };
  }, [members]);

  if (!members?.length) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <div className="hidden md:block">
        {/* Desktop version */}
        <AnimatedTooltip items={displayMembers} className="mr-4" />
      </div>

      <div className="flex items-center gap-2 md:hidden">
        {/* Mobile version */}
        {displayMembers.map((member, index) => (
          <div
            key={`mobile-member-${member.id || index}`}
            className="relative h-8 w-8"
          >
            {member.image ? (
              <Image
                src={member.image}
                alt={member.name}
                width={32}
                height={32}
                className="rounded-full border-2 border-purple-800"
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-purple-800 bg-gray-100">
                <User size={20} className="text-purple-800" />
              </div>
            )}
          </div>
        ))}
      </div>

      {extraMembersCount > 0 && (
        <Badge
          variant="secondary"
          className="ml-1 flex h-8 w-8 items-center justify-center rounded-full"
        >
          +{extraMembersCount}
        </Badge>
      )}
    </div>
  );
};

export default TeamMembers;
