import { currentProfile } from "@/lib/current-profile";
import db from "@/lib/db";
import { redirect } from "next/navigation";

interface InviteCodePageProps {
    params: {
        inviteCode: string;
    };
};

const InviteCodePage = async ({
    params
}: InviteCodePageProps) => {
    const {inviteCode} = await params;
    const profile = await currentProfile();

    if(!profile) {
        return redirect("/");
    }

    if(!inviteCode) {
        return redirect("/");
    }

    const existingServer = await db.server.findFirst({
        where: {
            inviteCode,
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });
    if(existingServer) {
        return redirect(`/servers/${existingServer.id}`);
    }

    const serverToJoin = await db.server.findFirst({
        where: { inviteCode }
    });
    
    if (!serverToJoin) {
        return redirect("/");
    }

    const server = await db.server.update({
        where: {
            inviteCode,
        },
        data: {
            members: {
                create: [
                    {
                        profileId: profile.id,
                    }
                ]
            }
        }
    });

    if(server) {
        return redirect(`/servers/${server.id}`);
    }

    return null;
}
 
export default InviteCodePage;