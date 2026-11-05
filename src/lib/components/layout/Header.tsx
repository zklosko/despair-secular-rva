import { navigation as fallbackNavigation } from "@/lib/navigation";
import { HeaderClient } from "./HeaderClient";

export function Header() {
  return (
    <HeaderClient
      navigation={fallbackNavigation}
      visitButtonText="Plan Your Visit"
      visitButtonLink="/visit"
    />
  );
}