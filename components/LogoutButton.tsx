"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/actions/auth.action";
import { toast } from "sonner";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const result = await logout();
      
      if (result.success) {
        toast.success(result.message);
        router.push("/sign-in");
      } else {
        toast.error("Failed to logout");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Button 
      onClick={handleLogout} 
      variant="outline" 
      size="sm"
      className="bg-dark-200 text-white border-none cursor-pointer  hover:bg-dark-300 hover:text-primary-100 transition-all duration-300 rounded-lg flex items-center gap-2"
    >
      <LogOut size={16} />
      <span>Logout</span>
    </Button>
  );
};

export default LogoutButton;