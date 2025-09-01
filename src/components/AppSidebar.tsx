import { useState } from "react";
import { Plus, MessageSquare, Settings, HelpCircle, Menu } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock recent chats data
const recentChats = [
  { id: 1, title: "Login Module FSD Test Cases", timestamp: "2 hours ago" },
  { id: 2, title: "Payment Gateway CR Analysis", timestamp: "1 day ago" },
  { id: 3, title: "User Registration Feature Tests", timestamp: "2 days ago" },
  { id: 4, title: "API Integration Test Suite", timestamp: "3 days ago" },
  { id: 5, title: "Database Schema Validation", timestamp: "1 week ago" },
  { id: 6, title: "Security Module Testing", timestamp: "1 week ago" },
  { id: 7, title: "Mobile App UI Test Cases", timestamp: "2 weeks ago" },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const isCollapsed = state === "collapsed";

  const handleNewChat = () => {
    setSelectedChat(null);
    // Reset chat interface
  };

  const handleChatSelect = (chatId: number) => {
    setSelectedChat(chatId);
    // Load chat history
  };

  return (
    <Sidebar className={`${isCollapsed ? "w-14" : "w-80"} border-r border-sidebar-border bg-sidebar`}>
      <SidebarContent className="p-4">
        {/* Header with toggle and new chat */}
        <div className="flex items-center justify-between mb-6">
          {!isCollapsed && (
            <h2 className="text-lg font-bold text-sidebar-foreground">Cortexa</h2>
          )}
          <SidebarTrigger className="p-2 hover:bg-sidebar-accent rounded-lg transition-colors">
            <Menu className="h-4 w-4" />
          </SidebarTrigger>
        </div>

        {/* New Chat Button */}
        <div className="mb-6">
          <Button
            onClick={handleNewChat}
            variant="outline"
            size={isCollapsed ? "sm" : "default"}
            className={`w-full bg-primary hover:bg-primary-glow text-primary-foreground border-0 glow-hover ${
              isCollapsed ? "px-2" : "px-4"
            }`}
          >
            <Plus className="h-4 w-4" />
            {!isCollapsed && <span className="ml-2">New Chat</span>}
          </Button>
        </div>

        {/* Recent Chats */}
        {!isCollapsed && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-sidebar-foreground/70 text-sm font-medium mb-3">
              Recent
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <ScrollArea className="h-[calc(100vh-280px)]">
                <SidebarMenu className="space-y-1">
                  {recentChats.map((chat) => (
                    <SidebarMenuItem key={chat.id}>
                      <SidebarMenuButton
                        asChild
                        className={`w-full p-3 rounded-lg transition-all cursor-pointer ${
                          selectedChat === chat.id
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "hover:bg-sidebar-accent/50 text-sidebar-foreground"
                        }`}
                      >
                        <div onClick={() => handleChatSelect(chat.id)}>
                          <MessageSquare className="h-4 w-4 flex-shrink-0" />
                          <div className="flex-1 min-w-0 ml-3">
                            <p className="text-sm font-medium truncate">
                              {chat.title}
                            </p>
                            <p className="text-xs text-sidebar-foreground/60 truncate">
                              {chat.timestamp}
                            </p>
                          </div>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </ScrollArea>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Settings & Help - Bottom Section */}
        <div className="mt-auto pt-4 border-t border-sidebar-border">
          <SidebarMenu className="space-y-1">
            <SidebarMenuItem>
              <SidebarMenuButton className="hover:bg-sidebar-accent text-sidebar-foreground p-3 rounded-lg transition-colors">
                <Settings className="h-4 w-4" />
                {!isCollapsed && <span className="ml-3">Settings</span>}
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton className="hover:bg-sidebar-accent text-sidebar-foreground p-3 rounded-lg transition-colors">
                <HelpCircle className="h-4 w-4" />
                {!isCollapsed && <span className="ml-3">Help</span>}
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}