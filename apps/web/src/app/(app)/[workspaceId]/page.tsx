"use client";

import { Workspace } from "../../../../../../packages/data/client-models";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

function SpacePage({ params }: { params: { workspaceId: string } }) {
  const router = useRouter();

  const { workspaceId } = params;

  // const { workspaceId } = useParams();

  // useEffect(() => {
  //   if (!Workspace.hasInstance(workspaceId)) router.push("/me");
  // }, []);

  // if (!Workspace.hasInstance(workspaceId as string)) {
  //   router.replace("/me");
  // }

  console.log(params);
  // const wrs = Workspace.getInstance("1");

  // console.log(Workspace);
  return <div>hhhhhh</div>;
}

export default SpacePage;
