import { ModeToggle } from "@/components/mode-toggle";
import { ClerkProvider, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (

      
    <div className="flex flex-col">
      <ModeToggle></ModeToggle>
    </div>
    
  );
}

