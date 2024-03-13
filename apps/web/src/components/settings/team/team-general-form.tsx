import { zodResolver } from "@hookform/resolvers/zod";
import {
  DrObj,
  Team,
  TeamSchema,
  User,
  WORKSPACE_TEAM_ID_LENGTH,
} from "@repo/data";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  Input,
  cn,
  useIsDesktop,
} from "@repo/ui";
import { useForm } from "react-hook-form";
import { SettingsContext } from "../settings";
import { use, useContext, useEffect } from "react";
import { nanoid } from "nanoid";
import { useCurrentWorkspace } from "@/components/workspace/workspace-context";

export function TeamGeneralForm({ team }: { team: DrObj<Team> }) {
  const { dispatch } = useContext(SettingsContext);
  const { workspace } = useCurrentWorkspace();
  const isAddition = team.id.startsWith("add-");

  const isDesktop = useIsDesktop();

  const form = useForm<DrObj<Team>>({
    resolver: zodResolver(
      TeamSchema.pick({ name: true, avatar: true, id: true, createdBy: true }),
    ),
    defaultValues: {
      id: isAddition ? nanoid(WORKSPACE_TEAM_ID_LENGTH) : team.id,
      name: isAddition ? "" : team.name,
      avatar: isAddition ? "" : team?.avatar,
      createdBy: isAddition ? User.getInstance().data.id : team.createdBy,
    },
  });

  useEffect(() => {
    if (isAddition)
      return form.reset({
        ...team,
        id: nanoid(WORKSPACE_TEAM_ID_LENGTH),
        createdBy: User.getInstance().data.id,
      });

    form.reset(team);
  }, [team]);

  async function onSubmit(
    data: Pick<Team, "id" | "name" | "createdBy" | "avatar">,
  ) {
    if (isAddition) {
      await workspace?.store.mutate.createTeam(data);
      form.setValue("id", nanoid(WORKSPACE_TEAM_ID_LENGTH));

      return dispatch({
        type: "openAccordionItem",
        payload: { value: "teams", id: data.id, isSidebarOpen: isDesktop },
      });
    }

    await workspace?.store.mutate.updateTeam({
      teamId: team.id,
      teamUpdate: {
        action: "updateInfo",
        update: {
          name: data.name,
          avatar: data.avatar,
        },
      },
    });
  }

  return (
    <div className="space-y-2">
      <p className="text-sm">Icon & Name</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full items-end gap-2"
        >
          <Avatar className="h-8 w-8 rounded-md">
            <AvatarImage src={form.watch("avatar")} />
            <AvatarFallback className="rounded-md capitalize">
              {form.watch("name")?.[0] || ""}
            </AvatarFallback>
          </Avatar>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="basis-2/5">
                <FormControl>
                  <Input {...field} className="" placeholder="Team Name" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem className="hidden">
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="createdBy"
            render={({ field }) => (
              <FormItem className="hidden">
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            size="sm"
            type="submit"
            className={cn(
              "invisible opacity-0 transition-all",
              form.formState.isDirty && "visible opacity-100",
              isAddition && "visible opacity-100",
            )}
          >
            {isAddition ? "Create team" : "Update"}
          </Button>
        </form>
      </Form>
    </div>
  );
}