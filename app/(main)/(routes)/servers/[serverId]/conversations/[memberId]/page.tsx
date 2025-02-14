import ChatHeader from "@/components/chat/chat-header";
import ChatInput from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import { MediaRoom } from "@/components/media-room";
import { getOrCreateConversation } from "@/lib/conversations";
import { currentProfile } from "@/lib/current-profile";
import db from "@/lib/db";
import { redirect } from "next/navigation";

interface MemberIdPageProps {
    params: {
        memberId: string;
        serverId: string;
    }, 
    searchParams: {
        video?: boolean;
    }
}

const MemberIdPage = async ({
    params,
    searchParams,
}: MemberIdPageProps) => {
    const {serverId, memberId} = await params;
    const {video} = await searchParams;
    const profile = await currentProfile();

    if(!profile) {
        return redirect("/");
    }

    const currentMember = await db.member.findFirst({
        where: {
            serverId: serverId,
            profileId: profile.id,
        },
        include: {
            profile: true,
        },
    });

    if(!currentMember) {
        return redirect("/");
    }

    const conversation = await getOrCreateConversation(currentMember.id, memberId);

    if(!conversation) {
        return redirect(`/servers/${serverId}`);
    }

    const {memberOne, memberTwo} = conversation;

    const otherMember = memberOne.profileId === profile.id ? memberTwo : memberOne;

    return ( 
        <div className="bg-white dark:bg-[#313338] flex flex-col min-h-screen">
            <div className="sticky top-0 z-10">
                <ChatHeader
            imageUrl={otherMember.profile.imageUrl}
            name={otherMember.profile.name}
            serverId={serverId}
            type="conversation"
            />
            </div>
            
            {video && (
                <MediaRoom
                chatId={conversation.id}
                video={true}
                audio={true}
                />
            )}
            {!video && (
            <>
            <div className="flex flex-col flex-grow justify-end overflow-y-auto">
                <ChatMessages
            member={currentMember}
            name={otherMember.profile.name}
            chatId={conversation.id}
            type="conversation"
            apiUrl="/api/direct-messages"
            paramKey="conversationId"
            paramValue={conversation.id}
            socketUrl="/api/socket/direct-messages"
            socketQuery={{
                conversationId: conversation.id,
            }}
            />
            </div>
            <div className="sticky bottom-0 z-10 ">
                <ChatInput
            name={otherMember.profile.name}
            type="conversation"
            apiUrl="/api/socket/direct-messages"
            query={{
                conversationId: conversation.id
            }}
            />
            </div>
            
            </>
            )}
        </div>
     );
}
 
export default MemberIdPage;