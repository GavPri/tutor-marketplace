import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import AuthSection from "./auth-section";

const Navbar04Page = () => {
  return (
    <div className="fixed top-0 z-50 backdrop-blur-lg bg-transparent h-24 w-full flex justify-start">
      <nav className="fixed top-6 w-[calc(100vw-16px)] h-16 bg-background border max-w-4xl mx-auto rounded-full z-50">
        <div className="h-full flex items-center justify-between px-4">
          <Logo />
          <NavMenu className="hidden md:block" />
          <div className="flex items-center gap-3">
            <AuthSection />
            <div className="md:hidden">
              <NavigationSheet />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar04Page;
