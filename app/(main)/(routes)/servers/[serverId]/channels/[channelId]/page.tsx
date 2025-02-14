import ChatHeader from "@/components/chat/chat-header";
import ChatInput from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import { MediaRoom } from "@/components/media-room";
import { currentProfile } from "@/lib/current-profile";
import db from "@/lib/db";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";

interface ChannelIdPageProps {
    params: {
        serverId: string;
        channelId: string;
    }
}

const ChannelIdPage = async ({
    params
}: ChannelIdPageProps) => {
    const { serverId, channelId } = await params;
    const profile = await currentProfile();
    if(!profile) {
        redirect("/");
    }

    const channel = await db.channel.findUnique({
        where: {
            id: channelId,
        },
    });

    const member = await db.member.findFirst({
        where: {
            serverId,
            profileId: profile.id,
        }
    });

    if(!channel || !member) {
        redirect("/");
    }


    return ( 
        <div className="bg-white dark:bg-[#313338] flex flex-col min-h-screen">
            <div className="sticky top-0 z-10">
                <ChatHeader
            name={channel.name}
            serverId={channel.serverId}
            type="channel"
            />
            </div>
            {channel.type === ChannelType.TEXT && (
            <>
            <div className="flex flex-col flex-grow justify-end overflow-y-auto">
            <ChatMessages
            member={member}
            name={channel.name}
            chatId={channel.id}
            type="channel"
            apiUrl="/api/messages"
            socketUrl="/api/socket/messages"
            socketQuery={{
                channelId: channel.id,
                serverId: channel.serverId,
            }}
            paramKey="channelId"
            paramValue={channel.id}
            />
            </div>
            
            <div className="sticky bottom-0 z-10 ">
            <ChatInput 
            name={channel.name} 
            type="channel" 
            apiUrl="/api/socket/messages" 
            query={{
                channelId: channel.id,
                serverId: channel.serverId,
            }}/>
            </div>
            </>
            )}
            {channel.type === ChannelType.AUDIO && (
                <MediaRoom
                chatId={channel.id}
                video={false}
                audio={true}
                />
            )}
            {channel.type === ChannelType.VIDEO && (
                <MediaRoom
                chatId={channel.id}
                video={true}
                audio={true}
                />
            )}
        </div>
     );
}
 
export default ChannelIdPage;