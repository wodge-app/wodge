"use client";

import { use, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  Input,
  ProfileAvatar,
  toast,
  useStepper,
} from "@repo/ui";

import { Profile, UpdateProfileSchema } from "@repo/data";
import { updateProfile } from "@/actions/users";
import { useOnboarding } from "./onboarding-context";

export function ProfileForm() {
  const { profile, startTransition } = useOnboarding();
  const { nextStep } = useStepper();
  const [localUrl, setLocalUrl] = useState<string>("");
  const avatarFileRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof UpdateProfileSchema>>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      displayName: profile?.displayName ?? "",
      username: profile?.username ?? "",
      avatar: profile?.avatar ?? "",
    },
  });

  function removeAvatar() {
    form.setValue("avatar", "");
    setLocalUrl("");
  }

  // TODO
  async function onAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    // 1 Get the file and set preview URL - optionally validate file type and size
    // Optionally set local state to file to upload to server action
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setLocalUrl(url);

    // 2 Created presigned url

    // 3 Upload file to R2

    // 4 Set avatar to the new url
    form.setValue("avatar", url);
  }

  async function onSubmit(data: z.infer<typeof UpdateProfileSchema>) {
    startTransition(() => {
      updateProfile(data).then((res) => {
        if (res?.error) {
          toast(res.error);
        }
        if (res?.success) {
          nextStep();
        }
      });
    });
  }

  return (
    <Form {...form}>
      <div className="flex flex-col space-y-3">
        <ProfileAvatar
          inputRef={avatarFileRef}
          localUrl={localUrl}
          onRemoveAvatar={removeAvatar}
          avatar={form.watch("avatar")}
          fallback={form.watch("displayName")}
        />

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-2"
          id="profile-form"
        >
          <Input
            type="file"
            onChange={onAvatarChange}
            ref={avatarFileRef}
            className="hidden"
          />

          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} type="hidden" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground">
                  Display name
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="John Doe" className="peer" />
                </FormControl>
                <FormDescription
                  withError
                  className="h-0 overflow-hidden transition-all peer-focus:h-4 peer-focus:overflow-visible peer-focus:pb-5"
                >
                  This how people will see you. Use whatever you want.
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground">
                  Username
                </FormLabel>
                <FormControl>
                  <Input {...field} className="peer" placeholder="johndoe" />
                </FormControl>
                <FormDescription
                  withError
                  className="h-0 overflow-hidden transition-all peer-focus:h-4 peer-focus:overflow-visible peer-focus:pb-5"
                >
                  Only letters, numbers, dashes, and underscores.
                </FormDescription>
              </FormItem>
            )}
          />
        </form>
      </div>
    </Form>
  );
}
